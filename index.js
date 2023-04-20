const chalk = require("chalk");
const axios = require('axios');
const config = require('./config.json');
const packageJson = require('./package.json');
const os = require('os');
require('dotenv').config();

const keys = process.env.KEYS.split(",");
let workingKey = '';
async function checkKeys() {
  try {
    for (let i = 0; i < keys.length; i++) {
      const response = await axios.get(`https://api.hypixel.net/key?key=${keys[i]}`);
      const data = response.data;
      if (data.success && data.record && data.record.queriesInPastMin < 50) {
        workingKey = keys[i];
        break;
      }
    }
    if (!workingKey) {
      console.error('No working API key found!');
      process.exit(1);
    }

  } catch (error) {
    console.error('Error checking keys:', error);
    process.exit(1);
  }
}
checkKeys();
const clientID = process.env.ID;
function sendStartupData() {
  const data = {
    id: clientID,
    time: new Date().toISOString(),
    version: packageJson.version,
    name: packageJson.name,
    osVersion: os.release()
  };
  axios.post(`${config.api.skyStatsDATA}`, data)
    .then(response => {
      console.log( response.data);
    })
    .catch(error => {
      console.error('Hey, sorry for the issue but it seems we cant locate our servers at the moment. Please try again later.(the bot will now stop)', error.message);
      process.exit(1); 
    });
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log(`1=Production || 2=Development || 3=Close`)
rl.question('Enter 1 or 2: ', (answer) => {
  if (answer === '1') {
    console.log(chalk.green(`Working API key: ${workingKey}`));
const db = require('./API/functions/getDatabase');
db.connect();
process.env.KEY = workingKey;
process.env.TOKEN = process.env.PROD
process.env.ID = process.env.PRODID
console.log(`───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───`)
console.log(`───█▒▒░░░░░░░░░▒▒█───`)
console.log(`────█░░█░░░░░█░░█────`)
console.log(`─▄▄──█░░░▀█▀░░░█──▄▄─`)
console.log(`█░░█─▀▄░░░░░░░▄▀─█░░█`)
console.log(`───█░░░▀▄░░░▄▀░░░█───`)
console.log(`───█░░░░░▀▀▀░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
sendStartupData();
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───▀█▄         ▄█▀──`)
console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))
const webServer = require('./src/web/server.js'); 
console.log(chalk.cyan(`You have started the production enviroment\nmake sure you know what you are doing!`))
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
  } else if (answer === '2') {
  console.log(chalk.green(`Working API key: ${workingKey}`));
const db = require('./API/functions/getDatabase');
    db.connect();
    process.env.KEY = workingKey;
    process.env.TOKEN = process.env.DEV
    process.env.ID = process.env.DEVID
console.log(`───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───`)
console.log(`───█▒▒░░░░░░░░░▒▒█───`)
console.log(`────█░░█░░░░░█░░█────`)
console.log(`─▄▄──█░░░▀█▀░░░█──▄▄─`)
console.log(`█░░█─▀▄░░░░░░░▄▀─█░░█`)
console.log(`───█░░░▀▄░░░▄▀░░░█───`)
sendStartupData();
console.log(`───█░░░░░▀▀▀░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───▀█▄         ▄█▀──`)
console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))
const webServer = require('./src/web/server.js'); 
    console.log(chalk.cyan(`Warning, it seems you are running on the development bot check token and clientID and try again!`))
//
//
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

//
//   
  } else {
console.log(`───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───`)
console.log(`───█▒▒░░░░░░░░░▒▒█───`)
console.log(`────█░░█░░░░░█░░█────`)
console.log(`─▄▄──█░░░▀█▀░░░█──▄▄─`)
console.log(`█░░█─▀▄░░░░░░░▄▀─█░░█`)
sendStartupData();
console.log(`───█░░░▀▄░░░▄▀░░░█───`)
console.log(`───█░░░░░▀▀▀░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───▀█▄         ▄█▀──`)
console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))
    process.exit(1)
  }
  rl.close();
});


