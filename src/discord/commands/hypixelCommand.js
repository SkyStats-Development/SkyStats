// Credits to my UI and frontend designer, pandy!
const { AttachmentBuilder } = require('discord.js');
const config = require('../../../config.json');
const messages = config.messages.discord;
const { getPlayer } = require('../../functions/get/getPlayer');
const { getGuild } = require('../../functions/get/getGuild');
const { createCanvas, Image, registerFont } = require('canvas');
const axios = require('axios');
const { readFile } = require('fs/promises');
const { addNotation, addCommas } = require('../../contracts/helperFunctions');

registerFont(__dirname + '/Fonts/mc.ttf', { family: 'Minecraft' });
registerFont(__dirname + '/Fonts/unifont.ttf', { family: 'font' });
registerFont(__dirname + '/Fonts/mc-bold.otf', { family: 'MinecraftBOLD' });

/**
 * Formats a date into a readable string.
 * @param {Date} dateInput - The date to format.
 * @returns {string} The formatted date string.
 */
function formatDate(dateInput) {
  const date = new Date(dateInput);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substring(2)}`;
  const formattedTime = `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  return `${formattedDate}, ${formattedTime}`;
}

/**
 * Generates a gradient fill style.
 * @param {CanvasRenderingContext2D} context - The canvas context.
 * @param {number} x0 - The x-coordinate of the start point.
 * @param {number} y0 - The y-coordinate of the start point.
 * @param {number} x1 - The x-coordinate of the end point.
 * @param {number} y1 - The y-coordinate of the end point.
 * @param {string} colorStart - The start color.
 * @param {string} colorEnd - The end color.
 * @returns {CanvasGradient} The gradient fill style.
 */
