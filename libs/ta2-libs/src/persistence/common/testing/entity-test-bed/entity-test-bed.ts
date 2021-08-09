import * as assert from 'assert';

import { gt, lte } from '@ta2-libs/common/big-number';
import { Config } from '@ta2-libs/config';
import { isFunction, isObject } from 'lodash';
import { Connection, EntityManager, ObjectType, getConnectionManager } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { allEntityTypes } from './constants';

/**
 * `class` of entity.
 */
export type EntityClass = ObjectType<any>;

/**
 * `class` of repository.
 */
export type RepositoryClass = ObjectType<any>;

/**
 * The value to create entity.
 *
 * This is object that have partial members of entity and its value can use function to generate value.
 *
 * ```
 * EntityTestBed.createEntity(Entity, {
 *   // can use static value.
 *   field1: 'value of field 1',
 *   // can use dynamic value.
 *   field2: () => Math.random(),
 * });
 * ```
 */
export type CreateEntityValue<T> = Partial<Record<keyof T, any>>;

/**
 * Fields all entities in database have.
 */
interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * The value to create entity.
 *
 * This is object that have partial members of entity and its value can use function to generate value.
 *
 * ```
 * EntityTestBed.createEntity(Entity, {
 *   // can use static value.
 *   field1: 'value of field 1',
 *   // can use comparer function.
 *   field2: (value) => 1 < value && value < 10,
 * });
 * ```
 */
export type EntityAssertion<T extends BaseEntity> = Partial<Record<keyof T, any>>;

/**
 * Snapshot of database.
 *
 * ```
 * const snapshot = await EntityTestBed.getCoreDatabaseSnapshot();
 * ```
 */
export interface DatabaseSnapshot {
  [entityClassName: string]: BaseEntity[];
}

interface TableAssertion {
  created?: {
    count?: number | ((v: number) => boolean);
    assertion?: EntityAssertion<any>[];
  };
  updated?: {
    count?: number | ((v: number) => boolean);
    assertion?: [EntityAssertion<any>, EntityAssertion<any>][];
  };
  deleted?: {
    count?: number | ((v: number) => boolean);
    assertion?: EntityAssertion<any>[];
  };
}

/**
 * Used in `assertDatabase`
 */
interface DatabaseAssertion {
  [tableName: string]: TableAssertion;
}

/**
 * How to set each test
 *
 * 1. beforeAllでsetup
 * 2. afterAllでcleanup
 * 3. beforeEachでreset
 *
 * ```typescript
 * import { EntityTestBed } from '@dripjs/models/testing';
 *
 * describe('some test', () => {
 *   beforeAll(async () => {
 *     // Configure Database connection.
 *     await EntityTestBed.setup();
 *   });
 *
 *   afterAll(async () => {
 *     // Close Database connection. Internally EntityTestBed.clear is also executed.
 *     await EntityTestBed.cleanup();
 *   });
 *
 *   beforeEach(async () => {
 *     // Delete all records of the table operated by this TestBed
 *     await EntityTestBed.reset();
 *   });
 * });
 * ```
 */
export class EntityTestBed {
  private databaseConnection: Connection | null = null;

  /**
   * setup database connections.
   */
  static async setup(): Promise<void> {
    return getEntityTestBed()._setup();
  }

  /**
   * Close database connections and clean up tables of entity created by this test bed.
   */
  static async cleanup(): Promise<void> {
    return getEntityTestBed()._cleanup();
  }

  /**
   * Clear all entity in database and restore records that created in migrations.
   */
  static async reset(): Promise<void> {
    return getEntityTestBed()._reset();
  }

  /**
   * Delete all records in database.
   */
  static async clear(): Promise<void> {
    return getEntityTestBed()._clear();
  }

  /**
   * Restore all records in database from snapshot.
   */
  static async restoreFromSnapshot(snapshot: DatabaseSnapshot): Promise<void> {
    return getEntityTestBed()._restoreFromSnapshot(snapshot);
  }

  /**
   * Get manager of either in database.
   *
   */
  static getManager(): EntityManager {
    return getEntityTestBed()._getManager();
  }

  /**
   * Get custom repository of either core or public database.
   *
   * @param repository
   */
  static getRepository<T>(repository: ObjectType<T>): T {
    return getEntityTestBed()._getRepository(repository);
  }

