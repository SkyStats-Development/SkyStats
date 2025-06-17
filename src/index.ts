import { app } from './Application';

/**
 * Entry point for SkyStats Discord Bot (TypeScript).
 * Loads environment, connects to DB, and starts the bot.
 */
async function main() {
	try {
		await app.register();
		await app.connect();
	} catch (err) {
		console.error('Startup error:', err);
		process.exit(1);
	}
}

main();
