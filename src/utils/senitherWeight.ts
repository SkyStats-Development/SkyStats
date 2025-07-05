/* eslint-disable indent */
// This file is a TypeScript port of the legacy senitherWeight.js
// Based on the exact legacy implementation

interface WeightResult {
	weight: number;
	weight_overflow: number;
}

interface DetailedWeightData {
	total: number;
	totalWeight: number;
	totalOverflow: number;
	skills: Record<string, WeightResult>;
	slayer: Record<string, WeightResult>;
	dungeons: Record<string, WeightResult>;
}

interface PlayerData {
	experience?: {
		SKILL_FARMING?: number;
		SKILL_MINING?: number;
		SKILL_COMBAT?: number;
		SKILL_FORAGING?: number;
		SKILL_FISHING?: number;
		SKILL_ENCHANTING?: number;
		SKILL_ALCHEMY?: number;
		SKILL_TAMING?: number;
	};
}

interface SlayerData {
	slayer_bosses?: {
		zombie?: { xp?: number };
		spider?: { xp?: number };
		wolf?: { xp?: number };
		enderman?: { xp?: number };
	};
}

interface DungeonsData {
	dungeon_types?: {
		catacombs?: { experience?: number };
	};
	player_classes?: {
		healer?: { experience?: number };
		mage?: { experience?: number };
		berserk?: { experience?: number };
		archer?: { experience?: number };
		tank?: { experience?: number };
	};
}

// Constants from legacy implementation
const dungeon_weights = {
	catacombs: 0.0002149604615,
	healer: 0.0000045254834,
	mage: 0.0000045254834,
	berserk: 0.0000045254834,
	archer: 0.0000045254834,
	tank: 0.0000045254834,
};

const slayer_weights = {
	revenant: {
		divider: 2208,
		modifier: 0.15,
	},
	tarantula: {
		divider: 2118,
		modifier: 0.08,
	},
	sven: {
		divider: 1962,
		modifier: 0.015,
	},
	enderman: {
		divider: 1430,
		modifier: 0.017,
	},
};

const skill_weights = {
	mining: {
		exponent: 1.18207448,
		divider: 259634,
		maxLevel: 60,
	},
	foraging: {
		exponent: 1.232826,
		divider: 259634,
		maxLevel: 50,
	},
	enchanting: {
		exponent: 0.96976583,
		divider: 882758,
		maxLevel: 60,
	},
	farming: {
		exponent: 1.217848139,
		divider: 220689,
		maxLevel: 60, // Fixed: should be 60, not 50
	},
	combat: {
		exponent: 1.15797687265,
		divider: 275862,
		maxLevel: 60,
	},
	fishing: {
		exponent: 1.406418,
		divider: 88274,
		maxLevel: 50,
	},
	alchemy: {
		exponent: 1.0,
		divider: 1103448,
		maxLevel: 50,
	},
	taming: {
		exponent: 1.14744,
		divider: 441379,
		maxLevel: 50,
	},
};

// XP table for level calculation (from NEU leveling.json)
const skillXpTable = [
	50, 125, 200, 300, 500, 750, 1000, 1500, 2000, 3500, 5000, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000,
	200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000, 1400000,
	1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000, 2200000, 2300000, 2400000, 2500000, 2600000, 2750000,
	2900000, 3100000, 3400000, 3700000, 4000000, 4300000, 4600000, 4900000, 5200000, 5500000, 5800000, 6100000, 6400000,
	6700000, 7000000,
];

/**
 * Calculate skill level from XP (equivalent to calcSkill function)
 */
