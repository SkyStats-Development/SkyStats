const { EmbedBuilder } = require("discord.js");
const Logger = require("../../Logger");
const axios = require('axios');
const config = require('../../../config.json');
const packageJson = require('../../../package.json');
const os = require('os');
require('dotenv').config();
const clientID = process.env.ID;



module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        Logger.discordMessage(
          `${interaction.user.username} - [${interaction.commandName}]`
        );
        bridgeChat = interaction.channelId;
        await command.execute(interaction, interaction.client);
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
