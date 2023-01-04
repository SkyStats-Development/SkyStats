const { default: axios } = require('axios');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');



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

        const keye = (await axios.get(`https://api.hypixel.net/key?key=${key}`)).data.record.key 
        const owner = (await axios.get(`https://api.hypixel.net/key?key=${key}`)).data.record.owner
        const limit = (await axios.get(`https://api.hypixel.net/key?key=${key}`)).data.record.limit
        const queriesInPastMin = (await axios.get(`https://api.hypixel.net/key?key=${key}`)).data.record.queriesInPastMin
        const username = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${owner}/`)).data.name
        const totalQueries = (await axios.get(`https://api.hypixel.net/key?key=${key}`)).data.record.totalQueries

        const chat = {
            title: `Key Data`,
            description: (`Hypixel Key Entered: || ${keye} ||\nKey Owner UUID: **${owner}**\nKey Owner Username: **${username}**\nKey Limit: \`${limit}\`\nQueries in the past minute: **${queriesInPastMin}**\nTotal Queries: **${totalQueries}**`),
            timestamp: new Date().toISOString(),
            footer: {text: `Please note, all keys are not shared with the bot and go directly to the hypixel api!`},
            };


            await interaction.reply({  embeds: [ chat ] })

    }
};;