const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../../config.json')
const messages = require('../../../messages.json')

module.exports = {
    name: 'help',
    description: 'Shows help menu',

    
    execute: async (interaction, client, InteractionCreate) => {
        const embed = {
            title: `SkyStats Help Menu`,
            description: (`Shows important information about SkyStats!`),
            fields: [
                {
                    name: `Discord`,
                    value: `[Discord Support Server](https://discord.gg/DNHdpx8wwn)`,
                    inline: false
                },
                {
                    name: `Bot Invite`,
                    value: `[Click Here To Invite SkyStats](https://discord.com/api/oauth2/authorize?client_id=1059645184272519260&permissions=8&scope=bot%20applications.commands)`,
                    inline: false
                },
                {
                    name: `Bot Invite (Basic Permissions) Not Recommended`,
                    value: `[Click Here To Invite SkyStats](https://discord.com/api/oauth2/authorize?client_id=1059645184272519260&permissions=982474156113&scope=bot%20applications.commands)`,
                    inline: false
                },
                {
                    name: `Report Issues`,
                    value: `Report all command issues with the \`/issue\` command!`,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };
    

            await interaction.reply({  embeds: [ embed ] })
    }
};;