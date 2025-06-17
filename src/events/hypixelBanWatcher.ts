import axios from 'axios';
import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';
import { addCommas } from '../contracts/helperFunctions';

let messageSent = false;
let messageId: string | undefined;

/**
 * Tracks Hypixel ban statistics and posts to a Discord channel.
 */
export async function banTracker(client: Client) {
	try {
		const data = await axios.get('https://api.hypixel.net/punishmentstats');
		const channel = client.channels.cache.get(config.discord.ban_log_channel) as TextChannel;
		const embed = new EmbedBuilder()
			.setTitle('🔨 Hypixel Ban Statistics 🔨')
			.setDescription('Hypixel ban statistics are updated every 10 seconds')
			.setTimestamp(new Date())
			.addFields(
				{
					name: '🔨 Total Statistics 🔨',
					value: `🚓 **Staff Total**: ${addCommas(
						data.data.staff_total,
					)}\n<a:doge:1129093360733388880> **Watchdog Total**: ${addCommas(data.data.watchdog_total)}`,
				},
				{
					name: '🔃 Rolling Daily Ban Statistics 🔃',
					value: `🚓 **Staff**: ${addCommas(
						data.data.staff_rollingDaily,
					)}\n<a:doge:1129093360733388880> **Watchdog**: ${addCommas(data.data.watchdog_rollingDaily)}`,
					inline: true,
				},
			)
			.setFooter({ text: config.messages.discord.defaultbetter, iconURL: config.messages.discord.icon });

		if (messageSent && messageId) {
			await channel.messages.fetch(messageId).then((msg) => msg.edit({ embeds: [embed] }));
		} else {
			const msg = await channel.send({ embeds: [embed] });
			messageId = msg.id;
			messageSent = true;
		}
	} catch (error) {
		console.error(error);
	}
}

export default { banTracker };