  /**
   * Create an Entity and save it in Database.
   *
   * @param entity
   * @param value
   *
   * How to use
   *
   * ```typescript
   * import { EntityTestBed } from '@dripjs/testing';

   * it('some test', async () => {
   *   // Create with specified value
   *   const entity = await EntityTestBed.createEntity(Entity, {
   *     property1: 'value 1',
   *     property2: 'value 2',
   *   });
   *
   *   // Dynamic value setting with function
   *   const entity = await EntityTestBed.createEntity(Entity, {
   *     property1: () => Math.random(),
   *     property2: 'value 2',
   *   });
   *
   *   // It is also possible to create multiple records
   *   const entities = await EntityTestBed.createEntity(Entity, [
   *     {
   *       property1: 'value 1',
   *       property2: 'value 2',
   *     },
   *     {
   *       property1: 'value 3',
   *       property2: 'value 4',
   *     },
   *   ]);
   * });
   * ```
   */
  static async createEntity<T>(entity: ObjectType<T> | string, value: CreateEntityValue<T>): Promise<T>;
  static async createEntity<T>(entity: ObjectType<T> | string, value: CreateEntityValue<T>[]): Promise<T[]>;
  static async createEntity<T>(entity: ObjectType<T> | string, value: any): Promise<any> {
    return getEntityTestBed()._createEntity(entity, value);
  }

  /**
   * Assert Entity with specified expectation notation.
   *
   * @param entity
   * @param expectation
   *
   * ```typescript
   * import { EntityTestBed } from '@dripjs/testing';
   *
   * it('some test', async () => {
   *   const entity = await EntityTestBed.createEntity(Entity, {
   *     property1: 'value 1',
   *     property2: 'value 2',
   *   });
   *
   *   // Assert with the specified value
   *   EntityTestBed.assertEntity(entity, {
   *     property1: 'value 1',
   *     property2: 'value 2',
   *   });
   *
   *   // Use the comparer function to assert
   *   EntityTestBed.assertEntity(entity, {
   *     property1: (value) => typeof value === 'string',
   *     property2: 'value 2',
   *   });
   *
   *   // It is also possible to assert multiple records
   *   EntityTestBed.assertEntity(
   *     [entityA, entityB],
   *     [
   *       {
   *         property1: 'value 1',
   *         property2: 'value 2',
   *       },
   *       {
   *         property1: 'value 3',
   *         property2: 'value 4',
   *       },
   *     ],
   *   );
   * });
   * ```
   */
  static assertEntity<T extends BaseEntity>(entity: T, expectation: EntityAssertion<T>): void {
    return assertEntity(entity, expectation);
  }

  /**
   * Assert the change amount of the database under specified conditions
   *
   * @param previous
   * @param difference
   *
   * eg: Assertion of newly added record in User table (when record with id 1 is added)
   *
   * ```typescript
   * EntityTestBed.assertDatabase(previous, {
   *   UserTable: {
   *     created: [
   *       { id: 1 }
   *     ]
   *   }
   * })
   * ```
   *
   * eg: At assertion of update record in user table (when name of record with id = 1 is updated)
   *
   * ```typescript
   * EntityTestBed.assertDatabase(previous, {
   *   UserTable: {
   *     updated: [
   *       [{ id: 1 }, { name: 'new name' }]
   *     ]
   *   }
   * })
   * ```
   *
   * eg: When deletion records are asserted (when records with id 1 are deleted) in the User table
   *
   * ```typescript
   * EntityTestBed.assertDatabase(previous, {
   *   UserTable: {
   *     deleted: [
   *       { id: 1 }
   *     ]
   *   }
   * })
   * ```
   */
  static async assertDatabase(previous: DatabaseSnapshot, difference: DatabaseAssertion): Promise<void> {
    return assertDatabase(previous, difference);
  }

  /**
   * Get all entities in database.
   */
  static async getDatabaseSnapshot(): Promise<DatabaseSnapshot> {
    return getEntityTestBed()._getDatabaseSnapshot();
  }

  /**
   * Setup database connections.
   */
  async _setup(): Promise<void> {
    const connectionManager = getConnectionManager();
    this.databaseConnection =
      connectionManager.connections.length > 0
        ? connectionManager.connections[0]
        : connectionManager.create({
            ...Config.connectionOptions,
            entities: allEntityTypes,
          } as MysqlConnectionOptions);

    await this._reset();
  }

