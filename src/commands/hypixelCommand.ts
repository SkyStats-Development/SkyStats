import { SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } from 'discord.js';
import { getGuild } from '../services/getGuild';
import { getPlayer } from '../services/getPlayer';
import { handleError } from '../services/handleError';
import { HypixelImageBuilder } from '../embeds/HypixelImageBuilder';

/**
 * /hypixel slash command - Generates a Hypixel player card image
 */
export const data = new SlashCommandBuilder()
	.setName('hypixel')
	.setDescription('Generates a Hypixel player card image')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(false));

/**
 * Executes the /hypixel command, generating a player card image.
 */
export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	try {
		const id = interaction.user.id;
		const name = interaction.options.getString('name') || undefined;
		const { uuid2, username, playerData, error } = await getPlayer(id, name);
		if (error) {
			await interaction.editReply({ embeds: [error] });
			return;
		}

		const guild = await getGuild(uuid2);

		// Generate the image using the builder
		const imageBuffer = await HypixelImageBuilder.build({
			uuid2,
			username,
			playerData,
			guild,
		});
		const attachment = new AttachmentBuilder(imageBuffer, {
			name: `${username}_hypixel.png`,
		});
		await interaction.editReply({ files: [attachment] });
	} catch (err) {
		const errorEmbed = handleError(err);
		await interaction.editReply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
