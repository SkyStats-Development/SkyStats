const config = require("../../../config.json");
const messages = config.messages.discord;
const packageJson = require("../../../package.json")


async function releaseCreate(oldVersion, newVersion, value) {


    try {
        const channel = client.channels.cache.get(config.discord.releaseChannel);
        const embed1 = {
            title: `🌹 An Update Has Arrived! 🌹`,
            description: `**VERSION CHANGED**\n ${oldVersion} => ${newVersion}`,
            timestamp: new Date().toISOString(),
            fields: [
              {
                name: `ChangeLog`,
                value: `${value}`,
                inline: true,
              },
            ],
            footer: {text: `${messages.defaultbetter}`, iconURL: `${messages.icon}`},
          }

        await channel.send({ embeds: [ embed1 ] })


    } catch (error) {
        console.log(error);
    }
}
module.exports = { releaseCreate }