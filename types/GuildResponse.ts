/**
 * Represents the experience history for a guild member.
 */
export interface GuildExpHistory {
	[date: string]: number;
}

/**
 * Represents a single guild member in the Hypixel guild API response.
 */
export interface GuildMember {
	uuid: string;
	rank: string;
	joined: number;
	questParticipation: number;
	expHistory: GuildExpHistory;
	mutedTill?: number;
}

/**
 * Represents a Hypixel guild object (partial, extend as needed).
 */
export interface Guild {
	_id: string;
	name: string;
	name_lower: string;
	coins: number;
	coinsEver: number;
	created: number;
	members: GuildMember[];
	// ...other fields to be added as needed
}

/**
 * Represents the full Hypixel guild API response.
 */
export interface GuildResponse {
	success: boolean;
	guild: Guild;
}
