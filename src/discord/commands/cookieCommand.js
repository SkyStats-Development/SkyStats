const axios = require('axios');

module.exports = {
  name: 'cost',
  description: 'Get the latest bazaar data for a specific item.',
  options: [
    {
      name: 'cost',
      description: 'how much you want to get',
      type: 3,
      required: true,
    }
  ],

  execute: async (interaction, client) => {
    async function calculateCost(cost) {
      try {
          const response = await axios.get('https://sky.shiiyu.moe/api/v2/bazaar');
          const cookiePrice = response.data.BOOSTER_COOKIE.sellPrice;
          const cookies = Math.round(cost / cookiePrice);
          const value = Math.round(cookies * 2.27);
          return { value, cookies };
      } catch (error) {
          console.error(error);
          return { error: 'Failed to fetch bazaar data' };
      }
  }
  
  const interactionCost = interaction.options.getString('cost');
  const { value, cookies, error } = await calculateCost(interactionCost);
  
  if (error) {
      interaction.reply({ content: error, ephemeral: true });
  } else {
    const embed = {
      color: 0xffa600,
      title: `Cost ~_~`,
      description: `${value}`,

    };
      interaction.reply({ embeds: [embed]});
  }

  },
};