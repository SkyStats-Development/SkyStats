import { app } from './Application';
import { setupGlobalErrorHandling } from './errors';
import { CacheService } from './services/CacheService';
import { Logger } from './services/Logger';

/**
 * Entry point for SkyStats Discord Bot (TypeScript).
 * Loads environment, connects to DB, and starts the bot.
 */
async function main() {
	try {
		// Setup global error handling
		setupGlobalErrorHandling();

		// Initialize cache service (optional - app continues if Redis fails)
		try {
			const cacheService = CacheService.getInstance();
			await cacheService.connect();
			await Logger.database('Redis cache connected successfully');
		} catch (error) {
			await Logger.error('Redis cache connection failed, continuing without cache');
		}

		await app.register();
		await app.connect();
	} catch (err) {
		console.error('Startup error:', err);
		process.exit(1);
	}
}

main();
