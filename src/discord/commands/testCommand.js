const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'bot credits',
    options: [
        {
            name: 'message',
            description: 'message to send',
            type: 3,
            required: true
        },

        
      ],

    execute: async (interaction, client) => {
        const message = interaction.options.getString('message').replaceAll('\\n', '\n')
        const channel = client.channels.cache.get(`1113587258117861378`);
        const embed = {
            title: `Wtf`,
            color: 0xffa600,
            description: (`${message}`),
            timestamp: new Date().toISOString(),
            };
            
            await channel.send({ embeds: [ embed ] })
            await interaction.reply({content: "Your report has been shared with the developers, do not delete this message.", ephemeral: false})

    },
};