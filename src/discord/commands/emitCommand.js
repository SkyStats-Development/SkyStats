const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')


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
        let message = interaction.options.getString('message').replaceAll('\\n', '\n')


            await interaction.channel.send(`${message}`);
            await interaction.reply({content: "Success.", ephemeral: true})

    }
};;
