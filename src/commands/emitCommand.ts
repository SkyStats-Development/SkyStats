import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /emit slash command - Emits a message to the channel
 */
export const data = new SlashCommandBuilder()
	.setName('emit')
	.setDescription('Emits a message')
	.addStringOption((option) => option.setName('message').setDescription('Message to send').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
	const message = interaction.options.getString('message')?.replaceAll('\\n', '\n') || '';
	// Only send if the channel is a TextChannel
	if (interaction.channel && interaction.channel.isTextBased() && 'send' in interaction.channel) {
		await (interaction.channel as import('discord.js').TextChannel).send(message);
	}
	const embed = new EmbedBuilder()
		.setColor(0x00ff00)
		.setTitle('Success')
		.setDescription('Message sent successfully.');
	await interaction.reply({ embeds: [embed], ephemeral: true });
}

export default { data, execute };
