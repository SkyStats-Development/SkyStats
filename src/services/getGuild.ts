import axios from 'axios';
import { handleError } from './handleError';

const key = process.env.KEY;

/**
 * Get the guild of a player by UUID from the Hypixel API.
 */
export async function getGuild(uuid: string) {
	if (!uuid) {
		return handleError('playerNotFound');
	}
	try {
		const guildData = await axios.get(`https://api.hypixel.net/v2/guild?key=${key}&player=${uuid}`);
		return {
			guildData: guildData.data,
		};
	} catch (error) {
		return handleError(error);
	}
}
