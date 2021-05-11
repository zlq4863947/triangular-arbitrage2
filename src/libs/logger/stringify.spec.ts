import { stringify } from './stringify';

describe('stringify', () => {
  it('primitive type', () => {
    expect(stringify(1)).toBe('1');
    expect(stringify(undefined)).toBe(undefined);
    expect(stringify([])).toBe('[]');
    expect(stringify({})).toBe('{}');
    expect(stringify({ a: 1 })).toEqual('{"a":1}');
    const t = new Date('2019-01-22T07:39:41.824Z');
    expect(stringify(t)).toBe('"2019-01-22T07:39:41.824Z"');
  });

  it('circular cases', () => {
    const obj: any = { a: 1 };
    obj.arr = obj;

    expect(() => {
      JSON.stringify(obj);
    }).toThrow();

    expect(stringify(obj)).toEqual('{"a":1,"arr":"~"}');
  });

  it('default dont replace sensitive fileds', () => {
    const sensitiveObj1 = {
      username: 'logger',
      password: '123456',
    };
    expect(stringify(sensitiveObj1)).toEqual('{"username":"logger","password":"123456"}');
  });

  it('sensitive fileds', () => {
    const sensitiveObj1 = {
      username: 'logger',
      password: '123456',
    };
    expect(stringify(sensitiveObj1, true)).toEqual('{"username":"logger","password":"*censored*"}');
  });

  it('sensitive fileds nested', () => {
    const sensitiveObj2 = {
      requestId: '1',
      user: {
        username: 'logger',
        password: '123456',
      },
    };
    expect(stringify(sensitiveObj2, true)).toEqual(`{"requestId":"1","user":{"username":"logger","password":"*censored*"}}`);
  });
});