function createGradient(context, x0, y0, x1, y1, colorStart, colorEnd) {
  const gradient = context.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

/**
 * Calculates the network level from experience.
 * @param {number} exp - The network experience.
 * @returns {number} The network level.
 */
function getNetworkLevel(exp) {
  return Math.floor((Math.sqrt(2 * exp + 30625) / 50) - 2.5);
}

/**
 * Formats the rank information of a Hypixel player.
 * @param {Object} hypixelPlayer - The Hypixel player data.
 * @returns {Object} The formatted rank information.
 */
function formatRank(hypixelPlayer) {
  const colorToHexTable = {
    BLACK: "#000000",
    DARK_BLUE: "#0000AA",
    DARK_GREEN: "#00AA00",
    DARK_AQUA: "#00AAAA",
    DARK_RED: "#AA0000",
    DARK_PURPLE: "#AA00AA",
    GOLD: "#FFAA00",
    GRAY: "#AAAAAA",
    DARK_GRAY: "#555555",
    BLUE: "#5555FF",
    GREEN: "#55FF55",
    AQUA: "#55FFFF",
    RED: "#FF5555",
    LIGHT_PURPLE: "#FF55FF",
    YELLOW: "#FFFF55",
    WHITE: "#FFFFFF",
  };

  const rankColorTable = {
    VIP: '#55FF55',
    MVP: '#55FFFF',
    VIP_PLUS: '#55FF55',
    MVP_PLUS: '#55FFFF',
    MVP_PLUS_PLUS_AQUA: '#55FFFF',
    MVP_PLUS_PLUS: '#FFAA00',
    ADMIN: '#FF5555',
    OWNER: '#FF5555',
    YOUTUBE: '#FFF',
    GAME_MASTER: "#00AA00",
    PIG_RANK: "#FF55FF",
  };

  if (!hypixelPlayer) return {};

  let pureRank = "DEFAULT";
  let purePlusColor = "";
  let pureBracket = "";
  let plusCount = 0;
  if (hypixelPlayer.newPackageRank && hypixelPlayer.monthlyPackageRank === "NONE") {
    pureRank = hypixelPlayer.newPackageRank;
  }
  if (hypixelPlayer.rank === "ADMIN") {
    pureRank = hypixelPlayer.prefix === "§c[OWNER]" ? "OWNER" : "ADMIN";
  } else if (hypixelPlayer.rank === "GAME_MASTER") {
    pureRank = "GAME_MASTER";
  } else if (hypixelPlayer.rank === "YOUTUBER") {
    pureRank = hypixelPlayer.prefix === "§d[PIG§b+++§d]" ? "PIG_RANK" : "YOUTUBE";
  } else if (hypixelPlayer.newPackageRank === "MVP_PLUS" && hypixelPlayer.monthlyPackageRank === "NONE") {
    pureRank = "MVP_PLUS";
    purePlusColor = hypixelPlayer.rankPlusColor || "RED";
    plusCount = 1;
  } else if (hypixelPlayer.monthlyPackageRank) {
    console.log("++ detect")
    pureRank = hypixelPlayer.monthlyRankColor === "AQUA" ? "MVP_PLUS_PLUS_AQUA" : "MVP_PLUS_PLUS";
    purePlusColor = hypixelPlayer.rankPlusColor || "RED";
    plusCount = 2;
    console.log(pureRank)
  }
  if (pureRank === "YOUTUBE") {
    pureBracket = "RED";
  }
  if (pureRank === "PIG_RANK") {
    console.log("PIG_RANK");
    plusCount = 3;
    purePlusColor = "AQUA";
  }
  if (hypixelPlayer.newPackageRank === "VIP_PLUS") {
    purePlusColor = "GOLD";
    plusCount = 1;
  }



  console.log(pureRank, purePlusColor, plusCount)
  return {
    pureRank,
    purePlusColor: colorToHexTable[purePlusColor] || "",
    pureBracket: colorToHexTable[pureBracket] || "",
    rankColor: rankColorTable[pureRank] || "#FFFFFF",
    plusCount
  };
}

module.exports = {
  name: 'player',
  description: 'Gets Hypixel Player Data',
  options: [
    {
      name: 'name',
      description: 'mc username',
      type: 3,
      required: false,
    },
  ],
  execute: async (interaction, client, InteractionCreate) => {
    await interaction.deferReply();
    const id = interaction.user.id;
    const playerName = interaction.options.getString('name');
    
    const playerResult = await getPlayer(id, playerName);
    const { uuid2, username, playerData, error } = playerResult;
    const hypixelPlayer = playerData.player;

    if (error) {
      console.log(error);
      const errorembed = {
        color: 0xff0000,
        title: 'Error',
        description: `Data: ${error.description}`,
        timestamp: new Date().toISOString(),
      };
      await interaction.editReply({ embeds: [errorembed] });
      return;
    }

    const guild = await getGuild(uuid2);

    try {
      const canvas = createCanvas(590, 352);
      const background = await readFile(__dirname + '/images/hypixelCommand.png');
      const backgroundImage = new Image();
      const context = canvas.getContext('2d');
      backgroundImage.src = background;
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
     // https://images-ext-1.discordapp.net/external/CjpSy68kDp9ZwkGJej6btTnWTGoYVZTgFvaS0QDWkC4/https/visage.surgeplay.com/full/e33815503dbf4f7c82488ba5dad6ca5d?format=webp&width=174&height=283
      const imageUrl = 'https://visage.surgeplay.com/bust/6167c60c8295438998a186600b775fc8';
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imageBuffer = await Buffer.from(response.data, 'binary');
      const additionalImage = new Image();
      additionalImage.src = imageBuffer;
      additionalImage.onload = () => {
        context.drawImage(additionalImage, 10, 10);
      }
      // Draw the additional image at the desired position (e.g., x: 100, y: 100)


      const {
        firstLogin,
        lastLogin,
        networkExp,
        achievementPoints: ap,
        karma = '1',
        rewardStreak = '0',
        giftsSent = '0',
        newPackageRank: rank,
        rankPlusColor: plusColor,
        rankColor: prefixColor,
        monthlyPackageRank,
        monthlyRankColor,
      } = hypixelPlayer;

      const ranksGifted = hypixelPlayer?.giftingMeta?.ranksGiven || 0;
      const challenges = hypixelPlayer?.challenges?.all_time || {};
      const totalChallenge = Object.values(challenges).reduce((acc, val) => acc + val, 0);
      const quests = hypixelPlayer?.quests || {};
      const completedQuests = Object.values(quests).reduce((acc, quest) => acc + (quest.completions?.length || 0), 0);

      const status = hypixelPlayer?.lastLogin > hypixelPlayer?.lastLogout ? 'Online' : 'Offline';
      const formattedKarma = addNotation('oneLetters', karma);
      const formattedAp = addCommas(ap);
      const login = formatDate(firstLogin);
      const logout = formatDate(lastLogin);
      const networkLevel = getNetworkLevel(networkExp);

      const gradient = createGradient(context, 0, 0, canvas.width, 0, '#f73100', '#ffb600');
      context.fillStyle = gradient;
      context.font = '16px Minecraft';
      context.textAlign = 'left';
      context.fillText(`First Login: ${login}`, canvas.width / 2 + 45, 75);
      context.fillText(`Last Login: ${logout}`, canvas.width / 2 + 45, 95);
      context.fillText(`Status: ${status}`, canvas.width / 2 - 145, 72);
      context.fillText(`Guild: ${guild?.name || 'Unknown'}`, canvas.width / 2 - 145, 104);

      context.font = '16px Minecraft';
      context.textAlign = 'center';
      context.fillText('Achievement Points', canvas.width / 2 + 145, 140);
      context.font = '32px Minecraft';
      context.fillText(formattedAp, canvas.width / 2 + 145, 172);
      context.font = '16px Minecraft';
      context.fillText('Network Level', canvas.width / 2 - 145, 140);
      context.font = '32px Minecraft';
      context.fillText(networkLevel, canvas.width / 2 - 145, 172);
      context.font = '16px Minecraft';
      context.fillText('Quests', canvas.width / 2 + 145, 205);
      context.font = '32px Minecraft';
      context.fillText(completedQuests, canvas.width / 2 + 145, 235);
      context.font = '16px Minecraft';
      context.fillText('Challenges', canvas.width / 2 - 145, 205);
      context.font = '32px Minecraft';
      context.fillText(totalChallenge, canvas.width / 2 - 145, 235);
      context.font = '16px Minecraft';
      context.fillText('Karma', canvas.width / 2 - 220, 266);
      context.font = '32px Minecraft';
      context.fillText(formattedKarma, canvas.width / 2 - 220, 295);
      context.font = '16px Minecraft';
      context.fillText('Reward Streak', canvas.width / 2 - 70, 266);
      context.font = '32px Minecraft';
      context.fillText(rewardStreak, canvas.width / 2 - 70, 295);
      context.font = '16px Minecraft';
      context.fillText('Ranks Gifted', canvas.width / 2 + 220, 266);
      context.font = '32px Minecraft';
      context.fillText(ranksGifted, canvas.width / 2 + 220, 295);
      context.font = '16px Minecraft';
      context.fillText('Gifts Sent', canvas.width / 2 + 70, 266);
      context.font = '32px Minecraft';
      context.fillText(giftsSent, canvas.width / 2 + 70, 295);

      // Use the formatted rank information to draw the ranks with proper coloring
      const { pureRank, purePlusColor, pureBracket, rankColor, plusCount } = formatRank(hypixelPlayer);
      console.log(pureRank, rankColor)
      let rankMap = {
        MVP_PLUS: "MVP",
        MVP: "MVP",
        VIP_PLUS: "VIP",
        VIP: "VIP",
        ADMIN: "ADMIN",
        OWNER: "OWNER",
        YOUTUBE: "YOUTUBE",
        GAME_MASTER: "GM",
        PIG_RANK: "PIG",
        DEFAULT: "DEFAULT",
        MVP_PLUS_PLUS: "MVP",
        MVP_PLUS_PLUS_AQUA: "MVP"
      }
      context.fillStyle = rankColor;
      context.font = '20px Minecraft';
      context.textAlign = 'right';
      const rankText = `[${rankMap[pureRank]}`;
      const rankWidth = context.measureText(rankText).width;
      const nameWidth = context.measureText(username).width;
      const rankX = canvas.width / 2 - (rankWidth + nameWidth) / 2;

      context.fillText(rankText, rankX, 35);
      function replaceWithStars(n) {
        return (n > 0 && n <= 4) ? '+'.repeat(n) : "";
    }
    const stars = replaceWithStars(plusCount);
      if (purePlusColor) {
        context.fillStyle = purePlusColor;
        const magicNumbers = {
          "++": "1.75",
          "+": "3.5",
          "+++": "1.5"
        }
        context.fillText(stars, rankX + rankWidth / magicNumbers[stars], 35);
      }
      if (pureBracket) {
        context.fillStyle = pureBracket;
        context.fillText('[', rankX - context.measureText('[').width, 35);
        context.fillText(']', rankX + rankWidth + context.measureText('[').width, 35);
      }

      context.fillStyle = rankColor;
      context.textAlign = 'left';
      context.fillText(`] ${username}`, rankX + (context.measureText(stars).width), 35);

      const gtag = guild?.tag || '';
      const gTag = gtag ? `[${gtag}]` : '';
      const gtagcolor = guild?.tagColor || '#FFFFFF';

      context.fillStyle = gtagcolor;
      context.font = '20px font';
      context.textAlign = 'left';
      context.fillText(gTag, rankX + rankWidth + context.measureText(username).width + 24, 35);

      context.fillStyle = gradient;
      context.font = '20px Minecraft';
      context.textAlign = 'center';
      context.fillText(' SkyStats Development ', canvas.width / 2, 337);

      const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'uwu.png' });
      await interaction.editReply({ files: [attachment] });
    
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof AxiosError ? 'An error with validating the username provided has occurred.' : 'An error has occurred.';
      const errorembed = {
        color: 0xff0000,
        title: 'Error',
        description: `${errorMessage} Please try again later.\nIf the error persists, please contact the bot developer.`,
        timestamp: new Date().toISOString(),
        footer: {
          text: messages.default,
          iconURL: messages.icon,
        },
      };
      await interaction.editReply({ embeds: [errorembed] });
    }
  },
};
