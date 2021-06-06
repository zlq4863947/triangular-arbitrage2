import { Edge, TriangleRate, TriangleRateLogs } from '../../../../app/models';
import { divide, floor, floorToString, getBigNumber, multiple, subtract } from '../big-number';

/**
 * 通过三边信息，获取合成交叉汇率
 * @param a
 * @param b
 * @param c
 */
export function getTriangleRate(a: Edge, b: Edge, c: Edge): TriangleRate {
  // 利率 = (1/priceA/priceB*priceC-1)-1
  const capital = getBigNumber(1);
  let step1Rate = getBigNumber(1);
  const logInfos = {} as TriangleRateLogs;
  let unitAsset = a.fromAsset;
  if (a.side === 'buy') {
    unitAsset = a.toAsset;
    step1Rate = divide(capital, a.price);
    logInfos.aRate = `a rate = 1 / ${a.price} = ${floor(step1Rate, 8).toNumber()} ${unitAsset}`;
  } else {
    logInfos.aRate = '';
  }
  const fixedStep1Rate = floor(step1Rate, 8);

  let step2Rate = multiple(step1Rate, b.price);
  let operator = 'x';
  unitAsset = b.fromAsset;
  if (b.side === 'buy') {
    unitAsset = b.toAsset;
    step2Rate = divide(step1Rate, b.price);
    operator = '/';
  }

  const fixedStep2Rate = floor(step2Rate, 8);
  logInfos.bRate = `b rate = ${fixedStep1Rate} ${operator} ${b.price} = ${fixedStep2Rate.toNumber()} ${unitAsset}`;

  let step3Rate = multiple(step2Rate, c.price);
  operator = 'x';
  if (c.side === 'buy') {
    step3Rate = divide(step2Rate, c.price);
    operator = '/';
  }
  const fixedStep3Rate = floor(multiple(subtract(step3Rate, 1), 100), 8);
  logInfos.cRate = `c rate = (${fixedStep2Rate} ${operator} ${c.price} -1) x 100 = ${fixedStep3Rate.toNumber()}%`;

  return {
    rate: floorToString(fixedStep3Rate, 8),
    logs: logInfos,
  };
}
