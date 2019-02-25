var fs = require('fs');

function readWriteSync() {

  let env = process.env.ENV;

  if (!process.env.ENV) {
    env = 'dev';  //SETTING DEFAULT ENV AS DEV
  }
  var data = fs.readFileSync(process.cwd() + `/src/environments/environment.${env}.ts`, 'utf-8');
  fs.writeFileSync(process.cwd() + '/src/environments/environment.ts', data, 'utf-8');
  console.log('readFileSync complete');
}
readWriteSync();
