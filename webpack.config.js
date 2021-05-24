// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { NODE_ENV = 'production' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build --`);

module.exports = {
  entry: './src/main.ts',
  mode: NODE_ENV,
  target: 'node',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      parallel: true,
      uglifyOptions: {
        mangle: true,
      },
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.IgnorePlugin({
      /**
       * There is a small problem with Nest's idea of lazy require() calls,
       * Webpack tries to load these lazy imports that you may not be using,
       * so we must explicitly handle the issue.
       * Refer to: https://github.com/nestjs/nest/issues/1706
       */
      checkResource(resource) {
        const lazyImports = ['@nestjs/microservices', '@nestjs/platform-express', 'cache-manager', 'class-validator', 'class-transformer'];
        if (!lazyImports.includes(resource)) {
          return false;
        }
        try {
          require.resolve(resource);
        } catch (err) {
          return true;
        }
        return false;
      },
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  stats: {
    // This is optional, but it hides noisey warnings
    warningsFilter: [
      'node_modules/express/lib/view.js',
      'node_modules/@nestjs/common/utils/load-package.util.js',
      'node_modules/@nestjs/core/helpers/load-adapter.js',
      'node_modules/optional/optional.js',
      (warning) => false,
    ],
  },
};
