import axios from 'axios';
import { handleError, handlePlayer } from '../services/handleError';
import { DatabaseHandler } from '../services/DatabaseHandler';

const cache: Record<string, { timestamp: number; data: any }> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export interface PlayerFlags {
	PROFILE_ONLY?: boolean;
	CHECK_MEMBERS?: boolean;
	INCLUDE_NETWORTH?: boolean;
	INCLUDE_MUSEUM?: boolean;
	[key: string]: boolean | undefined;
}

/**
 * Get player and profile data, with all required API calls and array-based flagging.
 * Returns all data needed for networth/profile in a single result.
 */
export async function getPlayer(id: string, name?: string, flags: PlayerFlags = {}) {
	const cacheKey = `${id}-${name}-${JSON.stringify(flags)}`;
	const now = Date.now();
	if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
		return cache[cacheKey].data;
	}
	const db = await DatabaseHandler.getDb();
	const collection = db.collection('linkedAccounts');
	let minecraftUuid = '';
	try {
		const result = await collection.findOne({ discordId: id });
		if (result) {
			minecraftUuid = result.minecraftUuid;
		} else if (!name) {
			throw new Error('No linked account found');
		}
	} catch (error) {
		return handlePlayer('unlinked');
	}
	name = name || minecraftUuid;
	try {
		// 1. Get UUID and username from PlayerDB
		const {
			data: {
				data: { player },
			},
		} = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
		const { username, raw_id: uuid2 } = player;
		// 2. Get all Hypixel data in parallel
		const [playerRes, profilesRes, bazaarRes, museumRes] = await Promise.all([
			axios.get(`https://api.hypixel.net/v2/player?key=${process.env.KEY}&uuid=${uuid2}`),
			axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.KEY}&uuid=${uuid2}`),
			flags.INCLUDE_NETWORTH
				? axios.get(`https://api.hypixel.net/v2/skyblock/bazaar?key=${process.env.KEY}`)
				: Promise.resolve({ data: null }),
			flags.INCLUDE_MUSEUM
				? axios.get(`https://api.hypixel.net/v2/skyblock/museum?key=${process.env.KEY}&profile=${uuid2}`)
				: Promise.resolve({ data: null }),
		]);
		if (playerRes.status !== 200 || profilesRes.status !== 200) {
			throw new Error('Error getting player or profile data.');
		}
		const playerData = playerRes.data.player;
		const profiles = profilesRes.data.profiles;
		const selectedProfile = profiles.find((a: any) => a.selected);
		if (!selectedProfile) throw new Error('No selected profile found.');
		const profile = selectedProfile.members[uuid2];
		const { cute_name: profilename, profile_id: profileid } = selectedProfile;
		const profile_type = selectedProfile.game_mode || 'normal';
		const bankBalance = selectedProfile.banking?.balance || null;
		let profile_members: {
			username: string;
			uuid: string;
			deleted: boolean;
		}[] = [];
		if (flags.PROFILE_ONLY || flags.CHECK_MEMBERS) {
			const memberIds = Object.keys(selectedProfile.members);
			profile_members = await Promise.all(
				memberIds.map(async (memberId) => {
					const memberResponse = await axios.get(`https://playerdb.co/api/player/minecraft/${memberId}`);
					const { username, raw_id: uuid } = memberResponse.data.data.player;
					const memberProfile = selectedProfile.members[memberId];
					const deleted = memberProfile.profile?.deletion_notice ? true : false;
					return { username, uuid, deleted };
				}),
			);
		}
		const responseData: any = {
			uuid2,
			username,
			profilename,
			profileid,
			playerData,
			profile,
			profile_type,
			bankBalance,
			profileRes: profilesRes,
			...(flags.PROFILE_ONLY || flags.CHECK_MEMBERS ? { profile_members } : {}),
		};
		if (flags.INCLUDE_NETWORTH) responseData.bazaar = bazaarRes.data;
		if (flags.INCLUDE_MUSEUM) responseData.museum = museumRes.data;
		cache[cacheKey] = { timestamp: now, data: responseData };
		return responseData;
	} catch (error) {
		return { error: handleError(error) };
	}
}
