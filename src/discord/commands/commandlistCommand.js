const { EmbedBuilder } = require("discord.js");

const fs = require("fs");
const config = require("../../../config.json");
const messages = config.messages.discord


module.exports = {
  name: "commands",
  description: "List all of my commands!",


  execute: async (interaction, client) => {
    const commandName = interaction.options.getString("command");
    if (!commandName) {
      let discordCommands = ""
      const discordCommandFiles = fs
        .readdirSync("src/discord/commands")
        .filter((file) => file.endsWith(".js"));
      for (const file of discordCommandFiles) {
        const command = require(`./${file}`);
        let discordOptions = "";
        if (!command.options) {
          discordCommands += `- \`${command.name}\`\n`;
          continue;
        }
        for (let i = 0; i < command.options.length; i++) {
          for (let j = 0; j < command.options.length; j++) {
            discordOptions += ` [${command.options[j].name}]`;
          }
          discordCommands += `- \`${command.name}${discordOptions}\`\n`;
          break;
        }
      }
      const helpMenu = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("SkyStats Command List")
        .setDescription("List of all of my commands! Please remember that if a command option is not required, You will have to verify!")
        .addFields(
          { name: "**Discord**: ", value: `${discordCommands}`, inline: true }
        )
        .setFooter({
          text: `${messages.footer.defaultbetter}`,
          iconURL: `${messages.footer.icon}`,
        });
      await interaction.reply({ embeds: [helpMenu] });
    
        }
    }   
    }
    //credits to duckysolucky for the command