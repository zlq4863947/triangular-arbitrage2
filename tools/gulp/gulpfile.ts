import * as fs from 'fs';
import * as gulp from 'gulp';
import { getDeployPackageJson } from './function';

const terser = require('gulp-terser');
const alias = require('gulp-ts-alias');
const ts = require('gulp-typescript');
const gzip = require('gulp-gzip');
const tar = require('gulp-tar');
const zip = require('gulp-zip');

const util = require('util');

const exec = util.promisify(require('child_process').exec);

// read version property from package.json
const packageInfo = require('../../package.json');
const version = packageInfo.version;

const cliAppName = 'triangular-arbitrage2';
const proCliAppName = 'triangular-arbitrage2-pro';

function bundleApp(name: string, dirName: string) {
  const rootDir = './dist';
  const bundleDir = `${rootDir}/${dirName}`;

  if (!fs.existsSync(bundleDir)) {
    fs.mkdirSync(bundleDir);
  }
  fs.copyFileSync(`${rootDir}/${name}-bundle.js`, `${bundleDir}/bundle.js`);
  fs.writeFileSync(`${bundleDir}/package.json`, getDeployPackageJson(dirName));

  const configDir = `${bundleDir}/config`;
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
  fs.copyFileSync(`./config/default.sample.toml`, `${configDir}/default.toml`);
}

gulp.task('build', async (cb: Function) => {
  await exec(`yarn webpack:build name=cli-app`);
  await exec(`yarn webpack:build name=pro-cli-app`);
  cb();
});

gulp.task('bundle', (cb: Function) => {
  bundleApp('cli-app', cliAppName);
  bundleApp('pro-cli-app', proCliAppName);
  cb();
});

const terserOptions = {
  ecma: 5,
  parse: {},
  compress: {},
  mangle: {
    keep_fnames: false,
    keep_classnames: false,
    properties: false, // Note `mangle.properties` is `false` by default.
  },
  module: false,
  // Deprecated
  output: null,
  format: { comments: false, beautify: false },
  toplevel: false,
  nameCache: null,
  ie8: false,
  keep_classnames: false,
  keep_fnames: false,
  safari10: false,
};

gulp.task('minify', () => {
  const devProject = ts.createProject('tsconfig.json');
  const buildProject = ts.createProject('tsconfig.build.json');
  const devConfig = devProject.config;
  const buildConfig = buildProject.config;

  const tsconfig = {
    compilerOptions: {
      ...devConfig.compilerOptions,
      ...buildConfig.compilerOptions,
    },
    exclude: buildConfig.exclude,
    compileOnSave: buildConfig.compileOnSave,
  };

  const minify = buildProject
    .src()
    .pipe(alias({ configuration: tsconfig }))
    .pipe(buildProject())
    .js.pipe(terser(terserOptions))
    .pipe(gulp.dest('dist'));

  return minify;
});

gulp.task('gzip:cli', () => {
  return gulp
    .src(`./dist/${cliAppName}/**`)
    .pipe(tar(`${cliAppName}-v${version}.tar`))
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('gzip:pro-cli', () => {
  return gulp
    .src(`./dist/${proCliAppName}/**`)
    .pipe(tar(`${proCliAppName}-v${version}.tar`))
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('gzip', gulp.series('gzip:cli', 'gzip:pro-cli'));

gulp.task('zip:cli', () => {
  return gulp
    .src(`./dist/${cliAppName}/**`)
    .pipe(zip(`${cliAppName}-v${version}.zip`))
    .pipe(gulp.dest('./dist'));
});

gulp.task('zip:pro-cli', () => {
  return gulp
    .src(`./dist/${proCliAppName}/**`)
    .pipe(zip(`${proCliAppName}-v${version}.zip`))
    .pipe(gulp.dest('./dist'));
});

gulp.task('zip', gulp.series('zip:cli', 'zip:pro-cli'));
