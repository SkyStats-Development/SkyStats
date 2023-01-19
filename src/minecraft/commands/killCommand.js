const MinecraftCommand = require('../../contracts/MinecraftCommand')

class killCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'ripmemyppistinycope'
    this.description = "kills the bot"
  }

  async onCommand(username, message) {
    try {
        this.send(`/r Bot killed ingame!`)
        bot.quit() 
    } catch (error) {
      console.log(error)
      this.send('/r Something went wrong..')
    }
  }
}



module.exports = killCommand;