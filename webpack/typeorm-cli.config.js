const path = require('path');
// TypeScript compilation option
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// Don't try to replace require calls to dynamic files
const IgnoreDynamicRequire = require('webpack-ignore-dynamic-require');

const { NODE_ENV = 'production' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build for TypeORM CLI --`);

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  entry: './node_modules/typeorm/cli.js',
  output: {
    // Remember that this file is in a subdirectory, so the output should be in the dist/
    // directory of the project root
    path: path.resolve(__dirname, '../dist'),
    filename: 'migration.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // Use the same configuration as NestJS
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      // Skip the shebang of typeorm/cli.js
      { test: /\.[tj]s$/i, loader: 'shebang-loader' },
    ],
  },
  externals: [
    {
      // I'll skip pg-native in the production deployement, and use the pure JS implementation
      'pg-native': 'commonjs2 pg-native',
    },
  ],
  plugins: [
    // Let NodeJS handle are requires that can't be resolved at build time
    new IgnoreDynamicRequire(),
  ],
};
