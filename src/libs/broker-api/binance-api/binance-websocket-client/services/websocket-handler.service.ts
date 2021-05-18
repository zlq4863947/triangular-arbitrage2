import { Logger } from '@arbitrage-libs/logger';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class WebsocketHandler implements OnModuleDestroy {
  private onDestroy$ = new Subject<true>();

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

  initialize() {}

  onModuleDestroy(): any {}
}
