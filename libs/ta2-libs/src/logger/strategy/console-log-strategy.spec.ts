import { LogLevels } from '../common';
import { ConsoleLogStrategy } from './console-log-strategy';

describe('ConsoleLogStrategy', () => {
  describe('logLevel = debug', () => {
    it('should call console.debug() [no color]', () => {
      jest.spyOn(console, 'debug');
      const strategy = new ConsoleLogStrategy(false);

      strategy.log(LogLevels.Debug, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.debug).toHaveBeenCalledWith(`[test]`, `foobar`, 1);
    });

    it('should call console.debug() [color]', () => {
      jest.spyOn(console, 'debug');
      const strategy = new ConsoleLogStrategy(true);

      strategy.log(LogLevels.Debug, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.debug).toHaveBeenCalledWith(`%c debug:`, `background: #263238; color: #ffffff`, `[test]`, `foobar`, 1);
    });
  });

  describe('logLevel = log', () => {
    it('should call console.log() [no color]', () => {
      jest.spyOn(console, 'log');
      const strategy = new ConsoleLogStrategy(false);

      strategy.log(LogLevels.Log, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(`[test]`, `foobar`, 1);
    });

    it('should call console.log() [color]', () => {
      jest.spyOn(console, 'log');
      const strategy = new ConsoleLogStrategy(true);

      strategy.log(LogLevels.Log, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith('%c   log:', 'background: #33691E; color: #ffffff', `[test]`, `foobar`, 1);
    });
  });

  describe('logLevel = info', () => {
    it('should call console.info() [no color]', () => {
      jest.spyOn(console, 'info');
      const strategy = new ConsoleLogStrategy(false);

      strategy.log(LogLevels.Info, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.info).toHaveBeenCalledWith(`[test]`, `foobar`, 1);
    });

    it('should call console.info() [color]', () => {
      jest.spyOn(console, 'info');
      const strategy = new ConsoleLogStrategy(true);

      strategy.log(LogLevels.Info, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.info).toHaveBeenCalledWith('%c  info:', 'background: #01579B; color: #ffffff', `[test]`, `foobar`, 1);
    });
  });

  describe('logLevel = warn', () => {
    it('should call console.warn() [no color]', () => {
      jest.spyOn(console, 'warn');
      const strategy = new ConsoleLogStrategy(false);

      strategy.log(LogLevels.Warn, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith(`[test]`, `foobar`, 1);
    });

    it('should call console.warn() [color]', () => {
      jest.spyOn(console, 'warn');
      const strategy = new ConsoleLogStrategy(true);

      strategy.log(LogLevels.Warn, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.warn).toHaveBeenCalledWith('%c  warn:', 'background: #BF360C; color: #ffffff', `[test]`, `foobar`, 1);
    });
  });

  describe('logLevel = error', () => {
    it('should call console.error() [no color]', () => {
      jest.spyOn(console, 'error');
      const strategy = new ConsoleLogStrategy(false);

      strategy.log(LogLevels.Error, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(`[test]`, `foobar`, 1);
    });

    it('should call console.error() [color]', () => {
      jest.spyOn(console, 'error');
      const strategy = new ConsoleLogStrategy(true);

      strategy.log(LogLevels.Error, 'test', 'foobar', 1);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith('%c error:', 'background: #B71C1C; color: #ffffff', `[test]`, `foobar`, 1);
    });
  });
});
