import { Logger } from '../services/Logger';
import { MongoDB } from '../database/MongoDB';

/**
 * Database handler for SkyStats. Connects to MongoDB and provides access to the DB instance.
 */
export class DatabaseHandler {
	private static dbName = 'SkyStats';

	/**
	 * Connect to the MongoDB database.
	 */
	static async connect(): Promise<void> {
		const client = await MongoDB.getClient();
		await client.db(DatabaseHandler.dbName).command({ ping: 1 });
		await Logger.database('Database Ready And Loaded!');
	}

	/**
	 * Get the MongoDB database instance.
	 */
	static async getDb() {
		const client = await MongoDB.getClient();
		return client.db(DatabaseHandler.dbName);
	}

	/**
	 * Disconnect from the MongoDB database.
	 */
	static async disconnect(): Promise<void> {
		await MongoDB.close();
	}
}
