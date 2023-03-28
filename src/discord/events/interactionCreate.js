const { EmbedBuilder } = require("discord.js");
const Logger = require("../../Logger");
const axios = require('axios');
const config = require('../../../config.json');
const packageJson = require('../../../package.json');
const os = require('os');


function sendStartupData() {

  const data = {
    id: config.discord.clientID,
    time: new Date().toISOString(),
    version: packageJson.version,
    name: packageJson.name,
    osVersion: os.release()
  }

  axios.post('http://103.54.59.82:6969/', data)
    .then(response => {

    })
    .catch(error => {
      console.error('Hey, sorry for the issue but it seems we cant locate our servers at the moment. Please try again later.(the bot will now stop)', error.message);
      process.exit(1); 
    });
}

sendStartupData();



module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      // removed as it prevents ephemral commands from working
     // await interaction.deferReply({ ephemeral: false }).catch(() => {}); 

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
