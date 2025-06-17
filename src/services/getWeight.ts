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
export async function senitherWeight(profile: any): Promise<{
	total: number;
	totalWeight: number;
	totalOverflow: number;
	skills: Record<string, { weight: number; overflow: number }>;
	slayers: Record<string, { weight: number; overflow: number }>;
	dungeons: Record<string, { weight: number; overflow: number }>;
}> {
	if (!profile || typeof profile !== 'object') throw new Error('Invalid profile');
	const weight = await calculateTotalSenitherWeight(profile);
	let totalWeight = 0;
	let totalOverflow = 0;
	const skills: Record<string, { weight: number; overflow: number }> = {};
	const slayers: Record<string, { weight: number; overflow: number }> = {};
	const dungeons: Record<string, { weight: number; overflow: number }> = {};
	for (const skill in weight.skills) {
		totalWeight += weight.skills[skill].weight;
		totalOverflow += weight.skills[skill].weight_overflow;
		skills[skill] = {
			weight: weight.skills[skill].weight,
			overflow: weight.skills[skill].weight_overflow,
		};
	}
	for (const slayer in weight.slayer) {
		totalWeight += weight.slayer[slayer].weight;
		totalOverflow += weight.slayer[slayer].weight_overflow;
		slayers[slayer] = {
			weight: weight.slayer[slayer].weight,
			overflow: weight.slayer[slayer].weight_overflow,
		};
	}
	for (const dungeon in weight.dungeons) {
		totalWeight += weight.dungeons[dungeon].weight;
		totalOverflow += weight.dungeons[dungeon].weight_overflow;
		dungeons[dungeon] = {
			weight: weight.dungeons[dungeon].weight,
			overflow: weight.dungeons[dungeon].weight_overflow,
		};
	}
	return {
		total: totalWeight + totalOverflow,
		totalWeight,
		totalOverflow,
		skills,
		slayers,
		dungeons,
	};
}
