import config from '../config/config.json';
import * as path from 'path';
import fs from 'fs';
import { pathToFileURL } from 'url';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

const messages = config.messages.discord;

/**
 * /commands slash command - List all available commands
 */
export const data = new SlashCommandBuilder().setName('commands').setDescription('List all of my commands!');

export async function execute(interaction: ChatInputCommandInteraction) {
	const commandName = interaction.options.getString('command');
	if (!commandName) {
		let discordCommands = '';
		const commandsPath = path.join(__dirname);
		const discordCommandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
		for (const file of discordCommandFiles) {
			const fileUrl = pathToFileURL(path.join(commandsPath, file)).href;
			const commandModule = await import(fileUrl);
			const command = commandModule.default || commandModule;
			let discordOptions = '';
			if (!command.options && !command.data) {
				discordCommands += `- \`${command.name}\`\n`;
				continue;
			}
			const options = command.options || (command.data?.options ?? []);
			if (options.length === 0) {
				discordCommands += `- \`${command.name}\`\n`;
				continue;
			}
			discordOptions = options.map((opt: any) => ` [${opt.name}]`).join('');
			discordCommands += `- \`${command.name}${discordOptions}\`\n`;
		}
		const helpMenu = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('SkyStats Command List')
			.setDescription(
				'List of all of my commands! Please remember that if a command option is not required, You will have to verify!',
			)
			.addFields({
				name: '**Discord**: ',
				value: discordCommands,
				inline: true,
			})
			.setFooter({
				text: messages.defaultbetter,
				iconURL: messages.icon,
			});
		await interaction.reply({ embeds: [helpMenu] });
	}
}

export default { data, execute };
