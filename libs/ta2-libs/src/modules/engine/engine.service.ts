import { Injectable } from '@nestjs/common';
import { AssetMarket, Tickers } from '@ta2-libs/broker-api';
import { floorToString, gte } from '@ta2-libs/common';
import { Config } from '@ta2-libs/config';
import { Logger } from '@ta2-libs/logger';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { CatchError } from '../../common/descriptors';
import { getTriangleRate } from '../../common/utils';
import { DefaultExceptionHandler } from '../../exceptions';
import { ABCAssetName, Edge, Triangle } from '../../models';
import { DataService } from '../data';

const MAX_CANDIDATES_NUM = 20;

@Injectable()
@CatchError(DefaultExceptionHandler)
export class EngineService {
  private name = 'EngineService';

  constructor(private logger: Logger, private dataService: DataService) {}

  getCandidates$(): Observable<Triangle[]> {
    return this.dataService.getTickers$().pipe(
      map((tickers) => {
        let candidates: Triangle[] = [];
        const marketAssetNames = Object.keys(this.dataService.assetMarkets);

        let startAssetNames = Config.activeBroker.startAssets;
        // 未设定起始货币时
        if (!startAssetNames || startAssetNames.length === 0) {
          startAssetNames = marketAssetNames;
        } else {
          // 过滤不存在的起始货币
          startAssetNames = startAssetNames.filter((asset) => marketAssetNames.includes(asset));
        }

        if (startAssetNames.length === 0) {
          this.logger.warn(this.name, '起始交易数组为空！');
          return [];
        }

        for (const [index, assetName] of marketAssetNames.entries()) {
          if (!startAssetNames.includes(assetName)) {
            continue;
          }
          let paths = marketAssetNames.slice(0);
          const whitelist = Config.activeBroker.whitelist;
          if (whitelist.length > 0) {
            paths = paths.filter((p) => whitelist.includes(p));
          }
          const blacklist = Config.activeBroker.blacklist;
          if (blacklist.length > 0) {
            paths = paths.filter((p) => !blacklist.includes(p));
          }

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

  getTradableTriangle$(): Observable<Triangle> {
    return this.getCandidates$().pipe(
      map((candidates) => candidates[0]),
      tap((candidate) =>
        this.logger.info(
          this.name,
          `查找可交易套利组合，最佳套利组合[${candidate.id}]：预期交叉汇率(${floorToString(candidate.rate, 4)}%), 配置套利收益率(${
            Config.activeBroker.profitRate
          }%)...`,
        ),
      ),
      filter((candidate) => gte(candidate.rate, Config.activeBroker.profitRate)),
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
      this.logger.error(this.name, '输入参数异常！', fromAsset, toAsset);
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
    const abcAssetName: ABCAssetName = {
      aAssetName: aFromAsset.toUpperCase(),
      bAssetName: aToAsset.toUpperCase(),
      cAssetName: 'FIND_ME',
    };

    const assetMarkets = this.dataService.assetMarkets;
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
      this.logger.error(this.name, '输入参数异常！', JSON.stringify(abc));
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
