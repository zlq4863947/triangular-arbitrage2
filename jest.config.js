module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^apps/(.*)$': '<rootDir>/apps/$1',
    '^@ta2-libs/(.*)': '<rootDir>/libs/ta2-libs/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  testMatch: ['<rootDir>/(apps|libs)/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json', 'lcov'],
  verbose: true,
  forceExit: true,
  testEnvironment: 'node',
};
