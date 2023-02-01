const { InteractionCollector } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest')
const config = require('../../../config.json')
const { Routes } = require('discord-api-types/v9')
const messages = require('../../../messages.json')


module.exports = {
  name: 'reload',
  description: 'Reloads all the commands',
  execute: async (interaction, client, InteractionCreate) => {
    if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.developmentRole)) {
    const commands = []
    const _commandFiles = fs.readdirSync(path.join(__dirname,)).filter(file => file.endsWith('.js'));

    for (const file of _commandFiles) {
      delete require.cache[require.resolve(`./${file}`)];
      const command = require(`./${file}`);
      commands.push(command)
    }
    const rest = new REST({ version: '10' }).setToken(config.discord.token)
    
    rest.put(Routes.applicationCommands(config.discord.clientID), { body: commands }).catch(console.error)

    
    interaction.reply({ content: 'All commands have been reloaded!', ephemeral: true });
    console.log('All commands have been reloaded!')
} else {
    interaction.reply({ content: `${messages.commandfailed.serverless}`, ephemeral: true})
    }
  }
};