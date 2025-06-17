import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /uptime slash command - Shows the uptime of the bot
 */
export const data = new SlashCommandBuilder().setName('uptime').setDescription('Shows the uptime of the bot.');

export async function execute(interaction: ChatInputCommandInteraction) {
	const uptimeEmbed = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle('🕐 Uptime!')
		.setDescription(`${process.uptime()} seconds`)
		.setFooter({
			text: 'by DuckySoLucky#5181 | /help [command] for more information',
			iconURL: 'https://imgur.com/tgwQJTX.png',
		});
	await interaction.reply({ embeds: [uptimeEmbed] });
}

export default { data, execute };
