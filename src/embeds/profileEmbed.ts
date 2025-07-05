import config from '../config/config.json';
import { EMOJIS } from '../contracts/emojis';
import { addNotation, addCommas } from '../contracts/helperFunctions';
import { EmbedBuilder } from './EmbedBuilder';

const messages = config.messages.discord;

interface ProfileMember {
	username: string;
	uuid: string;
	deleted: boolean;
}

interface SlayerData {
	[key: string]: {
		level?: number;
		xp?: number;
	};
}

interface SkillData {
	skills: {
		skill_average: number;
		total_experience: number;
		[key: string]:
			| number
			| {
					level: number;
					xp: number;
					levelWithProgress: number;
					xpTillNextLevel: number;
			  };
	};
}

interface HoTMData {
	level?: number;
	experience?: number;
	levelWithProgress?: number;
}

interface GardenData {
	level?: number;
	experience?: number;
	levelWithProgress?: number;
}

interface NetworthData {
	purse: number | null;
	bank: number | null;
	total_networth: number | null;
	unsoulbound_networth: number | null;
	personal_bank: number | null;
}

interface ProfileData {
	skyblock_level: number | null;
	senither_weight: number | null;
	time_charms: number;
	hoppity_prestige: number;
	skill_average: number | null;
	skill_data: SkillData | null;
	slayer_data: SlayerData | null;
	hotm_data: HoTMData | null;
	garden_data: GardenData | null;
	catacombs_level: number | null;
	networth: NetworthData;
}

function parseProfileMembers(array: ProfileMember[]): string[] {
	if (!Array.isArray(array)) return [];
	const parsed = array
		.sort((a, b) => Number(a.deleted) - Number(b.deleted))
		.map((member) => (member.deleted ? `**~~${member.username}~~**` : `**${member.username}**`));
	return parsed;
}

function generateSlayerString(slayerData: SlayerData | null): string {
	if (!slayerData) return '0/0/0/0/0/0';
	const slayers = ['zombie', 'spider', 'wolf', 'enderman', 'blaze', 'vampire'];
	return slayers.map((slayer) => slayerData[slayer]?.level ?? 0).join('/');
}

function formatCatacombsString(level: number | null): string {
	if (level === null || level === undefined) return 'API Off';
	return level.toFixed(2);
}

function formatHoTMString(hotmData: HoTMData | null): string {
	if (!hotmData?.levelWithProgress || hotmData.levelWithProgress <= 0) return 'API Off';
	return hotmData.levelWithProgress.toFixed(1);
}

function formatGardenString(gardenData: GardenData | null): string {
	if (!gardenData?.level || gardenData.level <= 0) return 'API Off';
	if (gardenData.levelWithProgress !== undefined) {
		return gardenData.levelWithProgress.toFixed(1);
	}
	return `Level ${gardenData.level}`;
}

function formatSkyblockLevel(level: number | null): string {
	if (level === null || level === undefined || level <= 0) return 'API Off';
	return level.toFixed(0);
}

function formatWeight(weight: number | null): string {
	if (!weight || weight <= 0) return 'API Off';
	return addCommas(Math.floor(weight));
}

/**
 * Builds a comprehensive profile embed with all profile statistics.
 */
export async function buildProfileEmbed(
	uuid: string,
	username: string,
	cuteName: string,
	profileId: string,
	firstJoin: number,
	profileMembers: ProfileMember[],
	profileType: string,
	profileData: ProfileData,
) {
	const members = parseProfileMembers(profileMembers);
	console.log(profileData);
	const builder = new EmbedBuilder()
		.setColor(0xffa600)
		.setTitle(`Profile for ${username} on ${cuteName}`)
		.setThumbnail(`https://api.mineatar.io/body/full/${uuid}`)
		.setURL(`https://sky.shiiyu.moe/stats/${uuid}/${profileId}`)
		.setFooter(messages.default, messages.icon)
		.setDescription(
			`**Profile Type:** ${profileType}\n` +
				`**First Join:** <t:${Math.floor(firstJoin / 1000)}:D>\n` +
				`**Members:** ${members.join(', ')}`,
		)
		.addField(
			`${EMOJIS.NETWORTH_ICON ?? '⭐'} Skyblock Level`,
			formatSkyblockLevel(profileData.skyblock_level),
			true,
		)
		.addField(
			`${EMOJIS.SKILL_AVERAGE ?? '📊'} Skill Average`,
			`${profileData.skill_average?.toFixed(2) ?? 'API Off'}`,
			true,
		)
		.addField(`${EMOJIS.DUNGEONS ?? '🏰'} Catacombs`, formatCatacombsString(profileData.catacombs_level), true)
		// =================================================================================
		.addField(
			`${EMOJIS.NETWORTH_ICON ?? '💰'} Networth`,
			`${addNotation('oneLetters', profileData.networth?.total_networth ?? 0)} || ${addNotation('oneLetters', profileData.networth?.unsoulbound_networth ?? 0)}`,
			true,
		)
		.addField(
			`${EMOJIS.PURSE_ICON ?? '💰'} Purse`,
			`${addNotation('oneLetters', profileData.networth?.purse ?? 0)}`,
			true,
		)
		.addField(
			`${EMOJIS.BANK_ICON ?? '🏦'} Bank`,
			`${addNotation('oneLetters', profileData.networth?.bank ?? 0)} || ${addNotation('oneLetters', profileData.networth?.personal_bank ?? 0)}`,
			true,
		)
		// =================================================================================
		.addField(`${EMOJIS.SLAYER ?? '⚔️'} Slayers`, generateSlayerString(profileData.slayer_data), true)
		.addField(`${EMOJIS.HOTM ?? '⛏️'} HoTM`, formatHoTMString(profileData.hotm_data), true)
		.addField(`${EMOJIS.GARDEN ?? '🌱'} Garden`, formatGardenString(profileData.garden_data), true)
		// =================================================================================
		.addField(`${EMOJIS.NETHER_GRASS ?? '⚔️'} Senither Weight`, formatWeight(profileData.senither_weight), true)
		.addField(`${EMOJIS.RIFT_TIMECHARMS ?? '⏰'} Rift Timecharms`, `${profileData.time_charms ?? 0}/8`, true)
		.addField(
			`${EMOJIS.HOPPITY_COLLECTION ?? '🐰'} Chocolate Factory`,
			`${profileData.hoppity_prestige ?? 0}/6`,
			true,
		);
	return builder.build();
}
