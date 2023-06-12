const { Routes } = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest')
const fs = require('fs')
require('dotenv').config();
const token = process.env.TOKEN;
const clientID = process.env.ID;

class CommandHandler {
  constructor(discord) {
    this.discord = discord
    
    const commands = []
    const _commandFiles = fs.readdirSync('src/discord/commands').filter(file => file.endsWith('.js'))
    
    for (const file of _commandFiles) {
      const command = require(`./commands/${file}`)
      commands.push(command)
    }
    const rest = new REST({ version: '10' }).setToken(token)
    
    rest.put(Routes.applicationCommands(clientID), { body: commands }).catch(console.error)
  }
}

module.exports = CommandHandler