const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices} = require('skyhelper-networth');
const messages = require('../../../messages.json')
const { default: axios } = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { getUUID } = require('../../contracts/API/PlayerDBAPI')

module.exports = {
    name: 'garden',
    description: 'Gets garden data on a player',
    options: [
        {
            name: 'name',
            description: 'mc username',
            type: 3,
            required: false
        },

        
    ],
    execute: async (interaction, client, InteractionCreate) => {
    try{
        await interaction.deferReply();
        await wait(1);
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        let name = interaction.options.getString("name") || uuid
        const username = (await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.username;
        const uuid2 = (  await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.raw_id;

    
    
    }catch(err){
        console.log(err)
        interaction.editReply({content: `An error occured. Please try again later.\n${err}`})
    }
    }
}


