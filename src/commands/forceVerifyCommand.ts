import axios from 'axios';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { DatabaseHandler } from '../services/DatabaseHandler';
import config from '../config/config.json';

const messages = config.messages.discord;

async function addLinkedAccounts(discordId: string, minecraftUuid: string) {
	const db = await DatabaseHandler.getDb();
	const collection = db.collection('linkedAccounts');
	await collection.deleteMany({ discordId });
	await collection.insertOne({ discordId, minecraftUuid });
}

/**
 * /verifyforce slash command - Connect your Discord account to Minecraft
 */
export const data = new SlashCommandBuilder()
	.setName('verifyforce')
	.setDescription('Connect your Discord account to Minecraft')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(true))
	.addUserOption((option) => option.setName('user').setDescription('Discord user').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
	const username = interaction.options.getString('name', true);
	const user = interaction.options.getUser('user', true);
	const uuid = (await axios.get(`https://playerdb.co/api/player/minecraft/${username}`)).data.data.player.id;
	try {
		await addLinkedAccounts(user.id, uuid);
		const embed = new EmbedBuilder()
			.setColor(5763719)
			.setAuthor({ name: 'Successfully linked!' })
			.setDescription(`Your account has been successfully linked to \`${username}\``)
			.setFooter({
				text: 'made by /credits  | /help [command] for more information',
				iconURL: 'https://i.imgur.com/hggczHP.png',
			});
		await interaction.reply({ embeds: [embed] });
	} catch (error: any) {
		const embed = new EmbedBuilder()
			.setColor(15548997)
			.setAuthor({ name: 'An Error has occurred' })
			.setDescription(error.message || String(error))
			.setFooter({
				text: 'made by /credits  | /help [command] for more information',
				iconURL: 'https://i.imgur.com/hggczHP.png',
			});
		await interaction.reply({ embeds: [embed] });
	}
}

export default { data, execute };
