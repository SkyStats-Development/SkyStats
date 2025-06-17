import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

/**
 * /factsbro slash command - Shows safe mods and info
 */
export const data = new SlashCommandBuilder().setName('factsbro').setDescription('Show safe mods and info');

export async function execute(interaction: ChatInputCommandInteraction) {
	const channel = interaction.client.channels.cache.get('1113961740863017020');
	const embed = new EmbedBuilder()
		.setTitle('Safe Mods')
		.setDescription(
			'Below is a list of mods considered safe by Ratter Scanner, alongside their official github repo and other links!!\n*Wish to see another popular mod on this list? Please let us know by opening a ticket with the buttons at the bottom of this message!*',
		)
		.setTimestamp(new Date())
		.addFields(
			{
				name: 'Skytils',
				value: 'Developers: Nick or smth idk bunch of catboys\n[Github Repo](https://github.com/SkyStats-Development) || [Discord](https://discord.gg/ytdpGZM5)',
				inline: true,
			},
			{
				name: 'Not Enough Updates(NEU)',
				value: 'Developers: People who hate me\n[Old Repo](https://github.com/SkyStats-Development) || [New Repo](https://github.com/SkyStats-Development) || [Discord](https://github.com/SkyStats-Development)',
				inline: true,
			},
			{
				name: '[PAID MOD] Oringo Client',
				value: 'Developers: Oringo, Daduduze\n[This is a paid mod - read our article on it](https://discord.gg/ytdpGZM5)',
				inline: true,
			},
		)
		.setFooter({ text: 'Giggacum Projecter Link' });
	if (channel?.isTextBased()) {
		await (channel as any).send({ embeds: [embed] });
	}
	await interaction.reply({
		content: 'Your report has been shared with the developers, do not delete this message.',
	});
}

export default { data, execute };
