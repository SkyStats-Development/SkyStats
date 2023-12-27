const config = require(`../../../../config.json`);
const messages = config.messages.discord;
const { getNetworth } = require("../../../functions/get/getNetworth/getNetworth");
const { getPets } = require("../../../functions/get/getNetworth/getPets");
const {getItems, getAllItems,} = require("../../../functions/get/getNetworth/getItems");
const PURSE_ICON = "<:Purse:1059997956784279562>";
const IRON_INGOT_ICON = "<:IRON_INGOT:1070126498616455328>";
const BOOSTER_COOKIE_ICON = "<:BOOSTER_COOKIE:1070126116846710865>";
const { addNotation, addCommas } = require("../../../contracts/helperFunctions");

async function networthEmbed(embed_ID, uuid, profileid, username, profilename) {
    let uuid2 = uuid; // temp fix lol
    const [stats, petData, itemsData, allItemsData] = await Promise.all([
        getNetworth(uuid, profileid),
        getPets(uuid, profileid),
        getItems(uuid, profileid),
        getAllItems(uuid, profileid),
      ]);
      const {
        networth: { formatted: networth, short: shortnetworth },
        soulbound: { formatted: unsoulbound, short: shortbound },
        irlnw,
        purse,
        bank: { formatted: bank },
        sacks: { total: sackvalue },
        misc: { total: misc, candy_inventory, potion_bag, fishing_bag },
      } = stats || {};
      
      const { inventory, inv, equipment, eq, armor, ar, accessories, acc, enderchest, ec, pv, personalV, storage, storageL, wardrobe, wd, museum, museumSpecial, mus } = itemsData || {};
      const { petValue, petTotal, allPets, allLongPets } = petData || {};
      const {
        allAccessories,
        allMuseum,
        allInv,
        allEnderchest,
        allStorage,
        allWardrobe,
      } = allItemsData || {};
      if (embed_ID === "totals_embed") {
        return {
            color: 0xffa600,
            title: `Networth For ${username} On ${profilename} `,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `${PURSE_ICON} Networth: **${networth} (${shortnetworth})**\n${IRON_INGOT_ICON} Unsoulbound Networth: **${unsoulbound} (${shortbound})**\n${BOOSTER_COOKIE_ICON} IRL Value: **$${irlnw} USD**`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
            fields: [
              {
                name: "<:Purse:1059997956784279562> Purse",
                value: `${addNotation("oneLetters", purse) ?? 0}`,
                inline: true,
              },
              {
                name: "<:Bank:1059664677606531173> Bank",
                value: `${bank ?? 0}`,
                inline: true,
              },
              {
                name: "<:sacks:1059664698095710388> Sacks",
                value: `${addNotation("oneLetters", sackvalue) ?? 0}`,
                inline: true,
              },
              {
                name: `<:DIAMOND_CHESTPLATE:1061454753357377586> Armor  (${
                  addNotation("oneLetters", armor) ?? 0
                })`,
                value: ar,
                inline: false,
              },
              {
                name: `<:Iron_Chestplate:1061454825839144970> Equipment  (${
                  addNotation("oneLetters", equipment) ?? 0
                })`,
                value: eq,
                inline: false,
              },
              {
                name: `<:ARMOR_STAND:1061454861071298620> Wardrobe  (${
                  addNotation("oneLetters", wardrobe) ?? 0
                })`,
                value: wd,
                inline: false,
              },
              {
                name: `<:CHEST:1061454902049656993> Inventory  (${
                  addNotation("oneLetters", inventory) ?? 0
                })`,
                value: inv,
                inline: false,
              },
              {
                name: `<:ENDER_CHEST:1061454947931140106> Ender Chest  (${
                  addNotation("oneLetters", enderchest) ?? 0
                })`,
                value: ec,
                inline: false,
              },
              {
                name: `<:storage:1059664802701656224> Storage  (${
                  addNotation("oneLetters", storage) ?? 0
                })`,
                value: storageL,
                inline: false,
              },
              {
                name: `<:LEATHER_CHESTPLATE:1134874048048935012> Museum  (${addNotation("oneLetters", museum) ?? 0})\n<:LEATHER_CHESTPLATE:1134874048048935012> Specialty Museum (${addNotation("oneLetters", museumSpecial) ?? 0})`,
                value: mus,
                inline: false,
              },
              {
                name: `<:Spawn_Null:1061455273224577024> Pets  (${
                  addNotation("oneLetters", petTotal) ?? 0
                })`,
                value: allPets,
                inline: false,
              },
              {
                name: `<:HEGEMONY_ARTIFACT:1061455309983461486> Accessory Bag (${
                  addNotation("oneLetters", accessories) ?? 0
                })`,
                value: acc,
                inline: false,
              },
              {
                name: `<:item_2654:1061455349338615859> Personal Vault (${
                  addNotation("oneLetters", pv) ?? 0
                })`,
                value: personalV,
                inline: false,
              },
              {
                name: `<:wheat:1059664236038590584> Misc (${
                  addNotation("oneLetters", misc + stats.sacks.total) ?? 0
                })`,
                value: `→ Candy Bag (**${
                  addNotation("oneLetters", candy_inventory) ?? 0
                }**)\n→ Fishing Bag (**${
                  addNotation("oneLetters", fishing_bag) ?? 0
                }**)\n→ Potion Bag (**${
                  addNotation("oneLetters", potion_bag) ?? 0
                }**)\n→ Sacks (**${
                  addNotation("oneLetters", stats.sacks.sacks) ?? 0
                }**)\n→ Essence (**${
                  addNotation("oneLetters", stats.sacks.essence) ?? 0
                }**)`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: `${messages.default}`,
              iconURL: `${messages.icon}`,
            },
        }
    } else if (embed_ID === "wardrobe_embed") {
        return {
            color: 0xffa600,
            title: `Wardrobe for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Wardrobe Value: **${addCommas(
              wardrobe
            )}** (**${addNotation("oneLetters", wardrobe)}**)\n\n${allWardrobe}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${addCommas(wardrobe)}`,
            },
        }
    } else if (embed_ID === "inventory_embed") {
        return {
            color: 0xffa600,
            title: `Inventory for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Inventory Value: **${addCommas(
              inventory
            )}** (**${addNotation(
              "oneLetters",
              inventory
            )}**)\n\n${allInv}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else if (embed_ID === "enderchest_embed") {
        return {
            color: 0xffa600,
            title: `Ender Chest for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Ender Chest Value: **${addCommas(
              enderchest
            )}** (**${addNotation(
              "oneLetters",
              enderchest
            )}**)\n\n${allEnderchest}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else if (embed_ID === "storage_embed") {
        return {
            color: 0xffa600,
            title: `Storage for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Storage Value: **${addCommas(
              storage
            )}** (**${addNotation("oneLetters", storage)}**)\n\n${allStorage}}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else if (embed_ID === "pet_embed") {
        return {
            color: 0xffa600,
            title: `Pets for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Pets Value: **${addCommas(petTotal)}** (**${addNotation(
              "oneLetters",
              petValue
            )}**)\n\n${allLongPets}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else if (embed_ID === "talisman_bag_embed") {
        return {
            color: 0xffa600,
            title: `Accessories Bag for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Accessories Bag Value: **${addCommas(
              accessories
            )}** (**${addNotation(
              "oneLetters",
              accessories
            )}**)\n\n${allAccessories}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else if (embed_ID === "museum_embed") {
        return {
            color: 0xffa600,
            title: `Pets for ${username} on ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `Museum Value: **${addCommas(museum)}** (**${addNotation("oneLetters",museum)}**)\nSpecialty Museum (${addNotation("oneLetters", museumSpecial) ?? 0})\n\n${allMuseum}`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    } else {
        return {
            color: 0xffa600,
            title: `Uh... Hello ${username}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: `You have unlocked a secret embed!\nEither you selected a field that is somehow unknown or something horrible broke!\n\nPlease use the command \`\issue\` to report this right away!`,
            thumbnail: {
              url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
        }
    }
    

}

module.exports = { networthEmbed };