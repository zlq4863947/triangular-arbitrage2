import { AssetMarket, BinanceApiService, Tickers } from '@arbitrage-libs/broker-api';
import { Config } from '@arbitrage-libs/config';
import { Logger } from '@arbitrage-libs/logger';
import { getTriangleRate } from '@arbitrage-libs/util';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ABCAssetName, Edge, Triangle } from '../../models';

const MAX_CANDIDATES_NUM = 20;

@Injectable()
export class EngineService implements OnModuleInit {
  private rest = this.binanceApi.rest;
  private websocket = this.binanceApi.ws;

  tickers: Tickers;

  constructor(private logger: Logger, private binanceApi: BinanceApiService) {}

  onModuleInit(): void {
    this.websocket.getAllTickers$().subscribe((tickers) => (this.tickers = tickers));
  }

  getCandidates$(): Observable<Triangle[]> {
    return this.websocket.getAllTickers$().pipe(
      map((tickers) => {
        // this.logger.info('EngineService', '查找套利机会...');
        let candidates: Triangle[] = [];
        const marketAssetNames = Object.keys(this.rest.assetMarkets);

        let startAssetNames = Config.activeBroker.startAssets;
        // 未设定起始货币时
        if (!startAssetNames || startAssetNames.length === 0) {
          startAssetNames = marketAssetNames;
        } else {
          // 过滤不存在的起始货币
          startAssetNames = startAssetNames.filter((asset) => marketAssetNames.includes(asset));
        }

        if (startAssetNames.length === 0) {
          this.logger.warn('EngineService', '起始交易数组为空！');
          return [];
        }

        for (const [index, assetName] of marketAssetNames.entries()) {
          if (!startAssetNames.includes(assetName)) {
            continue;
          }
          const paths = marketAssetNames.slice(0);
          // 删除起始路径
          paths.splice(index, 1);

          for (const path of paths) {
            const foundCandidates = this.findCandidates(tickers, assetName, path);
            if (foundCandidates && foundCandidates.length > 0) {
              candidates.push(...foundCandidates);
            }
          }
        }

        if (candidates.length) {
          candidates.sort((a, b) => {
            return +b.rate - +a.rate;
          });
        }

        // 淘汰落选者
        if (candidates.length > MAX_CANDIDATES_NUM) {
          candidates = candidates.slice(0, MAX_CANDIDATES_NUM);
        }

        return candidates;
      }),
      filter((list) => list && list.length > 0),
    );
  }

  /**
   * 获取组合的边
   *
   * @param tickers
   * @param fromAsset
   * @param toAsset
   */
  getEdge(tickers: Tickers, fromAsset: string, toAsset: string): Edge | undefined {
    if ((!tickers && Object.keys(tickers).length === 0) || !fromAsset || !toAsset) {
      this.logger.error('EngineService', 'getEdge', '输入参数异常！', fromAsset, toAsset);
      return;
    }

    // 查找匹配的ticker
    const buyTicker = tickers[`${toAsset}${fromAsset}`];

    let edge: Edge;
    if (buyTicker) {
      edge = {
        pair: `${toAsset}/${fromAsset}`,
        fromAsset,
        toAsset,
        side: 'buy',
        price: +buyTicker.bestAskPrice,
        quantity: +buyTicker.bestAskQuantity,
      };
    } else {
      // 查找匹配的ticker
      const sellTicker = tickers[`${fromAsset}${toAsset}`];
      if (!sellTicker) {
        return;
      }
      edge = {
        pair: `${fromAsset}/${toAsset}`,
        fromAsset,
        toAsset,
        side: 'sell',
        price: +sellTicker.bestBid,
        quantity: +sellTicker.bestBidQuantity,
      };
    }

    return edge;
  }

  private findCandidates(tickers: Tickers, aFromAsset: string, aToAsset: string): Triangle[] {
    try {
      const abcAssetName: ABCAssetName = {
        aAssetName: aFromAsset.toUpperCase(),
        bAssetName: aToAsset.toUpperCase(),
        cAssetName: 'FIND_ME',
      };

      const assetMarkets = this.rest.assetMarkets;
      const aAssetMarkets = assetMarkets[abcAssetName.aAssetName];
      let bAssetMarkets = assetMarkets[abcAssetName.bAssetName];

      const aAssetMarket: AssetMarket = {};
      aAssetMarkets.forEach((market) => (aAssetMarket[market.base] = market));

      const whitelist = Config.activeBroker.whitelist;
      if (whitelist && whitelist.length > 0) {
        bAssetMarkets = bAssetMarkets.filter((market) => whitelist.includes(market.base));
      } else {
        const blacklist = Config.activeBroker.blacklist;
        if (blacklist && blacklist.length > 9) {
          bAssetMarkets = bAssetMarkets.filter((market) => !blacklist.includes(market.base));
        }
      }

      // 去掉b点货币
      delete aAssetMarket[abcAssetName.bAssetName];

      // 通过bAsset配对
      const triangles: Triangle[] = [];
      for (const bAssetMarket of bAssetMarkets) {
        if (aAssetMarket[bAssetMarket.base]) {
          const stepC = this.getEdge(tickers, bAssetMarket.base, abcAssetName.aAssetName);

          // 匹配到路径C
          if (stepC) {
            abcAssetName.cAssetName = stepC.fromAsset;
            const triangle = this.getTriangle(tickers, abcAssetName);
            if (!triangle) {
              continue;
            }
            triangles.push(triangle);
          }
        }
      }

      return triangles;
    } catch (error) {
      this.logger.error('EngineService', `查找候选者出错: ${error.message}`);
    }
  }

  /**
   * 获取三角套利信息
   *
   * @param tickers
   * @param abc
   * @private
   */
  private getTriangle(tickers: Tickers, abc: ABCAssetName): Triangle | undefined {
    if ((!tickers && Object.keys(tickers).length === 0) || !abc || !abc.aAssetName || !abc.bAssetName || !abc.cAssetName) {
      this.logger.error('EngineService', 'getTriangle', '输入参数异常！', JSON.stringify(abc));
      return;
    }
    const aEdge = this.getEdge(tickers, abc.aAssetName, abc.bAssetName);
    const bEdge = this.getEdge(tickers, abc.bAssetName, abc.cAssetName);
    const cEdge = this.getEdge(tickers, abc.cAssetName, abc.aAssetName);
    if (!aEdge || !bEdge || !cEdge) {
      return;
    }

    const { rate, logs } = getTriangleRate(aEdge, bEdge, cEdge);

    return {
      id: `${aEdge.fromAsset}-${bEdge.fromAsset}-${cEdge.fromAsset}`,
      edges: [aEdge, bEdge, cEdge],
      rate,
      logs,
      time: Date.now(),
    };
  }
}
