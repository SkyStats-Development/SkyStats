const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const axios = require('axios');
const { getUUID } = require('../../../src/contracts/API/PlayerDBAPI');
const { SkyblockProfile } = require('hypixel-api-reborn');
const { parseProfile } = require('../../../API/utils/hypixel');
const config = require(`../../../config.json`)

module.exports = {
    name: 'test',
    description: 'tests something',
    options: [
        {
            name: 'string',
            description: 'could be whatever needs to be tested....',
            type: 3,
            required: true
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        
        let name = interaction.options.getString("string")
        const data = await getLatestProfile(name)
        const profile = (data.profileData.cute_name)

        

        
        await interaction.reply({content: `${name} on ${profile} `, ephemeral: false})

    }
};;
