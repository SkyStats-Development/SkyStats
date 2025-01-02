
const { handleSkills, handleCatacombsLevel, handleSlayers, handleHoTMXP, handleGardenXP, calcTimeCharms } = require('./handleSkills');
const { getSkyHelper } = require('../get/getNetworth/getSkyHelper');
const { getGarden } = require('../get/getGarden');
const { senitherWeight } = require('../get/getWeight');

async function handleProfile(uuid, profile, profileID, profileRes) {
    const [networth_obj, garden_obj, weight_data] = await Promise.all([
        getSkyHelper(profileID, uuid, profileRes),
        getGarden(profileID, uuid),
        senitherWeight(profile),
    ]);
    let garden_data = handleGardenXP(garden_obj.gardenXP || 0);
    let hotm_data = handleHoTMXP(profile?.mining_core?.experience || 0);
    let skill_data = handleSkills(profile?.player_data || 0);
    let slayer_data = handleSlayers(profile?.slayer || 0);
    let catacombs_data = handleCatacombsLevel(profile?.dungeons?.dungeon_types?.catacombs?.experience || 0);

    return {
        skyblock_level: profile?.leveling?.experience / 100,
        senither_weight: weight_data?.total,
        time_charms: calcTimeCharms(profile) || 0,
        hoppity_prestige: profile?.events?.easter?.chocolate_level || 0,
        skill_average: skill_data?.skills?.skill_average,
        slayer_data,
        hotm_data,
        garden_data,
        catacombs_level: catacombs_data?.levelWithProgress,
        networth: {
            purse: networth_obj?.networth.purse,
            bank: networth_obj?.networth.bank,
            personal_bank: networth_obj?.networth.personalBank,
            total_networth: networth_obj?.networth.networth,
            unsoulbound_networth: networth_obj?.networth.unsoulboundNetworth,
        }

    }

}

module.exports = { handleProfile };