const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const { default: axios } = require('axios');
const config = require('../../../config.json');
 

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
        //database
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        //discord
        const name = interaction.options.getString("name") || uuid
        //name stuff
        const username = (await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.username
        const uuid2 = (await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.raw_id
        const data = await getLatestProfile(name)
        const profilename = (data.profileData.cute_name)
        const proflieid = (data.profileData.profile_id)
        const networthraw = (await axios.get(`http://104.128.65.165:3000/v2/profile/${uuid2}/${proflieid}?key=${config.api.skyStatsKey}`)).data
        
        
        // all item types with their networth values :D Credits to Shiiyu and SkyCrypt for the data
        //NETWORTH
        const networth = (networthraw.data.networth.networth).toString().split(".")[0] 
        const formatted_networth = addNotation("numbers", (addCommas(networth)))
        const shortnetworth = addNotation("oneLetters", networth)
        //unsoulbound
        const soulbound = (networthraw.data.networth.unsoulboundNetworth).toString().split(".")[0] 
        const formatted_soulbound = addNotation("numbers", (addCommas(soulbound)))
        const shortunsoulbound = addNotation("oneLetters", soulbound)
        //Cookies
        const cookies = Math.round((networth / 3847600))
        const value = Math.round((cookies * 2.27))
        const irlnw = addNotation("numbers", (addCommas(value)))
        //bank
        const banku = (networthraw.data.bank).toString().split(".")[0] 
        const formatted_bank = addNotation("oneLetters", banku)
        //purse
        const purseu = (networthraw.data.purse) 
        //sacks
        const sack = (networthraw.data.networth.types.sacks.total) 
        const essence = (networthraw.data.networth.types.essence.total) 
        const sackvalue = Math.round((sack + essence)* 100) /100
        //misc
        const candy_inventory = (networthraw.data.networth.types.candy_inventory.total) 
        const potion_bag = (networthraw.data.networth.types.potion_bag.total) 
        const fishing_bag = (networthraw.data.networth.types.fishing_bag.total) 
        const misc = Math.round((candy_inventory + potion_bag + fishing_bag)* 100) /100
        //armor
        const armor = (networthraw.data.networth.types.armor.total) 
        const armor1 = (networthraw.data.networth.types.armor.items[0]?.name) 
        const armorprice1 = (networthraw.data.networth.types.armor.items[0]?.price) 
        const armor2 = (networthraw.data.networth.types.armor.items[1]?.name) 
        const armorprice2 = (networthraw.data.networth.types.armor.items[1]?.price)  
        const armor3 = (networthraw.data.networth.types.armor.items[2]?.name) 
        const armorprice3 = (networthraw.data.networth.types.armor.items[2]?.price) 
        const armor4 = (networthraw.data.networth.types.armor.items[3]?.name) 
        const armorprice4 = (networthraw.data.networth.types.armor.items[3]?.price) 
        //equipment
        const equipment = (networthraw.data.networth.types.equipment.total) 
        const equipment1 = (networthraw.data.networth.types.equipment.items[0]?.name)
        const equipmentprice1 = (networthraw.data.networth.types.equipment.items[0]?.price) 
        const equipment2 = (networthraw.data.networth.types.equipment.items[1]?.name) 
        const equipmentprice2 = (networthraw.data.networth.types.equipment.items[1]?.price) 
        const equipment3 = (networthraw.data.networth.types.equipment.items[2]?.name) 
        const equipmentprice3 = (networthraw.data.networth.types.equipment.items[2]?.price) 
        const equipment4 = (networthraw.data.networth.types.equipment.items[3]?.name)
        const equipmentprice4 = (networthraw.data.networth.types.equipment.items[3]?.price) 
        //wardrobe
        const wardrobe = (networthraw.data.networth.types.wardrobe.total) 
        const wardrobe1 = (networthraw.data.networth.types.wardrobe.items[0]?.name)
        const wardrobeprice1 = (networthraw.data.networth.types.wardrobe.items[0]?.price)
        const wardrobe2 = (networthraw.data.networth.types.wardrobe.items[1]?.name)
        const wardrobeprice2 = (networthraw.data.networth.types.wardrobe.items[1]?.price)
        const wardrobe3 = (networthraw.data.networth.types.wardrobe.items[2]?.name)
        const wardrobeprice3 = (networthraw.data.networth.types.wardrobe.items[2]?.price)
        const wardrobe4 = (networthraw.data.networth.types.wardrobe.items[3]?.name)
        const wardrobeprice4 = (networthraw.data.networth.types.wardrobe.items[3]?.price)
        const wardrobe5 = (networthraw.data.networth.types.wardrobe.items[4]?.name)
        const wardrobeprice5 = (networthraw.data.networth.types.wardrobe.items[4]?.price)
        //inventory 
        const inventory = (networthraw.data.networth.types.inventory.total) 
        const inventory1 = (networthraw.data.networth.types.inventory.items[0]?.name)
        const inventoryprice1 = (networthraw.data.networth.types.inventory.items[0]?.price)
        const inventory2 = (networthraw.data.networth.types.inventory.items[1]?.name)
        const inventoryprice2 = (networthraw.data.networth.types.inventory.items[1]?.price)
        const inventory3 = (networthraw.data.networth.types.inventory.items[2]?.name)
        const inventoryprice3 = (networthraw.data.networth.types.inventory.items[2]?.price)
        const inventory4 = (networthraw.data.networth.types.inventory.items[3]?.name)
        const inventoryprice4 = (networthraw.data.networth.types.inventory.items[3]?.price)
        const inventory5 = (networthraw.data.networth.types.inventory.items[4]?.name)
        const inventoryprice5 = (networthraw.data.networth.types.inventory.items[4]?.price)
        //enderchest
        const enderchest = (networthraw.data.networth.types.enderchest.total) 
        const enderchest1 = (networthraw.data.networth.types.enderchest.items[0]?.name)
        const enderchestprice1 = (networthraw.data.networth.types.enderchest.items[0]?.price)
        const enderchest2 = (networthraw.data.networth.types.enderchest.items[1]?.name)
        const enderchestprice2 = (networthraw.data.networth.types.enderchest.items[1]?.price)
        const enderchest3 = (networthraw.data.networth.types.enderchest.items[2]?.name)
        const enderchestprice3 = (networthraw.data.networth.types.enderchest.items[2]?.price)
        const enderchest4 = (networthraw.data.networth.types.enderchest.items[3]?.name)
        const enderchestprice4 = (networthraw.data.networth.types.enderchest.items[3]?.price)
        const enderchest5 = (networthraw.data.networth.types.enderchest.items[4]?.name)
        const enderchestprice5 = (networthraw.data.networth.types.enderchest.items[4]?.price)
        //storage
        const storage = (networthraw.data.networth.types.storage.total) 
        const storage1 = (networthraw.data.networth.types.storage.items[0]?.name)
        const storageprice1 = (networthraw.data.networth.types.storage.items[0]?.price)
        const storage2 = (networthraw.data.networth.types.storage.items[1]?.name)
        const storageprice2 = (networthraw.data.networth.types.storage.items[1]?.price)
        const storage3 = (networthraw.data.networth.types.storage.items[2]?.name)
        const storageprice3 = (networthraw.data.networth.types.storage.items[2]?.price)
        const storage4 = (networthraw.data.networth.types.storage.items[3]?.name)
        const storageprice4 = (networthraw.data.networth.types.storage.items[3]?.price)
        const storage5 = (networthraw.data.networth.types.storage.items[4]?.name)
        const storageprice5 = (networthraw.data.networth.types.storage.items[4]?.price)
        //pets
        const pets = (networthraw.data.networth.types.pets.total) 
        const pets1 = (networthraw.data.networth.types.pets.items[0]?.name)
        const petsprice1 = (networthraw.data.networth.types.pets.items[0]?.price)
        const pets2 = (networthraw.data.networth.types.pets.items[1]?.name)
        const petsprice2 = (networthraw.data.networth.types.pets.items[1]?.price)
        const pets3 = (networthraw.data.networth.types.pets.items[2]?.name)
        const petsprice3 = (networthraw.data.networth.types.pets.items[2]?.price)
        const pets4 = (networthraw.data.networth.types.pets.items[3]?.name)
        const petsprice4 = (networthraw.data.networth.types.pets.items[3]?.price)
        const pets5 = (networthraw.data.networth.types.pets.items[4]?.name)
        const petsprice5 = (networthraw.data.networth.types.pets.items[4]?.price)
        //accessories
        const accessories = (networthraw.data.networth.types.accessories.total) 
        const accessories1 = (networthraw.data.networth.types.accessories.items[0]?.name)
        const accessoriesprice1 = (networthraw.data.networth.types.accessories.items[0]?.price)
        const accessories2 = (networthraw.data.networth.types.accessories.items[1]?.name)
        const accessoriesprice2 = (networthraw.data.networth.types.accessories.items[1]?.price)
        const accessories3 = (networthraw.data.networth.types.accessories.items[2]?.name)
        const accessoriesprice3 = (networthraw.data.networth.types.accessories.items[2]?.price)
        const accessories4 = (networthraw.data.networth.types.accessories.items[3]?.name)
        const accessoriesprice4 = (networthraw.data.networth.types.accessories.items[3]?.price)
        const accessories5 = (networthraw.data.networth.types.accessories.items[4]?.name)
        const accessoriesprice5 = (networthraw.data.networth.types.accessories.items[4]?.price)
        //personal_vault
        const personal_vault = (networthraw.data.networth.types.personal_vault.total) 
        const personal_vault1 = (networthraw.data.networth.types.personal_vault.items[0]?.name)
        const personal_vaultprice1 = (networthraw.data.networth.types.personal_vault.items[0]?.price)
        const personal_vault2 = (networthraw.data.networth.types.personal_vault.items[1]?.name)
        const personal_vaultprice2 = (networthraw.data.networth.types.personal_vault.items[1]?.price)
        const personal_vault3 = (networthraw.data.networth.types.personal_vault.items[2]?.name)
        const personal_vaultprice3 = (networthraw.data.networth.types.personal_vault.items[2]?.price)
        const personal_vault4 = (networthraw.data.networth.types.personal_vault.items[3]?.name)
        const personal_vaultprice4 = (networthraw.data.networth.types.personal_vault.items[3]?.price)

        
        const embedplayer = {
            color: 0xffa600,
            title: `Networth For ${username} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: `Networth: **${formatted_networth} (${shortnetworth})**\nUnsoulbound Networth:** ${formatted_soulbound} (${shortunsoulbound})**\nIRL Value: **$${irlnw} USD**`,
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
                    value: `${formatted_bank ?? 0}`,
                    inline: true,
                },
                {
                    name: '<:sacks:1059664698095710388> Sacks',
                    value: `${addNotation("oneLetters", sackvalue) ?? 0}`,
                    inline: true,
                },
                {
                    name: `<:DIAMOND_CHESTPLATE:1061454753357377586> Armor  (${addNotation("oneLetters",armor) ?? 0})`,
                    value: `→ ${armor1} (**${addNotation("oneLetters",armorprice1) ?? 0}**)\n→ ${armor2} (**${addNotation("oneLetters",armorprice2) ?? 0}**)\n→ ${armor3} (**${addNotation("oneLetters",armorprice3) ?? 0}**)\n→ ${armor4} (**${addNotation("oneLetters",armorprice4) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:Iron_Chestplate:1061454825839144970> Equipment  (${addNotation("oneLetters",equipment) ?? 0})`,
                    value: `→ ${equipment1} (**${addNotation("oneLetters",equipmentprice1) ?? 0}**)\n→ ${equipment2} (**${addNotation("oneLetters",equipmentprice2) ?? 0}**)\n→ ${equipment3} (**${addNotation("oneLetters",equipmentprice3) ?? 0}**)\n→ ${equipment4} (**${addNotation("oneLetters",equipmentprice4) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:ARMOR_STAND:1061454861071298620> Wardrobe  (${addNotation("oneLetters",wardrobe) ?? 0})`,
                    value: `→ ${wardrobe1} (**${addNotation("oneLetters",wardrobeprice1) ?? 0}**)\n→ ${wardrobe2} (**${addNotation("oneLetters",wardrobeprice2) ?? 0}**)\n→ ${wardrobe3} (**${addNotation("oneLetters",wardrobeprice3) ?? 0}**)\n→ ${wardrobe4} (**${addNotation("oneLetters",wardrobeprice4) ?? 0}**)\n→ ${wardrobe5} (**${addNotation("oneLetters",wardrobeprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:CHEST:1061454902049656993> Inventory  (${addNotation("oneLetters",inventory) ?? 0})`,
                    value: `→ ${inventory1} (**${addNotation("oneLetters",inventoryprice1) ?? 0}**)\n→ ${inventory2} (**${addNotation("oneLetters",inventoryprice2) ?? 0}**)\n→ ${inventory3} (**${addNotation("oneLetters",inventoryprice3) ?? 0}**)\n→ ${inventory4} (**${addNotation("oneLetters",inventoryprice4) ?? 0}**)\n→ ${inventory5} (**${addNotation("oneLetters",inventoryprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:ENDER_CHEST:1061454947931140106> Ender Chest  (${addNotation("oneLetters",enderchest) ?? 0})`,
                    value: `→ ${enderchest1} (**${addNotation("oneLetters",enderchestprice1) ?? 0}**)\n→ ${enderchest2} (**${addNotation("oneLetters",enderchestprice2) ?? 0}**)\n→ ${enderchest3} (**${addNotation("oneLetters",enderchestprice3) ?? 0}**)\n→ ${enderchest4} (**${addNotation("oneLetters",enderchestprice4) ?? 0}**)\n→ ${enderchest5} (**${addNotation("oneLetters",enderchestprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:storage:1059664802701656224> Storage  (${addNotation("oneLetters",storage) ?? 0})`,
                    value: `→ ${storage1} (**${addNotation("oneLetters",storageprice1) ?? 0}**)\n→ ${storage2} (**${addNotation("oneLetters",storageprice2) ?? 0}**)\n→ ${storage3} (**${addNotation("oneLetters",storageprice3) ?? 0}**)\n→ ${storage4} (**${addNotation("oneLetters",storageprice4) ?? 0}**)\n→ ${storage5} (**${addNotation("oneLetters",storageprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:Spawn_Null:1061455273224577024> Pets  (${addNotation("oneLetters",pets) ?? 0})`,
                    value: `→ ${pets1} (**${addNotation("oneLetters",petsprice1) ?? 0}**)\n→ ${pets2} (**${addNotation("oneLetters",petsprice2) ?? 0}**)\n→ ${pets3} (**${addNotation("oneLetters",petsprice3) ?? 0}**)\n→ ${pets4} (**${addNotation("oneLetters",petsprice4) ?? 0}**)\n→ ${pets5} (**${addNotation("oneLetters",petsprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:HEGEMONY_ARTIFACT:1061455309983461486> Accessories Bag (${addNotation("oneLetters",accessories) ?? 0})`,
                    value: `→ ${accessories1} (**${addNotation("oneLetters",accessoriesprice1) ?? 0}**)\n→ ${accessories2} (**${addNotation("oneLetters",accessoriesprice2) ?? 0}**)\n→ ${accessories3} (**${addNotation("oneLetters",accessoriesprice3) ?? 0}**)\n→ ${accessories4} (**${addNotation("oneLetters",accessoriesprice4) ?? 0}**)\n→ ${accessories5} (**${addNotation("oneLetters",accessoriesprice5) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:item_2654:1061455349338615859> Personal Vault (${addNotation("oneLetters", personal_vault) ?? 0})`,
                    value: `→ ${personal_vault1} (**${addNotation("oneLetters",personal_vaultprice1) ?? 0}**)\n→ ${personal_vault2} (**${addNotation("oneLetters",personal_vaultprice2) ?? 0}**)\n→ ${personal_vault3} (**${addNotation("oneLetters",personal_vaultprice3) ?? 0}**)\n→ ${personal_vault4} (**${addNotation("oneLetters",personal_vaultprice4) ?? 0}**)`,
                    inline: false,
                },
                {
                    name: `<:wheat:1059664236038590584> Misc (${addNotation("oneLetters", misc) ?? 0})`,
                    value: `→ Candy Bag (${addNotation("oneLetters", candy_inventory) ?? 0})\n→ Fishing Bag (${addNotation("oneLetters", fishing_bag) ?? 0})\n→ Potion Bag (${addNotation("oneLetters", potion_bag) ?? 0})`,
                    inline: false,
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.default}`, iconURL: `${messages.footer.icon}`,
            },
        };

        await interaction.editReply({ embeds: [embedplayer] });
    }

    
      }
     


  