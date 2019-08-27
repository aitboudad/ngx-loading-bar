const execSync = require('child_process').execSync,
  packages = [
    'core',
    'http-client',
    'router',
  ];

packages.map(package => {
  const packagePath = `${__dirname}/../dist/@ngx-loading-bar/${package}`;

  execSync(`cd ${packagePath} && npm publish`);
});
