const config = require(`../../../../config.json`);
const { addNotation, addCommas } = require(`../../../contracts/helperFunctions`);
const messages = config.messages.discord;
const { farmingWeight } = require("../../../functions/get/getWeight")
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
    SWORD_ICON: "<:sword:1060045450897539122>",
    STORAGE_ICON: `<:storage:1059664802701656224>`,
    MUSEUM_ICON: `<:LEATHER_CHESTPLATE:1134874048048935012>`,
    PET_ICON: `<:Spawn_Null:1061455273224577024>`,
    BONUS_ICON: "<:carrot:1072129687427498012>",
    ACCESSORY_BAG_ICON: `<:HEGEMONY_ARTIFACT:1061455309983461486>`,
    PERSONAL_VAULT_ICON: `<:item_2654:1061455349338615859>`,
    MISC_ICON: `<:wheat:1059664236038590584>`,
  }

async function farmingWeight_Embed(uuid, username, profilename) {
    const weight = await farmingWeight(uuid)
    return { 
        color: 0xffa600,
        title: `Farming Weight for ${username} on ${profilename}`,
        URL: `https://sky.shiiyu.moe/stats/${uuid}`,
        description: `${EMOJIS.SWORD_ICON} Total Weight: **${weight.total_weight}**`,
        fields: [
            {
              name: `${EMOJIS.MISC_ICON} Crops`,
              value: weight.items.crop_weight,
              inline: false,
            },
            {
              name: `${EMOJIS.BONUS_ICON} Bonuses`,
              value: weight.items.bonus_weight,
              inline: false,
            },
        ],
        thumbnail: {
          url: `https://api.mineatar.io/body/full/${uuid}`
        },
        footer: {
            text: `${messages.farming_weight}`,
            iconURL: `${messages.icon}`,
          },
    }
    }


module.exports = { farmingWeight_Embed };