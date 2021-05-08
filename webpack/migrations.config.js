const glob = require('glob');
const path = require('path');
// TypeScript编译选项
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// Minimization option
const TerserPlugin = require('terser-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

console.log(`-- Webpack <${NODE_ENV}> build for migrations scripts --`);

module.exports = {
  target: 'node',
  mode: NODE_ENV,
  // Dynamically generate a `{ [name]: sourceFileName }` map for the `entry` option
  // change `src/db/migrations` to the relative path to your migration folder
  entry: glob.sync(path.resolve('src/migration/*.ts')).reduce((entries, filename) => {
    const migrationName = path.basename(filename, '.ts');
    return Object.assign({}, entries, {
      [migrationName]: filename,
    });
  }, {}),
  resolve: {
    // assuming all your migration files are written in TypeScript
    extensions: ['.ts'],
    // Use the same configuration as NestJS
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.build.json' })],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  output: {
    // Remember that this file is in a subdirectory, so the output should be in the dist/
    // directory of the project root
    path: __dirname + '/../dist/migration',
    // this is important - we want UMD (Universal Module Definition) for migration files.
    libraryTarget: 'umd',
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      // Migrations rely on class and function names, so keep them.
      new TerserPlugin({
        terserOptions: {
          mangle: true, // Note `mangle.properties` is `false` by default.
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
之后;
