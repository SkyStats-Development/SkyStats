const Logger = require("../../Logger");
require('dotenv').config();

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
