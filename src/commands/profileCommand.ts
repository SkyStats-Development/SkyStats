import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { getPlayer } from '../services/getPlayer';
import { handleError } from '../services/handleError';
import { handleProfile } from '../services/handleProfile';
import { buildProfileEmbed } from '../embeds/profileEmbed';

/**
 * /profile slash command - fetches and displays a user's Skyblock profile
 */
export const data = new SlashCommandBuilder()
	.setName('profile')
	.setDescription('Fetches your profile!')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	try {
		const id = interaction.user.id;
		const name = interaction.options.getString('name') || undefined;
		const {
			uuid2,
			username,
			profilename,
			profileid,
			first_join,
			profile,
			profile_members,
			profile_type,
			profileRes,
			error,
		} = await getPlayer(id, name, { PROFILE_ONLY: true });
		if (error) {
			await interaction.editReply({ embeds: [error] });
			return;
		}
		const profileData = await handleProfile(uuid2, profile, profileid, profileRes);
		const profileEmbed = await buildProfileEmbed(
			uuid2,
			username,
			profilename,
			profileid,
			first_join,
			profile_members,
			profile_type,
			profileData,
		);
		await interaction.editReply({ embeds: [profileEmbed] });
	} catch (error) {
		const errorEmbed = handleError(error);
		await interaction.editReply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
