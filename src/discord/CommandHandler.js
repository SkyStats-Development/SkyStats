const { Routes } = require('discord-api-types/v9')
const config = require('../../config.json')
const { REST } = require('@discordjs/rest')
const fs = require('fs')

class CommandHandler {
  constructor(discord) {
    this.discord = discord
    
    const commands = []
    const _commandFiles = fs.readdirSync('src/discord/commands').filter(file => file.endsWith('.js'))
    const _devcommandFiles = fs.readdirSync('src/discord/devcommands').filter(file => file.endsWith('.js'))
    
    for (const file of _commandFiles) {
      const command = require(`./commands/${file}`)
      commands.push(command)
    }
    for (const file of _devcommandFiles) {
      const devcommand = require (`./devcommands/${file}`)
      commands.push(devcommand)
    }

    const rest = new REST({ version: '10' }).setToken(config.discord.token)
    
    rest.put(Routes.applicationGuildCommands(config.discord.clientID, config.discord.serverID), {body: devcommand }).catch(console.error)
    rest.put(Routes.applicationCommands(config.discord.clientID), { body: commands }).catch(console.error)
  }
}

module.exports = CommandHandler