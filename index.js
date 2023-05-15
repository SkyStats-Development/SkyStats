const chalk = require("chalk");
require('dotenv').config();
const { checkKeys } = require('./API/functions/handleKeys');
const { sendStartupData } = require('./API/functions/handleStart');
const mascot = `───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───\n───█▒▒░░░░░░░░░▒▒█───\n────█░░█░░░░░█░░█────\n─▄▄──█░░░▀█▀░░░█──▄▄─\n█░░█─▀▄░░░░░░░▄▀─█░░█\n───█░░░▀▄░░░▄▀░░░█───\n───█░░░░░▀▀░░░░░█───\n───█░░░░░░░░░░░░░█───\n───█░░░░░░░░░░░░░█───\n───▀█▄         ▄█▀──`

checkKeys()
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`1=Production || 2=Development || 3=Close`);

rl.question('Enter 1 or 2: ', (answer) => {
  if (answer === '1') {
    const db = require('./API/functions/getDatabase');
    db.connect();
    process.env.TOKEN = process.env.PROD;
    process.env.ID = process.env.PRODID;
    console.log(mascot);
    sendStartupData();
    console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`));
    const webServer = require('./src/web/server.js'); 
    console.log(chalk.cyan(`You have started the production enviroment\nmake sure you know what you are doing!`));

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
    console.log(mascot);
    
    const db = require('./API/functions/getDatabase');
    db.connect();
    process.env.TOKEN = process.env.DEV;
    process.env.ID = process.env.DEVID;
    sendStartupData();
    console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`));
    const webServer = require('./src/web/server.js'); 
    console.log(chalk.cyan(`Warning, it seems you are running on the development bot check token and clientID and try again!`));
    
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
  } else {
    sendStartupData();
    console.log(mascot);
    process.exit(1);
  }
  
  rl.close();
});
