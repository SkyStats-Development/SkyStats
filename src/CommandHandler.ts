import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import process from 'node:process';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Command handler for SkyStats. Registers and loads commands.
 */
export class CommandHandler {
	private discord: any;

	constructor(discord: any) {
		this.discord = discord;
	}

	/**
	 * Loads all command modules from the commands directory (async, supports ts/js/ESM) and registers them with Discord.
	 */
	async registerCommands(client: any): Promise<void> {
		client.commands = new (await import('discord.js')).Collection();
		let commandsPath: any;
		try {
			commandsPath = path.join(__dirname, 'commands');
		} catch (error) {
			console.error('Error resolving commands path:', error);
		}
		if (!fs.existsSync(commandsPath)) fs.mkdirSync(commandsPath);
		const isDist = false;
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => (isDist ? file.endsWith('.js') : file.endsWith('.ts')));
		const commandData: object[] = [];
		for (const file of commandFiles) {
			console.log(`Loading command: ${file}`);
			const commandPath = path.join(commandsPath, file);
			const fileUrl = pathToFileURL(commandPath).href;
			const commandModule = await import(fileUrl);
			const command = commandModule.default || commandModule;
			if (command.data && command.execute) {
				client.commands.set(command.data.name, command);
				commandData.push(command.data.toJSON());
			}
		}
		const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN || '');
		await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID || ''), { body: commandData });
	}
}
