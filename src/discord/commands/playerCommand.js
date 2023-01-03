const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, capitalize } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices } = require('skyhelper-networth');

let prices;
getPrices().then((data) => { 
    prices = data
})

setInterval(async () => {
  prices = await getPrices();
}, 1000 * 60 * 5); 

module.exports = {
    name: 'player',
    description: 'Fetches Hypixel Player Data',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: true
        }
      ],
    
  
    execute: async (interaction, client) => {
        let name = interaction.options.getString("name")
        const data = await getLatestProfile(name)
        name = data.profileData?.game_mode ? `♲ ${name}` : name
        const profile = await getNetworth(data.profile, data.profileData?.banking?.balance, { prices });
       
        const embedplayer = {
            title: `Stats For ${name}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: `Networth ${addNotation("oneLetters", profile.networth) ?? 0}`,
            timestamp: new Date().toISOString(),
            footer: {
                text: 'footer',
            },
        };

    
        await interaction.reply({ embeds: [embedplayer] });
    },
  };