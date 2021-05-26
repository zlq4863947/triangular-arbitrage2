const path = require('path');
const webpack = require('webpack');

const { NODE_ENV = 'production' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build for Gulp scripts --`);

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  entry: './dist/main.js',
  optimization: {
    minimize: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  output: {
    // Remember that this file is in a subdirectory, so the output should be in the dist/
    // directory of the project root
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.IgnorePlugin({
      /**
       * There is a small problem with Nest's idea of lazy require() calls,
       * Webpack tries to load these lazy imports that you may not be using,
       * so we must explicitly handle the issue.
       * Refer to: https://github.com/nestjs/nest/issues/1706
       */
      checkResource(resource) {
        const lazyImports = [
          '@nestjs/websockets/socket-modules',
          '@nestjs/microservices/microservices-module',
          '@nestjs/microservices',
          '@nestjs/platform-express',
          'cache-manager',
          'class-validator',
          'class-transformer',
        ];
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
  stats: {
    // This is optional, but it hides noisey warnings
    warningsFilter: [
      'node_modules/@nestjs/common/utils/load-package.util.js',
      'node_modules/@nestjs/core/helpers/load-adapter.js',
      'node_modules/@nestjs/core/helpers/optional-require.js',
      'node_modules/express/lib/view.js',
      (warning) => false,
    ],
  },
  externals: [
    {
      '@nestjs/websockets/socket-module': 'commonjs2 @nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module': 'commonjs2 @nestjs/microservices/microservices-module',
      /* binance: 'commonjs2 binance',*/
      log4js: 'commonjs2 log4js',
      config: 'commonjs2 config',
      toml: 'commonjs2 toml',
    },
  ],
};
