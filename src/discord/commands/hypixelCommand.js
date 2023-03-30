// Credits to my UI and frontend designer, pandy!
const { AttachmentBuilder, Client, Events, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const config = require("../../../config.json");
const fs = require("fs");
const messages = require("../../../messages.json");
const {createCanvas, Image, registerFont} = require('canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { default: axios, AxiosError } = require("axios");
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const { Color } = require('hypixel-api-reborn');

const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}


registerFont(__dirname + '/MinecraftRegular.ttf', { family: 'Minecraft' });
registerFont(__dirname + `/mcBold.otf`, {family: "MinecraftBOLD"})


function formatLoginDate(loginDate) {
    const date = new Date(loginDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substring(2);
    let hour = date.getHours();
    let minute = date.getMinutes();
    const amPm = hour >= 12 ? 'PM' : 'AM';
  
    // Convert hour from 24-hour format to 12-hour format
    hour = hour % 12 || 12;
  
    // Add a leading zero to the minute if it's a single digit
    minute = minute < 10 ? '0' + minute : minute;
  
    return `${month}/${day}/${year}, ${hour}:${minute} ${amPm}`;
  }
  function formatLogoutDate(logoutDate) {
    const date = new Date(logoutDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substring(2);
    let hour = date.getHours();
    let minute = date.getMinutes();
    const amPm = hour >= 12 ? 'PM' : 'AM';
  
    // Convert hour from 24-hour format to 12-hour format
    hour = hour % 12 || 12;
  
    // Add a leading zero to the minute if it's a single digit
    minute = minute < 10 ? '0' + minute : minute;
  
    return `${month}/${day}/${year}, ${hour}:${minute} ${amPm}`;
  }


module.exports = {
    name: 'player',
    description: 'Gets Hypixel Player Data',
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
        const canvas = createCanvas(590, 352);
        const background = await readFile('src/discord/commands/fml2.png');
        const backgroundImage = new Image();
        const context = canvas.getContext('2d');
        backgroundImage.src = background;
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        const minecraftUuid = await getLinkedAccount(interaction.user.id) || ``
        const name = interaction.options.getString("name") || minecraftUuid;
        const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
        const username = player.username;
        const uuid2 = player.raw_id;
        const Hypixel = (await hypixel.getPlayer(uuid2))
        const firstlogin = Hypixel.firstLogin
        const lastlogin = Hypixel.lastLogin
        const networkLevel = Hypixel.level
        const ap = Hypixel.achievementPoints
        const statusm = Hypixel.isOnline
        const guild = await hypixel.getGuild("player", uuid2)
        const gname = guild?.name || `Unknown`
        const hypixelPlayer = (await axios.get(`https://api.hypixel.net/player?uuid=${uuid2}&key=${config.api.hypixelAPIkey}`)).data.player
        const ranksGifted = hypixelPlayer?.giftingMeta?.ranksGiven || 0
        const challenges = (await axios.get(`https://api.hypixel.net/player?uuid=${uuid2}&key=${config.api.hypixelAPIkey}`)).data.player.challenges.all_time;

        const sortedChallenges = Object.entries(challenges)
          .sort((a, b) => b[1] - a[1])
          .reduce((obj, [challengeName, challengeCount]) => {
            const [gameType, challengeType] = challengeName.split('__');
            if (!obj[gameType]) {
              obj[gameType] = {};
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

        let status = "" 
        if (statusm === `true`) {
            status = `Online`
        } else if (statusm === `false`) {
            status = `Offline`
        } else {
            status = `Offline`
        }
        const karma = Hypixel.karma || `1`
        const rewardStreak = Hypixel.rewardStreak || `0`
        const giftsSent = Hypixel.giftsSent || `0`
        const formatted_karma = addNotation("oneLetters", karma)
        const formatted_ap = addCommas(ap)
        const loginDate = firstlogin.toUTCString()
        const logoutDate = lastlogin.toUTCString()
        
        const login = formatLoginDate(loginDate);
        const logout = formatLogoutDate(logoutDate);




        const gradientowo = context.createLinearGradient(0, 0, canvas.width, 0);

        gradientowo.addColorStop(0, '#f73100'); // Left color
        gradientowo.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'left'; // Center the text horizontally
        context.fillText(`First Login: ${login}`, canvas.width/2 + 45, 75);

        gradientowo.addColorStop(0, '#f73100'); // Left color
        gradientowo.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'left'; // Center the text horizontally
        context.fillText(`Last Login: ${logout}`, canvas.width/2 + 45, 95);

        gradientowo.addColorStop(0, '#f73100'); // Left color
        gradientowo.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo; // Set the fill style to the gradient
        context.font = '18px Minecraft'; // Set the font size and family
        context.textAlign = 'left'; // Center the text horizontally
        context.fillText(`Status: ${status}`, canvas.width/2 - 145, 72);

        gradientowo.addColorStop(0, '#f73100'); // Left color
        gradientowo.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo; // Set the fill style to the gradient
        context.font = '18px Minecraft'; // Set the font size and family
        context.textAlign = 'left'; // Center the text horizontally
        context.fillText(`Guild: ${gname}`, canvas.width/2 - 145, 104);

        const gradientowo9 = context.createLinearGradient(0, 0, canvas.width, 0);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Achievement Points`, canvas.width/2 + 145, 140);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${formatted_ap}`, canvas.width/2 + 145, 172);
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Network Level`, canvas.width/2 - 145, 140);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${networkLevel}`, canvas.width/2 - 145, 172);

        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Quests`, canvas.width/2 + 145, 205);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${completedqests}`, canvas.width/2 + 145, 235);
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Challenges`, canvas.width/2 - 145, 205);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${totalChallange}`, canvas.width/2 - 145, 235);


        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Karma`, canvas.width/2 - 220, 266);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${formatted_karma}`, canvas.width/2 - 220, 295);


        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Reward Streak`, canvas.width/2 - 70, 266);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${rewardStreak}`, canvas.width/2 - 70, 295);
//
        
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Ranks Gifted`, canvas.width/2 + 220, 266);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${ranksGifted}`, canvas.width/2 + 220, 295);


        context.font = '16px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`Gifts Sent`, canvas.width/2 + 70, 266);
        gradientowo9.addColorStop(0, '#f73100'); // Left color
        gradientowo9.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientowo9; // Set the fill style to the gradient
        context.font = '32px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(`${giftsSent}`, canvas.width/2 + 70, 295);

        const rank = Hypixel.rank;
        let rankColor = '#FFFFFF'; // default to white
        let rankPlusColor = ''; // default to empty string
        if (rank === 'VIP') {
          rankColor = '#55FF55'; // lime green
        } else if (rank === 'VIP+') {
          rankColor = '#55FF55'; // lime green
          rankPlusColor = '#FFAA00'; // gold
        } else if (rank === 'MVP') {
          rankColor = '#55FFFF'; // aqua
        } else if (rank === 'MVP+') {
          rankColor = '#55FFFF'; // aqua
          rankPlusColor = Hypixel.plusColor?.toHex() || ''; // plus color
        } else if (rank === 'MVP++') {
          rankColor = Hypixel.prefixColor?.toHex() || ''; // prefix color
          rankPlusColor = Hypixel.plusColor?.toHex() || ''; // plus color
        } else if (rank === 'YouTube') {
          rankColor = '#FF5555';
        } else if (rank === 'PIG+++') {
          rankColor = '#FFC0CB'; // pink
          rankPlusColor = '#00FFFF'; // aqua
        } else if (rank === 'GM') {
          rankColor = '#006400'; // dark green
        } else if (rank === 'Default') {
            rankColor = '#808087'; // dark green
        } else if (rank === 'ADMIN' || rank === 'OWNER') {
          rankColor = '#FF0000'; // light red
        }
        const rankPrefix = `${rank.replace(/\++/g, '')}`;
        const rankPlus = rank.includes('++') ? '++' : rank.includes('+') ? '+'.repeat(rank.match(/\+/g).length) : '';
        const formattedRank = `[${rankPrefix}${rankPlus}]`;
        const rankWidth = context.measureText(formattedRank).width;
        const nameWidth = context.measureText(username).width;
        const rankX = canvas.width/2 - (rankWidth + nameWidth)/2;
        context.fillStyle = rankColor;
        const bracket = `[`
        const bracket2 = `] `
        context.font = '20px Minecraft';
        context.textAlign = 'right';
        let ammont = ""
        if (rankPlus === `++`) {
            ammont = 21.5
        } else if (rankPlus === `+`) {
            ammont = 11.5
        } else {
            ammont = 1
        }
        context.fillText(bracket+rankPrefix, rankX + rankWidth + ammont - context.measureText(rankPlus).width, 35);
        if (rankPlusColor !== '') {
        context.fillStyle = rankPlusColor;
        }
        context.font = '20px Minecraft';
        context.textAlign = 'left';
        context.fillText(rankPlus, rankX + rankWidth, 35);
        context.fillStyle = rankColor;
        context.font = '20px Minecraft';
        context.textAlign = 'left';
        context.fillText(bracket2+username, rankX + rankWidth + context.measureText(rankPlus).width, 35);
        const gtag = guild?.tag || ``;
        const gTag = gtag ? `[${gtag}]` : ``;
        const gtagcolor = guild?.tagColor.toHex()

    
        context.fillStyle = gtagcolor;
        context.font = '20px Minecraft';
        context.textAlign = 'left';
        context.fillText(gTag, rankX + rankWidth + context.measureText(rankPlus).width + context.measureText(username).width + 24, 35);


        const gradientm = context.createLinearGradient(0, 0, canvas.width, 0);
        gradientm.addColorStop(0, '#f73100'); // Left color
        gradientm.addColorStop(1, '#ffb600'); // Right color
        context.fillStyle = gradientm; // Set the fill style to the gradient
        context.font = '20px Minecraft'; // Set the font size and family
        context.textAlign = 'center'; // Center the text horizontally
        context.fillText(' SkyStats Development ', canvas.width/2, 337);



        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'uwu.png' });
        await interaction.editReply({files: [attachment]})
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
    }
}
