import axios from 'axios';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /xpqndy slash command - Get the latest bazaar data for a specific item.
 */
export const data = new SlashCommandBuilder()
	.setName('xpqndy')
	.setDescription('Get the latest bazaar data for a specific item.')
	.addStringOption((option) =>
		option.setName('item_id').setDescription('How much you want to get').setRequired(true),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const item = interaction.options.getString('item_id')?.toLowerCase() || '';
	try {
		const response = await axios.get('https://api.hypixel.net/v2/skyblock/bazaar');
		const itemData = Object.values(response.data.products).find(
			(data: any) => (data as any).product_id.toLowerCase() === item,
		) as any;
		if (!itemData) {
			await interaction.editReply('Item not found.');
			return;
		}
		const quick = itemData.quick_status;
		const diff = quick.buyPrice - quick.sellPrice;
		let formula = 0;
		if (quick.sellOrders > 50) formula = diff / 2.5;
		if (quick.sellOrders > 100) formula = diff / 2;
		const embed = new EmbedBuilder()
			.setColor(0xffa600)
			.setTitle('Bazaar Data')
			.setDescription(
				`Bazaar Data for ${item}\n\n${itemData.product_id}\nBuy Price: ${quick.buyPrice}\nSell Price: ${
					quick.sellPrice
				}\nSell Orders: ${quick.sellOrders}\nBuy Orders: ${
					quick.buyOrders
				}\nUndercut price: ${formula}\nSell Price: ${quick.buyPrice - formula}`,
			);
		await interaction.editReply({ embeds: [embed] });
	} catch (error) {
		await interaction.editReply('Failed to fetch bazaar data.');
	}
}

export default { data, execute };
