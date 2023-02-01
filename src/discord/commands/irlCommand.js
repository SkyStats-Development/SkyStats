const { default: axios } = require('axios');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const messages = require('../../../messages.json')
const { addNotation, addCommas } = require('../../contracts/helperFunctions')


module.exports = {
    name: 'irl',
    description: 'info on how we SkyStats calculate your irl networth',

    execute: async (interaction, client, InteractionCreate) => {
        const cookieprice = (await axios.get(`https://sky.shiiyu.moe/api/v2/bazaar`)).data.BOOSTER_COOKIE.sellPrice.toString().split(".")[0]
        const cookieprice_formatted = addCommas(cookieprice)
        const chat = {
            color: 0xffa600,
            title: `IRL Networth Calculation`,
            description: (`In commands (like /networth) we provide a rough irl networth example below is the formula:\n{your networth} / ${cookieprice_formatted} = {how many cookies}\n{how many cookies} x 2.27 = {your profile value}\nGem Calculation\n1 gem = 0.007USD\nBooster cookie = 325 Gems\nBooster cookie = $2.27USD\n\nIf our calculations are off please report this on our discord!\nCredits to Pandy#0001 for the calculations!`),
            thumbnail: {
                url: `https://i.imgur.com/hggczHP.png`,
            },
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };


            await interaction.reply({  embeds: [ chat ] })

    }
};;
