
const config = require('../../../config.json')
const ms = require('ms');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: 'serverstats',
    description: 'shows the guild and your current stats',

    execute: async (interaction, client) => {
        const stats = {
            title: `Showing stats for ${interaction.guild.name}`,
            description: (
                `**Main Bot Name**: <@${config.discord.clientID}>\n**Bot Latency**: \`${client.ws.ping}\` ms\n**Last Heartbeat Calculated**: ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago\n**Your Tag**: ${interaction.user}\n**Your ID** ${interaction.user.id}
                `),
            timestamp: new Date().toISOString(),
            footer: {text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/FeOykcL.png'},
                };
        await interaction.reply({ embeds: [stats] })
            }
  }
  