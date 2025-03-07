const axios = require('axios');

async function calculateCost(item) {
    try {
        const response = await axios.get('https://api.hypixel.net/v2/skyblock/bazaar');
        const itemData = Object.values(response.data.products).find(
            (data) => data.product_id.toLowerCase() === item
        );
        console.log(itemData)

        return { itemData: itemData.quick_status };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching the data.' };
    }
}

module.exports = {
    name: 'xpqndy',
    description: 'Get the latest bazaar data for a specific item.',
    options: [
        {
            name: 'item_id',
            description: 'how much you want to get',
            type: 3,
            required: true,
        }
    ],

    execute: async (interaction, client) => {
        const item = interaction.options.getString('item_id').toLowerCase();
        const itemData = await calculateCost(item);
        console.log(itemData, "meow")
        let formula = 0;
        let diff = itemData.buyPrice - itemData.sellPrice;
        if (itemData.sellOrders > 50) {
            formula = diff / 2.5;
        }
        if (itemData.sellOrders > 100) {
            formula = diff / 2;
        }

        const embed = {
            color: 0xffa600,
            title: `zz`,
            description: `Bazaar Data for ${item}\n\n${itemData.product_id}\n${itemData.buyprice}\n${itemData.sellprice}\n${itemData.sellOrders}\n${itemData.buyOrders}\nUndercut price: ${formula}\nSell Price ${itemData.buyprice - formula}`,

        };
        interaction.reply({ embeds: [embed] });
    }

}

