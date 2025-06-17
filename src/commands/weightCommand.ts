import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getPlayer } from '../services/getPlayer';
import { farmingWeight, senitherWeight } from '../services/getWeight';
import { handleError } from '../services/handleError';
import { buildFarmingWeightEmbed, buildSenitherWeightEmbed } from '../embeds/weightEmbed';

/**
 * /weight slash command - shows a player's weight breakdown
 */
export const data = new SlashCommandBuilder()
	.setName('weight')
	.setDescription("Shows a player's weight")
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	try {
		const id = interaction.user.id;
		const name = interaction.options.getString('name') || undefined;
		const { uuid2, username, profilename, profile } = await getPlayer(id, name);

		const farming = await farmingWeight(uuid2);
		const senither = await senitherWeight(profile);

		const farmingEmbed = await buildFarmingWeightEmbed(uuid2, username, profilename, farming);
		const senitherEmbed = await buildSenitherWeightEmbed(profile, username, profilename, uuid2, senither);

		await interaction.editReply({ embeds: [senitherEmbed, farmingEmbed] });
	} catch (error) {
		const errorEmbed = handleError(error);
		await interaction.editReply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
