const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../../config.json')
const messages = require('../../../messages.json')

module.exports = {
    name: 'emit',
    description: 'Emits a message',
    options: [
        {
            name: 'message',
            description: 'message to send',
            type: 3,
            required: true
        },

        
      ],
      
    execute: async (interaction, client, InteractionCreate) => {

        if ((await interaction.guild.members.fetch(interaction.user)).roles.cache.has(config.discord.developmentRole)) {
        let message = interaction.options.getString('message').replaceAll('\\n', '\n')
            await interaction.channel.send(`${message}`);
            await interaction.reply({content: "Success.", ephemeral: true})
        } else {
            interaction.reply({ content: `${messages.commandfailed.serverless}`, ephemeral: true})
            }
    }
};;