function calcSkill(skillName: string, xp: number): { level: number; levelWithProgress: number } {
	let level = 0;
	let totalXp = 0;

	// Use different XP table for dungeoneering
	const xpTable =
		skillName === 'dungeoneering'
			? // Catacombs XP table (from NEU)

				[
					50, 75, 110, 160, 230, 330, 470, 670, 950, 1340, 1890, 2665, 3760, 5260, 7380, 10300, 14400, 20000,
					27600, 38000, 52500, 71500, 97000, 132000, 180000, 243000, 328000, 445000, 600000, 800000, 1065000,
					1410000, 1900000, 2500000, 3300000, 4300000, 5600000, 7200000, 9200000, 12000000, 15000000,
					19000000, 24000000, 30000000, 38000000, 48000000, 60000000, 75000000, 93000000, 116250000,
				]
			: skillXpTable;

	const maxLevel =
		skillName === 'dungeoneering' ? 50 : skill_weights[skillName as keyof typeof skill_weights]?.maxLevel || 50;
	const maxIndex = Math.min(maxLevel, xpTable.length);

	for (let i = 0; i < maxIndex; i++) {
		if (totalXp + xpTable[i] <= xp) {
			totalXp += xpTable[i];
			level++;
		} else {
			break;
		}
	}

	// Calculate progress within current level
	let levelWithProgress = level;
	if (level < maxIndex && xpTable[level]) {
		const currentLevelXp = xp - totalXp;
		const nextLevelXp = xpTable[level];
		levelWithProgress += currentLevelXp / nextLevelXp;
	}

	return { level, levelWithProgress };
}

function calculateDungeonWeight(type: string, level: number, experience: number): WeightResult {
	const percentageModifier = dungeon_weights[type as keyof typeof dungeon_weights];

	const base = Math.pow(level, 4.5) * percentageModifier;

	// Use legacy hardcoded value for level 50 catacombs
	if (experience <= 569809640) {
		return {
			weight: base,
			weight_overflow: 0,
		};
	}

	const remaining = experience - 569809640;
	const splitter = (4 * 569809640) / base;

	return {
		weight: Math.floor(base),
		weight_overflow: Math.pow(remaining / splitter, 0.968) || 0,
	};
}

function calculateSkillWeight(type: string, level: number, experience: number): WeightResult {
	const skillGroup = skill_weights[type as keyof typeof skill_weights];
	if (!skillGroup || skillGroup.exponent === undefined || skillGroup.divider === undefined) {
		return {
			weight: 0,
			weight_overflow: 0,
		};
	}

	// Use legacy hardcoded values to match exactly
	const maxSkillLevelXP = skillGroup.maxLevel === 60 ? 111672425 : 55172425;

	let base = Math.pow(level * 10, 0.5 + skillGroup.exponent + level / 100) / 1250;
	if (experience > maxSkillLevelXP) {
		base = Math.round(base);
	}

	if (experience <= maxSkillLevelXP) {
		return {
			weight: base,
			weight_overflow: 0,
		};
	}

	return {
		weight: base,
		weight_overflow: Math.pow((experience - maxSkillLevelXP) / skillGroup.divider, 0.968),
	};
}

function calculateSlayerWeight(type: string, experience: number): WeightResult {
	const slayerWeight = slayer_weights[type as keyof typeof slayer_weights];

	if (experience <= 1000000) {
		return {
			weight: experience === 0 ? 0 : experience / slayerWeight.divider,
			weight_overflow: 0,
		};
	}

	const base = 1000000 / slayerWeight.divider;
	let remaining = experience - 1000000;

	let modifier = slayerWeight.modifier;
	let overflow = 0;

	while (remaining > 0) {
		const left = Math.min(remaining, 1000000);

		overflow += Math.pow(left / (slayerWeight.divider * (1.5 + modifier)), 0.942);
		modifier += slayerWeight.modifier;
		remaining -= left;
	}

	return {
		weight: base,
		weight_overflow: overflow,
	};
}

async function calculateSenitherWeightInternal(
	type: string,
	level: number | null,
	experience: number,
): Promise<WeightResult | null> {
	const slayers = ['revenant', 'tarantula', 'sven', 'enderman'];
	const dungeons = ['catacombs', 'healer', 'mage', 'berserk', 'archer', 'tank'];
	const skills = ['mining', 'foraging', 'enchanting', 'farming', 'combat', 'fishing', 'alchemy', 'taming'];

	if (slayers.includes(type)) return calculateSlayerWeight(type, experience);
	else if (dungeons.includes(type)) return calculateDungeonWeight(type, level || 0, experience);
	else if (skills.includes(type)) return calculateSkillWeight(type, level || 0, experience);
	else return null;
}

