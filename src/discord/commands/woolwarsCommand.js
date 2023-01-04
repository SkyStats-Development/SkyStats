const config = require('../../../config.json')
const axios = require('axios')
const { toFixed } = require('../../contracts/helperFunctions')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

function getWoolWarsStar(exp) {
    const minimalExp = [0, 1e3, 3e3, 6e3, 1e4, 15e3];
    const baseLevel = minimalExp.length;
    const baseExp = minimalExp[minimalExp.length - 1];
    if (exp >= baseExp) return (exp - baseExp) / 5e3 + baseLevel;
    const lvl = minimalExp.findIndex((x)=>exp < x);
    return lvl + exp / minimalExp[lvl];
  }

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
        const woolWars = (await axios.get(`https://api.hypixel.net/player?key=${config.api.hypixelAPIkey}&uuid=${uuid}`)).data.player.stats.WoolGames
        const level = getWoolWarsStar(woolWars.progression.experience)
        const kdrw = toFixed(woolWars.wool_wars.stats.kills) || `no kills GG`
        const deathss = toFixed(woolWars.wool_wars.stats.deaths) || `no deaths GG`

        const embed = {
            title: `WoolWars Stats For ${player}`,
            description: (`\n`),
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
                text: `🌹  SkyStats 🌹`,
            },
        };
 
            await interaction.reply({ embeds:[embed] })

    }
};;
