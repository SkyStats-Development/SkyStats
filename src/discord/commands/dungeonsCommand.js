//   SKILL LEVEL UP Taming XLIX➜L happened when coding this file so its cool!
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices} = require('skyhelper-networth');
const messages = require('../../../messages.json')
const { default: axios } = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
            //credits to https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
              }
              
              function convertMsToMinutesSeconds(milliseconds) {
                const minutes = Math.floor(milliseconds / 60000);
                const seconds = Math.round((milliseconds % 60000) / 1000);
              
                return seconds === 60
                  ? `${minutes + 1}:00`
                  : `${minutes}:${padTo2Digits(seconds)}`;
              }
              
module.exports = {
    name: 'dungeons',
    description: 'Gets The Dungeon Player Data',
    options: [
        {
            name: 'name',
            description: 'mc username',
            type: 3,
            required: false
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        try{
        await interaction.deferReply();
        await wait(1);
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        let name = interaction.options.getString("name") || uuid
        const username = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.username;
          const uuid2 = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.raw_id;   
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid2}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {
            if (profileraw[key]?.current) currentProfile = key;}
        const data = await getLatestProfile(name)
        const filter = i => i.user.id === (interaction.user.id);
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        const profilename = (data.profileData.cute_name)
        const player = (profileraw[currentProfile])
        // Ill be making this better soon but for now its just a mess of code :D
        //discript
        const catalvl = (player.data.dungeons.catacombs.level.level) || `0`
        const secrets = (player.data.dungeons.secrets_found) || `0`
        const selectedclass = (player.data.dungeons.selected_class) || `DEFAULT`
        const classavrg = (player.data.dungeons.class_average) || `0`
        // f0
        const f0comp = (player.data.dungeons.catacombs.floors[`0`]?.stats?.tier_completions) || `0`
        const f0time = (player.data.dungeons.catacombs.floors[`0`]?.stats?.fastest_time) || `0`
        const f0times = (player.data.dungeons.catacombs.floors[`0`]?.stats?.fastest_time_s)|| `0`
        const f0timess = (player.data.dungeons.catacombs.floors[`0`]?.stats?.fastest_time_s_plus)|| `0` 
        const f0best_score = (player.data.dungeons.catacombs.floors[`0`]?.stats?.best_score)|| `0`
        //f1
        const f1comp = (player.data.dungeons.catacombs.floors[`1`]?.stats?.tier_completions)|| `0`
        const f1time = (player.data.dungeons.catacombs.floors[`1`]?.stats?.fastest_time)|| `0`
        const f1times = (player.data.dungeons.catacombs.floors[`1`]?.stats?.fastest_time_s)|| `0`
        const f1timess = (player.data.dungeons.catacombs.floors[`1`]?.stats?.fastest_time_s_plus)|| `0` 
        const f1best_score = (player.data.dungeons.catacombs.floors[`1`]?.stats?.best_score)|| `0`
        //f2
        const f2comp = (player.data.dungeons.catacombs.floors[`2`]?.stats?.tier_completions)|| `0`
        const f2time = (player.data.dungeons.catacombs.floors[`2`]?.stats?.fastest_time)|| `0`
        const f2times = (player.data.dungeons.catacombs.floors[`2`]?.stats?.fastest_time_s)|| `0`
        const f2timess = (player.data.dungeons.catacombs.floors[`2`]?.stats?.fastest_time_s_plus)|| `0` 
        const f2best_score = (player.data.dungeons.catacombs.floors[`2`]?.stats?.best_score)|| `0`
        //f3
        const f3comp = (player.data.dungeons.catacombs.floors[`3`]?.stats?.tier_completions)|| `0`
        const f3time = (player.data.dungeons.catacombs.floors[`3`]?.stats?.fastest_time)|| `0`
        const f3times = (player.data.dungeons.catacombs.floors[`3`]?.stats?.fastest_time_s)|| `0`
        const f3timess = (player.data.dungeons.catacombs.floors[`3`]?.stats?.fastest_time_s_plus)|| `0` 
        const f3best_score = (player.data.dungeons.catacombs.floors[`3`]?.stats?.best_score)|| `0`
        //f4
        const f4comp = (player.data.dungeons.catacombs.floors[`4`]?.stats?.tier_completions)|| `0`
        const f4time = (player.data.dungeons.catacombs.floors[`4`]?.stats?.fastest_time)|| `0`
        const f4times = (player.data.dungeons.catacombs.floors[`4`]?.stats?.fastest_time_s)|| `0`
        const f4timess = (player.data.dungeons.catacombs.floors[`4`]?.stats?.fastest_time_s_plus)|| `0` 
        const f4best_score = (player.data.dungeons.catacombs.floors[`4`]?.stats?.best_score)|| `0`
        //f5
        const f5comp = (player.data.dungeons.catacombs.floors[`5`]?.stats?.tier_completions)|| `0`
        const f5time = (player.data.dungeons.catacombs.floors[`5`]?.stats?.fastest_time)|| `0`
        const f5times = (player.data.dungeons.catacombs.floors[`5`]?.stats?.fastest_time_s)|| `0`
        const f5timess = (player.data.dungeons.catacombs.floors[`5`]?.stats?.fastest_time_s_plus)|| `0` 
        const f5best_score = (player.data.dungeons.catacombs.floors[`5`]?.stats?.best_score)|| `0`
        //f6
        const f6comp = (player.data.dungeons.catacombs.floors[`6`]?.stats?.tier_completions)|| `0`
        const f6time = (player.data.dungeons.catacombs.floors[`6`]?.stats?.fastest_time)|| `0`
        const f6times = (player.data.dungeons.catacombs.floors[`6`]?.stats?.fastest_time_s)|| `0`
        const f6timess = (player.data.dungeons.catacombs.floors[`6`]?.stats?.fastest_time_s_plus)|| `0` 
        const f6best_score = (player.data.dungeons.catacombs.floors[`6`]?.stats?.best_score)|| `0`
        //f7
        const f7comp = (player.data.dungeons.catacombs.floors[`7`]?.stats?.tier_completions)|| `0`
        const f7time = (player.data.dungeons.catacombs.floors[`7`]?.stats?.fastest_time)|| `0`
        const f7times = (player.data.dungeons.catacombs.floors[`7`]?.stats?.fastest_time_s)|| `0`
        const f7timess = (player.data.dungeons.catacombs.floors[`7`]?.stats?.fastest_time_s_plus)|| `0` 
        const f7best_score = (player.data.dungeons.catacombs.floors[`7`]?.stats?.best_score) || `0`  
        //m1
        const m1comp = (player.data.dungeons.master_catacombs.floors[`1`]?.stats?.tier_completions)|| `0`
        const m1time = (player.data.dungeons.master_catacombs.floors[`1`]?.stats?.fastest_time)|| `0`
        const m1times = (player.data.dungeons.master_catacombs.floors[`1`]?.stats?.fastest_time_s)|| `0`
        const m1timess = (player.data.dungeons.master_catacombs.floors[`1`]?.stats?.fastest_time_s_plus)|| `0` 
        const m1best_score = (player.data.dungeons.master_catacombs.floors[`1`]?.stats?.best_score)|| `0`
        //m2
        const m2comp = (player.data.dungeons.master_catacombs.floors[`2`]?.stats?.tier_completions)|| `0`
        const m2time = (player.data.dungeons.master_catacombs.floors[`2`]?.stats?.fastest_time)|| `0`
        const m2times = (player.data.dungeons.master_catacombs.floors[`2`]?.stats?.fastest_time_s)|| `0`
        const m2timess = (player.data.dungeons.master_catacombs.floors[`2`]?.stats?.fastest_time_s_plus)|| `0` 
        const m2best_score = (player.data.dungeons.master_catacombs.floors[`2`]?.stats?.best_score)|| `0`
        //m3
        const m3comp = (player.data.dungeons.master_catacombs.floors[`3`]?.stats?.tier_completions)|| `0`
        const m3time = (player.data.dungeons.master_catacombs.floors[`3`]?.stats?.fastest_time)|| `0`
        const m3times = (player.data.dungeons.master_catacombs.floors[`3`]?.stats?.fastest_time_s)|| `0`
        const m3timess = (player.data.dungeons.master_catacombs.floors[`3`]?.stats?.fastest_time_s_plus)|| `0` 
        const m3best_score = (player.data.dungeons.master_catacombs.floors[`3`]?.stats?.best_score)|| `0`
        //m4
        const m4comp = (player.data.dungeons.master_catacombs.floors[`4`]?.stats?.tier_completions)|| `0`
        const m4time = (player.data.dungeons.master_catacombs.floors[`4`]?.stats?.fastest_time)|| `0`
        const m4times = (player.data.dungeons.master_catacombs.floors[`4`]?.stats?.fastest_time_s)|| `0`
        const m4timess = (player.data.dungeons.master_catacombs.floors[`4`]?.stats?.fastest_time_s_plus)|| `0` 
        const m4best_score = (player.data.dungeons.master_catacombs.floors[`4`]?.stats?.best_score)|| `0`
        //m5
        const m5comp = (player.data.dungeons.master_catacombs.floors[`5`]?.stats?.tier_completions)|| `0`
        const m5time = (player.data.dungeons.master_catacombs.floors[`5`]?.stats?.fastest_time)|| `0`
        const m5times = (player.data.dungeons.master_catacombs.floors[`5`]?.stats?.fastest_time_s)|| `0`
        const m5timess = (player.data.dungeons.master_catacombs.floors[`5`]?.stats?.fastest_time_s_plus)|| `0` 
        const m5best_score = (player.data.dungeons.master_catacombs.floors[`5`]?.stats?.best_score)|| `0`
        //m6
        const m6comp = (player.data.dungeons.master_catacombs.floors[`6`]?.stats?.tier_completions)|| `0`
        const m6time = (player.data.dungeons.master_catacombs.floors[`6`]?.stats?.fastest_time)|| `0`
        const m6times = (player.data.dungeons.master_catacombs.floors[`6`]?.stats?.fastest_time_s)|| `0`
        const m6timess = (player.data.dungeons.master_catacombs.floors[`6`]?.stats?.fastest_time_s_plus)|| `0` 
        const m6best_score = (player.data.dungeons.master_catacombs.floors[`6`]?.stats?.best_score)|| `0`
        //m7
        const m7comp = (player.data.dungeons.master_catacombs.floors[`7`]?.stats?.tier_completions)|| `0`
        const m7time = (player.data.dungeons.master_catacombs.floors[`7`]?.stats?.fastest_time)|| `0`
        const m7times = (player.data.dungeons.master_catacombs.floors[`7`]?.stats?.fastest_time_s)|| `0`
        const m7timess = (player.data.dungeons.master_catacombs.floors[`7`]?.stats?.fastest_time_s_plus)|| `0` 
        const m7best_score = (player.data.dungeons.master_catacombs.floors[`7`]?.stats?.best_score) || `0`     
        //Tank
        const tanklevelWithProgresss = (player.data.dungeons.classes.tank.levelWithProgress) || `0`
        const tanklevelp = Math.round((tanklevelWithProgresss) * 100) /100
        const tanklevel = (player.data.dungeons.classes.tank.level) || `0`
        //Healer
        const heallevelWithProgresss = (player.data.dungeons.classes.healer.levelWithProgress) || `0`
        const heallevelp = Math.round((heallevelWithProgresss) * 100) /100
        const heallevel = (player.data.dungeons.classes.healer.level) || `0`
        //Mage
        const magelevelWithProgresss = (player.data.dungeons.classes.mage.levelWithProgress) || `0`
        const magelevelp = Math.round((magelevelWithProgresss) * 100) /100
        const magelevel = (player.data.dungeons.classes.mage.level) || `0`
        //Archer
        const archlevelWithProgresss = (player.data.dungeons.classes.archer.levelWithProgress) || `0`
        const archlevelp = Math.round((archlevelWithProgresss) * 100) /100
        const archlevel = (player.data.dungeons.classes.archer.level) || `0`
        //Bers
        const berslevelWithProgresss = (player.data.dungeons.classes.berserk.levelWithProgress) || `0`
        const berslevelp = Math.round((berslevelWithProgresss) * 100) /100
        const berslevel = (player.data.dungeons.classes.berserk.level) || `0`
        //bonzo
        const bonzoT = (player.data.dungeons.boss_collections.catacombs_1.tier) || `0`
        const bonzoK = (player.data.dungeons.boss_collections.catacombs_1.killed) || `0`
        const bonzoD = (player.data.dungeons.boss_collections.catacombs_1.floors.catacombs_1) || `0`
        const bonzoMM = (player.data.dungeons.boss_collections.catacombs_1.floors.master_catacombs_1) || `0`
        //scarf
        const scarfT = (player.data.dungeons.boss_collections.catacombs_2.tier) || `0`
        const scarfK = (player.data.dungeons.boss_collections.catacombs_2.killed) || `0`
        const scarfD = (player.data.dungeons.boss_collections.catacombs_2.floors.catacombs_2) || `0`
        const scarfMM = (player.data.dungeons.boss_collections.catacombs_2.floors.master_catacombs_2) || `0`
        //professer
        const profT = (player.data.dungeons.boss_collections.catacombs_3.tier) || `0`
        const profK = (player.data.dungeons.boss_collections.catacombs_3.killed) || `0`
        const profD = (player.data.dungeons.boss_collections.catacombs_3.floors.catacombs_3) || `0`
        const profMM = (player.data.dungeons.boss_collections.catacombs_3.floors.master_catacombs_3) || `0`
        //thorn
        const thornT = (player.data.dungeons.boss_collections.catacombs_4.tier) || `0`
        const thornK = (player.data.dungeons.boss_collections.catacombs_4.killed) || `0`
        const thornD = (player.data.dungeons.boss_collections.catacombs_4.floors.catacombs_4) || `0`
        const thornMM = (player.data.dungeons.boss_collections.catacombs_4.floors.master_catacombs_4) || `0`
        //livid
        const lividT = (player.data.dungeons.boss_collections.catacombs_5.tier) || `0`
        const lividK = (player.data.dungeons.boss_collections.catacombs_5.killed) || `0`
        const lividD = (player.data.dungeons.boss_collections.catacombs_5.floors.catacombs_5) || `0`
        const lividMM = (player.data.dungeons.boss_collections.catacombs_5.floors.master_catacombs_5) || `0`
        // SADAN NON L
        const sadanT = (player.data.dungeons.boss_collections.catacombs_6.tier) || `0`
        const sadanK = (player.data.dungeons.boss_collections.catacombs_6.killed) || `0`
        const sadanD = (player.data.dungeons.boss_collections.catacombs_6.floors.catacombs_6) || `0`
        const sadanMM = (player.data.dungeons.boss_collections.catacombs_6.floors.master_catacombs_6) || `0`
        //Necron (uwu gimme ur stick pls I need 1 more for term :( )
        const necronT = (player.data.dungeons.boss_collections.catacombs_7.tier) || `0`
        const necronK = (player.data.dungeons.boss_collections.catacombs_7.killed) || `0`
        const necronD = (player.data.dungeons.boss_collections.catacombs_7.floors.catacombs_7) || `0`
        const necronMM = (player.data.dungeons.boss_collections.catacombs_7.floors.master_catacombs_7) || `0`



        const chat = {
            color: 0xffa600,
            title: `${username}'s Dungeon Stats On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats?/${name}`,
            description: (`<:dungeons:1062778077735829615>Catacombs Level: **${catalvl}**\n<:Iron_Chestplate:1061454825839144970>Average Class Level: **${classavrg}**\n<:CHEST:1061454902049656993>Secrets Found: **${secrets}**`),
            thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: `<:f0:1059665198916583464> Entrance`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f0comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f0best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f0time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f0times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f0timess))}**`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `<:f1:1059665222232702976> Floor 1`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f1comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f1best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f1time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f1times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f1timess))}**`,
                    inline: true,
                },
                {
                    name: `<:f2:1059665244345094244> Floor 2`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f2comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f2best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f2time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f2times))}**\n <:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f2timess))}**`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `<:f3:1059665271188639784> Floor 3`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f3comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f3best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f3time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f3times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f3timess))}**`,
                    inline: true,
                },
                {
                    name: `<:f4:1059665296656437358> Floor 4`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f4comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f4best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f4time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f4times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f4timess))}**`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `<:f5:1059665323449667695> Floor 5`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f5comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f5best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f5time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f5times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f5timess))}**`,
                    inline: true,
                },
                {
                    name: `<:f6:1059665342231744634> Floor 6`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f6comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f6best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f6time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(f6times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f6timess))}**`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `<:f7:1059665388570419210> Floor 7`,
                    value: `<:bestiary_67:1062778101223936090> Kills: **${f7comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${f7best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(f7time))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(f7times))}**\nFastest Time S+ **${(convertMsToMinutesSeconds(f7timess))}**`,
                    inline: true,
                },
            ],
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };
            const mm = {
                color: 0xffa600,
                title: `${username}'s Master Mode Stats On ${profilename}`,
                URL: `https://sky.shiiyu.moe/stats?/${name}`,
                description: (`<:dungeons:1062778077735829615>Catacombs Level: **${catalvl}**\n<:Iron_Chestplate:1061454825839144970>Average Class Level: **${classavrg}**\n<:CHEST:1061454902049656993>Secrets Found: **${secrets}**`),
                thumbnail: {
                    url: `https://api.mineatar.io/body/full/${name}`,
                },
                timestamp: new Date().toISOString(),
                fields: [
                    {
                        name: `<:f0:1059665198916583464> Entrance`,
                        value: `it doesnt exist!`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `<:m1:1059664958280958037> MM Floor 1`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m1comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m1best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m1time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m1times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m1timess))}**`,
                        inline: true,
                    },
                    {
                        name: `<:m2:1059665011808681995> MM Floor 2`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m2comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m2best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m2time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m2times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m2timess))}**`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `<:m3:1059665028397150268> MM Floor 3`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m3comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m3best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m3time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m3times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m3timess))}**`,
                        inline: true,
                    },
                    {
                        name: `<:m4:1059665056423489647> MM Floor 4`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m4comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m4best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m4time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m4times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m4timess))}**`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `<:m5:1059665078313549824> MM Floor 5`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m5comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m5best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m5time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m5times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m5timess))}**`,
                        inline: true,
                    },
                    {
                        name: `<:m6:1059665099507376259> MM Floor 6`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m6comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m6best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m6time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m6times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m6timess))}**`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `<:m7:1059665136878637136> MM Floor 7`,
                        value: `<:bestiary_67:1062778101223936090> Kills: **${m7comp}**\n<:NETHER_STAR:1062777758645768325> Highest Score: **${m7best_score}**\n<:dungeons:1062778077735829615> Fastest Time: **${(convertMsToMinutesSeconds(m7time))}**\n<:s_score:1062777386124460042> Fastest Time S: **${(convertMsToMinutesSeconds(m7times))}**\n<:s_plus_score:1062777348564471869> Fastest Time S+: **${(convertMsToMinutesSeconds(m7timess))}**`,
                        inline: true,
                    },
                ],
                footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                };
                const coll = {
                    color: 0xffa600,
                    title: `${username}'s Collections Data On ${profilename}`,
                    URL: `https://sky.shiiyu.moe/stats?/${name}`,
                    description: (`<:dungeons:1062778077735829615>Catacombs Level: **${catalvl}**\n<:Iron_Chestplate:1061454825839144970>Average Class Level: **${classavrg}**\n<:CHEST:1061454902049656993>Secrets Found: **${secrets}**`),
                    thumbnail: {
                        url: `https://api.mineatar.io/body/full/${name}`,
                    },
                    timestamp: new Date().toISOString(),
                    fields: [
                        {
                            name: `<:F1:1062782013553266748> Bonzo (${bonzoT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${bonzoK}**\n<:f2:1059665244345094244>Dungeon Kills: **${bonzoD}**\n<:m2:1059665011808681995>Master Mode Kills: **${bonzoMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F2:1062782043517358150> Scarf (${scarfT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${scarfK}**\n<:f2:1059665244345094244>Dungeon Kills: **${scarfD}**\n<:m2:1059665011808681995>Master Mode Kills: **${scarfMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F3:1062782093911928883> The Professor (${profT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${profK}**\n<:f3:1059665271188639784>Dungeon Kills: **${profD}**\n<:m3:1059665028397150268>Master Mode Kills: **${profMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F4:1062782125188841473> Thorn (${thornT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${thornK}**\n<:f4:1059665296656437358>Dungeon Kills: **${thornD}**\n<:m4:1059665056423489647>Master Mode Kills: **${thornMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F5:1062782147611598928> Livid (${lividT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${lividK}**\n<:f5:1059665323449667695>Dungeon Kills: **${lividD}**\n<:m5:1059665078313549824>Master Mode Kills: **${lividMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F6:1062782219304837160> Sadan (${sadanT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${sadanK}**\n<:f6:1059665342231744634>Dungeon Kills: **${sadanD}**\n<:m6:1059665099507376259>Master Mode Kills: **${sadanMM}**`,
                            inline: true,
                        },
                        {
                            name: `<:F7:1062782318781145170> Necron (${necronT})`,
                            value: `<:SKULL_ITEM_1:1062777707127123998>Total Kills: **${necronK}**\n<:f7:1059665388570419210>Dungeon Kills: **${necronD}**\n<:m7:1059665136878637136>Master Mode Kills: **${necronMM}**`,
                            inline: true,
                        },
                    ],
                    footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                    };
                    const classs = {
                        color: 0xffa600,
                        title: `${username}'s Class Data On ${profilename}`,
                        URL: `https://sky.shiiyu.moe/stats?/${name}`,
                        description: (`<:dungeons:1062778077735829615>Catacombs Level: **${catalvl}**\n<:Iron_Chestplate:1061454825839144970>Average Class Level: **${classavrg}**\n<:CHEST:1061454902049656993>Secrets Found: **${secrets}**`),
                        thumbnail: {
                            url: `https://api.mineatar.io/body/full/${name}`,
                        },
                        timestamp: new Date().toISOString(),
                        fields: [
                            {
                                name: `<:Mage_Dungeon_Orb:1062778035792793763> Mage (${magelevel})`,
                                value: `Class Level: **${magelevelp}**`,
                                inline: true,
                            },
                            {
                                name: `<:Berserk_Dungeon_Orb:1062777901948358787> Berserker (${berslevel})`,
                                value: `Class Level: **${berslevelp}**`,
                                inline: true,
                            },
                            {
                                name: `<:Archer_Dungeon_Orb:1059665553918267442> Archer (${archlevel})`,
                                value: `Class Level: **${archlevelp}**`,
                                inline: true,
                            },
                            {
                                name: `<:Tank_Dungeon_Orb:1062778004343881888> Tank (${tanklevel})`,
                                value: `Class Level: **${tanklevelp}**`,
                                inline: true,
                            },
                            {
                                name: `<:Healer_Dungeon_Orb:1062777963311022201> Healer (${heallevel})`,
                                value: `Class Level: **${heallevelp}**`,
                                inline: true,
                            },
                            {
                                name: `<:dungeons:1062778077735829615>Selected Class`,
                                value: `Class: ${selectedclass}`,
                                inline: true,
                            },
                        ],
                        footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                        };
            const mmbutton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('mmm')
					.setLabel(`Mastermode Catacombs`)
					.setStyle(ButtonStyle.Danger),
			);
            const onlydungeon = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('normal')
					.setLabel(`Catacombs`)
					.setStyle(ButtonStyle.Success),
			);
            const classes = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('class')
					.setLabel(`Dungeon Classes`)
					.setStyle(ButtonStyle.Secondary),
			)
            const collections = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('collec')
					.setLabel(`Dungeon Collections`)
					.setStyle(ButtonStyle.Secondary),
			)


            await interaction.editReply({  embeds: [ chat ], components: [mmbutton, onlydungeon, classes, collections]})

            collector.on('collect', async i => {
                if (i.customId === 'mmm') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [ mm ], components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            collector.on('collect', async i => {
                if (i.customId === 'collec') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [ coll ], components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            collector.on('collect', async i => {
                if (i.customId === 'class') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [ classs ]? components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            collector.on('collect', async i => {
                if (i.customId === 'normal') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [ chat ], components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            
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
                description: `An error with validating the username provided has occured. Please try again later.\nIf the error persists, please contact the bot developer.\nIf your account is not linked, please link your account with \`/link\`.`,
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
    }
}
