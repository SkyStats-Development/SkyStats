import axios from 'axios';
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { DatabaseHandler } from '../services/DatabaseHandler';

async function addLinkedAccounts(discordId: string, minecraftUuid: string) {
	const db = await DatabaseHandler.getDb();
	const collection = db.collection('linkedAccounts');
	await collection.deleteMany({ discordId });
	await collection.insertOne({ discordId, minecraftUuid });
}

/**
 * /verify slash command - Connect your Discord account to Minecraft
 */
export const data = new SlashCommandBuilder()
	.setName('verify')
	.setDescription('Connect your Discord account to Minecraft')
	.addStringOption((option) => option.setName('name').setDescription('Minecraft Username').setRequired(true));

export async function execute(interaction: ChatInputCommandInteraction) {
	const username = interaction.options.getString('name', true);
	try {
		const {
			data: {
				data: { player },
			},
		} = await axios.get(`https://playerdb.co/api/player/minecraft/${username}`);
		const uuid = player.raw_id;
		const {
			data: { player: hypixelPlayer },
		} = await axios.get(`https://api.hypixel.net/player?uuid=${uuid}&key=${process.env.KEY}`);
		let found = false;
		if (hypixelPlayer.socialMedia && hypixelPlayer.socialMedia.links && hypixelPlayer.socialMedia.links.DISCORD) {
			const linkedDiscord = hypixelPlayer.socialMedia.links.DISCORD;
			if (linkedDiscord === (interaction.user.username ?? interaction.user.tag)) {
				found = true;
			}
		}
		if (found) {
			await addLinkedAccounts(interaction.user.id, uuid);
			const successfullyLinked = new EmbedBuilder()
				.setColor(5763719)
				.setAuthor({ name: 'Successfully linked!' })
				.setDescription(`Your account has been successfully linked to \`${username}\``)
				.setFooter({
					text: 'made by /credits  | /help [command] for more information',
					iconURL: 'https://i.imgur.com/hggczHP.png',
				});
			await interaction.reply({ embeds: [successfullyLinked] });
		} else {
			const verificationTutorialEmbed = new EmbedBuilder()
				.setColor(0x0099ff)
				.setAuthor({
					name: 'Link with Hypixel Social Media',
					iconURL:
						'https://cdn.discordapp.com/avatars/486155512568741900/164084b936b4461fe9505398f7383a0e.png?size=4096',
				})
				.setDescription(
					`**Instructions:** \n1) Use your Minecraft client to connect to Hypixel. \n2) Once connected, and while in the lobby, right click "My Profile" in your hotbar. It is option #2. \n3) Click "Social Media" - this button is to the left of the Redstone block (the Status button). \n4) Click "Discord" - it is the second last option. \n5) Paste your Discord username into chat and hit enter. For reference: \`${interaction.user.tag}\`\n6) You're done! Wait around 30 seconds and then try again.\n \n**Getting "The URL isn't valid!"?** \nHypixel has limitations on the characters supported in a Discord username. Try changing your Discord username temporarily to something without special characters, updating it in-game, and trying again.`,
				)
				.setThumbnail('https://thumbs.gfycat.com/DentalTemptingLeonberger-size_restricted.gif')
				.setTimestamp()
				.setFooter({
					text: 'made by /credits  | /help [command] for more information',
					iconURL: 'https://i.imgur.com/hggczHP.png',
				});
			await interaction.reply({
				content: "Your Minecraft's linked account does not match with the Discord.",
				embeds: [verificationTutorialEmbed],
			});
		}
	} catch (error: any) {
		const errorEmbed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle('Error')
			.setDescription(error.message || String(error))
			.setFooter({
				text: 'made by /credits  | /help [command] for more information',
				iconURL: 'https://i.imgur.com/hggczHP.png',
			});
		await interaction.reply({ embeds: [errorEmbed] });
	}
}

export default { data, execute };
