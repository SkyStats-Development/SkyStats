import { Client, ActivityType } from 'discord.js';
import config from '../config/config.json';
import { Logger } from '../services/Logger';

/**
 * Sets the bot's status and activity on ready.
 */
export default {
	name: 'ready',
	once: true,
	execute(client: Client) {
		try {
			// Ensure status is a valid PresenceStatusData
			const validStatuses = ['online', 'idle', 'dnd', 'invisible'] as const;
			const status = validStatuses.includes(config.discord.Status as any)
				? (config.discord.Status as (typeof validStatuses)[number])
				: 'online';
			client.user?.setStatus(status);
			client.user?.setActivity(config.discord.Activity, {
				type: ActivityType[config.discord.ActivityType as keyof typeof ActivityType],
			});
		} catch (error) {
			Logger.discord('Failed to set bot status: ' + error);
		}
	},
};
