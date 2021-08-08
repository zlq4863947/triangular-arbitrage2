import { TradeTriangleRepository } from '@ta2-libs/persistence';
import { QueryFailedError } from 'typeorm';

import { DatabaseSnapshot, EntityTestBed, getLatestUpdatedTime } from './entity-test-bed';
import { overrideTimestampColumns } from './test-helpers';
import { TradeStatus } from '@ta2-libs/models';

const createBase = {
  id: 'BUSD-ETH-UFT_1626796988971',
  edge1Id: 'BUSD-ETH_1626796988971',
  edge2Id: 'ETH-UFT_1626796988971',
  edge3Id: 'BUSD-ETH_1626796988971',
  rate: '0.54189005',
  status: TradeStatus.Todo,
};

const expectedBase = {
  ...createBase,
  createdAt: 'overridden',
  updatedAt: 'overridden',
};

describe('EntityTestBed', () => {
  beforeAll(async () => {
    await EntityTestBed.setup();
  });

  afterAll(async () => {
    await EntityTestBed.cleanup();
  });

  beforeEach(async () => {
    await EntityTestBed.reset();
  });

  describe('getManager', () => {
    it('should get manager of core and public database', async () => {
      const manager = EntityTestBed.getManager();
      expect(manager).toBeTruthy();
    });
  });

  describe('getRepository', () => {
    it('should get custom repository of database', async () => {
      const repository = EntityTestBed.getRepository(TradeTriangleRepository);
      expect(repository instanceof TradeTriangleRepository).toBe(true);
    });
  });

  describe('createEntity', () => {
    describe('When one argument (use class)', () => {
      it('should create single instance', async () => {
        const created = await EntityTestBed.createEntity(TradeTriangleRepository, {
          ...createBase,
        });
        expect(overrideTimestampColumns(created)).toEqual({
          ...expectedBase,
        });
      });
    });

    describe('When multiple arguments', () => {
      it('should create multiple instances', async () => {
        const created = await EntityTestBed.createEntity(TradeTriangleRepository, [
          {
            ...createBase,
          },
          {
            ...createBase,
            name: 'xrp_usd',
            baseAsset: 'xrp',
            quoteAsset: 'usd',
          },
        ]);

        expect(overrideTimestampColumns(created)).toEqual([
          {
            id: '1',
            ...expectedBase,
          },
          {
            ...expectedBase,
            id: '2',
            name: 'xrp_usd',
            baseAsset: 'xrp',
          },
        ]);
      });

      describe('When lacking params', () => {
        it('should throw error', async () => {
          try {
            await expect(
              EntityTestBed.createEntity(TradeTriangleRepository, {
                ...createBase,
                // name is lacking
                name: undefined,
              }),
            ).rejects.toEqual(new QueryFailedError('', [], `ER_NO_DEFAULT_FOR_FIELD: Field 'name' doesn't have a default value`));
          } catch (e) {}
        });
      });

      describe('When argument has function', () => {
        it('should create single instance with function executed result', async () => {
          const created = await EntityTestBed.createEntity(TradeTriangleRepository, {
            ...createBase,
            name: () => 'function',
          });

          expect(overrideTimestampColumns(created)).toEqual({
            ...expectedBase,
            id: '1',
            name: 'function',
          });
        });
      });
    });
  });

  describe('assertEntity', () => {
    it('should not throw error', async () => {
      const created = await EntityTestBed.createEntity(TradeTriangleRepository, {
        ...createBase,
      });
      const expectation = {
        ...expectedBase,
        id: '1',
        createdAt: (value: any) => Number.isSafeInteger(value),
        updatedAt: (value: any) => Number.isSafeInteger(value),
      };

      expect(() => EntityTestBed.assertEntity(created, expectation)).not.toThrow();
    });

    it('should throw error2', async () => {
      const created = await EntityTestBed.createEntity(TradeTriangleRepository, {
        ...createBase,
        name: 'bad name',
      });
      const expectation = {
        id: '2',
      };

      expect(() => EntityTestBed.assertEntity(created, expectation)).toThrow();
    });
  });

  describe('assertDatabase', () => {
    // EntityTestBed.assertDatabase() returns <Promise<undefined>>
    const valueWhenAssertIsOK = undefined;
    let e1: TradeTriangleRepository;
    let e2: TradeTriangleRepository;
    let snapshot: DatabaseSnapshot;

    beforeEach(async () => {
      await EntityTestBed.clear();
      [e1, e2] = await EntityTestBed.createEntity(TradeTriangleRepository, [
        {
          ...createBase,
        },
        {
          ...createBase,
          name: 'xrp_usd',
          baseAsset: 'xrp',
        },
      ]);
      snapshot = await EntityTestBed.getDatabaseSnapshot();
    });

    describe('When create assertion', () => {
      beforeEach(async () => {
        await EntityTestBed.createEntity(TradeTriangleRepository, [
          {
            ...createBase,
            name: 'ltc_usd',
            baseAsset: 'ltc',
          },
          {
            ...createBase,
            name: 'eth_usd',
            baseAsset: 'et',
          },
        ]);
      });

      describe('When count is used', () => {
        describe('And when count matches', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  created: {
                    count: 2,
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  created: {
                    count: (n) => 2 <= n,
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('And when count mismatches', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  created: {
                    count: 1,
                  },
                },
              }),
            ).rejects.toBeTruthy();
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  created: {
                    count: (n) => 3 <= n,
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });

      describe('When all expectations satisfy condition', () => {
        it('should not throw error', async () => {
          await expect(
            EntityTestBed.assertDatabase(snapshot, {
              [TradeTriangleRepository.name]: {
                created: {
                  assertion: [
                    { id: (v: any) => Number.isInteger(+v), name: 'ltc_usd' },
                    { id: (v: any) => Number.isInteger(+v), name: 'eth_usd' },
                  ],
                },
              },
            }),
          ).resolves.toBe(valueWhenAssertIsOK);
        });
      });

      describe('When any expectations does not satisfy condition', () => {
        it('should throw error', async () => {
          await expect(
            EntityTestBed.assertDatabase(snapshot, {
              [TradeTriangleRepository.name]: {
                created: {
                  assertion: [{ name: 'ltc_usd' }, { name: 'bad name' }],
                },
              },
            }),
          ).rejects.toBeTruthy();
        });
      });

      describe('When update assertion', () => {
        beforeEach(async () => {
          (<any>e1).name = 'updated name 1';
          (<any>e2).name = 'updated name 2';
          await EntityTestBed.getManager().save(TradeTriangleRepository, [e1, e2]);
        });

        describe('When count is used', () => {
          describe('And when count matches', () => {
            it('should not throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    updated: {
                      count: 2,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    updated: {
                      count: (n) => 2 <= n,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
            });
          });

          describe('And when count mismatches', () => {
            it('should throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    updated: {
                      count: 1,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    updated: {
                      count: (n) => 3 <= n,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
            });
          });
        });

        describe('When all expectations satisfy condition', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  updated: {
                    assertion: [
                      [
                        { id: '1', name: 'btc_usd' },
                        { id: '1', name: 'updated name 1' },
                      ],
                      [
                        { id: '2', name: 'xrp_usd' },
                        { id: '2', name: 'updated name 2' },
                      ],
                    ],
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('When any expectation does not satisfy condition', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  updated: {
                    assertion: [
                      [
                        { id: '1', name: 'btc_usd' },
                        { id: '1', name: 'updated name 1' },
                      ],
                      [
                        { id: '2', name: 'xrp_usd' },
                        { id: '2', name: 'bad name' },
                      ],
                    ],
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });

      describe('When delete assertion', () => {
        beforeEach(async () => {
          await EntityTestBed.getManager().remove(TradeTriangleRepository, [{ id: '1' }, { id: '2' }]);
        });

        describe('When count is used', () => {
          describe('And when count matches', () => {
            it('should not throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    deleted: {
                      count: 2,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    deleted: {
                      count: (n) => 2 <= n,
                    },
                  },
                }),
              ).resolves.toBe(valueWhenAssertIsOK);
            });
          });

          describe('And when count mismatches', () => {
            it('should throw error', async () => {
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    deleted: {
                      count: 3,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
              await expect(
                EntityTestBed.assertDatabase(snapshot, {
                  [TradeTriangleRepository.name]: {
                    deleted: {
                      count: (n) => 3 <= n,
                    },
                  },
                }),
              ).rejects.toBeTruthy();
            });
          });
        });

        describe('When all expectations satisfy condition', () => {
          it('should not throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  deleted: {
                    assertion: [
                      { id: '1', name: 'btc_usd' },
                      { id: '2', name: 'xrp_usd' },
                    ],
                  },
                },
              }),
            ).resolves.toBe(valueWhenAssertIsOK);
          });
        });

        describe('When any expectations does not satisfy condition', () => {
          it('should throw error', async () => {
            await expect(
              EntityTestBed.assertDatabase(snapshot, {
                [TradeTriangleRepository.name]: {
                  deleted: {
                    assertion: [{ id: '1', name: 'name 1', uuid: 'uuid 1' }, { id: 'bad id' }],
                  },
                },
              }),
            ).rejects.toBeTruthy();
          });
        });
      });
    });
  });
});

describe('getLatestUpdatedTime', () => {
  describe('When no records', () => {
    it('should return 0', () => {
      expect(getLatestUpdatedTime([])).toBe(0);
    });
  });

  describe('When max is value of createdAt', () => {
    it('should get max value', () => {
      expect(
        getLatestUpdatedTime([
          { id: '1', createdAt: 1, updatedAt: 1 },
          { id: '2', createdAt: 2, updatedAt: 1 },
          { id: '3', createdAt: 3, updatedAt: 1 },
        ]),
      ).toBe(3);
    });
  });

  describe('When max is value of updatedAt', () => {
    it('should get max value', () => {
      expect(
        getLatestUpdatedTime([
          { id: '1', createdAt: 1, updatedAt: 3 },
          { id: '2', createdAt: 1, updatedAt: 2 },
          { id: '3', createdAt: 1, updatedAt: 1 },
        ]),
      ).toBe(3);
    });
  });
});
