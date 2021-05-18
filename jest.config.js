module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1',
    '^@arbitrage-libs/(.*)': '<rootDir>/src/libs/$1',
  },
  testMatch: ['<rootDir>/src/(app|libs)/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json', 'lcov'],
  verbose: true,
  forceExit: true,
  testEnvironment: 'node',
};
