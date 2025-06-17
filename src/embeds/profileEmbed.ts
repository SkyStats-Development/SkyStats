import config from '../config/config.json';
import EMOJIS from '../contracts/emojis';
import { EmbedBuilder } from './EmbedBuilder';

const messages = config.messages.discord;

function parseProfileMembers(array: any[]): string[] {
	if (!Array.isArray(array)) return [];
	const parsed = array
		.sort((a, b) => a.deleted - b.deleted)
		.map((member) => (member.deleted ? `**~~${member.username}~~**` : `**${member.username}**`));
	return parsed;
}

function generateSlayerString(obj: any): string {
	if (!obj) return '0/0/0/0/0/0';
	const slayers = ['zombie', 'spider', 'wolf', 'enderman', 'blaze', 'vampire'];
	return slayers.map((slayer) => obj[slayer]?.level ?? 0).join('/');
}

/**
 * Builds a profile embed using the new builder system.
 */
export async function buildProfileEmbed(
	uuid: string,
	username: string,
	cuteName: string,
	profileId: string,
	firstJoin: number,
	profileMembers: any[],
	profileType: string,
	profileData: any,
) {
	const members = parseProfileMembers(profileMembers);
	const builder = new EmbedBuilder()
		.setColor(0xffa600)
		.setTitle(`Profile for ${username} on ${cuteName}`)
		.setThumbnail(`https://api.mineatar.io/body/full/${uuid}`)
		.setURL(`https://sky.shiiyu.moe/stats/${uuid}`)
		.setFooter(messages.default, messages.icon)
		.setDescription(
			`**Profile Type:** ${profileType}\n` +
				`**First Join:** <t:${Math.floor(firstJoin / 1000)}:D>\n` +
				`**Members:** ${members.join(', ')}`,
		)
		.addFields([
			{
				name: `${EMOJIS.SLAYER}`,
				value: generateSlayerString(profileData.slayers),
				inline: true,
			},
			{
				name: `${EMOJIS.SKILL_AVERAGE}`,
				value: profileData.skillAverage?.toFixed(2) ?? 'N/A',
				inline: true,
			},
			// ...add more fields as needed...
		]);
	return builder.build();
}
