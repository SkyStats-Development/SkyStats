import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

/**
 * /crypt slash command - Shows a Skycrypt Link
 */
export const data = new SlashCommandBuilder()
	.setName('crypt')
	.setDescription('Shows a Skycrypt Link')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
	const name = interaction.options.getString('name', true);
	await interaction.reply({
		content: `https://sky.shiiyu.moe/stats/${name}`,
	});
}

export default { data, execute };
