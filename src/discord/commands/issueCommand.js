const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../../config.json')
const messages = require('../../../messages.json')

module.exports = {
    name: 'issue',
    description: 'Report an issue with the bot and its commands',
    options: [
        {
            name: 'message',
            description: 'Message to send to developers! (Please be as detailed as possible)',
            type: 3,
            required: true
        },
        {
            name: 'command',
            description: 'Command that is having issues',
            type: 3,
            required: false
        },
        ],

        execute: async (interaction, client, InteractionCreate) => {
            const message = interaction.options.getString('message').replaceAll('\\n', '\n')
            const command = interaction.options.getString('command') || 'None'
            const channel = client.channels.cache.get(`1070150424725819484`);
            const user = interaction.user.id
            const guild = interaction.guild.name
            const messagelink = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id}`


            const embed = {
                title: `Issue Report`,
                description: (`By: ${user}\nIn Server: **${guild}**\nCommand: **${command}**\nMessage: ${message}\n\n[Area where it happened](${messagelink})`),
                timestamp: new Date().toISOString(),
                footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                };
                
                await channel.send({ embeds: [ embed ] })
                await interaction.reply({content: "Your report has been shared with the developers, do not delete this message.", ephemeral: false})

            }
    };;
    