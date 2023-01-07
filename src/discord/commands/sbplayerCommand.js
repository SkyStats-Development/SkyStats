const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, capitalize, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices, getItemNetworth} = require('skyhelper-networth');
const getWeight = require('../../../API/stats/weight');
const messages = require('../../../messages.json')



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
    name: 'skyblock',
    description: 'Fetches skyblock data WIP',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: true
        }
      ],
    
  
    execute: async (interaction, client) => {
        let name = interaction.options.getString("name")
        const data = await getLatestProfile(name)
        name = data.profileData?.game_mode ? `♲ ${name}` : name
        const profile = await getNetworth(data.profile, data.profileData?.banking?.balance, { prices });
        const shortnwdes = addNotation("oneLetters", profile.networth)
        const desnw = addNotation ("numbers",(addCommas(profile.networth))).toString().split(".")[0];
        const desnwunsbownd = addNotation ("numbers",(addCommas(profile.unsoulboundNetworth))).toString().split(".")[0];
        const shortnwunsobown = addNotation("oneLetters", profile.unsoulboundNetworth)
        const profileweight = await getWeight(data.profile, data.uuid) 
        const profilename = (data.profileData.cute_name)

        const embedplayer = {
            title: `Networth For ${name} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: `Networth: **${desnw} (${shortnwdes})**\nUnsoulbound Networth:** ${desnwunsbownd} (${shortnwunsobown})**`,
            fields: [
                {
                    name: '<:Purse:1059997956784279562> Purse',
                    value: `${addNotation("oneLetters", profile.purse) ?? 0}`,
                    inline: true,
                },
                {
                    name: '<:Bank:1059664677606531173> Bank',
                    value: `${addNotation("oneLetters", profile.bank) ?? 0}`,
                    inline: true,
                },
                {
                    name: 'Senither Weight',
                    value: `${Math.round((profileweight.weight.senither.total) * 100) / 100}`,
                },
                {
                    name: '<:MasterMode:1059665473379246091> Dungeon Weight',
                    value: `${Math.round((profileweight.weight.senither.dungeons.total) * 100) / 100}`,
                    inline: true,
                },
                {
                    name: '<:sword:1060045450897539122> Skill Weight',
                    value: `${Math.round((profileweight.weight.senither.skills.alchemy.total + profileweight.weight.senither.skills.combat.total + profileweight.weight.senither.skills.enchanting.total + profileweight.weight.senither.skills.farming.total + profileweight.weight.senither.skills.fishing.total + profileweight.weight.senither.skills.foraging.total + profileweight.weight.senither.skills.mining.total + profileweight.weight.senither.skills.taming.total) * 100) / 100}`,
                    inline: true,
                },
                {
                    name: '<:Slayer:1060045486712696872> Slayer Weight',
                    value: `${Math.round((profileweight.weight.senither.slayer.total) * 100) / 100}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.foooter.defaultbetter}`, iconURL: `${messages.footer.icon}`,
            },
        };

    
        await interaction.reply({ embeds: [embedplayer] });
    },
  };

  // ${addNotation("numbers",(addCommas(profile.networth)))??1} old nw