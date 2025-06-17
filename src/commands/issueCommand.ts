import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';

const messages = config.messages.discord;

/**
 * /issue slash command - Report an issue with the bot and its commands
 */
export const data = new SlashCommandBuilder()
	.setName('issue')
	.setDescription('Report an issue with the bot and its commands')
	.addStringOption((option) =>
		option
			.setName('message')
			.setDescription('Message to send to developers! (Please be as detailed as possible)')
			.setRequired(true),
	)
	.addStringOption((option) =>
		option.setName('command').setDescription('Command that is having issues').setRequired(false),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const message = interaction.options.getString('message')?.replaceAll('\\n', '\n') || '';
	const command = interaction.options.getString('command') || 'None';
	const channel = interaction.client.channels.cache.get('1070150424725819484');
	const user = interaction.user.id;
	const guild = interaction.guild?.name || 'Unknown';
	const messagelink = `https://discord.com/channels/${interaction.guild?.id}/${interaction.channel?.id}/${interaction.id}`;
	const embed = new EmbedBuilder()
		.setTitle('Issue Report')
		.setDescription(
			`By: ${user}\nIn Server: **${guild}**\nCommand: **${command}**\nMessage: ${message}\n\n[Area where it happened](${messagelink})`,
		)
		.setTimestamp(new Date())
		.setFooter({ text: messages.defaultbetter, iconURL: messages.icon });
	if (channel?.isTextBased()) {
		await (channel as any).send({ embeds: [embed] });
	}
	await interaction.reply({
		content: 'Your report has been shared with the developers, do not delete this message.',
	});
}

export default { data, execute };