/**
 * Calculate total Senither Weight for a profile (matches legacy exactly)
 */
export async function calculateTotalSenitherWeight(profile: Record<string, unknown>): Promise<DetailedWeightData> {
	try {
		const playerData = profile?.player_data as PlayerData;
		const slayerData = profile?.slayer as SlayerData;
		const dungeonsData = profile?.dungeons as DungeonsData;

		// Calculate individual weights
		const skillWeights = {
			farming: await calculateSenitherWeightInternal(
				'farming',
				calcSkill('farming', playerData?.experience?.SKILL_FARMING || 0).levelWithProgress,
				playerData?.experience?.SKILL_FARMING || 0,
			),
			mining: await calculateSenitherWeightInternal(
				'mining',
				calcSkill('mining', playerData?.experience?.SKILL_MINING || 0).levelWithProgress,
				playerData?.experience?.SKILL_MINING || 0,
			),
			combat: await calculateSenitherWeightInternal(
				'combat',
				calcSkill('combat', playerData?.experience?.SKILL_COMBAT || 0).levelWithProgress,
				playerData?.experience?.SKILL_COMBAT || 0,
			),
			foraging: await calculateSenitherWeightInternal(
				'foraging',
				calcSkill('foraging', playerData?.experience?.SKILL_FORAGING || 0).levelWithProgress,
				playerData?.experience?.SKILL_FORAGING || 0,
			),
			fishing: await calculateSenitherWeightInternal(
				'fishing',
				calcSkill('fishing', playerData?.experience?.SKILL_FISHING || 0).levelWithProgress,
				playerData?.experience?.SKILL_FISHING || 0,
			),
			enchanting: await calculateSenitherWeightInternal(
				'enchanting',
				calcSkill('enchanting', playerData?.experience?.SKILL_ENCHANTING || 0).levelWithProgress,
				playerData?.experience?.SKILL_ENCHANTING || 0,
			),
			alchemy: await calculateSenitherWeightInternal(
				'alchemy',
				calcSkill('alchemy', playerData?.experience?.SKILL_ALCHEMY || 0).levelWithProgress,
				playerData?.experience?.SKILL_ALCHEMY || 0,
			),
			taming: await calculateSenitherWeightInternal(
				'taming',
				calcSkill('taming', playerData?.experience?.SKILL_TAMING || 0).levelWithProgress,
				playerData?.experience?.SKILL_TAMING || 0,
			),
		};

		const slayerWeights = {
			revenant: await calculateSenitherWeightInternal(
				'revenant',
				null,
				slayerData?.slayer_bosses?.zombie?.xp || 0,
			),
			tarantula: await calculateSenitherWeightInternal(
				'tarantula',
				null,
				slayerData?.slayer_bosses?.spider?.xp || 0,
			),
			sven: await calculateSenitherWeightInternal('sven', null, slayerData?.slayer_bosses?.wolf?.xp || 0),
			enderman: await calculateSenitherWeightInternal(
				'enderman',
				null,
				slayerData?.slayer_bosses?.enderman?.xp || 0,
			),
		};

		const dungeonWeights = {
			catacombs: await calculateSenitherWeightInternal(
				'catacombs',
				calcSkill('dungeoneering', dungeonsData?.dungeon_types?.catacombs?.experience || 0).levelWithProgress,
				dungeonsData?.dungeon_types?.catacombs?.experience || 0,
			),
			healer: await calculateSenitherWeightInternal(
				'healer',
				calcSkill('dungeoneering', dungeonsData?.player_classes?.healer?.experience || 0).levelWithProgress,
				dungeonsData?.player_classes?.healer?.experience || 0,
			),
			mage: await calculateSenitherWeightInternal(
				'mage',
				calcSkill('dungeoneering', dungeonsData?.player_classes?.mage?.experience || 0).levelWithProgress,
				dungeonsData?.player_classes?.mage?.experience || 0,
			),
			berserk: await calculateSenitherWeightInternal(
				'berserk',
				calcSkill('dungeoneering', dungeonsData?.player_classes?.berserk?.experience || 0).levelWithProgress,
				dungeonsData?.player_classes?.berserk?.experience || 0,
			),
			archer: await calculateSenitherWeightInternal(
				'archer',
				calcSkill('dungeoneering', dungeonsData?.player_classes?.archer?.experience || 0).levelWithProgress,
				dungeonsData?.player_classes?.archer?.experience || 0,
			),
			tank: await calculateSenitherWeightInternal(
				'tank',
				calcSkill('dungeoneering', dungeonsData?.player_classes?.tank?.experience || 0).levelWithProgress,
				dungeonsData?.player_classes?.tank?.experience || 0,
			),
		};

		// Filter out null values and convert to proper format
		const skills: Record<string, WeightResult> = {};
		const slayer: Record<string, WeightResult> = {};
		const dungeons: Record<string, WeightResult> = {};

		// Process skills
		for (const [key, value] of Object.entries(skillWeights)) {
			if (value) {
				skills[key] = value;
			}
		}

		// Process slayers
		for (const [key, value] of Object.entries(slayerWeights)) {
			if (value) {
				slayer[key] = value;
			}
		}

		// Process dungeons
		for (const [key, value] of Object.entries(dungeonWeights)) {
			if (value) {
				dungeons[key] = value;
			}
		}

		// Calculate totals
		let totalWeight = 0;
		let totalOverflow = 0;

		// Sum skill weights
		for (const skillWeight of Object.values(skills)) {
			totalWeight += skillWeight.weight;
			totalOverflow += skillWeight.weight_overflow;
		}

		// Sum slayer weights
		for (const slayerWeight of Object.values(slayer)) {
			totalWeight += slayerWeight.weight;
			totalOverflow += slayerWeight.weight_overflow;
		}

		// Sum dungeon weights
		for (const dungeonWeight of Object.values(dungeons)) {
			totalWeight += dungeonWeight.weight;
			totalOverflow += dungeonWeight.weight_overflow;
		}

		return {
			total: totalWeight + totalOverflow,
			totalWeight: totalWeight,
			totalOverflow: totalOverflow,
			skills,
			slayer,
			dungeons,
		};
	} catch (error) {
		console.error('Error calculating Senither weight:', error);
		return {
			total: 0,
			totalWeight: 0,
			totalOverflow: 0,
			skills: {},
			slayer: {},
			dungeons: {},
		};
	}
}

