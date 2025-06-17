import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';
import config from '../config/config.json';
import packageJson from '../../package.json';

const messages = config.messages.discord;

/**
 * /publish slash command - Publishes a new release to the upstream
 */
export const data = new SlashCommandBuilder()
	.setName('publish')
	.setDescription('Publishes a new release to the upstream')
	.addStringOption((option) => option.setName('changelog').setDescription('Changelog Value').setRequired(false))
	.addStringOption((option) =>
		option
			.setName('version')
			.setDescription(
				`Version Change in format major.minor.patch.beta current version being ${packageJson.version}`,
			)
			.setRequired(false),
	);

export async function execute(interaction: ChatInputCommandInteraction) {
	const changelogValue = interaction.options.getString('changelog')?.replaceAll('\\n', '\n') || '';
	const versionValue = interaction.options.getString('version') || packageJson.version;
	const embed = new EmbedBuilder()
		.setTitle('🌹 An Example Has Arrived! 🌹')
		.setDescription(`**VERSION CHANGED**\n ${packageJson.version} > ${versionValue}`)
		.setTimestamp(new Date())
		.addFields({ name: 'ChangeLog', value: changelogValue, inline: true })
		.setFooter({ text: messages.defaultbetter, iconURL: messages.icon });
	const confirm = new ButtonBuilder()
		.setCustomId('confirm')
		.setLabel('Publish Changelog')
		.setStyle(ButtonStyle.Danger);
	const cancel = new ButtonBuilder().setCustomId('cancel').setLabel('Cancel').setStyle(ButtonStyle.Secondary);
	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(cancel, confirm);
	await interaction.reply({ embeds: [embed], components: [row] });
}

export default { data, execute };
