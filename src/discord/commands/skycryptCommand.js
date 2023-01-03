const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')


module.exports = {
    name: 'crypt',
    description: 'Shows a Skycrypt Link',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: true
        }
      ],
    
  
    execute: async (interaction, client) => {
        const name = interaction.options.getString("name")
 
            await interaction.reply({content: `https://sky.shiiyu.moe/stats/${name}`, ephemeral: false})
    },
  };