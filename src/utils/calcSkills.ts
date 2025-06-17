/**
 * Calculate skill level and XP progress for a given skill and experience.
 * @module calcSkills
 */
import xpTables from '../utils/xp_tables';

export interface SkillProgress {
	totalXp: number;
	xp: number;
	level: number;
	xpCurrent: number;
	xpForNext: number;
	progress: number;
}

type SkillName = keyof typeof xpTables.maxLevels;
type TableName = 'normal' | 'runecrafting' | 'social' | 'catacombs';

const tableMap: Record<SkillName | 'dungeoneering', TableName> = {
	farming: 'normal',
	mining: 'normal',
	combat: 'normal',
	foraging: 'normal',
	fishing: 'normal',
	enchanting: 'normal',
	alchemy: 'normal',
	taming: 'normal',
	carpentry: 'normal',
	runecrafting: 'runecrafting',
	social: 'social',
	dungeoneering: 'catacombs',
};

export function calcSkill(skill: SkillName, experience: number): SkillProgress {
	const table = tableMap[skill];

	if (experience <= 0) {
		return {
			totalXp: 0,
			xp: 0,
			level: 0,
			xpCurrent: 0,
			xpForNext: xpTables[table][0],
			progress: 0,
		};
	}

	let xp = 0;
	let level = 0;
	let xpForNext = 0;
	let progress = 0;
	const maxLevel = xpTables.maxLevels[skill];

	for (let i = 1; i <= maxLevel; i++) {
		xp += xpTables[table][i - 1];
		if (xp > experience) {
			xp -= xpTables[table][i - 1];
		} else {
			if (i <= maxLevel) level = i;
		}
	}

	const xpCurrent = Math.floor(experience - xp);
	const totalXp = experience;

	if (level < maxLevel) {
		xpForNext = xpTables[table][level];
		progress = xpCurrent / xpForNext;
	} else {
		xpForNext = 0;
		progress = 1;
	}

	return {
		totalXp,
		xp,
		level,
		xpCurrent,
		xpForNext,
		progress,
	};
}
