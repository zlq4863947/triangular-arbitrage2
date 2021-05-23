import BigNumber from 'bignumber.js';

import { Edge, TriangleRate, TriangleRateLogs } from '../../../app/models';

export function getTriangleRate(a: Edge, b: Edge, c: Edge): TriangleRate {
  // 利率 = (1/priceA/priceB*priceC-1)-1
  const capital = new BigNumber(1);
  let step1Rate = new BigNumber(a.price);
  const logInfos = {} as TriangleRateLogs;
  if (a.side === 'buy') {
    step1Rate = capital.div(a.price);
    logInfos.aRate = `a rate = 1 / ${a.price} = ${step1Rate.toFixed(8)}`;
  }

  let step2Rate = step1Rate.times(b.price);
  if (b.side === 'buy') {
    step2Rate = step1Rate.div(b.price);
    logInfos.bRate = `b rate = ${step1Rate.toFixed(8)} / ${b.price} = ${step2Rate.toFixed(8)}`;
  } else {
    logInfos.bRate = `b rate = ${step1Rate.toFixed(8)} x ${b.price} = ${step2Rate.toFixed(8)}`;
  }

  let step3Rate = step2Rate.times(c.price);
  if (c.side === 'buy') {
    step3Rate = step2Rate.div(c.price);
    logInfos.cRate = `c rate = (${step2Rate.toFixed(8)} / ${b.price} -1) x100 = ${+step3Rate.minus(1).times(100).toFixed(8)}`;
  } else {
    logInfos.cRate = `c rate = (${step2Rate.toFixed(8)} x ${b.price} -1) x100 = ${step3Rate.minus(1).times(100).toFixed(8)}`;
  }

  return {
    rate: +step3Rate.minus(1).times(100).toFixed(8),
    logs: logInfos,
  };
}
