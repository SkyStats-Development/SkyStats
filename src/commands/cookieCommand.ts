import axios from 'axios';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /cost slash command - Calculate the cost and cookies for a given value
 */
export const data = new SlashCommandBuilder()
	.setName('cost')
	.setDescription('Get the latest bazaar data for a specific item.')
	.addStringOption((option) => option.setName('cost').setDescription('How much you want to get').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const interactionCost = Number(interaction.options.getString('cost'));
	if (isNaN(interactionCost) || interactionCost <= 0) {
		await interaction.editReply({
			content: 'Please provide a valid cost value.',
		});
		return;
	}
	try {
		const response = await axios.get('https://sky.shiiyu.moe/api/v2/bazaar');
		const cookiePrice = response.data.BOOSTER_COOKIE.sellPrice;
		const cookies = interactionCost / cookiePrice;
		const value = cookies * 2.27;
		const embed = new EmbedBuilder().setColor(0xffa600).setTitle('Cost ~_~').setDescription(`${value}\n${cookies}`);
		await interaction.editReply({ embeds: [embed] });
	} catch (error) {
		await interaction.editReply({
			content: 'Failed to fetch bazaar data',
		});
	}
}
export default { data, execute };
