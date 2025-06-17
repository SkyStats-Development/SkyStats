import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';

/**
 * MongoDB connection manager for SkyStats.
 * Handles connecting and reusing the client instance.
 */
export class MongoDB {
	private static client: MongoClient;
	private static uri: string = process.env.MONGODB_URI || '';

	/**
	 * Get a connected MongoClient instance.
	 * @returns {Promise<MongoClient>} The connected client
	 */
	static async getClient(): Promise<MongoClient> {
		if (!MongoDB.client) {
			if (!MongoDB.uri) throw new Error('MONGODB_URI not set in environment');
			MongoDB.client = new MongoClient(MongoDB.uri);
			await MongoDB.client.connect();
		}
		return MongoDB.client;
	}

	/**
	 * Close the MongoDB connection.
	 */
	static async close(): Promise<void> {
		if (MongoDB.client) {
			await MongoDB.client.close();
			MongoDB.client = undefined as any;
		}
	}
}
