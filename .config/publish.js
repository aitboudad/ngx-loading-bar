const execSync = require('child_process').execSync,
  packages = [
    'core',
    'http',
    'http-client',
    'router',
  ];

packages.map(package => {
    const packagePath = `${__dirname}/../dist/${package}`;

    execSync(`cd ${packagePath} && npm publish --tag next`);
});
