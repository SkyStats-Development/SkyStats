import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getPlayer } from '../services/getPlayer';

/**
 * /player slash command - Shows player data in an embed
 */
export const data = new SlashCommandBuilder()
	.setName('player')
	.setDescription('Shows player data in an embed')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	const id = interaction.user.id;
	const name = interaction.options.getString('name') || undefined;
	const { uuid2, username, profilename, profileid, error } = await getPlayer(id, name);
	if (error) {
		const errorembed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle('Error')
			.setDescription(
				`Data: ${typeof error === 'object' && error && 'description' in error ? error.description : 'An error occurred'}`,
			)
			.setTimestamp(new Date());
		await interaction.editReply({ embeds: [errorembed] });
		return;
	}
	// Add more player data as needed
	const embed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle(`Player: ${username}`)
		.setDescription(`Profile: ${profilename}\nProfile ID: ${profileid}`)
		.setTimestamp(new Date());
	await interaction.editReply({ embeds: [embed] });
}

export default { data, execute };
