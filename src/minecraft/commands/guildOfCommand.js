const MinecraftCommand = require('../../contracts/MinecraftCommand')
const hypixel = require('../../contracts/API/HypixelRebornAPI')

class guildOfCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'go'
        this.aliases = ['guildOf']
        this.description = "Look up a guild based of the ign of a player."
    }

    async onCommand(username, message) {
        try {
            const player = message.split(' ')[1]
            hypixel.getGuild('player', player).then((data) => {
                this.send(`/r ${player} is in ${data.name} - Tag: ${data.tag} Members: ${data.members.length} Level: ${data.level} Achievements: Online Players: ${data.achievements.onlinePlayers} Winners: ${data.achievements.winners}`)
            }).catch((error) => {
                this.send(`/r ${player} is not in a guild OR ${player} does not exist.`)
                console.log(error)
            })
        } catch (error) {
            console.log(error)
            this.send('/r Something went wrong..')
        }
    }
}


module.exports = guildOfCommand;