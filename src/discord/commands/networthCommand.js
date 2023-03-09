const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, } = require("discord.js");
const { getLatestProfile } = require("../../../API/functions/getLatestProfile");
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const messages = require("../../../messages.json");
const { default: axios } = require("axios");
const config = require("../../../config.json");
const { getCookiePrice } = require('../../../API/functions/getCookie')
const { getSkyStats } = require('../../../API/functions/getSkystats')
const { getPets } = require('../../../API/functions/networth/getPets')
const { getItems } = require('../../../API/functions/networth/getItems')



const PURSE_ICON = '<:Purse:1059997956784279562>';
const IRON_INGOT_ICON = '<:IRON_INGOT:1070126498616455328>';
const BOOSTER_COOKIE_ICON = '<:BOOSTER_COOKIE:1070126116846710865>';

async function getPetsData() {
    try {
      const petData = await getPets(uuid, profileId);
      console.log(petData);
    } catch (error) {
      console.error(error);
    }
  }



module.exports = {
    name: "networthm",
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
            const linked = require("../../../data/discordLinked.json");
            const uuid = linked?.[interaction?.user?.id]?.data[0];
            const name = interaction.options.getString("name") || uuid;
            const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
            const username = player.username;
            const uuid2 = player.raw_id;
            const data = await getLatestProfile(name);
            const profilename = data.profileData.cute_name;
            const proflieid = data.profileData.profile_id;
            const stats = await getSkyStats(uuid2, proflieid);
            const petData = await getPets(uuid2, proflieid);
            const itemsData = await getItems(uuid2, proflieid);
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
                        name: `<:wheat:1059664236038590584> Misc (${addNotation("oneLetters", misc) ?? 0
                            })`,
                        value: `→ Candy Bag (${addNotation("oneLetters", candy_inventory) ?? 0
                            })\n→ Fishing Bag (${addNotation("oneLetters", fishing_bag) ?? 0
                            })\n→ Potion Bag (${addNotation("oneLetters", potion_bag) ?? 0})`,
                        inline: false,
                    },
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
            };

            await interaction.editReply({ embeds: [embedplayer] });
        } catch (error) {
            console.log(error);
            await interaction.editReply({
                content: `Error in fetching data\n \`${error}\``,
            });
        }
    },
};
