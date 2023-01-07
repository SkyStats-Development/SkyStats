const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile'); // important for this method
const axios = require('axios');
const { getUUID } = require('../../../src/contracts/API/PlayerDBAPI'); 
const { SkyblockProfile } = require('hypixel-api-reborn'); //useless prob
const { parseProfile } = require('../../../API/utils/hypixel'); // useless
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
        
        let name = interaction.options.getString("string") || `Crimson_Armor` //default name to try the api
        const uuid = getUUID(name) //unused, changes the name to uuid
        const data = await getLatestProfile(name) // gets the latest skyblock profile data
        const id = data.profileData.profile_id // gets the latest skyblock profile id
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${name}`)).data.profiles // trying to get it to get all the raw data that it outputs for ONLY the profile id from above
        

    console.log (profileraw)

        
    /*
        If you find a way to get the profile id a different way (you need to find the profile string (example mmm3m3hy333h32h2208) with the line current = true or active = true)
    */

        
        await interaction.reply({content: `${profileraw}`, ephemeral: false})

    }
};;
