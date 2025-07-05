// TODO: Implement zod-based configuration validation for type safety and runtime validation
// This would replace the current config.json with a validated TypeScript configuration system

/**
 * Configuration interface for SkyStats
 * Currently using raw JSON, should be migrated to zod schemas for validation
 */
export interface Config {
	discord: {
		ActivityType: string;
		Status: string;
		Activity: string;
		issues: string;
		releaseChannel: string;
		serverID: string;
		developmentRole: string;
		ban_log_channel: string;
	};
	api: {
		hypixel: {
			API: string;
			KEY: string;
		};
		imgurAPIkey: string;
	};
	database: {
		url: string;
		name: string;
	};
	cache: {
		redis: {
			host: string;
			port: number;
			ttl: {
				player: number;
				profile: number;
				networth: number;
				bazaar: number;
				guild: number;
				weight: number;
				museum: number;
			};
		};
	};
}

/**
 * Default cache TTL values (in seconds)
 */
export const DefaultCacheTTL = {
	player: 300, // 5 minutes
	profile: 600, // 10 minutes
	networth: 1800, // 30 minutes
	bazaar: 60, // 1 minute
	guild: 1800, // 30 minutes
	weight: 1800, // 30 minutes
	museum: 3600, // 1 hour
} as const;
