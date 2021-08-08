import { getCandlestickDefaultData } from '../../common/testing/data/models';
import { EntityTestBed } from '../../common/testing/entity-test-bed';

describe('candlestick.repository', () => {
  let candlestickReposity: CandlestickRepository;
  const defaultData = getCandlestickDefaultData();
  const exchange = 'bitmex';
  const pair = 'xbtusd';

  beforeAll(async () => {
    await EntityTestBed.setup();
    candlestickReposity = EntityTestBed.getRepository(CandlestickRepository);
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
    await candlestickReposity.insertNewCandlesticks(defaultData);
  });

  describe('insertNewCandlestick', () => {
    it('should insert new candlestick', async () => {
      const newData = {
        ...defaultData[0],
        exchange: 'bitbank',
        time: Date.now() as Timestamp,
      };
      await candlestickReposity.insertNewCandlestick(newData);
      const insertedCandlestick = await candlestickReposity.find({
        exchange: newData.exchange,
      });
      expect(insertedCandlestick.map(getDataFromEntity)).toEqual([newData]);
    });
  });

  describe('insertNewCandlesticks', () => {
    it('should insert new Candlesticks', async () => {
      const insertedCandlesticks = await candlestickReposity.find();
      expect(insertedCandlesticks.map(getDataFromEntity)).toEqual(defaultData);
    });
  });

  describe('getCandlesticks', () => {
    it('should get candlesticks', async () => {
      const res = await candlestickReposity.getCandlesticks(exchange, pair);
      expect([getDataFromEntity(res[0])]).toEqual(defaultData);
    });
  });
});

function getDataFromEntity(entity: CandlestickEntity): CandlestickEntityCreateParams {
  return {
    exchange: entity.exchange,
    symbol: entity.symbol,
    period: entity.period,
    time: entity.time,
    open: fixByDigits(entity.open, 0),
    high: fixByDigits(entity.high, 0),
    low: fixByDigits(entity.low, 0),
    close: fixByDigits(entity.close, 0),
    volume: fixByDigits(entity.volume, 0),
  };
}
