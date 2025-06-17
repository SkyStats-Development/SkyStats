import config from '../config/config.json';
import { addNotation } from '../contracts/helperFunctions';
import EMOJIS from '../contracts/emojis';
import { EmbedBuilder } from './EmbedBuilder';

const messages = config.messages.discord;

/**
 * Builds a farming weight embed using the new builder system.
 */
export async function buildFarmingWeightEmbed(uuid: string, username: string, profilename: string, weight: any) {
	return new EmbedBuilder()
		.setColor(0xffa600)
		.setTitle(`Farming Weight for ${username} on ${profilename}`)
		.setURL(`https://sky.shiiyu.moe/stats/${uuid}`)
		.setDescription(`${EMOJIS.SWORD_ICON} Total Weight: **${addNotation('numbers', weight.total_weight)}**`)
		.addFields([
			{
				name: `${EMOJIS.MISC_ICON} Crops`,
				value: String(weight.items?.crop_weight ?? 0),
				inline: false,
			},
			{
				name: `${EMOJIS.BONUS_ICON} Bonuses`,
				value: String(weight.items?.bonus_weight ?? 0),
				inline: false,
			},
		])
		.setThumbnail(`https://api.mineatar.io/body/full/${uuid}`)
		.setFooter(messages.farming_weight, messages.icon)
		.build();
}

/**
 * Builds a Senither weight embed using the new builder system.
 */
export async function buildSenitherWeightEmbed(
	profile: any,
	username: string,
	profilename: string,
	uuid: string,
	weight: any,
) {
	return new EmbedBuilder()
		.setColor(0xffa600)
		.setTitle(`Senither Weight for ${username} on ${profilename}`)
		.setURL(`https://sky.shiiyu.moe/stats/${uuid}`)
		.setDescription(`${EMOJIS.SWORD_ICON} Total Weight: **${addNotation('numbers', weight.total) ?? 0}**`)
		.addFields([
			{
				name: `${EMOJIS.SLAYER} Slayer`,
				value: String(weight.slayers ?? 0),
				inline: true,
			},
			{
				name: `${EMOJIS.SKILL_AVERAGE} Skills`,
				value: String(weight.skills ?? 0),
				inline: true,
			},
			{
				name: `${EMOJIS.DUNGEONS} Dungeons`,
				value: String(weight.dungeons ?? 0),
				inline: true,
			},
		])
		.setThumbnail(`https://api.mineatar.io/body/full/${uuid}`)
		.setFooter('grr', messages.icon)
		.build();
}
