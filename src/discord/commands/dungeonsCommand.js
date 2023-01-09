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
            required: true
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        await interaction.deferReply();
        await wait(1);
        let name = interaction.options.getString("name")
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${name}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {
            if (profileraw[key].current) currentProfile = key;}
        const data = await getLatestProfile(name)
        const filter = i => i.user.id === (interaction.user.id);
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        const profilename = (data.profileData.cute_name)
        const player = (profileraw[currentProfile])
        // f0
        const f0comp = (player.data.dungeons.catacombs.floors[`0`].stats.tier_completions) || `0`
        const f0time = (player.data.dungeons.catacombs.floors[`0`].stats.fastest_time) || `0`
        const f0times = (player.data.dungeons.catacombs.floors[`0`].stats.fastest_time_s)|| `0`
        const f0timess = (player.data.dungeons.catacombs.floors[`0`].stats.fastest_time_s_plus)|| `0` 
        const f0best_score = (player.data.dungeons.catacombs.floors[`0`].stats.best_score)|| `0`
        //f1
        const f1comp = (player.data.dungeons.catacombs.floors[`1`].stats.tier_completions)|| `0`
        const f1time = (player.data.dungeons.catacombs.floors[`1`].stats.fastest_time)|| `0`
        const f1times = (player.data.dungeons.catacombs.floors[`1`].stats.fastest_time_s)|| `0`
        const f1timess = (player.data.dungeons.catacombs.floors[`1`].stats.fastest_time_s_plus)|| `0` 
        const f1best_score = (player.data.dungeons.catacombs.floors[`1`].stats.best_score)|| `0`
        //f2
        const f2comp = (player.data.dungeons.catacombs.floors[`2`].stats.tier_completions)|| `0`
        const f2time = (player.data.dungeons.catacombs.floors[`2`].stats.fastest_time)|| `0`
        const f2times = (player.data.dungeons.catacombs.floors[`2`].stats.fastest_time_s)|| `0`
        const f2timess = (player.data.dungeons.catacombs.floors[`2`].stats.fastest_time_s_plus)|| `0` 
        const f2best_score = (player.data.dungeons.catacombs.floors[`2`].stats.best_score)|| `0`
        //f3
        const f3comp = (player.data.dungeons.catacombs.floors[`3`].stats.tier_completions)|| `0`
        const f3time = (player.data.dungeons.catacombs.floors[`3`].stats.fastest_time)|| `0`
        const f3times = (player.data.dungeons.catacombs.floors[`3`].stats.fastest_time_s)|| `0`
        const f3timess = (player.data.dungeons.catacombs.floors[`3`].stats.fastest_time_s_plus)|| `0` 
        const f3best_score = (player.data.dungeons.catacombs.floors[`3`].stats.best_score)|| `0`
        //f4
        const f4comp = (player.data.dungeons.catacombs.floors[`4`].stats.tier_completions)|| `0`
        const f4time = (player.data.dungeons.catacombs.floors[`4`].stats.fastest_time)|| `0`
        const f4times = (player.data.dungeons.catacombs.floors[`4`].stats.fastest_time_s)|| `0`
        const f4timess = (player.data.dungeons.catacombs.floors[`4`].stats.fastest_time_s_plus)|| `0` 
        const f4best_score = (player.data.dungeons.catacombs.floors[`4`].stats.best_score)|| `0`
        //f5
        const f5comp = (player.data.dungeons.catacombs.floors[`5`].stats.tier_completions)|| `0`
        const f5time = (player.data.dungeons.catacombs.floors[`5`].stats.fastest_time)|| `0`
        const f5times = (player.data.dungeons.catacombs.floors[`5`].stats.fastest_time_s)|| `0`
        const f5timess = (player.data.dungeons.catacombs.floors[`5`].stats.fastest_time_s_plus)|| `0` 
        const f5best_score = (player.data.dungeons.catacombs.floors[`5`].stats.best_score)|| `0`
        //f6
        const f6comp = (player.data.dungeons.catacombs.floors[`6`].stats.tier_completions)|| `0`
        const f6time = (player.data.dungeons.catacombs.floors[`6`].stats.fastest_time)|| `0`
        const f6times = (player.data.dungeons.catacombs.floors[`6`].stats.fastest_time_s)|| `0`
        const f6timess = (player.data.dungeons.catacombs.floors[`6`].stats.fastest_time_s_plus)|| `0` 
        const f6best_score = (player.data.dungeons.catacombs.floors[`6`].stats.best_score)|| `0`
        //f7
        const f7comp = (player.data.dungeons.catacombs.floors[`7`].stats.tier_completions)|| `0`
        const f7time = (player.data.dungeons.catacombs.floors[`7`].stats.fastest_time)|| `0`
        const f7times = (player.data.dungeons.catacombs.floors[`7`].stats.fastest_time_s)|| `0`
        const f7timess = (player.data.dungeons.catacombs.floors[`7`].stats.fastest_time_s_plus)|| `0` 
        const f7best_score = (player.data.dungeons.catacombs.floors[`7`].stats.best_score) || `0`


        const chat = {
            color: 0xffa600,
            title: `${name}'s Dungeon Stats On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: (`${messages.errorcodes.error400}`),
            thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: `Entrance`,
                    value: `Kills: ${f0comp}\nHighest Score: ${f0best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f0time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f0times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f0timess))}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `Floor 1`,
                    value: `Kills: ${f1comp}\nHigest Score: ${f1best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f1time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f1times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f1timess))}`,
                    inline: true,
                },
                {
                    name: `Floor 2`,
                    value: `Kills: ${f2comp}\nHigest Score: ${f2best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f2time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f2times))}\n Fastest Time S+: ${(convertMsToMinutesSeconds(f2timess))}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `Floor 3`,
                    value: `Kills: ${f3comp}\nHigest Score: ${f3best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f3time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f3times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f3timess))}`,
                    inline: true,
                },
                {
                    name: `Floor 4`,
                    value: `Kills: ${f4comp}\nHigest Score: ${f4best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f4time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f4times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f4timess))}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `Floor 5`,
                    value: `Kills: ${f5comp}\nHigest Score: ${f5best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f5time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f5times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f5timess))}`,
                    inline: true,
                },
                {
                    name: `Floor 6`,
                    value: `Kills: ${f6comp}\nHigest Score: ${f6best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f6time))}\nFastest Time S: ${(convertMsToMinutesSeconds(f6times))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f6timess))}`,
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true,
                },
                {
                    name: `Floor 7`,
                    value: `Kills: ${f7comp}\nHigest Score: ${f7best_score}\nFastest Time: ${(convertMsToMinutesSeconds(f7time))}\nFastest Time S+: ${(convertMsToMinutesSeconds(f7times))}\nFastest Time S+ ${(convertMsToMinutesSeconds(f7times))}`,
                    inline: true,
                },
            ],
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };
            const mm = {
                color: 0xffa600,
                title: `${name}'s Master Mode Stats On ${profilename}`,
                URL: `https://sky.shiiyu.moe/stats/${name}`,
                description: (`${messages.errorcodes.error400}`),
                thumbnail: {
                    url: `https://api.mineatar.io/body/full/${name}`,
                },
                timestamp: new Date().toISOString(),
                fields: [
                    {
                        name: `Entrance`,
                        value: `it doesnt exist!`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `MM Floor 1`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: `MM Floor 2`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `MM Floor 3`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: `MM Floor 4`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `MM Floor 5`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: `MM Floor 6`,
                        value: `test`,
                        inline: true,
                    },
                    {
                        name: '\u200b',
                        value: '\u200b',
                        inline: true,
                    },
                    {
                        name: `MM Floor 7`,
                        value: `test`,
                        inline: true,
                    },
                ],
                footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                };
                const coll = {
                    color: 0xffa600,
                    title: `${name}'s Collections Data On ${profilename}`,
                    URL: `https://sky.shiiyu.moe/stats/${name}`,
                    description: (`${messages.errorcodes.error400}`),
                    thumbnail: {
                        url: `https://api.mineatar.io/body/full/${name}`,
                    },
                    timestamp: new Date().toISOString(),
                    fields: [
                        {
                            name: `Bonzo `,
                            value: `test`,
                            inline: true,
                        },
                        {
                            name: 'Scarf',
                            value: '\u200b',
                            inline: true,
                        },
                        {
                            name: `The Professor`,
                            value: `test`,
                            inline: true,
                        },
                        {
                            name: `Thorn`,
                            value: `test`,
                            inline: true,
                        },
                        {
                            name: `Livid`,
                            value: '\u200b',
                            inline: true,
                        },
                        {
                            name: `Sadan`,
                            value: `test`,
                            inline: true,
                        },
                        {
                            name: `Necron`,
                            value: `test`,
                            inline: true,
                        },
                    ],
                    footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                    };
                    const classs = {
                        color: 0xffa600,
                        title: `${name}'s Collections Data On ${profilename}`,
                        URL: `https://sky.shiiyu.moe/stats/${name}`,
                        description: (`${messages.errorcodes.error400}`),
                        thumbnail: {
                            url: `https://api.mineatar.io/body/full/${name}`,
                        },
                        timestamp: new Date().toISOString(),
                        fields: [
                            {
                                name: `Mage`,
                                value: `test`,
                                inline: true,
                            },
                            {
                                name: `Berserker`,
                                value: '\u200b',
                                inline: true,
                            },
                            {
                                name: `Archer`,
                                value: `test`,
                                inline: true,
                            },
                            {
                                name: `Tank`,
                                value: `test`,
                                inline: true,
                            },
                            {
                                name: `Healer (uwu)`,
                                value: '\u200b',
                                inline: true,
                            },
                        ],
                        footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
                        };
            const mmbutton = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('mmbut')
					.setLabel(`Mastermode Dungeons Only`)
					.setStyle(ButtonStyle.Danger),
			);
            const onlydungeon = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('onlydun')
					.setLabel(`Normal Mode Only`)
					.setStyle(ButtonStyle.Success),
			);
            const classes = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('class')
					.setLabel(`Classes`)
					.setStyle(ButtonStyle.Secondary),
			)
            const collections = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('collec')
					.setLabel(`Collections`)
					.setStyle(ButtonStyle.Secondary),
			)


            await interaction.editReply({  embeds: [ chat ], components: [mmbutton, onlydungeon, classes, collections]})

            collector.on('collect', async i => {
                if (i.customId === 'mmbut') {
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
                    await i.editReply({ embeds: [ classs ], components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            collector.on('collect', async i => {
                if (i.customId === 'onlydun') {
                    await i.deferUpdate();
                    await i.editReply({ embeds: [ chat ], components: [mmbutton, onlydungeon, classes, collections] });
                }
            });
            

    }
}
// i.customId === 'class' &&