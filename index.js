const chalk = require("chalk");
const axios = require('axios');
const config = require('./config.json');
const packageJson = require('./package.json');
const os = require('os');
const webServer = require('./src/web/server.js'); 
function sendStartupData() {


  const data = {
    id: config.discord.clientID,
    time: new Date().toISOString(),
    version: packageJson.version,
    name: packageJson.name,
    osVersion: os.release()
  };

  axios.post('http://103.54.59.82:6969/', data)
    .then(response => {
      console.log( response.data);
    })
    .catch(error => {
      console.error('Hey, sorry for the issue but it seems we cant locate our servers at the moment. Please try again later.(the bot will now stop)', error.message);
      process.exit(1); 
    });
}

sendStartupData();


console.log(`───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───`)
console.log(`───█▒▒░░░░░░░░░▒▒█───`)
console.log(`────█░░█░░░░░█░░█────`)
console.log(`─▄▄──█░░░▀█▀░░░█──▄▄─`)
console.log(`█░░█─▀▄░░░░░░░▄▀─█░░█`)
console.log(`───█░░░▀▄░░░▄▀░░░█───`)
console.log(`───█░░░░░▀▀▀░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───▀█▄         ▄█▀──`)
chalk.green(console.log(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))

process.on("uncaughtException", function (err) {
  console.log(err);
});
const app = require("./src/Application");

app
  .register()
  .then(() => {
    app.connect();
  })
  .catch((err) => {
    console.error(err);
  });

  webServer.start()