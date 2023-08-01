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
    const cost = interaction.options.getString('cost');
    const axios = require('axios');
        const response = await axios.get('https://sky.shiiyu.moe/api/v2/bazaar');
        const cookiePrice = response.data.BOOSTER_COOKIE.sellPrice;
        const cookies = Math.round(cost / cookiePrice);
        const value = Math.round(cookies * 2.27);

    const embed = {
      color: 0xffa600,
      title: `How muchthing yeah i coded at 8am no sleep`,
      description: `${value}`,

    };

    // Send the embed as a reply to the interaction
    return interaction.reply({ embeds: [embed] });
  },
};