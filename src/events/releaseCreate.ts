import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';

/**
 * Sends a release update embed to the release channel.
 */
export async function releaseCreate(client: Client, oldVersion: string, newVersion: string, value: string) {
	try {
		const channel = client.channels.cache.get(config.discord.releaseChannel) as TextChannel;
		const embed = new EmbedBuilder()
			.setTitle('🌹 An Update Has Arrived! 🌹')
			.setDescription(`**VERSION CHANGED**\n ${oldVersion} => ${newVersion}`)
			.setTimestamp(new Date())
			.addFields({ name: 'ChangeLog', value, inline: true })
			.setFooter({ text: config.messages.discord.defaultbetter, iconURL: config.messages.discord.icon });
		await channel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
}

export default { releaseCreate };
