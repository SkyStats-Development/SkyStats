const MinecraftCommand = require('../../contracts/MinecraftCommand')

class helpCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'help'
    this.aliases = ['info']
    this.description = 'Shows help menu'
    this.options = []
    this.optionsDescription = []
  }

  onCommand(username, message) {
    try {
      this.send(`/r https://imgur.com/4LoDwPs.png`)
    } catch (error) {
      console.log(error)
      this.send('/r Something went wrong..')
    }
  }
}

module.exports = helpCommand

