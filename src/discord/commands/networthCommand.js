const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices} = require('skyhelper-networth');
const messages = require('../../../messages.json')
const { default: axios } = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { getUUID, getUsername } = require('../../contracts/API/PlayerDBAPI');
const hypixel = require('../../contracts/API/HypixelRebornAPI');


let prices;
    getPrices().then((data) => { 
        prices = data
    }
)

    setInterval(async () => {
    prices = await getPrices();
    }, 1000 * 60 * 5
); 

module.exports = {
    name: 'networth',
    description: 'Fetches your networth!',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false
        }
      ],
    
  
      execute: async (interaction) => {
        await interaction.deferReply();
        await wait(100);
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        let name = interaction.options.getString("name") || uuid
        const username = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}/`)).data.name || name
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${name}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {
            if (profileraw[key].current) currentProfile = key;
        }
        const data = await getLatestProfile(name)
        name = data.profileData?.game_mode ? `♲ ${name}` : name
        const profile = await getNetworth(data.profile, data.profileData?.banking?.balance, {
            prices
        });
        const shortnwdes = addNotation("oneLetters", profile.networth)
        const desnw = addNotation("numbers", (addCommas(profile.networth))).toString().split(".")[0];
        const desnwunsbownd = addNotation("numbers", (addCommas(profile.unsoulboundNetworth))).toString().split(".")[0];
        const shortnwunsobown = addNotation("oneLetters", profile.unsoulboundNetworth)
        const profilename = (data.profileData.cute_name)
        const banku = Math.round((profile.bank) * 100) / 100
        const purseu = Math.round((profile.purse) * 100) / 100
        const sack = (profileraw[currentProfile].data.networth.types.sacks.total)
        const essence = (profileraw[currentProfile].data.networth.types.essence.total)
        const sacks = Math.round((sack + essence) * 100) / 100
        const armor = (profileraw[currentProfile].data.networth.types.armor.total)
        const equipment = (profileraw[currentProfile].data.networth.types.equipment.total)
        const wardrobe = (profileraw[currentProfile].data.networth.types.wardrobe.total)
        const inv = (profileraw[currentProfile].data.networth.types.inventory.total)
        const ec = (profileraw[currentProfile].data.networth.types.enderchest.total)
        const storage = (profileraw[currentProfile].data.networth.types.storage.total)
        const pets = (profileraw[currentProfile].data.networth.types.pets.total)
        const acc = (profileraw[currentProfile].data.networth.types.accessories.total)
        const pv = (profileraw[currentProfile].data.networth.types.personal_vault.total)
        const candy = (profileraw[currentProfile].data.networth.types.candy_inventory.total)
        const potion = (profileraw[currentProfile].data.networth.types.potion_bag.total)
        const fish = (profileraw[currentProfile].data.networth.types.fishing_bag.total)
        const misc = Math.round((candy + potion + fish) * 100) / 100
        const cookies = Math.round((profile.networth / 3847600) * 100) / 100
        const value = Math.round((cookies * 2.27) * 100) /100
        const irlnw = addNotation("numbers", (addCommas(value)))
        

        const embedplayer = {
            color: 0xffa600,
            title: `Networth For ${username} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: `Networth: **${desnw} (${shortnwdes})**\nUnsoulbound Networth:** ${desnwunsbownd} (${shortnwunsobown})**\nIRL Value: **$${irlnw} USD** (Use /irl for more info)`,
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            fields: [
                {
                    name: '<:Purse:1059997956784279562> Purse',
                    value: `${addNotation("oneLetters", purseu) ?? 0}`,
                    inline: true,
                },
                {
                    name: '<:Bank:1059664677606531173> Bank',
                    value: `${addNotation("oneLetters", banku) ?? 0}`,
                    inline: true,
                },
                {
                    name: '<:sacks:1059664698095710388> Sacks',
                    value: `${addNotation("oneLetters", sacks) ?? 0}`,
                    inline: true,
                },
                {
                    name: `<:DIAMOND_CHESTPLATE:1061454753357377586> Armor  (${addNotation("oneLetters",armor) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:Iron_Chestplate:1061454825839144970> Equipment  (${addNotation("oneLetters",equipment) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:ARMOR_STAND:1061454861071298620> Wardrobe  (${addNotation("oneLetters",wardrobe) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:CHEST:1061454902049656993> Inventory  (${addNotation("oneLetters",inv) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:ENDER_CHEST:1061454947931140106> Ender Chest  (${addNotation("oneLetters",ec) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:storage:1059664802701656224> Storage  (${addNotation("oneLetters",storage) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:Spawn_Null:1061455273224577024> Pets  (${addNotation("oneLetters",pets) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:HEGEMONY_ARTIFACT:1061455309983461486> Accessories Bag (${addNotation("oneLetters",acc) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:item_2654:1061455349338615859> Personal Vault (${addNotation("oneLetters", pv) ?? 0})`,
                    value: `m`,
                    inline: false,
                },
                {
                    name: `<:wheat:1059664236038590584> Misc (${addNotation("oneLetters", misc) ?? 0})`,
                    value: `→ Candy Bag (${addNotation("oneLetters", candy) ?? 0})\n→ Fishing Bag (${addNotation("oneLetters", fish) ?? 0})\n→ Potion Bag (${addNotation("oneLetters", potion) ?? 0})`,
                    inline: false,
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.default}`, iconURL: `${messages.footer.icon}`,
            },
        };

        await interaction.editReply({ embeds: [embedplayer] });
    },
  };