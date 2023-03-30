const { EmbedBuilder, ActionRowBuilder, Events, StringSelectMenuBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, } = require("discord.js");
const { getLatestProfile } = require("../../../API/functions/getLatestProfile");
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const messages = require("../../../messages.json");
const { default: axios, AxiosError } = require("axios");
const config = require("../../../config.json");
const { getSkyStats } = require('../../../API/functions/getSkystats')
const { getPets } = require('../../../API/functions/networth/getPets')
const { getItems } = require('../../../API/functions/networth/getItems')
const { getAllItems } = require('../../../API/functions/networth/getAllItems')
const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}


const PURSE_ICON = '<:Purse:1059997956784279562>';
const IRON_INGOT_ICON = '<:IRON_INGOT:1070126498616455328>';
const BOOSTER_COOKIE_ICON = '<:BOOSTER_COOKIE:1070126116846710865>';


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
        try {
            await interaction.deferReply();
            await interaction.channel.sendTyping(3000);
            const minecraftUuid = await getLinkedAccount(interaction.user.id) || ``
            const name = interaction.options.getString("name") || minecraftUuid;
            const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
            const username = player.username;
            const uuid2 = player.raw_id;
            const data = await getLatestProfile(name);
            const profilename = data.profileData.cute_name;
            const proflieid = data.profileData.profile_id;
            const stats = await getSkyStats(uuid2, proflieid);
            const petData = await getPets(uuid2, proflieid);
            const itemsData = await getItems(uuid2, proflieid);
            const allItemsData = await getAllItems(uuid2, proflieid);
            const {
                networth: { formatted: networth, short: shortnetworth }, 
                soulbound: { formatted: unsoulbound, short: shortbound }, 
                irlnw, 
                purse, 
                bank: { formatted: bank }, 
                sacks: { total: sackvalue }, 
                misc: { total: misc, candy_inventory, potion_bag, fishing_bag } 
            } = stats || {};
            const {
                inventory, inv1, inv2, inv3, inv4, inv5, 
                equipment, eq1, eq2, eq3, eq4, 
                armor, ar1, ar2, ar3, ar4, 
                accessories, acc1, acc2, acc3, acc4, acc5, 
                enderchest, ec1, ec2, ec3, ec4, ec5, 
                pv, pv1, pv2, pv3, pv4, 
                storage, storage1, storage2, storage3, storage4, storage5, 
                wardrobe, wd1, wd2, wd3, wd4, wd5 
            }= itemsData || {};
            const {
                petValue, pet1, pet2, pet3, pet4, pet5
            } = petData || {};
            const {
              allAccessories, allArmor, allEquipment, allInventory, allEnderchest, allStorage, allWardrobe, allPersonalVault,
            } = allItemsData || {};

            const armor_embed = {
              color: 0xffa600,
              title: `Armor for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Armor Value: **${addCommas(armor)}** (**${addNotation("oneLetters", armor)}**)\n\n${allArmor}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const equipment_embed = {
              color: 0xffa600,
              title: `Equipment for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Equipment Value: **${addCommas(equipment)}** (**${addNotation("oneLetters", equipment)}**)\n\n${allEquipment}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const wardrobe_embed = {
              color: 0xffa600,
              title: `Wardrobe for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Wardrobe Value: **${addCommas(wardrobe)}** (**${addNotation("oneLetters", wardrobe)}**)\n\n${allWardrobe}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${addCommas(wardrobe)}`,
              },
            };
            const inventory_embed = {
              color: 0xffa600,
              title: `Inventory for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Inventory Value: **${addCommas(inventory)}** (**${addNotation("oneLetters", inventory)}**)\n\n${allInventory}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const enderchest_embed = {
              color: 0xffa600,
              title: `Ender Chest for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Ender Chest Value: **${addCommas(enderchest)}** (**${addNotation("oneLetters", enderchest)}**)\n\n${allEnderchest}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const storage_embed = {
              color: 0xffa600,
              title: `Storage for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Storage Value: **${addCommas(storage)}** (**${addNotation("oneLetters", storage)}**)\n\n${allStorage}}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const pets = {
              color: 0xffa600,
              title: `Pets for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Pets Value: **${addCommas(petValue)}** (**${addNotation("oneLetters", petValue)}**)\n\nm... nrn`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const accessoriesBag = {
              color: 0xffa600,
              title: `Accessories Bag for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Accessories Bag Value: **${addCommas(accessories)}** (**${addNotation("oneLetters", accessories)}**)\n\n${allAccessories}`,
              thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
              },
            };
            const personalVault = {
              color: 0xffa600,
              title: `Personal Vault for ${username} on ${profilename}`,
              URL: `https://sky.shiiyu.moe/stats/${name}`,
              description: `Personal Vault Value: **${addCommas(pv)}** (**${addNotation("oneLetters", pv)}**)\n\n${allPersonalVault}`,
              thumbnail: {
              url: `https://api.mineatar.io/body/full/${name}`,
              },

              };




            const embedplayer = {
                color: 0xffa600,
                title: `Networth For ${username} On ${profilename}`,
                URL: `https://sky.shiiyu.moe/stats/${name}`,
                description: `${PURSE_ICON} Networth: **${networth} (${shortnetworth})**\n${IRON_INGOT_ICON} Unsoulbound Networth: **${unsoulbound} (${shortbound})**\n${BOOSTER_COOKIE_ICON} IRL Value: **$${irlnw} USD**`,
                thumbnail: {
                    url: `https://api.mineatar.io/body/full/${name}`,
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
                        name: `<:DIAMOND_CHESTPLATE:1061454753357377586> Armor  (${addNotation("oneLetters", armor) ?? 0
                            })`,
                        value: `${ar1}\n${ar2}\n${ar3}\n${ar4}`,
                        inline: false,
                    },
                    {
                        name: `<:Iron_Chestplate:1061454825839144970> Equipment  (${addNotation("oneLetters", equipment) ?? 0
                            })`,
                        value: `${eq1}\n${eq2}\n${eq3}\n${eq4}`,
                        inline: false,
                    },
                    {
                        name: `<:ARMOR_STAND:1061454861071298620> Wardrobe  (${addNotation("oneLetters", wardrobe) ?? 0
                            })`,
                        value: `${wd1}\n${wd2}\n${wd3}\n${wd4}\n${wd5}`,
                        inline: false,
                    },
                    {
                        name: `<:CHEST:1061454902049656993> Inventory  (${addNotation("oneLetters", inventory) ?? 0
                            })`,
                        value: `${inv1}\n${inv2}\n${inv3}\n${inv4}\n${inv5}`,
                        inline: false,
                    },
                    {
                        name: `<:ENDER_CHEST:1061454947931140106> Ender Chest  (${addNotation("oneLetters", enderchest) ?? 0
                            })`,
                        value: `${ec1}\n${ec2}\n${ec3}\n${ec4}\n${ec5}`,
                        inline: false,
                    },
                    {
                        name: `<:storage:1059664802701656224> Storage  (${addNotation("oneLetters", storage) ?? 0
                            })`,
                        value: `${storage1}\n${storage2}\n${storage3}\n${storage4}\n${storage5}`,
                        inline: false,
                    },
                    {
                        name: `<:Spawn_Null:1061455273224577024> Pets  (${addNotation("oneLetters", petValue) ?? 0
                            })`,
                        value: `${pet1}\n${pet2}\n${pet3}\n${pet4}\n${pet5}`,
                        inline: false,
                    },
                    {
                        name: `<:HEGEMONY_ARTIFACT:1061455309983461486> Accessories Bag (${addNotation("oneLetters", accessories) ?? 0
                            })`,
                        value: `${acc1}\n${acc2}\n${acc3}\n${acc4}\n${acc5}`,
                        inline: false,
                    },
                    {
                        name: `<:item_2654:1061455349338615859> Personal Vault (${addNotation("oneLetters", pv) ?? 0
                            })`,
                        value: `${pv1}\n${pv2}\n${pv3}\n${pv4}`,
                        inline: false,
                    },
                    {
                        name: `<:wheat:1059664236038590584> Misc (${addNotation("oneLetters", misc + stats.sacks.total) ?? 0
                            })`,
                        value: `→ Candy Bag (**${addNotation("oneLetters", candy_inventory) ?? 0}**)\n→ Fishing Bag (**${addNotation("oneLetters", fishing_bag) ?? 0}**)\n→ Potion Bag (**${addNotation("oneLetters", potion_bag) ?? 0}**)\n→ Sacks (**${addNotation("oneLetters", stats.sacks.sacks) ?? 0}**)\n→ Essence (**${addNotation("oneLetters", stats.sacks.essence) ?? 0}**)`,
                        inline: false,
                    },
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
            };
            const row = new ActionRowBuilder()
            .addComponents(
              new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('View all of your items')
                .addOptions(
                  {
                    label: 'Armor',
                    description: 'View all of your armor',
                    value: 'first_option',
                  },
                  {
                    label: 'Equipment',
                    description: 'View all of your equipment',
                    value: 'second_option',
                  },
                  {
                    label: 'Wardrobe',
                    description: 'View all of your wardrobe',
                    value: 'third_option',
                  },
                  {
                    label: 'Inventory',
                    description: 'View all of your inventory',
                    value: 'fourth_option',
                  },
                  {
                    label: 'Ender Chest',
                    description: 'View all of your ender chest',
                    value: 'fifth_option',
                  },
                  {
                    label: 'Storage',
                    description: 'View all of your storage',
                    value: 'sixth_option',
                  },
                  {
                    label: 'Pets',
                    description: 'View all of your pets',
                    value: 'seventh_option',
                  },
                  {
                    label: 'Accessories Bag',
                    description: 'View all of your accessories bag',
                    value: 'eighth_option',
                  },
                  {
                    label: 'Personal Vault',
                    description: 'View all of your personal vault',
                    value: 'ninth_option',
                  }
                ),
            );
            let selectedOption = null;

            client.on(Events.InteractionCreate, async interaction => {
              if (interaction.isSelectMenu()) {
                if (interaction.customId === 'select') {
                  if (!selectedOption) {
                    selectedOption = interaction.values[0];
                    await interaction.deferReply();
                    switch (selectedOption) {
                      case 'first_option':
                        await interaction.editReply({ embeds: [armor_embed], ephemeral: true });
                        break;
                      case 'second_option':
                        await interaction.editReply({ embeds: [equipment_embed], ephemeral: true });
                        break;
                      case 'third_option':
                        await interaction.editReply({ embeds: [wardrobe_embed], ephemeral: true });
                        break;
                      case 'fourth_option':
                        await interaction.editReply({ embeds: [inventory_embed], ephemeral: true });
                        break;
                      case 'fifth_option':
                        await interaction.editReply({ embeds: [enderchest_embed], ephemeral: true });
                        break;
                      case 'sixth_option':
                        await interaction.editReply({ embeds: [storage_embed], ephemeral: true });
                        break;
                      case 'seventh_option':
                        await interaction.editReply({ embeds: [pets], ephemeral: true });
                        break;
                      case 'eighth_option':
                        await interaction.editReply({ embeds: [accessoriesBag], ephemeral: true });
                        break;
                      case 'ninth_option':
                        await interaction.editReply({ embeds: [personalVault], ephemeral: true });
                        break;
                      default:
                        break;
                    }
                  } else if (interaction.values[0] === selectedOption) {
                    await interaction.reply({ content: 'You have already selected this option.', ephemeral: true });
                  } else {
                    await interaction.reply({ content: 'You have already selected an option.', ephemeral: true });
                  }
                }
              }
            });

            interaction.editReply({ embeds: [embedplayer], components: [row] });
          } catch (error) {
            if (error instanceof TypeError && error.message.includes("Cannot read properties of undefined (reading 'cute_name')")) {
              console.error("Error: cute_name is undefined");
              const errorembed = {
                color: 0xff0000,
                title: `Error`,
                description: `An error with the hypixel api has occured. Please try again later.\nIf the error persists, please contact the bot developer.`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
              }
              await interaction.editReply({ embeds: [errorembed] });
            } else if (error instanceof AxiosError) {
              console.error(`Error: ${error.message}`);
              console.log(error.response.data);
              const errorembed2 = {
                color: 0xff0000,
                title: `Error`,
                description: `An error with validating the username provided has occured. Please try again later.\nIf the error persists, please contact the bot developer.\nIf your account is not linked, please link your account with \`/verify\`.`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
              }
              await interaction.editReply({ embeds: [errorembed2] });
            } else if (error instanceof Error) {
              if (error.stack) {
                const matches = error.stack.match(/.*:(\d+):\d+\)/);
                const line = matches ? matches[1] : "unknown";
                console.error(`Error on line ${line}: ${error.message}`);
                console.log(error.stack)
                console.log(error)
                const errorembed2m = {
                  color: 0xff0000,
                  title: `Error`,
                  description: `An error has occurred. Please try again later.\nIf the error persists, please contact the bot developer.\n\nError: ${error.message}\nLine: ${line}`,
                  timestamp: new Date().toISOString(),
                  footer: {
                      text: `${messages.footer.default}`,
                      iconURL: `${messages.footer.icon}`,
                  },
                }
                await interaction.editReply({ embeds: [errorembed2m] });
              } else {
                console.error(`Error: ${error.message}`);
                await interaction.editReply({ content: `Error: ${error.message}` })
              }
            } else {
              console.error(`Error: ${error}`);
              await interaction.editReply({ content: `Oops! an unexpected error has happened!` })
            }
          }
    },
};
