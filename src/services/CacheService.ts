import Redis from 'ioredis';
import { CacheError } from '../errors';
import { Logger } from './Logger';

/**
 * Redis cache service for the application
 */
export class CacheService {
	private static instance: CacheService;
	private redis: Redis;
	private isConnected: boolean = false;
	private readonly defaultTTL = 300; // 5 minutes default

	private constructor() {
		this.redis = new Redis({
			host: '192.168.1.155',
			port: 6379,
			password: 'deesahd284',
			enableReadyCheck: true,
			maxRetriesPerRequest: 3,
			lazyConnect: true,
		});

		this.setupEventHandlers();
	}

	/**
	 * Get singleton instance
	 */
	static getInstance(): CacheService {
		if (!CacheService.instance) {
			CacheService.instance = new CacheService();
		}
		return CacheService.instance;
	}

	/**
	 * Setup Redis event handlers
	 */
	private setupEventHandlers(): void {
		this.redis.on('connect', () => {
			this.isConnected = true;
			Logger.database('Redis connection established');
		});

		this.redis.on('error', (error: Error) => {
			this.isConnected = false;
			Logger.error(`Redis error: ${error.message}`);
		});

		this.redis.on('close', () => {
			this.isConnected = false;
			Logger.database('Redis connection closed');
		});
	}

	/**
	 * Connect to Redis
	 */
	async connect(): Promise<void> {
		try {
			await this.redis.connect();
		} catch (error) {
			throw new CacheError('Failed to connect to Redis', error as Error);
		}
	}

	/**
	 * Get value from cache
	 */
	async get<T>(key: string): Promise<T | null> {
		if (!this.isConnected) return null;

		try {
			const value = await this.redis.get(key);
			if (!value) return null;
			return JSON.parse(value) as T;
		} catch (error) {
			// If Redis is unavailable, return null instead of throwing
			return null;
		}
	}

	/**
	 * Set value in cache
	 */
	async set(key: string, value: unknown, ttl: number = this.defaultTTL): Promise<void> {
		if (!this.isConnected) return;

		try {
			await this.redis.setex(key, ttl, JSON.stringify(value));
		} catch (error) {
			// If Redis is unavailable, silently fail
			return;
		}
	}

	/**
	 * Delete key from cache
	 */
	async delete(key: string): Promise<void> {
		if (!this.isConnected) return;

		try {
			await this.redis.del(key);
		} catch (error) {
			// If Redis is unavailable, silently fail
			return;
		}
	}

	/**
	 * Check if key exists
	 */
	async exists(key: string): Promise<boolean> {
		if (!this.isConnected) return false;

		try {
			const result = await this.redis.exists(key);
			return result === 1;
		} catch (error) {
			// If Redis is unavailable, return false
			return false;
		}
	}

	/**
	 * Clear all cache
	 */
	async clear(): Promise<void> {
		try {
			await this.redis.flushall();
		} catch (error) {
			throw new CacheError('Failed to clear cache', error as Error);
		}
	}

	/**
	 * Get cache keys matching pattern
	 */
	async getKeys(pattern: string): Promise<string[]> {
		try {
			return await this.redis.keys(pattern);
		} catch (error) {
			throw new CacheError(`Failed to get keys with pattern: ${pattern}`, error as Error);
		}
	}

	/**
	 * Get or set cached value
	 */
	async getOrSet<T>(key: string, factory: () => Promise<T>, ttl: number = this.defaultTTL): Promise<T> {
		// If Redis is not connected, just call the factory function
		if (!this.isConnected) {
			return await factory();
		}

		try {
			const cached = await this.get<T>(key);
			if (cached !== null) {
				return cached;
			}

			const value = await factory();
			await this.set(key, value, ttl);
			return value;
		} catch (error) {
			// If Redis fails, just return the factory result
			return await factory();
		}
	}

	/**
	 * Disconnect from Redis
	 */
	async disconnect(): Promise<void> {
		try {
			await this.redis.disconnect();
		} catch (error) {
			throw new CacheError('Failed to disconnect from Redis', error as Error);
		}
	}
}

/**
 * Cache key builders for different data types
 */
export const CacheKeys = {
	player: (uuid: string) => `player:${uuid}`,
	profile: (profileId: string) => `profile:${profileId}`,
	networth: (profileId: string) => `networth:${profileId}`,
	bazaar: () => 'bazaar:items',
	guild: (guildId: string) => `guild:${guildId}`,
	weight: (profileId: string) => `weight:${profileId}`,
	museum: (profileId: string) => `museum:${profileId}`,
} as const;