  /**
   * Close database connections and clean up entities created by this test bed.
   */
  async _cleanup(): Promise<void> {
    if (this.databaseConnection === null) {
      throw new Error('connection is not created yet, use setup method before');
    }

    // Reset records in databases.
    await this._reset();

    try {
      await this.databaseConnection.close();
    } catch (e) {
      console.error('[EntityTestBed] Error occurred when closing core database connection.', e);
      throw e;
    }
  }

  /**
   * Delete all records in database.
   */
  async _clear(): Promise<void> {
    if (this.databaseConnection === null) {
      throw new Error('connection is not created yet, use setup method before');
    }

    try {
      await Promise.all(allEntityTypes.map(async (entity) => this._getManager().getRepository(entity).clear()));
    } catch (e) {
      console.error('[EntityTestBed] Error occurred when repository clear.', e);
      throw e;
    }
  }

  /**
   * Create entities with provided values and store it into database.
   *
   * @param entity
   * @param value
   */
  async _createEntity<T>(entity: ObjectType<T> | string, value: CreateEntityValue<T>): Promise<T>;
  async _createEntity<T>(entity: ObjectType<T> | string, value: CreateEntityValue<T>[]): Promise<T[]>;
  async _createEntity<T>(entity: ObjectType<T> | string, value: any): Promise<any> {
    const useArray = Array.isArray(value);
    const values: Partial<T>[] = Array.isArray(value) ? [...value] : [value];
    const activatedValues: Partial<T>[] = [];

    for (const v of values) {
      const activated: Partial<T> = {};
      for (const member of Object.entries(v)) {
        // if value is function, use its executed result.
        (<any>activated)[member[0]] = typeof member[1] === 'function' ? member[1]() : member[1];
      }
      activatedValues.push(activated);
    }

    const manager = this._getManager();
    const repository = manager.getRepository(entity);

    const created = await repository.save(activatedValues as any);

    return useArray ? created : created[0];
  }

  /**
   * Get entity manager of database.
   */
  _getManager(): EntityManager {
    const connection = this.getDatabaseConnection();

    return connection.manager;
  }

  /**
   * Get all entities in core database.
   *
   * @private
   *
   * ```
   * result = {
   *   SourceEventEntity: [
   *     { id: '1', userUuid: '...' },
   *     { id: '2', userUuid: '...' },
   *   ],
   *   UserAssetEntity: [
   *     { id: '1', uuid: '...' },
   *     { id: '2', uuid: '...' },
   *   ],
   * };
   * ```
   */
  async _getDatabaseSnapshot(): Promise<DatabaseSnapshot> {
    const resultAsArray: BaseEntity[][] = await Promise.all(allEntityTypes.map(async (e) => this._getManager().find(e)));

    const resultAsObject: DatabaseSnapshot = {};
    resultAsArray.forEach((entities, i) => (resultAsObject[allEntityTypes[i].name] = entities));

    return resultAsObject;
  }

  /**
   * Restore all records in database from snapshot.
   */
  async _restoreFromSnapshot(snapshot: DatabaseSnapshot): Promise<void> {
    await this._clear();

    const entries: [EntityClass, BaseEntity[]][] = Object.entries<BaseEntity[]>(snapshot)
      .filter(([_, records]) => 0 < records.length)
      .map(([name, records]) => [getEntityClassByName(name), records] as [EntityClass, BaseEntity[]]);
    const createEntities = entries
      .filter(([className]) => allEntityTypes.includes(className))
      .map(async ([className, records]) => this._createEntity(className, records));

    await Promise.all(createEntities);
  }

  private _getRepository<T>(repository: ObjectType<T>): T {
    return this._getManager().getCustomRepository(repository);
  }

  /**
   * Clear all entity in database and restore records that created in migrations.
   *
   * @private
   */
  private async _reset(): Promise<void> {
    if (this.databaseConnection === null) {
      throw new Error('connection is not created yet, use setup method before');
    }

    /**
     * TypeORM can be frozen by using same connection for a long time so we manually handle reconnect.
     */
    if (this.databaseConnection.isConnected) {
      await this.databaseConnection.close();
    }
    await this.databaseConnection.connect();

    await this._clear();
    await this.restoreMigrationRecords();
  }

