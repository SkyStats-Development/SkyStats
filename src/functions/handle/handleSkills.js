const levelingData = require('../json/leveling.json');

function getSkillLevel(experience, xpTable) {
    let level = 0;
    let xpNeeded = 0;
    for (let i = 0; i < xpTable.length; i++) {
        xpNeeded += xpTable[i];
        if (experience < xpNeeded) {
            return { level, progress: (experience - (xpNeeded - xpTable[i])) / xpTable[i], xpTillNextLevel: xpTable[i] - (experience - (xpNeeded - xpTable[i])) };
        }
        level++;
    }
    return { level, progress: 1, xpTillNextLevel: 0 };
}

function handleSkills(profile) {
    const skills = ["SKILL_FISHING", "SKILL_ALCHEMY", "SKILL_MINING", "SKILL_FARMING", "SKILL_ENCHANTING", "SKILL_TAMING", "SKILL_FORAGING", "SKILL_CARPENTRY", "SKILL_COMBAT", "SKILL_RUNECRAFTING", "SKILL_SOCIAL"];
    const excludedSkills = ["SKILL_RUNECRAFTING", "SKILL_SOCIAL"];
    const skillCaps = levelingData.leveling_caps;
    const skillXP = levelingData.leveling_xp;
    const runecraftingXP = levelingData.runecrafting_xp;
    const skillData = profile.experience;

    let totalLevels = 0;
    let skillCount = 0;
    let skillLevels = {};
    let totalExperience = 0;

    skills.forEach(skill => {
        const xp = skillData[skill] || 0;
        totalExperience += xp;
        const cap = skillCaps[skill.toLowerCase().replace('skill_', '')] || 50;
        const xpTable = skill === "SKILL_RUNECRAFTING" ? runecraftingXP : skillXP;
        const { level, progress, xpTillNextLevel } = getSkillLevel(xp, xpTable.slice(0, cap));
        skillLevels[skill.toLowerCase().replace('skill_', '')] = {
            level,
            xp,
            levelWithProgress: level + progress,
            xpTillNextLevel
        };
        if (!excludedSkills.includes(skill)) {
            totalLevels += level;
            skillCount++;
        }
    });


    const skillAverage = totalLevels / skillCount;

    return {
        skills: {
            skill_average: skillAverage,
            total_experience: totalExperience,
            ...skillLevels
        }
    };
}

function handleCatacombsLevel(experience) {
    const xpTable = levelingData.catacombs;
    const infiniteXP = 200000000;
    let level = 0;
    let xpNeeded = 0;
    for (let i = 0; i < xpTable.length; i++) {
        xpNeeded += xpTable[i];
        if (experience < xpNeeded) {
            return {
                level,
                levelWithProgress: level + (experience - (xpNeeded - xpTable[i])) / xpTable[i],
                total_experience: experience
            };
        }
        level++;
    }

    while (experience >= xpNeeded + infiniteXP) {
        xpNeeded += infiniteXP;
        level++;
    }

    return {
        level,
        levelWithProgress: level + (experience - xpNeeded) / infiniteXP,
        total_experience: experience
    };
}


function getSlayerLevel(experience, xpTable) {
    let level = 0;
    for (let i = 0; i < xpTable.length; i++) {
        if (experience < xpTable[i]) {
            return { level };
        }
        level++;
    }
    return { level };
}

function handleSlayers(profile) {
    const slayers = ["zombie", "spider", "wolf", "enderman", "blaze", "vampire"];
    const slayerXP = levelingData.slayer_xp;
    const slayerData = profile.slayer_bosses;
    if (!slayerData) {
        return;
    }

    let slayerLevels = {};
    console.log(slayers)
    slayers.forEach(slayer => {
        const xp = slayerData[slayer]?.xp || 0;
        const xpTable = slayerXP[slayer] || [];
        const { level } = getSlayerLevel(xp, xpTable);

        slayerLevels[slayer] = {
            xp,
            level,
            boss_kills_tier_0: slayerData[slayer]?.boss_kills_tier_0 || 0,
            boss_kills_tier_1: slayerData[slayer]?.boss_kills_tier_1 || 0,
            boss_kills_tier_2: slayerData[slayer]?.boss_kills_tier_2 || 0,
            boss_kills_tier_3: slayerData[slayer]?.boss_kills_tier_3 || 0,
            boss_kills_tier_4: slayerData[slayer]?.boss_kills_tier_4 || 0,
            boss_attempts_tier_4: slayerData[slayer]?.boss_attempts_tier_4 || 0
        };
    });

    return slayerLevels;
}


function handleHoTMXP(experience) {
    const xpTable = levelingData.HOTM;
    if (experience === 0) {
        return {
            level: 0,
            levelWithProgress: 0,
            experience
        }
    }
    let level = 0;
    let xpNeeded = 0;
    for (let i = 0; i < xpTable.length; i++) {
        xpNeeded += xpTable[i];
        if (experience < xpNeeded) {
            return {
                level,
                levelWithProgress: level + (experience - (xpNeeded - xpTable[i])) / xpTable[i],
                total_experience: experience
            };
        }
        level++;
    }

    return {
        level,
        levelWithProgress: level + (experience - xpNeeded),
        total_experience: experience
    };

}


function handleGardenXP(experience) {
    const xpTable = levelingData.garden_exp;
    const maxLevel = 15;

    if (experience === 0) {
        return {
            level: 0,
            levelWithProgress: 0,
            experience
        }
    }

    let level = 0;
    let xpNeeded = 0;

    for (let i = 0; i < xpTable.length; i++) {
        xpNeeded += xpTable[i];
        if (experience < xpNeeded) {
            let levelWithProgress = level + (experience - (xpNeeded - xpTable[i])) / xpTable[i];
            if (levelWithProgress > maxLevel) {
                levelWithProgress = maxLevel;
            }
            return {
                level,
                levelWithProgress,
                total_experience: experience
            };
        }
        level++;
    }

    let levelWithProgress = level + (experience - xpNeeded);
    if (levelWithProgress > maxLevel) {
        levelWithProgress = maxLevel;
    }

    return {
        level,
        levelWithProgress,
        total_experience: experience
    };
}


function calcTimeCharms(profile) {
    const count = profile?.rift?.gallery?.secured_trophies?.length;
    if (count === NaN) {
        return 0;
    }
    return Math.min(Math.max(count, 0), 8);
}

module.exports = { handleSkills, handleCatacombsLevel, handleSlayers, handleHoTMXP, handleGardenXP, calcTimeCharms };