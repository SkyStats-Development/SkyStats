
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const axios = require('axios')
const config = require('../../../config.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const messages = require('../../../messages.json')
const { getLatestProfile } = require("../../../API/functions/getLatestProfile");


module.exports = {
    name: 'skyblock',
    description: 'Gets Skyblock Data for your profile', 
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false,
        },
    ],


  execute: async (interaction, client, InteractionCreate) => {
try {
    await interaction.deferReply();
    const linked = require("../../../data/discordLinked.json");
    const uuid = linked?.[interaction?.user?.id]?.data[0];
    const name = interaction.options.getString("name") || uuid;
    const username = (await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.username;
    const uuid2 = (await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)).data.data.player.raw_id;
    const data = await getLatestProfile(name);
    const profilename = data.profileData.cute_name;
    const proflieid = data.profileData.profile_id;
    const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid2}`)).data.profiles
    let currentProfile;
    for (var key of Object.keys(profileraw)) {
        if (profileraw[key].current) currentProfile = key;}
        const player = (profileraw[currentProfile])
        const networthraw = (await axios.get(`http://104.128.65.165:3000/v2/profile/${uuid2}/${proflieid}?key=${config.api.skyStatsKey}`)).data
        const networth = networthraw.data.networth.networth
        .toString()
        .split(".")[0];
        const shortnetworth = addNotation("oneLetters", networth);
        const area = player.data.current_area
        const lvl = player.data.skyblock_level.level
        const prog = player.data.skyblock_level.progress
        const sbLevel = Math.round(lvl + prog)
        const Senither = player.data.weight.senither.overall.toString().split(".")[0];
        const SenitherWeight = addCommas(Senither);
        const SkillAverage = player.data.average_level.toString().split(".")[0];
        const lilly = player.data.weight.lily.total.toString().split(".")[0];
        const lillyWeight = addCommas(lilly);
        const beastiary = player.data.bestiary.level
        const slayer_zom = player.data.slayers.zombie.level.currentLevel
        const slayer_spe = player.data.slayers.spider.level.currentLevel
        const slayer_wol = player.data.slayers.wolf.level.currentLevel
        const slayer_eman = player.data.slayers.enderman.level.currentLevel
        const slayer_blaze = player.data.slayers.blaze.level.currentLevel
        const slayers = (`${slayer_zom}/${slayer_spe}/${slayer_wol}/${slayer_eman}/${slayer_blaze}`)
        const combat = player.data.levels.combat.level
        const deaths  = data.profileData.members[uuid2].stats.deaths
        const deaths_formatted = addCommas(deaths)
        const kills = data.profileData.members[uuid2].stats.kills
        const kills_formatted = addCommas(kills)
        const highest_damage = player.data.misc.damage.highest_critical_damage
        const highest_damage_formatted = addNotation("oneLetters", highest_damage);








    




        const embed = {
            color: 0xffa600,
            title: `SkyBlock Stats For ${username} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: (``),
            thumbnail: {
                url: `https://api.mineatar.io/body/full/${username}`,
            },
            fields: [
            {
                name: 'Networth',
                value: `${shortnetworth}`,
                inline: true,
            },
            {
                name: `Current Area`,
                value: `${area}`,
                inline: true,
            },
            {
                name: `SkyBlock Level`,
                value: `${sbLevel}`,
                inline: true,
            },
            {
                name: `Senither Weight`,
                value: `${SenitherWeight}`,
                inline: true,
            },
            {
                name: `Skill Average`,
                value: `${SkillAverage}`,
                inline: true,
            },
            {
                name: `Lilly Weight`,
                value: `${lillyWeight}`,
                inline: true,
            },
            {
                name: `Beastiary`,
                value: `${beastiary}`,
                inline: true,
            },
            {
                name: `Slayers`,
                value: `${slayers}`,
                inline: true,
            },
            {
                name: `Combat`,
                value: `${combat}`,
                inline: true,
            },
            {
                name: `Kills`,
                value: `${kills_formatted}`,
                inline: true,
            },
            {
                name: `Highest Damage`,
                value: `${highest_damage_formatted}`,
                inline: true,
            },
            {
                name: `Deaths`,
                value: `${deaths_formatted}`,
                inline: true,
            },



            
        ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.defaultbetter}` , iconURL: `${messages.footer.icon}`,
            },
        };
 
            await interaction.editReply({ embeds:[embed] })
        } catch (error) {
            console.log(error)
            await interaction.editReply({ content: 'An error occured while trying to get your Skyblock data, please try again later', ephemeral: true })
        }

    }
}
    


  