  /**
   * Restore initial records that should be created with migrations.
   */
  private async restoreMigrationRecords(): Promise<void> {
    if (this.databaseConnection === null) {
      throw new Error('connection is not created yet, use setup method before');
    }

    const manager = this.databaseConnection.createQueryRunner();
    for (const migration of this.databaseConnection.migrations) {
      if ((<any>migration)['shouldRunOnResetInTest']) {
        await migration.up(manager);
      }
    }
  }

  /**
   * Get connection to core database.
   */
  private getDatabaseConnection(): Connection {
    if (this.databaseConnection === null) {
      throw new Error('connection is not created yet, use setup method before');
    }

    return this.databaseConnection;
  }
}

function getEntityClassByName(name: string): EntityClass {
  for (const e of allEntityTypes) {
    if (name === e.name) {
      return e;
    }
  }

  throw new Error('Unregistered name passed.');
}

class AssertionError extends Error {}

/**
 * Internal function for EntityTestBed.
 *
 * @internal
 * @param entity
 * @param assertion
 * @param parentKey
 * @private
 */
function assertEntity<T extends BaseEntity>(entity: T, assertion: EntityAssertion<T>, parentKey = ''): void {
  for (const [key, assertionValue] of Object.entries(assertion)) {
    const actualValue = (<any>entity)[key];

    try {
      // error can be thrown here.
      if (isFunction(assertionValue)) {
        assert.strictEqual(assertionValue(actualValue), true);
      } else if (isObject(assertionValue)) {
        assertEntity(actualValue, assertionValue, `${parentKey + key}.`);
      } else {
        assert.strictEqual(assertionValue, actualValue);
      }
    } catch (e) {
      // throw the most bottom error in recursion.
      if (e instanceof AssertionError) {
        throw e;
      }

      // add more readability.
      let toLog = '';
      if (typeof assertionValue === 'function') {
        toLog = assertionValue.toString();
      } else if (isObject(assertionValue)) {
        toLog = JSON.stringify(assertionValue);
      } else {
        toLog = `${assertionValue}`;
      }

      throw new AssertionError(`"${parentKey + key}" is incompatible. expected: ${toLog}, actual: ${actualValue}`);
    }
  }
}

// tslint:disable cyclomatic-complexity
/**
 * @internal
 * @param previous
 * @param databaseAssertion
 */
