import { Client, Interaction } from 'discord.js';
import { Logger } from '../services/Logger';

/**
 * Handles Discord interactionCreate events (slash commands, etc).
 */
export default {
	name: 'interactionCreate',
	once: false,
	async execute(interaction: Interaction, client: Client) {
		if (!interaction.isChatInputCommand()) return;
		const command = (interaction.client as any).commands.get(interaction.commandName);
		if (!command) return;
		try {
			Logger.discord(`${interaction.user.username} - [${interaction.commandName}]`);
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			await interaction.editReply({
				content: 'There was an error while executing this command!\n\n' + error,
			});
		}
	},
};