/**
 * Calculate Senither Weight for a profile (for backward compatibility)
 */
export function calculateSenitherWeight(profile: Record<string, unknown>): Promise<DetailedWeightData> {
	return calculateTotalSenitherWeight(profile);
}

// Helper functions for formatting output (matching legacy JS)
function addCommas(num: number): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatData(data: Record<string, WeightResult>): string {
	let formattedData = '';
	for (const key in data) {
		if (data[key].weight !== undefined && data[key].weight_overflow !== undefined) {
			const weight = data[key].weight.toFixed(1);
			const overflow = data[key].weight_overflow.toFixed(1);
			if (overflow !== '0.0') {
				formattedData += `→ ${key}: **${addCommas(Number(weight))}** (+${addCommas(Number(overflow))})\n`;
			} else {
				formattedData += `→ ${key}: **${addCommas(Number(weight))}**\n`;
			}
		}
	}
	return formattedData;
}

/**
 * Legacy-style senither weight calculation with formatting
 */
export async function senitherWeight(profile: Record<string, unknown>): Promise<{
	total: number;
	totalWeight: number;
	totalOverflow: number;
	skills: string;
	slayers: string;
	dungeons: string;
}> {
	const weight = await calculateTotalSenitherWeight(profile);

	function sanitizeData(obj: DetailedWeightData) {
		const sanitizedObj = {
			total: obj.total,
			totalWeight: obj.totalWeight,
			totalOverflow: obj.totalOverflow,
			skills: formatData(obj.skills),
			slayers: formatData(obj.slayer),
			dungeons: formatData(obj.dungeons),
		};
		return sanitizedObj;
	}

	return sanitizeData(weight);
}