async function assertDatabase(previous: DatabaseSnapshot, databaseAssertion: DatabaseAssertion): Promise<void> {
  for (const data of Object.entries<TableAssertion>(databaseAssertion)) {
    const tableName = data[0];
    const tableAssertion = data[1];

    const previousEntities = previous[tableName];
    if (!Array.isArray(previousEntities)) {
      throw new Error(`provided snapshot does not have records for expectation, ${tableName}`);
    }
    const currentEntities = await EntityTestBed.getManager().find<BaseEntity>(tableName);
    const latestUpdatedTime = getLatestUpdatedTime(previousEntities);

    /**
     * Assert created expressions
     */
    if (tableAssertion.created) {
      const newlyCreatedEntities = currentEntities.filter((record) => gt(record.createdAt, latestUpdatedTime));
      const createAssertions = tableAssertion.created.assertion || [];

      if (typeof tableAssertion.created.count === 'number' || typeof tableAssertion.created.count === 'function') {
        const valid =
          typeof tableAssertion.created.count === 'function'
            ? tableAssertion.created.count(newlyCreatedEntities.length)
            : tableAssertion.created.count === newlyCreatedEntities.length;

        if (!valid) {
          throw new Error(
            `count does not match.\n\n  expected: ${tableAssertion.created.count},\n  actual: ${newlyCreatedEntities.length}`,
          );
        }
      }

      for (const assertion of createAssertions) {
        const errorMessages = getFailedAssertionMessages(newlyCreatedEntities, assertion);
        const allAssertionFailed = errorMessages.length === newlyCreatedEntities.length;
        if (allAssertionFailed) {
          throw new Error(
            `Any record does not match to assertion.\n  assertion: ${JSON.stringify(assertion)},\n  created: ${JSON.stringify(
              newlyCreatedEntities,
            )}, \n\n    -- ${errorMessages.join(',\n    -- ')}`,
          );
        }
      }
    }

    /**
     * Assert updated expressions
     */
    if (tableAssertion.updated) {
      const newlyUpdatedEntities = currentEntities.filter((e) => gt(e.updatedAt, latestUpdatedTime) && lte(e.createdAt, latestUpdatedTime));
      const updateAssertions = tableAssertion.updated.assertion || [];

      if (typeof tableAssertion.updated.count === 'number' || typeof tableAssertion.updated.count === 'function') {
        const valid =
          typeof tableAssertion.updated.count === 'function'
            ? tableAssertion.updated.count(newlyUpdatedEntities.length)
            : tableAssertion.updated.count === newlyUpdatedEntities.length;

        if (!valid) {
          throw new Error(
            `updated record count does not match.\n\n  expected: ${tableAssertion.updated.count},\n  actual: ${newlyUpdatedEntities.length}`,
          );
        }
      }

      for (const [findOption, assertion] of updateAssertions) {
        const target = previousEntities.find((e) => canSatisfy(e, findOption));
        if (target === undefined) {
          throw new Error(`no record found for previous. \n  findOption: ${JSON.stringify(findOption)}`);
        }
        const targetId = target.id;
        const updated = newlyUpdatedEntities.find((e) => e.id === targetId);
        if (updated === undefined) {
          throw new Error(`no record found for updated. \n  id: ${targetId}`);
        }

        try {
          assertEntity(updated, assertion);
        } catch (e) {
          throw new Error(`assertion does not match. \n  id: ${targetId}, \n  error: ${e.message}`);
        }
      }
    }

    /**
     * Deleted record assertion rule.
     *
     * 1. all expectations should match to anyone in previous records.
     * 2. all expectations should not match to anyone in current records.
     */
    if (tableAssertion.deleted) {
      const newlyDeletedEntities = previousEntities.filter((e1) => !currentEntities.some((e2) => e1.id === e2.id));
      const deleteAssertions = tableAssertion.deleted.assertion || [];

      if (typeof tableAssertion.deleted.count === 'number' || typeof tableAssertion.deleted.count === 'function') {
        const valid =
          typeof tableAssertion.deleted.count === 'function'
            ? tableAssertion.deleted.count(newlyDeletedEntities.length)
            : tableAssertion.deleted.count === newlyDeletedEntities.length;

        if (!valid) {
          throw new Error(
            `deleted record count does not match (for delete assertion).\n\n  expected: ${tableAssertion.deleted.count},\n  actual: ${newlyDeletedEntities.length}`,
          );
        }
      }

      for (const assertion of deleteAssertions) {
        const errorMessages = getFailedAssertionMessages(newlyDeletedEntities, assertion);
        const allAssertionFailed = errorMessages.length === newlyDeletedEntities.length;
        if (allAssertionFailed) {
          throw new Error(
            `provided assertion does not match to any. \n\n  assertion: ${JSON.stringify(assertion)}, \n  deleted: ${JSON.stringify(
              newlyDeletedEntities,
            )}, \n\n    -- ${errorMessages.join(',\n    -- ')}`,
          );
        }
      }
    }
  }
}

/**
 * @internal
 * @param entities
 * @param assertion
 */
function getFailedAssertionMessages<T extends BaseEntity>(entities: T[], assertion: EntityAssertion<T>): string[] {
  const errors: string[] = [];
  for (const entity of entities) {
    try {
      assertEntity(entity, assertion);
    } catch (e) {
      errors.push(`id "${entity.id}": ${e.message}`);
    }
  }

  return errors;
}

/**
 * @private
 * @internal
 */
function canSatisfy(entity: BaseEntity, assertion: EntityAssertion<any>): boolean {
  let result = false;

  try {
    assertEntity(entity, assertion);
    result = true;
  } catch {}

  return result;
}

// to management singleton
let testBed: EntityTestBed | null = null;
function getEntityTestBed(): EntityTestBed {
  return testBed ? testBed : (testBed = new EntityTestBed());
}

/**
 * @internal used in EntityTestBed
 * @param entities
 */
export function getLatestUpdatedTime(entities: BaseEntity[]): number {
  // min value as timestamp.
  let max = 0;

  for (const e of entities) {
    max = Math.max(max, e.createdAt);
    max = Math.max(max, e.updatedAt);
  }

  return max;
}
