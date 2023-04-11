const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const messages = require('../../../messages.json')
const { default: axios, AxiosError } = require('axios');
const config = require(`../../../config.json`)
const { handleError } = require('../../../API/functions/getError');
const { getAuctionData } = require('../../../API/functions/networth/getAuctionData.js');
const { getSBID } = require('../../../API/functions/getSBID.js')



module.exports = {
    name: 'lowestbin',
    description: 'Gets the lowest bin for an item',
    options: [
        {
            name: 'item',
            description: 'The item you want to get the lowest bin for',
            type: 3,
            required: true
        },
        {
          name: `number`,
          description: 'The location of the item you want to get, higher the number the higher the price',
          type: 10,
          required: false
        }

        
    ],
    execute: async (interaction, client, InteractionCreate) => {
  try {
    await interaction.deferReply();
    const item = interaction.options.getString('item') 
    const auctiondata = await getAuctionData(item)
    const number = interaction.options.getNumber('number') || 1
    const formattedName = await getSBID(auctiondata[number].name)
    console.log(formattedName)
    const image = `https://sky.shiiyu.moe/item/${formattedName}`
    console.log(image)
    

/*
      name: auction.item_name,
      price: auction.starting_bid,
      tier: auction.tier,
      id: auction.uuid,
      category: auction.category,
      end: auction.end,
      bin: auction.bin,
      extra: auction.extra,
      */

    const auctionHouseEmbed = {
      title: `${auctiondata[number].name}`,
      URL: `https://sky.coflnet.com/auction/${auctiondata[number].id}`,
      description: (`**Basic Information**`),
      fields: [
        {
          name: `Item`,
          value: `${auctiondata[number].name}`,
          inline: true
        },
        {
          name: `Rarity`,
          value: `${auctiondata[number].tier}`,
          inline: true
        },
        {
          name: `Price`,
          value: `${auctiondata[number].price}`,
          inline: true
        },
        {
          name: `Ending Time`,
          value: `<t:${auctiondata[number].end}:R>`,
          inline: true
        },
        {
          name: `Catagory`,
          value: `${auctiondata[number].catagory}`,
          inline: true
        },
      ], 
      timestamp: new Date().toISOString(),
      thumbnail: {
        url: image,
    },
      footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
    };


  await interaction.editReply({content: `**${auctiondata[number].price}**`, embeds: [auctionHouseEmbed], ephemeral: false})

} catch (error) {
  const errorEmbed = handleError(error);
  await interaction.editReply({ embeds: [errorEmbed] });
}}
  }
