
const { handleSkills, handleCatacombsLevel, handleSlayers } = require('./handleSkills');
const { getSkyHelper } = require('../get/getNetworth/getSkyHelper');

async function handleProfile(uuid, profile, profileID, profileRes) {
    let networth_obj = await getSkyHelper(profileID, uuid, profileRes)



    let skill_data = handleSkills(profile.player_data);
    let slayer_data = handleSlayers(profile.slayer);
    let catacombs_data = handleCatacombsLevel(profile.dungeons.dungeon_types.catacombs.experience);

    return {
        skyblock_level: profile.leveling.experience / 100,
        skill_average: skill_data.skills.skill_average,
        slayer_data,
        catacombs_level: catacombs_data.levelWithProgress,
        networth: {
            purse: networth_obj.networth.purse,
            bank: networth_obj.networth.bank,
            personal_bank: networth_obj.networth.personalBank,
            total_networth: networth_obj.networth.networth,
            unsoulbound_networth: networth_obj.networth.unsoulboundNetworth,
        }

    }

}

module.exports = { handleProfile };