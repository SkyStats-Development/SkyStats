import fs from 'fs';
import * as path from 'path';
import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import Parser from 'rss-parser';
import config from '../config/config.json';
import { writeAt } from '../contracts/helperFunctions';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parser = new Parser();
const eventsFolderPath = path.join(__dirname);
const filePath = path.join(eventsFolderPath, 'skyblockNotifier.json');
const dir = filePath;

/**
 * Checks for Hypixel incidents and sends new ones to Discord.
 */
export async function checkForIncidents(client: Client) {
	try {
		const status = await parser.parseURL('https://status.hypixel.net/history.rss');
		const channel = client.channels.cache.get('1068059513866952754') as TextChannel;
		for (const data of status.items) {
			const currentStatus = JSON.parse(fs.readFileSync(dir, 'utf8')).skyblockStatus;
			const content = JSON.stringify(data.contentSnippet).replaceAll('"', '').replaceAll('  ', ' ').split('\\n');
			for (let i = 0; i < content.length; i++) {
				const incident = content[i];
				if (i % 2 === 0) continue;
				if (!currentStatus.includes(`${data.title} | ${incident} | ${content[i - 1]}`)) {
					currentStatus.push(`${data.title} | ${incident} | ${content[i - 1]}`);
					await writeAt(dir, 'skyblockStatus', currentStatus);
					const embed = new EmbedBuilder()
						.setTitle(`${data.title}`)
						.setDescription(`${incident}`)
						.setURL(`${data.link}`)
						.setColor(16711680)
						.setTimestamp(new Date(data.isoDate || ''))
						.setFooter({ text: config.messages.discord.defaultbetter });
					await channel.send({ embeds: [embed] });
				}
			}
		}
	} catch (error) {
		console.error(error);
	}
}

/**
 * Checks for Skyblock patch notes and sends new ones to Discord.
 */
export async function checkForSkyblockUpdates(client: Client) {
	try {
		const feed = await parser.parseURL('https://hypixel.net/forums/skyblock-patch-notes.158/index.rss');
		const channel = client.channels.cache.get('1068059513866952754') as TextChannel;
		for (const data of feed.items) {
			const currentUpdates = JSON.parse(fs.readFileSync(dir, 'utf8')).skyblockNews;
			if (!currentUpdates.includes(`${data.title} | ${data.link}`)) {
				currentUpdates.push(`${data.title} | ${data.link}`);
				await writeAt(dir, 'skyblockNews', currentUpdates);
				const embed = new EmbedBuilder()
					.setTitle(`${data.title}`)
					.setDescription(`${data.contentSnippet}`)
					.setURL(`${data.link}`)
					.setColor(16711680)
					.setTimestamp(new Date(data.isoDate || ''))
					.setFooter({ text: config.messages.discord.defaultbetter });
				await channel.send({ embeds: [embed] });
			}
		}
	} catch (error) {
		console.error(error);
	}
}

export default { checkForIncidents, checkForSkyblockUpdates };
