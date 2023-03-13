const DiscordManager = require("./discord/DiscordManager");
const MinecraftManager = require("./minecraft/MinecraftManager");
const axios = require('axios');
const config = require('../config.json');
const packageJson = require('../package.json');
const os = require('os');

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
      console.log(response.data);
    })
    .catch(error => {
      console.error('Hey, sorry for the issue but it seems we cant locate our servers at the moment. Please try again later.(the bot will now stop)', error.message);
      process.exit(1); 
    });
}

sendStartupData();


class Application {
  async register() {
    this.discord = new DiscordManager(this);
    this.minecraft = new MinecraftManager(this);
  }

  async connect() {
    this.discord.connect();
    this.minecraft.connect();
  }
}

module.exports = new Application();
