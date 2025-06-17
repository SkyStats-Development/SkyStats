import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Logger } from './services/Logger';
import { CommandHandler } from './CommandHandler';
import * as path from 'path';
import * as fs from 'fs';
import process from 'node:process';
import { pathToFileURL, fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Discord manager for SkyStats. Handles client, commands, and events.
 */
export class DiscordManager {
	private app: any;
	private client: Client;
	private commandHandler: CommandHandler;

	constructor(app: any) {
		this.app = app;
		this.client = new Client({
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
		});
		this.commandHandler = new CommandHandler(this);
	}

	/**
	 * Connect to Discord and set up handlers.
	 */
	async connect(): Promise<void> {
		try {
			await this.client.login(process.env.DISCORD_TOKEN);
			this.client.on('ready', async () => {
				await Logger.success('Client ready, logged in as ' + this.client.user?.tag);
			});

			(this.client as any).commands = new Collection();

			// Load commands
			const commandsPath = path.join(__dirname, 'commands');
			const isDist = __dirname.includes('dist');
			const commandFiles = fs
				.readdirSync(commandsPath)
				.filter((f) => (isDist ? f.endsWith('.js') : f.endsWith('.ts')));
			for (const file of commandFiles) {
				const commandPath = path.join(commandsPath, file);
				const fileUrl = pathToFileURL(commandPath).href;
				const commandModule = await import(fileUrl);
				const command = commandModule.default || commandModule;
				if (command.data && command.execute) {
					(this.client as any).commands.set(command.data.name, command);
				}
			}

			// Load events
			const eventsPath = path.join(__dirname, 'events');
			const eventFiles = fs
				.readdirSync(eventsPath)
				.filter((f) => (isDist ? f.endsWith('.js') : f.endsWith('.ts')));
			for (const file of eventFiles) {
				const eventPath = path.join(eventsPath, file);
				const fileUrl = pathToFileURL(eventPath).href;
				const eventModule = await import(fileUrl);
				const event = eventModule.default || eventModule;
				if (event.once) {
					this.client.once(event.name, (...args: any[]) => event.execute(...args, this.client));
				} else {
					this.client.on(event.name, (...args: any[]) => event.execute(...args, this.client));
				}
			}

			process.on('SIGINT', async () => {
				await Logger.logout('Client successfully logged out as ' + this.client.user?.tag);
				this.client.destroy();
				process.exit(0);
			});
		} catch (error) {
			console.log('Error connecting to Discord:', error);
			await Logger.error(error instanceof Error ? error.message : String(error));
		}
	}
}
