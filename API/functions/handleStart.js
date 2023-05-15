const axios = require('axios');
const config = require('../../config.json');
const packageJson = require('../../package.json');
const os = require('os');
require('dotenv').config();
const chalk = require("chalk");

const clientID = process.env.ID;
async function sendStartupData() {
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

module.exports = { sendStartupData }
