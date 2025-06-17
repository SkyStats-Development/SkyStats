/**
 * Represents a single community upgrade state in a Skyblock profile.
 */
export interface CommunityUpgradeState {
	upgrade: string;
	tier: number;
	started_ms: number;
	started_by: string;
	claimed_by: string;
}

/**
 * Represents the community upgrades section of a Skyblock profile.
 */
export interface CommunityUpgrades {
	currently_upgrading: any;
	upgrade_states: CommunityUpgradeState[];
}

/**
 * Represents a single Skyblock profile member.
 */
export interface SkyblockProfileMember {
	[key: string]: any;
}

/**
 * Represents a single Skyblock profile entry.
 */
export interface SkyblockProfile {
	profile_id: string;
	cute_name: string;
	selected: boolean;
	members: Record<string, SkyblockProfileMember>;
	community_upgrades: CommunityUpgrades;
	banking?: {
		balance: number;
	};
	game_mode?: string;
	// ...add more fields as needed
}

/**
 * Represents the full Skyblock profiles API response.
 */
export interface SkyblockProfilesResponse {
	success: boolean;
	profiles: SkyblockProfile[];
}

/**
 * Represents the achievements object in the Hypixel player API response.
 */
export interface PlayerAchievements {
	[key: string]: number;
}

/**
 * Represents a Hypixel player object.
 */
export interface Player {
	_id: string;
	displayname: string;
	uuid: string;
	achievements: PlayerAchievements;
	karma: number;
	networkExp: number;
	[key: string]: any;
}

/**
 * Represents the full Hypixel player API response.
 */
export interface PlayerResponse {
	success: boolean;
	player: Player;
}

/**
 * Represents a single item entry in the museum.
 */
export interface MuseumItemEntry {
	donated_time: number;
	featured_slot?: string;
	borrowing?: boolean;
	items: {
		type: number;
		data: string;
	};
}

/**
 * Represents all items in a member's museum.
 */
export interface MuseumItems {
	[itemName: string]: MuseumItemEntry;
}

/**
 * Represents a single museum member's data.
 */
export interface MuseumMember {
	value: number;
	appraisal: boolean;
	items: MuseumItems;
}

/**
 * Represents the full museum API response.
 */
export interface MuseumResponse {
	success: boolean;
	members: Record<string, MuseumMember>;
}
