import axios from 'axios';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /bazaar slash command - Get the latest bazaar data for a specific item.
 */
export const data = new SlashCommandBuilder()
	.setName('bazaar')
	.setDescription('Get the latest bazaar data for a specific item.')
	.addStringOption((option) =>
		option.setName('item').setDescription('The name of the item to get data for.').setRequired(true),
	)
	.addIntegerOption((option) =>
		option.setName('amount').setDescription('The amount of items to get data for.').setRequired(false),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const item = interaction.options.getString('item')?.toLowerCase() || '';
	let amount = interaction.options.getInteger('amount') || 1;
	if (amount < 1) {
		await interaction.editReply('Amount must be at least 1.');
		return;
	}
	try {
		const response = await axios.get('https://api.hypixel.net/skyblock/bazaar');
		const itemData: any = Object.values(response.data).find((data: any) => data.name.toLowerCase() === item);
		if (!itemData) {
			await interaction.editReply(`Sorry, I couldn't find any data for "${item}".`);
			return;
		}
		const buyPrice = itemData.buyPrice * amount;
		const sellPrice = itemData.sellPrice * amount;
		const buyVolume = itemData.buyVolume * amount;
		const sellVolume = itemData.sellVolume * amount;
		const image = `https://sky.shiiyu.moe/item/${itemData.id}`;
		const embed = new EmbedBuilder()
			.setColor(0xffa600)
			.setTitle(`Bazaar Data For: ${itemData.name}`)
			.setThumbnail(image)
			.addFields([
				{
					name: 'Buy Instantly',
					value: buyPrice.toLocaleString(),
					inline: true,
				},
				{ name: '\u200B', value: '\u200B', inline: true },
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
				{ name: '\u200B', value: '\u200B', inline: true },
				{
					name: 'Sell Volume',
					value: sellVolume.toLocaleString(),
					inline: true,
				},
			])
			.setFooter({
				text: 'SkyStats Bazaar',
				iconURL: 'https://i.imgur.com/hggczHP.png',
			});
		await interaction.editReply({ embeds: [embed] });
	} catch (error: any) {
		await interaction.editReply('Failed to fetch bazaar data.');
	}
}

export default { data, execute };
