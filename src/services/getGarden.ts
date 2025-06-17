import axios from 'axios';
import { handleError } from '../services/handleError';

const key = process.env.KEY;

/**
 * Get garden data for a Skyblock profile.
 */
export async function getGarden(profileid: string, uuid: string) {
	if (!profileid || !uuid) {
		return handleError('playerNotFound');
	}
	try {
		const gardenData = await axios.get(
			`https://api.hypixel.net/v2/skyblock/garden?key=${key}&profile=${profileid}`,
		);
		return {
			gardenRes: gardenData.data,
			gardenData: gardenData.data.garden,
			gardenXP: gardenData.data.garden.garden_experience || 0,
		};
	} catch (error) {
		return handleError(error);
	}
}
