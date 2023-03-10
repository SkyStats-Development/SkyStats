const { default: axios } = require('axios');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const messages = require('../../../messages.json')



module.exports = {
    name: 'testkey',
    description: 'tests a hypixel api key',
    options: [
        {
            name: 'key',
            description: 'the hypixel api key to test',
            type: 3,
            required: true
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        let key = interaction.options.getString("key")
        //NOTE: this is a test command, it will be removed in the future
        const response = await axios.get(`https://api.hypixel.net/key?key=${key}`);
        const data = response.data.record;
        const keye = data.key;
        const owner = data.owner;
        const limit = data.limit;
        const queriesInPastMin = data.queriesInPastMin;
        const totalQueries = data.totalQueries;
        const username = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${owner}/`)).data.name


        const chat = {
            color: 0xffa600,
            title: `Key Data`,
            description: (`Hypixel Key Entered: || ${keye} ||\nKey Owner UUID: **${owner}**\nKey Owner Username: **${username}**\nKey Limit: \`${limit}\`\nQueries in the past minute: **${queriesInPastMin}**\nTotal Queries: **${totalQueries}**`),
            thumbnail: {
                url: `https://i.imgur.com/hggczHP.png`,
            },
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };


            await interaction.reply({  embeds: [ chat ] })

    }
};;