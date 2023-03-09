//EZ GG WP wxkydoodle @ W4ckydoodle 4ever!!!!
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const axios = require('axios')

module.exports = {
    name: 'bedwars',
    description: 'Gets BedWars Data',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false
        },  
      ],

    execute: async (interaction, client, InteractionCreate) => {
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        let name = interaction.options.getString("name") || uuid
        const username = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.username;
          const uuid2 = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.raw_id;
        const player = await hypixel.getPlayer(name)
        const embed = {
            color: 0xffa600,
            title: `Bedwars Stats For ${player}`,
            description: (`\n`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${username}`,
            },
            fields: [
            {
                name: 'Level',
                value: `[${player.stats.bedwars.level}✫]`,
            },
            {
                name: `Final Kills`,
                value: `${addCommas(player.stats.bedwars.finalKills)}`,
            },
            {
                name: `FKDR`,
                value: `${player.stats.bedwars.finalKDRatio}`,
            },
            {
                name: `Wins`,
                value: `${player.stats.bedwars.wins}`,
            },
            {
                name: `WLR`,
                value: `${player.stats.bedwars.WLRatio}`,
            },
            {
                name: `Beds Broken`,
                value: `${player.stats.bedwars.beds.broken}`,
            },
            {
                name: `BBLR`,
                value: `${player.stats.bedwars.beds.BLRatio}`,
            },
            {
                name: `:sparkles: Winstreak :sparkles:`,
                value: `${player.stats.bedwars.winstreak}`,
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