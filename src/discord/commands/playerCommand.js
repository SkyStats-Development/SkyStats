const {
  ActionRowBuilder,
  Events,
  StringSelectMenuBuilder,
} = require("discord.js");
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const config = require("../../../config.json");
const messages = config.messages.discord;
const { getNetworth } = require("../../functions/get/getNetworth/getNetworth");
const { getPets } = require("../../functions/get/getNetworth/getPets");
const {getItems,getAllItems} = require("../../functions/get/getNetworth/getItems");
const { getPlayer } = require("../../functions/get/getPlayer");
const { axios } = require("axios")
const { handleError } = require("../../functions/handle/handleError");
function formatLoginDate(loginDate) { const date = new Date(loginDate);const month = date.getMonth() + 1;const day = date.getDate();const year = date.getFullYear().toString().substring(2);let hour = date.getHours();let minute = date.getMinutes();const amPm = hour >= 12 ? 'PM' : 'AM';hour = hour % 12 || 12;minute = minute < 10 ? '0' + minute : minute;return `${month}/${day}/${year}, ${hour}:${minute} ${amPm}`;}
function formatLogoutDate(logoutDate) {const date = new Date(logoutDate);const month = date.getMonth() + 1;const day = date.getDate();const year = date.getFullYear().toString().substring(2);let hour = date.getHours();let minute = date.getMinutes();const amPm = hour >= 12 ? 'PM' : 'AM';hour = hour % 12 || 12;minute = minute < 10 ? '0' + minute : minute;return `${month}/${day}/${year}, ${hour}:${minute} ${amPm}`;}



module.exports = {
  name: "hypixel",
  description: "Lots of data in an embed form",
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
        const Hypixel = await hypixel.getPlayer(uuid2);
        const firstlogin = Hypixel.firstLogin;
        const lastlogin = Hypixel.lastLogin;
        const networkLevel = Hypixel.level;
        const ap = Hypixel.achievementPoints;
        const statusm = Hypixel.isOnline;
        const guild = await hypixel.getGuild("player", uuid2);
        const gname = guild?.name || `Unknown`;
        const hypixelPlayer = (await axios.get(`https://api.hypixel.net/player?uuid=${uuid2}&key=${key}`)).data.player;
        const ranksGifted = hypixelPlayer?.giftingMeta?.ranksGiven || 0;
        const challenges = (await axios.get(`https://api.hypixel.net/player?uuid=${uuid2}&key=${key}`)).data.player.challenges.all_time;

        const sortedChallenges = Object.entries(challenges).sort((a, b) => b[1] - a[1]).reduce((obj, [challengeName, challengeCount]) => {
            const [gameType, challengeType] = challengeName.split("__");
            if (!obj[gameType]) {obj[gameType] = {};
            }
                obj[gameType][challengeType] = challengeCount;
                return obj;
        }, {});
        const totalChallange = Object.values(challenges).reduce((acc, val) => acc + val, 0);
        const quests = hypixelPlayer.quests;
        let completedqests = 0;
        for (const [questName, quest] of Object.entries(quests)) {
            if (quest.completions && quest.completions.length > 0) {
                completedqests += quest.completions.length;
            }
        }
        const [stats] = await Promise.all([
            getNetworth(uuid2, profileid),
        ]);
        const PURSE_ICON = '<:Purse:1059997956784279562>';
        const IRON_INGOT_ICON = '<:IRON_INGOT:1070126498616455328>';
        const {
            networth: { formatted: networth, short: shortnetworth }, 
            soulbound: { formatted: unsoulbound, short: shortbound }
        } = stats || {};

        let status = ""
        if (statusm === `true`){status = `Online`}else if(statusm === `false`){status = `Offline`}else{status = `Offline`}
        const karma = Hypixel.karma || `1`;
        const rewardStreak = Hypixel.rewardStreak || `0`;
        const giftsSent = Hypixel.giftsSent || `0`;
        const formatted_karma = addNotation("oneLetters", karma);
        const formatted_ap = addCommas(ap);
        const loginDate = firstlogin.toUTCString();
        const logoutDate = lastlogin.toUTCString();
        const login = formatLoginDate(loginDate);
        const logout = formatLogoutDate(logoutDate);
        const bedwars = Hypixel.stats?.bedwars
        const skywars = Hypixel.stats?.skywars
        const duels = Hypixel.stats?.duels
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid2}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {
            if (profileraw[key].current) currentProfile = key;}
            const player = (profileraw[currentProfile])
            const Senither = player.data.weight.senither.overall.toString().split(".")[0];
            const SenitherWeight = addCommas(Senither);
            const SkillAverage = player.data.average_level.toString().split(".")[0];
            const slayer_zom = player.data.slayers.zombie.level.currentLevel
            const slayer_spe = player.data.slayers.spider.level.currentLevel
            const slayer_wol = player.data.slayers.wolf.level.currentLevel
            const slayer_eman = player.data.slayers.enderman.level.currentLevel
            const slayer_blaze = player.data.slayers.blaze.level.currentLevel
            const slayers = (`${slayer_zom}/${slayer_spe}/${slayer_wol}/${slayer_eman}/${slayer_blaze}`) //ill add vamp slayer later 

    const embed = {
        color: 0xffb600,
        title: `${username}'s Player Stats`,
        description: `**${Hypixel.rank}** ${username}`,
        timestamp: new Date().toISOString(),
        fields: [
            {
                name: "Hypixel",
                value: `Netowrk Level: ${networkLevel}\nAP: ${formatted_ap}\nKarma: ${formatted_karma}\nLogin/Logout: ${login}/${logout}\nQuests/Challanges: ${completedqests}/${totalChallange}\nGifts Sent: ${giftsSent}`,
                inline: true,
            },
            {
                name: "Bedwars",
                value: `Level: [${bedwars.level}✫]\nFinal Kills: ${addCommas(bedwars.finalKills)}\nWins: ${bedwars.wins}\nBeds Broken: ${bedwars.beds.broken}\nFKDR: ${bedwars.finalKDRatio}\nWLR: ${bedwars.WLRatio}\nBBLR: ${bedwars.beds.BLRatio}\n:sparkles: Winstreak :sparkles: ${bedwars.winstreak}`,
                inline: true,
            },
            {
                name: "SkyWars && Duels",
                value: `SkyWars Level: [${skywars.level}✫]\nSkywars KDR: ${skywars.KDRatio}\nDuels Division: ${duels.division}\n Duels Best WS: ${duels.bestWinstreak}\nDuels Kills: ${duels.kills}`,
                inline: true,
            },
            {
                name: "Other Games",
                value: `UHC Kills: ${Hypixel.stats.uhc.kills}\n MurderMystery Wins:${Hypixel.stats.murdermystery.wins}\nBuild Battle Wins: ${Hypixel.stats.buildbattle.wins}`,
                inline: true,
            },
            {
                name: "Skyblock",
                value: `${PURSE_ICON} Networth: **${networth} (${shortnetworth})**\n${IRON_INGOT_ICON} Unsoulbound Networth: **${unsoulbound} (${shortbound})**\n\nSKill Avrg: ${SkillAverage}\nWeight: ${SenitherWeight}\nSlayers: ${slayers}`,
                inline: true,
            }
        ],
        footer: {
            text: `${messages.default}`,
            iconURL: `${messages.icon}`,
        },
    };

        interaction.editReply({ embeds: [embed], components: [row] });
    } catch (error) {
        const errorEmbed = handleError(error);
        await interaction.editReply({ embeds: [errorEmbed] });
    }
    }
},};
