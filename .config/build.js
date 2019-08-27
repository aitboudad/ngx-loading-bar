const fs = require("fs"),
  packages = [
    'core',
    'http-client',
    'router',
  ];

// update `LOADING-BAR-VERSION` in package.json for all sub-packages
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
packages.map(package => {
  const packagePath = `dist/@ngx-loading-bar/${package}/package.json`;

  package = fs.readFileSync(packagePath, 'utf8');
  fs.writeFileSync(packagePath, package.replace(/LOADING-BAR-VERSION|0.0.0/g, version));
});
