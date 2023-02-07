const config = require('../../../config.json')
const axios = require('axios')
const { toFixed } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const {getWoolWarsStar } = require(`../../../API/SkyStats-apis/API/skystats/getWWStar`)
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')


module.exports = {
    name: 'woolwars',
    description: 'Gets WoolWars Data',
    options: [
        {
            name: 'player',
            description: 'Minecraft Username',
            type: 3,
            required: true
        },  
      ],

    execute: async (interaction, client, InteractionCreate) => {
        let player = interaction.options.getString('player')
        const uuid = await getUUID(player)
        const woolWars = (await axios.get(`https://api.hypixel.net/player?key=${config.api.hypixelAPIkey}&uuid=${name}`)).data.player.stats.WoolGames
        const level = getWoolWarsStar(woolWars.progression.experience)
        const kdrw = toFixed(woolWars.wool_wars.stats.kills) || `no kills GG`
        const deathss = toFixed(woolWars.wool_wars.stats.deaths) || `no deaths GG`

        const embed = {
            color: 0xffa600,
            title: `WoolWars Stats For ${player}`,
            description: (`\n`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${player}`,
            },
            fields: [
            {
                name: 'Level',
                value: `[${toFixed(level, 0)}✫]`,
            },
            {
                name: `Wins`,
                value: `${woolWars.wool_wars.stats.wins}`,
            },
            {
                name: `Win - Loss Ratio`,
                value: `${toFixed(woolWars.wool_wars.stats.wins/woolWars.wool_wars.stats.games_played, 2)}`,
            },
            {
                name: `Kills`,
                value: `${kdrw}`,
            },
            {
                name: `Deaths`,
                value: `${deathss}`,
            },
            {
                name: `Blocks Broken`,
                value: `${woolWars.wool_wars.stats.blocks_broken}`,
            },
            {
                name: `Blocks Placed`,
                value: `${woolWars.wool_wars.stats.wool_placed}`,
            },
        ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.defaultbetter}` , iconURL: `${messages.footer.icon}`,
            },
        };
 
            await interaction.reply({ embeds:[embed] })

    }
};;
