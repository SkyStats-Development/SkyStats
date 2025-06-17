import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';

const messages = config.messages.discord;

/**
 * /help slash command - Shows help menu
 */
export const data = new SlashCommandBuilder().setName('help').setDescription('Shows help menu');

export async function execute(interaction: ChatInputCommandInteraction) {
	const embed = new EmbedBuilder()
		.setTitle('SkyStats Help Menu')
		.setDescription('Shows important information about SkyStats!')
		.addFields(
			{
				name: 'Discord',
				value: '[Discord Support Server](https://discord.gg/DNHdpx8wwn)',
				inline: false,
			},
			{
				name: 'Bot Invite',
				value: '[Click Here To Invite SkyStats](https://discord.com/api/oauth2/authorize?client_id=1059645184272519260&permissions=8&scope=bot%20applications.commands)',
				inline: false,
			},
			{
				name: 'Bot Invite (Basic Permissions) Not Recommended',
				value: '[Click Here To Invite SkyStats](https://discord.com/api/oauth2/authorize?client_id=1059645184272519260&permissions=982474156113&scope=bot%20applications.commands)',
				inline: false,
			},
			{
				name: 'Report Issues',
				value: 'Report all command issues with the `/issue` command!',
				inline: false,
			},
		)
		.setTimestamp(new Date())
		.setFooter({ text: messages.defaultbetter, iconURL: messages.icon });
	await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
