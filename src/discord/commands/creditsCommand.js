const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const messages = require('../../../messages.json')


module.exports = {
    name: 'credits',
    description: 'bot credits',
  
    execute: async (interaction, client) => {
       
    
        const credits = {
            color: 0xffa600,
            title: 'Credits for the bot',
            description: 'A massive thanks go to\n[AltPapier](https://github.com/Altpapier/hypixel-discord-guild-bridge)\n[DawJaw](https://dawjaw.net/jacobs)\n[Discord.js](https://discord.js.org/)\n[Hypixel Network API](http://api.hypixel.net/)\n[Hypixel API Reborn](https://hypixel.stavzdev.me/#/)\n[MaroAPI](https://github.com/zt3h)\n[Node.js](https://nodejs.org/)\n[PlayerDB API](https://playerdb.co/)\n[SkyHelper API](https://github.com/Altpapier/SkyHelperAPI)\n[SkyShiiyu API](https://github.com/SkyCryptWebsite/SkyCrypt)\nSlothPixel API](https://github.com/slothpixel)\n[Senither](https://github.com/Senither)\n[DuckySoLucky](https://https://github.com/DuckySoLucky)\n[Kathhund](https://https://github.com/Kathund)\n[ThePotatoKing](https://links.sperrer.ca)\nPandy#0001',


            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.sogayowner}`, iconURL: `${messages.footer.icon}`
            },
        };
        interaction.reply({ embeds: [credits] });
  
    },
  };