import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as WebSocket from 'ws';

import { WsEndpoints, WsMarketEndpoints, WsUserEndpoints } from '../constants';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const binance = require('binance');

interface StreamData<T> {
  subject: Subject<T>;
  websocket: WebSocket;
}
@Injectable()
export class WebsocketHandler implements OnModuleDestroy {
  private onDestroy$ = new Subject<true>();

  private wsWrapper: any;
  private restWrapper: any;
  private streamMap = new Map<WsEndpoints, StreamData<any>>();
  private joinedEndpointSet = new Set<WsEndpoints>();

  /**
   * 当前是否已连接websocket。
   * 值将通过 this.notifyConnectionStatus() 方法发出。
   */
  private _isConnected$ = new BehaviorSubject<boolean>(false);

  /**
   * 指示是否可以重新连接到服务器。
   * 当通过调用断开连接方法手动关闭连接时，该值将设置为false。
   *
   * @type {boolean}
   */
  private allowReconnect = true;

  get isConnected$(): Observable<boolean> {
    return this._isConnected$.asObservable().pipe(distinctUntilChanged());
  }

  get isConnected(): boolean {
    return false; //this.socket.connected;
  }

  constructor(private logger: Logger) {}

  initialize(): void {
    this.wsWrapper = new binance.BinanceWS();
  }

  subscribe<T>(endpoint: WsMarketEndpoints): Observable<T> {
    return this.getSubjectByStream<T>(endpoint).asObservable();
  }

  subscribeUserData<T>(endpoint: WsUserEndpoints, rest: any): Observable<T> {
    this.restWrapper = rest;

    return this.getSubjectByStream<T>(endpoint).asObservable();
  }

  unsubscribe(endpoint: WsEndpoints): void {
    const stream = this.streamMap.get(endpoint);
    if (!stream) {
      return;
    }
    this.logger.debug('websocket-handler', 'unsubscribe stream', endpoint);
    stream.subject.complete();
    stream.websocket.close();
    this.streamMap.delete(endpoint);
    this.joinedEndpointSet.delete(endpoint);
  }

  unsubscribeAll(): void {
    this.logger.debug('websocket-handler', 'unsubscribe all stream');
    for (const endpoint of Array.from(this.streamMap.keys())) {
      this.unsubscribe(endpoint);
    }
  }

  onModuleDestroy(): void {
    this.unsubscribeAll();
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private getSubjectByStream<T>(endpoint: WsEndpoints): Subject<T> {
    const stream = this.streamMap.get(endpoint);
    if (stream) {
      return stream.subject as Subject<T>;
    }

    const subject = new Subject<T>();
    this.logger.debug('websocket-handler', 'subject created', endpoint);
    const websocket = this.joinStream(endpoint, subject);
    this.streamMap.set(endpoint, { subject, websocket });

    return subject;
  }

  private joinStream<T>(endpoint: WsEndpoints, subject: Subject<T>): WebSocket {
    if (!this.joinedEndpointSet.has(endpoint)) {
      this.joinedEndpointSet.add(endpoint);
    }
    this.logger.info('websocket-handler', 'join stream', endpoint);
    switch (endpoint) {
      case WsEndpoints.AllTickers: {
        return this.wsWrapper.onAllTickers((data) => subject.next(data));
      }
      case WsEndpoints.ExecutionReport: {
        if (!this.restWrapper) {
          this.logger.error('websocket-handler', 'restWrapper is null', endpoint);
          return;
        }

        return this.wsWrapper.onUserData(this.restWrapper, (data) => subject.next(data));
      }
    }
  }

  private reJoinStreams(): void {
    this.logger.info('websocket-handler', 'try to reJoinStreams.', this.joinedEndpointSet);
    this.joinedEndpointSet.forEach((endpoint) => {
      const stream = this.streamMap.get(endpoint);
      stream.websocket = this.joinStream(endpoint, stream.subject);
    });
  }
}
