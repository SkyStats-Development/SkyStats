import axios from 'axios';
import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';

let messageId: string | undefined;

/**
 * Tracks Hypixel bans per minute and posts to a Discord channel.
 */
export async function banTracker(client: Client) {
	try {
		const data = await axios.get('https://api.hypixel.net/punishmentstats');
		const channel = client.channels.cache.get(config.discord.ban_log_channel) as TextChannel;
		const embed = new EmbedBuilder()
			.setTitle('A wild 🔨 Ban 🔨 has appeared!')
			.setDescription('(This should be updated every minute)')
			.setTimestamp(new Date())
			.addFields({
				name: 'Latest Ban(s)',
				value: `🚓\`${data.data.watchdog_lastMinute}\` Ban(s) in the last minute`,
				inline: true,
			})
			.setFooter({ text: config.messages.discord.defaultbetter, iconURL: config.messages.discord.icon });

		if (messageId) {
			const previousMessage = await channel.messages.fetch(messageId);
			if (previousMessage) await previousMessage.delete();
		}
		const sentMessage = await channel.send({ embeds: [embed] });
		messageId = sentMessage.id;
	} catch (error) {
		console.error(error);
	}
}

export default { banTracker };
