const xp_tables = require('../constants/xp_tables');
module.exports = function calcSkill(skill, experience) {
    table = 'normal';
    if (skill === 'runecrafting') table = 'runecrafting';
    if (skill === 'social') table = 'social';
    if (skill === 'dungeoneering') table = 'catacombs';

    if (experience <= 0) {
        return {
            totalXp: 0,
            xp: 0,
            level: 0,
            xpCurrent: 0,
            xpForNext: xp_tables[table][0],
            progress: 0,
        };
    }
    let xp = 0;
    let level = 0;
    let xpForNext = 0;
    let progress = 0;
    let maxLevel = 0;

    if (xp_tables.max_levels[skill]) maxLevel = xp_tables.max_levels[skill];

    for (let i = 1; i <= maxLevel; i++) {
        xp += xp_tables[table][i - 1];

        if (xp > experience) {
            xp -= xp_tables[table][i - 1];
        } else {
            if (i <= maxLevel) level = i;
        }
    }

    let xpCurrent = Math.floor(experience - xp);

    let totalXp = experience;

    if (level < maxLevel) {
        xpForNext = Math.ceil(xp_tables[table][level]);
    }

    progress = level >= maxLevel ? 0 : Math.max(0, Math.min(xpCurrent / xpForNext, 1)) 

    let maxLevelExperience = 0;
    for (const experience of xp_tables[table]) {
        if (xp_tables[table].indexOf(experience) >= maxLevel) continue;

        maxLevelExperience += experience;
    }
    
    return {
        totalXp,
        xp,
        level,
        maxLevelExperience,
        xpCurrent,
        xpForNext,
        progress,
        maxLevel,
        levelWithProgress: level < maxLevel ? level + progress : level,
    };
};