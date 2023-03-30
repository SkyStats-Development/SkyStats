const chalk = require("chalk");
const axios = require('axios');
const config = require('./config.json');
const packageJson = require('./package.json');
const os = require('os');
const webServer = require('./src/web/server.js'); 
const db = require('./API/functions/getDatabase');
db.connect();
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
console.log(chalk.green(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))

const currentBot = config.discord.clientID
if (currentBot === `1089881692438794281`) {
  console.log(chalk.cyan(`Warning, it seems you are running on the development bot check token and clientID and try again!`))
}
else if (currentBot === `1059645184272519260`) {
  console.log(chalk.cyan(`You have started the production enviroment\nmake sure you know what you are doing!`))
}
else if (currentBot === `mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm`) {
  console.log(chalk.cyan(`You have started the production (BETA-PREMIUM) enviroment, make sure you know what you are doing!`))
}
else {
  console.log(chalk.cyan(`woah there it seems you're selfhosting :o\nPlease remember that you are expected to follow the licence (root/LICENSE) at all times! your startup data was sent to insure you are running the most up-to-date bot version\nCheers and enjoy SkyStats.`))
}

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
