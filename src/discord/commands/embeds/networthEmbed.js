
const config = require(`../../../../config.json`);
const { addNotation, addCommas } = require(`../../../contracts/helperFunctions`);
const messages = config.messages.discord;
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
}
async function networthEmbed(embed_ID, uuid, profileid, username, profilename, networth) {
      if (embed_ID === `totals_embed`) {
        return {
            color: 0xffa600,
            title: `Networth For ${username} On ${profilename} `,
            URL: `https://sky.shiiyu.moe/stats/${uuid}`,
            description: `${EMOJIS.PURSE_ICON} Networth: **${networth.networth.total.total_networth} (${networth.networth.total.short_networth})**\n${EMOJIS.SOULBOUND_ICON} Unsoulbound Networth: **${networth.networth.soulbound.formatted} (${networth.networth.soulbound.short})**\n${EMOJIS.BOOSTER_COOKIE_ICON} IRL Value: **$${networth.networth.total.irl_value} USD**`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid}`,
            },
            fields: [
              {
                name: `${EMOJIS.PURSE_ICON} Purse`,
                value: `${addNotation(`oneLetters`, networth.networth.bank.purse) ?? 0}`,
                inline: true,
              },
              {
                name: `${EMOJIS.BANK_ICON} Bank`,
                value: `${networth.networth.bank.formatted ?? 0}`,
                inline: true,
              },
              {
                name: `${EMOJIS.SACK_ICON} Sacks`,
                value: `${addNotation(`oneLetters`, networth.sacks.total) ?? 0}`,
                inline: true,
              },
              {
                name: `${EMOJIS.ARMOR_ICON} Armor  (${addNotation(`oneLetters`, networth.networth.total.items_total.armor_value) ?? 0})`,
                value: networth.items.items_4.armor_items,
                inline: false,
              },
              {
                name: `${EMOJIS.EQUIPMENT_ICON} Equipment  (${addNotation(`oneLetters`, networth.networth.total.items_total.equipment_value) ?? 0})`,
                value: networth.items.items_4.equipment_items,
                inline: false,
              },
              {
                name: `${EMOJIS.WARDROBE_ICON} Wardrobe  (${addNotation(`oneLetters`, networth.networth.total.items_total.wardrobe_value) ?? 0})`,
                value: networth.items.items_4.wardrobe_items,
                inline: false,
              },
              {
                name: `${EMOJIS.INVENTORY_ICON} Inventory  (${addNotation(`oneLetters`, networth.networth.total.items_total.inventory_value) ?? 0})`,
                value: networth.items.items_4.inventory_items,
                inline: false,
              },
              {
                name: `${EMOJIS.ENDER_CHEST_ICON} Ender Chest  (${addNotation(`oneLetters`, networth.networth.total.items_total.enderchest_value) ?? 0})`,
                value: networth.items.items_4.enderchest_items,
                inline: false,
              },
              {
                name: `${EMOJIS.STORAGE_ICON} Storage  (${addNotation(`oneLetters`, networth.networth.total.items_total.storage_value) ?? 0})`,
                value: networth.items.items_4.storage_items,
                inline: false,
              },
              {
                name: `${EMOJIS.MUSEUM_ICON} Museum (${addNotation(`oneLetters`, networth.networth.total.items_total.museum.museum_value) ?? 0}/${addNotation(`oneLetters`, networth.networth.total.items_total.museum.special_museum_value) ?? 0})`,
                value: networth.items.items_4.museum_items,
                inline: false,
              },
              {
                name: `${EMOJIS.PET_ICON} Pets  (${addNotation(`oneLetters`, networth.networth.total.items_total.pet_value) ?? 0})`,
                value: networth.items.items_4.pet_items,
                inline: false,
              },
              {
                name: `${EMOJIS.ACCESSORY_BAG_ICON} Accessory Bag (${addNotation(`oneLetters`, networth.networth.total.items_total.talisman_bag_value) ?? 0})`,
                value: networth.items.items_4.talisman_bag_items,
                inline: false,
              },
              {
                name: `${EMOJIS.PERSONAL_VAULT_ICON} Personal Vault (${addNotation(`oneLetters`, networth.networth.total.items_total.personal_vault_value) ?? 0})`,
                value: networth.items.items_4.personal_vault_items,
                inline: false,
              },
              {
                name: `${EMOJIS.MISC_ICON} Misc (${addNotation(`oneLetters`, networth.sacks.total) ?? 0})`,
                value: `→ Fishing Bag (**${addNotation(`oneLetters`, networth.sacks.fishing_bag) ?? 0}**)\n→ Sacks (**${addNotation(`oneLetters`, networth.sacks.sacks) ?? 0}**)\n→ Essence (**${addNotation(`oneLetters`, networth.sacks.essence) ?? 0}**)`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
            },
        }
      } else if (embed_ID === `wardrobe_embed`) {
        return {
          color: 0xffa600,
          title: `Wardrobe for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.WARDROBE_ICON} Wardrobe Value: **${addCommas(networth.networth.total.items_total.wardrobe_value)}** (**${addNotation(`oneLetters`, networth.networth.total.items_total.wardrobe_value)}**)\n\n${addNotation(`oneLetters`, networth.items.items_20.wardrobe_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      } else if (embed_ID === `inventory_embed`) {
        return {
          color: 0xffa600,
          title: `Inventory for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.INVENTORY_ICON} Inventory Value: **${addCommas(networth.networth.total.items_total.inventory_value)}** (**${addNotation(`oneLetters`, networth.networth.total.items_total.inventory_value)}**)\n\n${addNotation(`oneLetters`, networth.items.items_20.inventory_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`
          }
        }

      } else if (embed_ID === `enderchest_embed`) {
        return {
          color: 0xffa600,
          title: `Ender Chest for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.ENDER_CHEST_ICON} Ender Chest Value: **${addCommas(networth.networth.total.items_total.enderchest_value)}** (**${addNotation(`oneLetters`, networth.networth.total.items_total.enderchest_value)}**)\n\n${addNotation(`oneLetters`, networth.items.items_20.enderchest_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      } else if (embed_ID === `storage_embed`) {
        return {
          color: 0xffa600,
          title: `Storage for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.STORAGE_ICON} Storage Value: **${addCommas(networth.networth.total.items_total.storage_value)}** (**${addNotation(`oneLetters`, networth.networth.total.items_total.storage_value)}**)\n\n${addNotation(`oneLetters`, networth.items.items_20.storage_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      } else if (embed_ID === `pet_embed`) {
        return {
          color: 0xffa600,
          title: `Pets for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.PET_ICON} Pets Value: **${addCommas(networth.networth.total.items_total.pet_value)}** (**${addNotation(`oneLetters`, networth.networth.total.items_total.pet_value)}**)\n\n${addNotation(`oneLetters`, networth.items.items_20.pet_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      } else if (embed_ID === `talisman_bag_embed`) {
        return {
          color: 0xffa600,
          title: `Accessory Bag for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.ACCESSORY_BAG_ICON} Accessory Bag Value: ${addCommas(networth.networth.total.items_total.talisman_bag_value)} (${addNotation(`oneLetters`, networth.networth.total.items_total.talisman_bag_value)})\n\n${addNotation(`oneLetters`, networth.items.items_20.talisman_bag_items_20) ?? 0}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      } else if (embed_ID === `museum_embed`) {
        return {
          color: 0xffa600,
          title: `Museum for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `${EMOJIS.MUSEUM_ICON} Museum Value: ${addCommas(networth.networth.total.items_total.museum.museum_value)} (${addNotation(`oneLetters`, networth.networth.total.items_total.museum.museum_value) ?? 0})\n${EMOJIS.MUSEUM_ICON} Specialty Museum Value: ${addCommas(networth.networth.total.items_total.museum.special_museum_value)} (${addNotation(`oneLetters`, networth.networth.total.items_total.museum.special_museum_value) ?? 0})\n\n${addNotation(`oneLetters`, networth.items.items_20.museum_items_20) ?? 0}`,
        }
      } else {
        return {
          color: 0xffa600,
          title: `Uh... Hello ${username}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid}`,
          description: `You have unlocked a secret embed!\nEither you selected a field that is somehow unknown or something horrible broke!\n\nPlease use the command \`\issue\` to report this right away!`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid}`,
          },
        }
      }
    

}

module.exports = { networthEmbed };