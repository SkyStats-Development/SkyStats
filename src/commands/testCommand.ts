import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getPlayer } from '../services/getPlayer';
import { handleError } from '../services/handleError';
import { senitherWeight } from '../utils/senitherWeight';

/**
 * /test slash command - For testing weight calculation
 */
export const data = new SlashCommandBuilder()
	.setName('test')
	.setDescription('Test command for devs')
	.addStringOption((option) => option.setName('name').setDescription('message to send').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	const id = interaction.user.id;
	const name = interaction.options.getString('name') || undefined;
	const { profile, error } = await getPlayer(id, name);
	try {
		if (profile) {
			const result = await senitherWeight(profile as Record<string, unknown>);
			await interaction.reply({
				content: `Success.\n${JSON.stringify(result)}`,
			});
		} else {
			await interaction.reply({ content: 'No profile found.' });
		}
	} catch (error) {
		const errorEmbed = handleError(error);
		await interaction.reply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
