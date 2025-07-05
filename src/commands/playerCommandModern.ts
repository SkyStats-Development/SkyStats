import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { APIError, DatabaseError, NotFoundError, ErrorHandler } from '../errors';
import { getPlayerModern } from '../services/getPlayerModern';

/**
 * /player-modern slash command - Shows player data with modern error handling
 */
export const data = new SlashCommandBuilder()
	.setName('player-modern')
	.setDescription('Shows player data with modern error handling and caching')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const id = interaction.user.id;
	const name = interaction.options.getString('name') || undefined;

	try {
		const playerData = await getPlayerModern(id, name);

		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle(`Player: ${playerData.username}`)
			.setDescription(`Profile: ${playerData.profilename}\nProfile ID: ${playerData.profileid}`)
			.addFields(
				{ name: 'UUID', value: playerData.uuid2, inline: true },
				{ name: 'Profile Type', value: playerData.profile_type, inline: true },
				{ name: 'Bank Balance', value: playerData.bankBalance?.toString() || 'Unknown', inline: true },
			)
			.setTimestamp(new Date());

		await interaction.editReply({ embeds: [embed] });
	} catch (error) {
		// Handle structured errors with user-friendly messages
		let errorMessage = 'An unexpected error occurred';
		let errorTitle = 'Error';

		if (error instanceof NotFoundError) {
			errorTitle = 'Not Found';
			errorMessage = error.message;
		} else if (error instanceof APIError) {
			errorTitle = 'API Error';
			errorMessage = `Failed to fetch data from ${error.service}`;
		} else if (error instanceof DatabaseError) {
			errorTitle = 'Database Error';
			errorMessage = 'Failed to access player data';
		}

		const errorEmbed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle(errorTitle)
			.setDescription(errorMessage)
			.setTimestamp(new Date());

		await interaction.editReply({ embeds: [errorEmbed] });

		// Log the error for debugging
		const errorHandler = ErrorHandler.getInstance();
		await errorHandler.handleError(error as Error);
	}
}

export default { data, execute };
