const axios = require('axios');

module.exports = {
  name: 'bazaar',
  description: 'Get the latest bazaar data for a specific item.',
  options: [
    {
      name: 'item',
      description: 'The name of the item to get data for.',
      type: 3,
      required: true,
    },
    {
      name: 'amount',
      description: 'The amount of items to get data for.',
      type: 4,
      required: false,
    },
  ],

  execute: async (interaction, client) => {
    const item = interaction.options.getString('item').toLowerCase();
    let amount = interaction.options.getInteger('amount');

    if (!amount) {
      amount = 1;
    }

    if (amount < 1) {
      return interaction.reply('Amount must be at least 1.');
    }

    // Make request to API
    const response = await axios.get('https://sky.shiiyu.moe/api/v2/bazaar');

    // Find the item in the response data
    const itemData = Object.values(response.data).find(
      (data) => data.name.toLowerCase() === item
    );

    // If item doesn't exist in the response data
    if (!itemData) {
      return interaction.reply(`Sorry, I couldn't find any data for "${item}".`);
    }

    // Calculate prices and volumes based on amount
    const buyPrice = itemData.buyPrice * amount;
    const sellPrice = itemData.sellPrice * amount;
    const buyVolume = itemData.buyVolume * amount;
    const sellVolume = itemData.sellVolume * amount;

    // Construct the embed
    const image = `https://sky.shiiyu.moe/item/${itemData.id}`;
    const embed = {
      color: 0xffa600,
      title: `Bazaar Data For: ${itemData.name}`,
      description: ``,
      thumbnail: {
        url: image,
      },
      fields: [
        {
          name: 'Buy Instantly',
          value: buyPrice.toLocaleString(),
          inline: true,
        },
        {
            name: '\u200B',
            value: '\u200B',
            inline: true,
          },
        {
          name: 'Sell Instantly',
          value: sellPrice.toLocaleString(),
          inline: true,
        },
        {
          name: 'Buy Volume',
          value: buyVolume.toLocaleString(),
          inline: true,
        },
        {
            name: '\u200B',
            value: '\u200B',
            inline: true,
          },
        {
          name: 'Sell Volume',
          value: sellVolume.toLocaleString(),
          inline: true,
        },
      ],
    };

    // Send the embed as a reply to the interaction
    return interaction.reply({ embeds: [embed] });
  },
};