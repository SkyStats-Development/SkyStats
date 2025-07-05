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

// Type definitions for handleProfile return data
interface SkillData {
	skills: {
		skill_average: number;
		total_experience: number;
		[key: string]:
			| number
			| {
					level: number;
					xp: number;
					levelWithProgress: number;
					xpTillNextLevel: number;
			  };
	};
}

interface SlayerData {
	[key: string]: {
		level: number;
		experience: number;
	};
}

interface HoTMData {
	level: number;
	levelWithProgress: number;
	experience?: number;
	total_experience?: number;
}

interface GardenData {
	level: number;
	levelWithProgress: number;
	experience?: number;
	total_experience?: number;
}

interface SkyblockProfile {
	leveling?: {
		experience: number;
	};
	player_data?: unknown;
	slayer?: unknown;
	mining_core?: {
		experience: number;
	};
	dungeons?: {
		dungeon_types?: {
			catacombs?: {
				experience: number;
			};
		};
	};
	events?: {
		easter?: {
			chocolate_level: number;
		};
	};
	banking?: {
		balance?: number;
		personal_bank?: number;
	};
	currencies?: {
		coin_purse?: number;
		personal_bank?: number;
	};
	museum?: unknown;
}

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
	profile: SkyblockProfile,
	profileID: string,
	_profileRes?: unknown,
): Promise<{
	skyblock_level: number | null;
	senither_weight: number | null;
	time_charms: number;
	hoppity_prestige: number;
	skill_average: number | null;
	skill_data: SkillData | null;
	slayer_data: SlayerData | null;
	hotm_data: HoTMData | null;
	garden_data: GardenData | null;
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
		const bankBalance = profile?.banking?.balance ?? 0;
		const [networth_obj, garden_obj, weight_data] = await Promise.all([
			getSkyHelper(profile, bankBalance, profile?.museum),
			getGarden(profileID, uuid),
			senitherWeight(profile as Record<string, unknown>),
		]);

		// Check if garden_obj is an error object (handleError returns an object with 'title' or 'content')
		const gardenXP =
			garden_obj &&
			typeof garden_obj === 'object' &&
			'gardenXP' in garden_obj &&
			typeof garden_obj.gardenXP === 'number'
				? garden_obj.gardenXP
				: 0;
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
			skill_data,
			slayer_data,
			hotm_data,
			garden_data,
			catacombs_level: catacombs_data?.levelWithProgress ?? null,
			networth: {
				purse: networth_obj?.networth.purse ?? null,
				bank: networth_obj?.networth.bank ?? null,
				personal_bank: profile?.banking?.personal_bank ?? profile?.currencies?.personal_bank ?? null,
				total_networth: networth_obj?.networth.networth ?? null,
				unsoulbound_networth: networth_obj?.networth.unsoulboundNetworth ?? null,
			},
		};
	} catch (err) {
		throw new Error('Failed to handle profile: ' + (err instanceof Error ? err.message : String(err)));
	}
}
