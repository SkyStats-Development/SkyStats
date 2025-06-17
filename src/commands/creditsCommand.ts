import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import config from '../config/config.json';

const messages = config.messages.discord;

/**
 * /credits slash command - Show bot credits
 */
export const data = new SlashCommandBuilder().setName('credits').setDescription('Bot credits');

export async function execute(interaction: ChatInputCommandInteraction) {
	const embed = new EmbedBuilder()
		.setColor(0xffa600)
		.setTitle('Credits for the bot')
		.setDescription(
			'A massive thanks go to\n[AltPapier](https://github.com/Altpapier/hypixel-discord-guild-bridge)\n[DawJaw](https://dawjaw.net/jacobs)\n[Discord.js](https://discord.js.org/)\n[Hypixel Network API](http://api.hypixel.net/)\n[Hypixel API Reborn](https://hypixel.stavzdev.me/#/)\n[MaroAPI](https://github.com/zt3h)\n[Node.js](https://nodejs.org/)\n[PlayerDB API](https://playerdb.co/)\n[SkyHelper API](https://github.com/Altpapier/SkyHelperAPI)\n[SkyShiiyu API](https://github.com/SkyCryptWebsite/SkyCrypt)\n[SlothPixel API](https://github.com/slothpixel)\n[Senither](https://github.com/Senither)\n[DuckySoLucky](https://https://github.com/DuckySoLucky)\n[Kathhund](https://https://github.com/Kathund)\n[ThePotatoKing](https://verifys.sperrer.ca)\n@pnqdy',
		)
		.setTimestamp(new Date())
		.setFooter({ text: messages.sogayowner, iconURL: messages.icon });
	await interaction.reply({ embeds: [embed] });
}

export default { data, execute };
