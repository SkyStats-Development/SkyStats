const { InteractionCollector, CategoryChannel } = require('discord.js');
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
    const _commandFiles = fs.readdirSync('src/discord/commands').filter(file => file.endsWith('.js'))

    for (const file of _commandFiles) {
      delete require.cache[require.resolve(`../../../src/discord/commands/${file}`)];
      delete require.cache[require.resolve(`../../../src/discord/commands/${file}`)];
      delete require.cache[require.resolve(`../../../src/discord/commands/${file}`)];
      delete require.cache[require.resolve(`../../../src/discord/commands/${file}`)];
      const command = require(`../../../src/discord/commands/${file}`);
      client.commands.set(command.name, command);
      commands.push(command)
    } 
    
    interaction.reply({ content: 'All commands have been reloaded!', ephemeral: true });
    console.log('All commands have been reloaded!')
} else {
    interaction.reply({ content: `You do not have permission to run this`, ephemeral: true})
    }
  }
};