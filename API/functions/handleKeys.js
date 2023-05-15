const axios = require('axios');
const config = require('../../config.json');
const packageJson = require('../../package.json');
const os = require('os');
const chalk = require("chalk");
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
    process.env.KEY = workingKey;
console.log(chalk.green(`Working API key: ${workingKey}`));

  } catch (error) {
    console.error('Error checking keys:', error);
    process.exit(1);
  }
}




module.exports={checkKeys}