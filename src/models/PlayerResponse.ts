/**
 * Represents the achievements object in the Hypixel player API response.
 */
export interface PlayerAchievements {
	[key: string]: number;
}

/**
 * Represents a Hypixel player object (partial, extend as needed).
 */
export interface Player {
	_id: string;
	achievements: PlayerAchievements;
	// ...other fields to be added as needed
}

/**
 * Represents the full Hypixel player API response.
 */
export interface PlayerResponse {
	success: boolean;
	player: Player;
}
