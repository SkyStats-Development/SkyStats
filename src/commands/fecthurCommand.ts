import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';
import { getFetchur } from '../services/getFecthur';

const messages = config.messages.discord;

/**
 * /fetchur slash command - Fetches the current fetchur item
 */
export const data = new SlashCommandBuilder().setName('fetchur').setDescription('Fetches the current fetchur item');

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	try {
		const fetchur = await getFetchur();
		if (!fetchur) {
			throw new Error('Fetchur item not found');
		}
		const { name, quantity, text, image, description } = fetchur;
		const embed = new EmbedBuilder()
			.setColor(0xffa600)
			.setTitle(`Todays Fetchur Item Is: ${text}`)
			.setDescription(`\`${quantity}\`x **${name}**\n\n${description}`)
			.setThumbnail(image);
		await interaction.editReply({ embeds: [embed] });
	} catch (error: any) {
		const embed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle('Error')
			.setDescription(
				'An error with the Hypixel API has occurred. Please try again later. If the error persists, please contact the bot developer.',
			);
		await interaction.editReply({ embeds: [embed] });
	}
}

export default { data, execute };
