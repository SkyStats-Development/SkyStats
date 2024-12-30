const config = require(`../../../../config.json`);
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


async function profileEmbed(uuid, username, cute_name, profile_id, first_join, profile_members, profile_type) {
    console.log(profile_members)
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

    const members = parse_profile_members(profile_members);
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
                value: `441`,
                inline: true
            },
            {
                name: EMOJIS.SKILL_AVERAGE + ` Skill Average`,
                value: `11`,
                inline: true
            },
            {
                name: EMOJIS.DUNGEONS + ` Catacombs`,
                value: `44.3`,
                inline: true
            },
            // =================================================================================
            {
                name: EMOJIS.NETWORTH_ICON + ` Networth`,
                value: `441b | 33b`,
                inline: true
            },
            {
                name: EMOJIS.PURSE_ICON + ` Purse`,
                value: `11.8`,
                inline: true
            },
            {
                name: EMOJIS.BANK_ICON + ` Bank`,
                value: `33.3b | 11b`,
                inline: true
            },
            // =================================================================================
            {
                name: EMOJIS.SLAYER + ` Slayers`,
                value: `4/4/1/9/2/4`,
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
