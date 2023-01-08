const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile'); // important for this method
const axios = require('axios');
const { getUUID } = require('../../../src/contracts/API/PlayerDBAPI'); 
const { SkyblockProfile } = require('hypixel-api-reborn'); //useless prob
const { parseProfile } = require('../../../API/utils/hypixel'); 
const config = require(`../../../config.json`);


module.exports = {
    name: 'test',
    description: 'tests something',
    options: [
        {
            name: 'string',
            description: 'could be whatever needs to be tested....',
            type: 3,
            required: false
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        
        let name = interaction.options.getString("string") || `Crimson_Armor`

        


        
        await interaction.reply({content: `<:Barry_Century_Cake:944570165415251998>`, ephemeral: false})

    }
};;
