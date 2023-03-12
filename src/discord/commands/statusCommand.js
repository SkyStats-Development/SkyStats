const config = require('../../../config.json');
const axios = require('axios');
const fs = require('fs');

module.exports = {
    name: 'status',
    description: 'Checks the api status of the bot',

    execute: async (interaction, client, InteractionCreate) => {
        const hypixelAPAI = await axios.get(`https://api.hypixel.net/key?key=${config.api.hypixelAPIkey}`);
        const SessionServer = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile//`)).data.name
        const SkyStatsAPI = await axios.get(`http://103.54.59.82:3000/v2/?key=${config.api.skyStatsKey}`);
        


        const chat = {
            color: 0xffa600,
            title: `Status`,
            description: (``),
            thumbnail: {
                url: `https://i.imgur.com/hggczHP.png`,
            },
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };


            await interaction.reply({  embeds: [ chat ] })

    }
    



}