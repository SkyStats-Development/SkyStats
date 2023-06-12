const Logger = require("../../Logger");
const { ActivityType } = require('discord.js');
const config = require('../../../config.json');

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    try {
        client.user.setStatus(config.discord.Status);
        client.user.setActivity(config.discord.Activity, { type: ActivityType[config.discord.ActivityType] });

    }
    catch (error) {
        Logger.error("Failed to set bot status: " + error)
    }
}};