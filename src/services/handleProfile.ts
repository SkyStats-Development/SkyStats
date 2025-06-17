import { getGarden } from './getGarden';
import { getSkyHelper } from './getSkyHelper';
import { senitherWeight } from './getWeight';
import {
	handleSkills,
	handleCatacombsLevel,
	handleSlayers,
	handleHoTMXP,
	handleGardenXP,
	calcTimeCharms,
} from './handleSkills';

/**
 * Handle and aggregate Skyblock profile data for a user.
 * @param uuid - The Minecraft UUID
 * @param profile - The Skyblock profile object
 * @param profileID - The profile ID
 * @param profileRes - The raw profile API response
 * @returns Aggregated, raw profile data (no formatting)
 * @throws Error if any API call fails or input is invalid
 */
export async function handleProfile(
	uuid: string,
	profile: any,
	profileID: string,
	profileRes: any,
): Promise<{
	skyblock_level: number | null;
	senither_weight: number | null;
	time_charms: number;
	hoppity_prestige: number;
	skill_average: number | null;
	slayer_data: any;
	hotm_data: any;
	garden_data: any;
	catacombs_level: number | null;
	networth: {
		purse: number | null;
		bank: number | null;
		total_networth: number | null;
		unsoulbound_networth: number | null;
		personal_bank: number | null;
	};
}> {
	if (!uuid || typeof uuid !== 'string') throw new Error('Invalid UUID');
	if (!profile || typeof profile !== 'object') throw new Error('Invalid profile');
	if (!profileID || typeof profileID !== 'string') throw new Error('Invalid profileID');
	try {
		const [networth_obj, garden_obj, weight_data] = await Promise.all([
			getSkyHelper(profile, profile?.banking?.balance ?? 0, profile?.museum),
			getGarden(profileID, uuid),
			senitherWeight(profile),
		]);

		// Check if garden_obj is an error object (handleError returns an object with 'title' or 'content')
		const gardenXP = (garden_obj && 'gardenXP' in garden_obj && typeof (garden_obj as any).gardenXP === 'number') ? (garden_obj as any).gardenXP : 0;
		const garden_data = handleGardenXP(gardenXP);
		const hotm_data = handleHoTMXP(profile?.mining_core?.experience || 0);
		const skill_data = handleSkills(profile?.player_data || 0);
		const slayer_data = handleSlayers(profile?.slayer || 0);
		const catacombs_data = handleCatacombsLevel(profile?.dungeons?.dungeon_types?.catacombs?.experience || 0);
		return {
			skyblock_level:
				typeof profile?.leveling?.experience === 'number' ? profile.leveling.experience / 100 : null,
			senither_weight: weight_data?.total ?? null,
			time_charms: calcTimeCharms(profile) || 0,
			hoppity_prestige: profile?.events?.easter?.chocolate_level || 0,
			skill_average: skill_data?.skills?.skill_average ?? null,
			slayer_data,
			hotm_data,
			garden_data,
			catacombs_level: catacombs_data?.levelWithProgress ?? null,
			networth: {
				purse: networth_obj?.networth.purse ?? null,
				bank: networth_obj?.networth.bank ?? null,
				personal_bank: profile?.banking?.personal_bank ?? null,
				total_networth: networth_obj?.networth.networth ?? null,
				unsoulbound_networth: networth_obj?.networth.unsoulboundNetworth ?? null,
			},
		};
	} catch (err) {
		throw new Error('Failed to handle profile: ' + (err instanceof Error ? err.message : String(err)));
	}
}
