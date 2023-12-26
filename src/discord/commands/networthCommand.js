const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const config = require("../../../config.json");
const messages = config.messages.discord;
const { getNetworth } = require("../../functions/get/getNetworth/getNetworth");
const { getPets } = require("../../functions/get/getNetworth/getPets");
const {getItems, getAllItems,} = require("../../functions/get/getNetworth/getItems");
const { getPlayer } = require("../../functions/get/getPlayer");
const { handleError } = require("../../functions/handle/handleError");

const PURSE_ICON = "<:Purse:1059997956784279562>";
const IRON_INGOT_ICON = "<:IRON_INGOT:1070126498616455328>";
const BOOSTER_COOKIE_ICON = "<:BOOSTER_COOKIE:1070126116846710865>";

module.exports = {
  name: "networth",
  description: "Fetches your networth!",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: false,
    },
  ],

  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.user.id;
    const { uuid2, username, profilename, profileid, error } = await getPlayer(
      id,
      interaction.options.getString("name")
    );
    if (error) {
      console.log(error);
      const errorembed = {
        color: 0xff0000,
        title: `Error`,
        description: `Data: ` + error.description,
        timestamp: new Date().toISOString(),
      };
      await interaction.editReply({ embeds: [errorembed] });
    } else {
      try {
        const [stats, petData, itemsData, allItemsData] = await Promise.all([
          getNetworth(uuid2, profileid),
          getPets(uuid2, profileid),
          getItems(uuid2, profileid),
          getAllItems(uuid2, profileid),
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

        const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('selectmenu')
        .setPlaceholder('Select A field...')
        .addOptions([
            {
                label: 'Wardrobe',
                value: 'id_armor',
                // wardrobe_embed
            },
            {
                label: 'Inventory',
                value: 'id_inventory',
                // inventory_embed
            },
          {
            label: `Ender Chest`,
            value: `id_ender_chest`,
            // enderchest_embed
          },
          {
            label: `Storage`,
            value: `id_storage`,
            // storage_embed
          },
          {
            label: `Museum`,
            value: `id_museum`,
            // museum_embed
          },
          {
            label: "Pets",
            value: "id_pet_menu",
            // pet_embed
          },
          {
            label: "Accessory Bag",
            value: "id_talisman_bag",
            //talisman_bag_embed
            
          }
        ]);
        const row1 = new ActionRowBuilder().addComponents(selectMenu);

        const embedplayer = {
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
        };
        const wardrobe_embed = {
          color: 0xffa600,
          title: `Wardrobe for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
          description: `Wardrobe Value: **${addCommas(
            wardrobe
          )}** (**${addNotation("oneLetters", wardrobe)}**)\n\n${allWardrobe}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${addCommas(wardrobe)}`,
          },
        };
        const inventory_embed = {
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
        };
        const enderchest_embed = {
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
        };
        const storage_embed = {
          color: 0xffa600,
          title: `Storage for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
          description: `Storage Value: **${addCommas(
            storage
          )}** (**${addNotation("oneLetters", storage)}**)\n\n${allStorage}}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid2}`,
          },
        };
        const pet_embed = {
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
        };
        const talisman_bag_embed = {
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
        };
        const museum_embed = {
          color: 0xffa600,
          title: `Pets for ${username} on ${profilename}`,
          URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
          description: `Museum Value: **${addCommas(museum)}** (**${addNotation("oneLetters",museum)}**)\nSpecialty Museum (${addNotation("oneLetters", museumSpecial) ?? 0})\n\n${allMuseum}`,
          thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid2}`,
          },
        };



        await interaction.editReply({ embeds: [embedplayer], components: [row1] });

        client.on('interactionCreate', async (interaction) => {
          if (!interaction.isStringSelectMenu()) return;
  
          // Check if the select menu is for this command
          if (interaction.customId !== 'selectmenu') return;
  
          // Check if the user who interacted with the select menu is the one who used the command
          if (interaction.user.id !== interaction.message.interaction.user.id) {
              await interaction.reply({ content: 'You can\'t use this select menu.', ephemeral: true });
              return;
          }
  
          // Delete the select menu after 1 minute
          setTimeout(async () => {
              const filter = (i) => i.customId === 'selectmenu';
              const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
              collector.on('collect', async (i) => {
                  await i.update({ components: [] });
              });
          }, 60000);

          // Return the selected option
          if (interaction.values[0] === 'id_armor') {
            await interaction.reply({ embeds: [wardrobe_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_inventory') {
            await interaction.reply({ embeds: [inventory_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_ender_chest') {
            await interaction.reply({ embeds: [enderchest_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_storage') {
            await interaction.reply({ embeds: [storage_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_museum') {
            await interaction.reply({ embeds: [museum_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_pet_menu') {
            await interaction.reply({ embeds: [pet_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_talisman_bag') {
            await interaction.reply({ embeds: [talisman_bag_embed], ephemeral: true });
        }
      });

      } catch (error) {
        const errorEmbed = handleError(error);
        await interaction.editReply({ embeds: [errorEmbed] });
      }
    }
  },
};
