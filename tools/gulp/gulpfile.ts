import * as fs from 'fs';
import * as gulp from 'gulp';
import { getDeployPackageJson } from './function';

const spawn = require('child_process').spawn;

// read version property from package.json
const version = require('../../package.json').version;

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
  const deployDir = `${rootDir}/${require('../../package.json').name}`;

  if (!fs.existsSync(deployDir)) {
    fs.mkdirSync(deployDir);
  }
  fs.copyFileSync(`${rootDir}/main.js`, `${deployDir}/main.js`);
  fs.writeFileSync(`${deployDir}/package.json`, getDeployPackageJson());

  cb();
});
