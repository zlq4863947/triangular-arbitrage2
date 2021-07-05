const requiredPackages = ['log4js', 'config', 'toml'];
export function getDeployPackageJson(pkgName?: string): string {
  const pkg = require('../../package.json');
  const dependencies = {} as any;
  Object.keys(pkg.dependencies)
    .filter((key) => requiredPackages.includes(key))
    .forEach((key) => (dependencies[key] = pkg.dependencies[key]));
  const json = {
    name: pkgName,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    scripts: {
      start: 'node bundle.js',
    },
    dependencies,
  };

  return JSON.stringify(json, null, 2);
}
