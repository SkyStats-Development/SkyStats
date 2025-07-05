import axios from 'axios';
import { calculateTotalSenitherWeight } from '../utils/senitherWeight';

/**
 * Get farming weight for a player by UUID.
 * @param uuid - The Minecraft UUID of the player
 * @returns Raw farming weight data (no formatting)
 * @throws Error if the API call fails or uuid is invalid
 */
export async function farmingWeight(uuid: string): Promise<{
	totalWeight: number;
	items: {
		cropWeight: Record<string, number>;
		bonusWeight: Record<string, number>;
	};
}> {
	if (!uuid || typeof uuid !== 'string') throw new Error('Invalid UUID');
	try {
		const response = await axios.get(`https://api.elitebot.dev/Weight/${uuid}/selected`);
		const data = response.data;
		return {
			totalWeight: Number(data.totalWeight),
			items: {
				cropWeight: { ...data.cropWeight },
				bonusWeight: { ...data.bonusWeight },
			},
		};
	} catch (err) {
		throw new Error('Failed to fetch farming weight: ' + (err instanceof Error ? err.message : String(err)));
	}
}

/**
 * Get Senither weight for a Skyblock profile.
 * @param profile - The Skyblock profile object
 * @returns Raw Senither weight data (no formatting)
 * @throws Error if calculation fails or input is invalid
 */
export async function senitherWeight(profile: Record<string, unknown>): Promise<{
	total: number;
	totalWeight: number;
	totalOverflow: number;
	skills: Record<string, { weight: number; weight_overflow: number }>;
	slayer: Record<string, { weight: number; weight_overflow: number }>;
	dungeons: Record<string, { weight: number; weight_overflow: number }>;
}> {
	if (!profile || typeof profile !== 'object') throw new Error('Invalid profile');
	const weight = await calculateTotalSenitherWeight(profile);

	// Convert to the expected format with overflow information
	return {
		total: weight.total,
		totalWeight: weight.totalWeight,
		totalOverflow: weight.totalOverflow,
		skills: weight.skills,
		slayer: weight.slayer,
		dungeons: weight.dungeons,
	};
}
