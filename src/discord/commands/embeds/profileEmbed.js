const config = require(`../../../../config.json`);
function parse_profile_members(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    let parsed_members = [];
    array.sort((a, b) => a.deleted - b.deleted);
    array.forEach(member => {
        if (member.deleted) {
            parsed_members.push(`**~~${member.username}~~**`);
        } else {
            parsed_members.push(`**${member.username}**`);
        }
    });
    return parsed_members;
}
const { addNotation, addCommas, capitalize } = require(`../../../contracts/helperFunctions`);
const EMOJIS = {
    PURSE_ICON: `<:Purse:1059997956784279562>`,
    BOOSTER_COOKIE_ICON: `<:BOOSTER_COOKIE:1070126116846710865>`,
    SOULBOUND_ICON: `<:IRON_INGOT:1070126498616455328>`,
    BANK_ICON: `<:Bank:1059664677606531173>`,
    SACK_ICON: `<:sacks:1059664698095710388>`,
    ARMOR_ICON: `<:DIAMOND_CHESTPLATE:1061454753357377586>`,
    EQUIPMENT_ICON: `<:Iron_Chestplate:1061454825839144970>`,
    WARDROBE_ICON: `<:ARMOR_STAND:1061454861071298620>`,
    INVENTORY_ICON: `<:CHEST:1061454902049656993>`,
    ENDER_CHEST_ICON: `<:ENDER_CHEST:1061454947931140106>`,
    STORAGE_ICON: `<:storage:1059664802701656224>`,
    MUSEUM_ICON: `<:LEATHER_CHESTPLATE:1134874048048935012>`,
    PET_ICON: `<:Spawn_Null:1061455273224577024>`,
    ACCESSORY_BAG_ICON: `<:HEGEMONY_ARTIFACT:1061455309983461486>`,
    PERSONAL_VAULT_ICON: `<:item_2654:1061455349338615859>`,
    MISC_ICON: `<:wheat:1059664236038590584>`,
    SKYBLOCK_XP: `<:sbxp:1323246356051001377>`,
    SLAYER: `<:Slayer:1060045486712696872>`,
    SKILL_AVERAGE: "<:skillavrg:1323246627032662067>",
    DUNGEONS: "<:dungeons:1062778077735829615>",
    HOTM: "<:HeartOfTheMountain:1061814218598391818>",
    GARDEN: "<:garden:1323247886556991509>",
    NETWORTH_ICON: "<:personalBank:1323249435169394759>",
    HOPPITY_COLLECTION: "<:hoppityRabbit:1323252529592664158>",
    RIFT_TIMECHARMS: "<a:TimeCharms:1323254721112178738>",
    NETHER_GRASS: "<:NETHER_GRASS:1323253358886391929>",
};

const messages = config.messages.discord;


async function profileEmbed(uuid, username, cute_name, profile_id, first_join, profile_members, profile_type, profile_data) {
    const members = parse_profile_members(profile_members);
    function generateSlayerString(obj) {
        const slayers = ['zombie', 'spider', 'wolf', 'enderman', 'blaze', 'vampire'];
        return slayers.map(slayer => obj[slayer].level).join('/');
    };
    return {
        color: 0xffa600,
        title: `${username}'s Profile on ${cute_name}`,
        description: `Created: **<t:${Math.round(first_join / 1000)}>**\nType: **${capitalize(profile_type)}**\nCo-op: ${members.join(`, `)}`,
        URL: `https://sky.shiiyu.moe/stats/${uuid}`,
        thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
        },
        fields: [
            {
                name: EMOJIS.SKYBLOCK_XP + ` Skyblock Level`,
                value: `${profile_data.skyblock_level.toFixed(0)}`,
                inline: true
            },
            {
                name: EMOJIS.SKILL_AVERAGE + ` Skill Average`,
                value: `${profile_data.skill_average.toFixed(2)}`,
                inline: true
            },
            {
                name: EMOJIS.DUNGEONS + ` Catacombs`,
                value: `${profile_data.catacombs_level.toFixed(2)}`,
                inline: true
            },
            // =================================================================================
            {
                name: EMOJIS.NETWORTH_ICON + ` Networth`,
                value: `${addNotation(`oneLetters`, profile_data.networth.total_networth.toFixed(1)) ?? 0} || ${addNotation(`oneLetters`, profile_data.networth.unsoulbound_networth.toFixed(1)) ?? 0}`,
                inline: true
            },
            {
                name: EMOJIS.PURSE_ICON + ` Purse`,
                value: `${addNotation(`oneLetters`, profile_data.networth.purse.toFixed(1)) ?? 0}`,
                inline: true
            },
            {
                name: EMOJIS.BANK_ICON + ` Bank`,
                value: `${addNotation(`oneLetters`, profile_data.networth.bank.toFixed(1)) ?? 0} || ${addNotation(`oneLetters`, profile_data.networth.personal_bank.toFixed(1)) ?? 0}`,
                inline: true
            },
            // =================================================================================
            {
                name: EMOJIS.SLAYER + ` Slayers`,
                value: `${generateSlayerString(profile_data.slayer_data)}`,
                inline: true
            },
            {
                name: EMOJIS.HOTM + ` HoTM`,
                value: `11`,
                inline: true
            },
            {
                name: EMOJIS.GARDEN + ` Garden`,
                value: `15`,
                inline: true
            },
            // =================================================================================
            {
                name: EMOJIS.NETHER_GRASS + ` Senither Weight`,
                value: `15,434`,
                inline: true
            },
            {
                name: EMOJIS.RIFT_TIMECHARMS + ` Rift Timecharms`,
                value: `43.3`,
                inline: true
            },
            {
                name: EMOJIS.HOPPITY_COLLECTION + ` Chcolate Factory`,
                value: `Level 4/6`,
                inline: true
            },

        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: `${messages.default}`,
            iconURL: `${messages.icon}`,
        },
    }
};

module.exports = { profileEmbed };
