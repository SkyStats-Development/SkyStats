import axios from 'axios';
import { handleError } from '../services/handleError';
import { DatabaseHandler } from '../services/DatabaseHandler';
import { CacheService, CacheKeys } from './CacheService';
import { DefaultCacheTTL } from '../config/ConfigTypes';
import { APIError, DatabaseError, NotFoundError } from '../errors';

export interface PlayerFlags {
	PROFILE_ONLY?: boolean;
	CHECK_MEMBERS?: boolean;
	INCLUDE_NETWORTH?: boolean;
	INCLUDE_MUSEUM?: boolean;
	[key: string]: boolean | undefined;
}

interface ProfileMember {
	username: string;
	uuid: string;
	deleted: boolean;
}

interface PlayerResponse {
	uuid2: string;
	username: string;
	profilename: string;
	profileid: string;
	playerData: unknown;
	profile: unknown;
	profile_type: string;
	bankBalance: number | null;
	profileRes: unknown;
	first_join?: number;
	profile_members?: ProfileMember[];
	bazaar?: unknown;
	museum?: unknown;
	error?: unknown; // For backward compatibility
}

/**
 * Get player and profile data with caching and proper error handling
 */
export async function getPlayer(id: string, name?: string, flags: PlayerFlags = {}): Promise<PlayerResponse> {
	const cache = CacheService.getInstance();
	const cacheKey = CacheKeys.player(`${id}-${name}-${JSON.stringify(flags)}`);

	try {
		// Try to get from cache first
		const cachedData = await cache.get<PlayerResponse>(cacheKey);
		if (cachedData) {
			return cachedData;
		}

		// Get linked account from database
		const db = await DatabaseHandler.getDb();
		const collection = db.collection('linkedAccounts');
		let minecraftUuid = '';

		try {
			const result = await collection.findOne({ discordId: id });
			if (result) {
				minecraftUuid = result.minecraftUuid;
			} else if (!name) {
				throw new NotFoundError('No linked account found for this Discord user');
			}
		} catch (error) {
			if (error instanceof NotFoundError) throw error;
			throw new DatabaseError('Failed to fetch linked account', error as Error);
		}

		name = name || minecraftUuid;

		// Get UUID from PlayerDB
		const playerDbResponse = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
		if (playerDbResponse.status !== 200) {
			throw new APIError('Failed to fetch player data', 'PlayerDB');
		}

		const { username, raw_id: uuid2 } = playerDbResponse.data.data.player;

		// Get Hypixel data in parallel
		const apiCalls = [
			axios.get(`https://api.hypixel.net/v2/player?key=${process.env.KEY}&uuid=${uuid2}`),
			axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${process.env.KEY}&uuid=${uuid2}`),
		];

		if (flags.INCLUDE_NETWORTH) {
			apiCalls.push(axios.get(`https://api.hypixel.net/v2/skyblock/bazaar?key=${process.env.KEY}`));
		}

		if (flags.INCLUDE_MUSEUM) {
			apiCalls.push(
				axios.get(`https://api.hypixel.net/v2/skyblock/museum?key=${process.env.KEY}&profile=${uuid2}`),
			);
		}

		const responses = await Promise.all(apiCalls);
		const [playerRes, profilesRes, bazaarRes, museumRes] = responses;

		if (playerRes.status !== 200 || profilesRes.status !== 200) {
			throw new APIError('Failed to fetch player or profile data', 'Hypixel');
		}

		const playerData = playerRes.data.player;
		const profiles = profilesRes.data.profiles;
		const selectedProfile = profiles.find((profile: { selected: boolean }) => profile.selected);

		if (!selectedProfile) {
			throw new NotFoundError('No selected profile found for this player');
		}

		const profile = selectedProfile.members[uuid2];
		const { cute_name: profilename, profile_id: profileid } = selectedProfile;
		const profile_type = selectedProfile.game_mode || 'normal';
		//console.log(selectedProfile.banking);
		const bankBalance = selectedProfile.banking?.balance || null;
		const first_join = profile?.first_join || null;

		// Handle profile members if needed
		let profile_members: ProfileMember[] = [];
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

		const responseData: PlayerResponse = {
			uuid2,
			username,
			profilename,
			profileid,
			playerData,
			profile,
			profile_type,
			bankBalance,
			profileRes: profilesRes,
			first_join,
			...(flags.PROFILE_ONLY || flags.CHECK_MEMBERS ? { profile_members } : {}),
			...(flags.INCLUDE_NETWORTH && bazaarRes ? { bazaar: bazaarRes.data } : {}),
			...(flags.INCLUDE_MUSEUM && museumRes ? { museum: museumRes.data } : {}),
		};

		// Cache the response
		await cache.set(cacheKey, responseData, DefaultCacheTTL.player);

		return responseData;
	} catch (error) {
		// For backward compatibility, return legacy error format
		if (error instanceof APIError || error instanceof DatabaseError || error instanceof NotFoundError) {
			return { error: handleError(error) } as PlayerResponse;
		}

		// Handle legacy error format for backward compatibility
		return { error: handleError(error) } as PlayerResponse;
	}
}
