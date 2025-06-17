import { DiscordManager } from './DiscordManager';
import { DatabaseHandler } from './services/DatabaseHandler';
import { Logger } from './services/Logger';

/**
 * Main application class for SkyStats.
 */
export class Application {
	discord?: DiscordManager;

	/**
	 * Register all services and handlers.
	 */
	async register(): Promise<void> {
		this.discord = new DiscordManager(this);
	}

	/**
	 * Connect to Discord and other services.
	 */
	async connect(): Promise<void> {
		await DatabaseHandler.connect();
		if (this.discord) {
			await this.discord.connect();
		}
		await Logger.success('Application started.');
	}
}

export const app = new Application();
