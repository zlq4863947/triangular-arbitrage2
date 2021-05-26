import * as fs from 'fs';
import * as gulp from 'gulp';
import { getDeployPackageJson } from './function';

const terser = require('gulp-terser');
const alias = require('gulp-ts-alias');
const ts = require('gulp-typescript');
const gzip = require('gulp-gzip');
const tar = require('gulp-tar');
const zip = require('gulp-zip');

const spawn = require('child_process').spawn;

// read version property from package.json
const packageInfo = require('../../package.json');
const version = packageInfo.version;
const appName = packageInfo.name;

/* create version file to import */
gulp.task('version', (cb: Function) => {
  fs.writeFile('./src/environments/version.ts', `export const version = '${version}';\n`, (err) => {
    if (err) {
      throw err;
    }

    cb();
  });
});

/* create hash file to import */
gulp.task('hash', (cb: Function) => {
  // read hash from git
  // -  Note that this line executes the command when it is defined.
  const ps = spawn('git', ['rev-parse', 'HEAD']);
  ps.stdout.setEncoding('utf-8').on('data', (hash: string) => {
    fs.writeFile('./src/environments/hash.ts', `export const hash = '${hash.replace(/\r?\n/g, '')}';\n`, (err) => {
      if (err) {
        throw err;
      }

      cb();
    });
  });
});

gulp.task('deploy', (cb: Function) => {
  const rootDir = './dist';
  const deployDir = `${rootDir}/${appName}`;

  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
  }
  fs.copyFileSync(`${rootDir}/bundle.js`, `${deployDir}/bundle.js`);
  fs.writeFileSync(`${deployDir}/package.json`, getDeployPackageJson());

  const configDir = `${deployDir}/config`;
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
  fs.copyFileSync(`./config/default.sample.toml`, `${configDir}/default.toml`);

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

gulp.task('gzip', () => {
  return gulp
    .src(`./dist/${appName}/**`)
    .pipe(tar(`${appName}-v${version}.tar`))
    .pipe(gzip())
    .pipe(gulp.dest('./dist'));
});

gulp.task('zip', () => {
  return gulp
    .src(`./dist/${appName}/**`)
    .pipe(zip(`${appName}-v${version}.zip`))
    .pipe(gulp.dest('./dist'));
});
