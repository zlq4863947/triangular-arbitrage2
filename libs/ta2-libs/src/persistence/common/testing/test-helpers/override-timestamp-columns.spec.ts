import { overrideTimestampColumns } from '@dripjs/testing';

describe('overrideTimestampColumns', () => {
  describe('When shallow object', () => {
    it('should override target key', () => {
      expect(
        overrideTimestampColumns({
          timestamp: 1,
        }),
      ).toEqual({
        timestamp: 'overridden',
      });
    });
  });

  describe('When deep object', () => {
    it('should override target key', () => {
      expect(
        overrideTimestampColumns({
          deep: {
            timestamp: 1,
          },
        }),
      ).toEqual({
        deep: {
          timestamp: 'overridden',
        },
      });
    });
  });
});
