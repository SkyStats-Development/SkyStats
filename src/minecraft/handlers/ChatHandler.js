const { replaceAllRanks, toFixed, addCommas } = require('../../contracts/helperFunctions')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const chalk = require ('chalk');
let guildInfo = [], guildRanks = [], members = [], guildTop = []
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const EventHandler = require('../../contracts/EventHandler')
const getWeight = require('../../../API/stats/weight')
const messages = require('././../messages.json')
const { EmbedBuilder } = require('discord.js')
const config = require('../../../config.json')
const Logger = require('../../Logger')
const fs = require('fs')
const footerdata = require('../../../messages.json')

class StateHandler extends EventHandler {
  constructor(minecraft, command, discord) {
    super()
    this.minecraft = minecraft
    this.discord = discord
    this.command = command
  }

  registerEvents(bot) {
    this.bot = bot
    this.bot.on('message', (message) => this.onMessage(message))
  }

  async onMessage(event) {
    const message = event.toString();
    const colouredMessage = event.toMotd();

    if (this.isLobbyJoinMessage(message)) {
      return bot.chat('\u00a7')
    }

    if (this.isPartyMessage(message)) {
      let username = replaceAllRanks(message.substr(54))
      await delay(69)
      this.send(`/party accept ${username}`)
      await delay(6000)
      this.send(`/party leave`)
      let name = replaceAllRanks(message.split('has')[0].replaceAll('-----------------------------------------------------\n', ''))
      console.log(chalk.cyanBright`Fragbot >> ${name} Just used the fragbot`)     
      const channel = client.channels.cache.get(`1059664574258884681`);
      const fragbot = {
        title: `Fragbot Logs`,
        description: (`${name} Has Partied The Bot!`),
        timestamp: new Date().toISOString(),
        footer: {
            text: `${footerdata.footer.default}`,
        },
    };
      channel.send({embeds: [fragbot]});

    }

  }

  isMessageFromBot(username) {
    return bot.username === username
  }

  isAlreadyBlacklistedMessage(message) {
    return message.includes(`You've already ignored that player! /ignore remove Player to unignore them!`) && !message.includes(':')
  }
  isBlacklistRemovedMessage(message) {
    return message.startsWith('Removed') && message.includes('from your ignore list.') && !message.includes(':')
  }

  isBlacklistMessage(message) {
    return message.startsWith('Added') && message.includes('to your ignore list.') && !message.includes(':')
  }

  isGuildMessage(message) {
    return message.startsWith('Guild >') && message.includes(':')
  }

  isOfficerChatMessage(message) {
    return message.startsWith('Officer >') && message.includes(':')
  }

  isGuildQuestCompletion(message) {
    return message.includes('GUILD QUEST TIER ') && message.includes('COMPLETED') && !message.includes(':')
  }

  isLoginMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('joined.') && !message.includes(':')
  }

  isLogoutMessage(message) {
    return message.startsWith('Guild >') && message.endsWith('left.') && !message.includes(':')
  }

  isJoinMessage(message) {
    return message.includes('joined the guild!') && !message.includes(':')
  }

  isLeaveMessage(message) {
    return message.includes('left the guild!') && !message.includes(':')
  }

  isKickMessage(message) {
    return message.includes('was kicked from the guild by') && !message.includes(':')
  }

  isGuildTopMessage(message) {
    return message.includes('Guild Experience') && !message.includes('●') && !message.includes(':')
  }
  isPartyMessage(message) {
    return message.includes('has invited you to join their party!') && !message.includes(':')
  }

  isGuildListMessage(message) {
    return message.includes('●') || message.includes(' -- ') && message.includes(' -- ') || message.startsWith('Online Members: ') || message.includes('Online Members: ') || message.startsWith('Total Members:') ||  message.startsWith('Guild Name:')
  }

  isPromotionMessage(message) {
    return message.includes('was promoted from') && !message.includes(':')
  }

  isDemotionMessage(message) {
    return message.includes('was demoted from') && !message.includes(':')
  }
  
  isRequestMessage(message) {
    return message.includes('has requested to join the Guild!')
  }

  isBlockedMessage(message) {
    return message.includes('We blocked your comment') && !message.includes(':')
  }

  isRepeatMessage(message) {
    return message == 'You cannot say the same message twice!'
  }

  isNoPermission(message) {
    return (message.includes('You must be the Guild Master to use that command!') || message.includes('You do not have permission to use this command!') || message.includes("I'm sorry, but you do not have permission to perform this command. Please contact the server administrators if you believe that this is in error.") || message.includes("You cannot mute a guild member with a higher guild rank!") || message.includes("You cannot kick this player!") || message.includes("You can only promote up to your own rank!") || message.includes("You cannot mute yourself from the guild!") || message.includes("is the guild master so can't be demoted!") || message.includes("is the guild master so can't be promoted anymore!")) && !message.includes(":")
  }

  isIncorrectUsage(message) {
    return message.includes('Invalid usage!') && !message.includes(':')
  }

  isOnlineInvite(message) {
    return message.includes('You invited') && message.includes('to your guild. They have 5 minutes to accept.') && !message.includes(':')
  }

  isOfflineInvite(message) {
    return message.includes('You sent an offline invite to') && message.includes('They will have 5 minutes to accept once they come online!') && !message.includes(':')
  }

  isFailedInvite(message) {
    return (message.includes('is already in another guild!') || message.includes('You cannot invite this player to your guild!') || (message.includes("You've already invited") && message.includes("to your guild! Wait for them to accept!")) || message.includes('is already in your guild!')) && !message.includes(':')
  }

  isUserMuteMessage(message) {
    return message.includes('has muted') && message.includes('for') && !message.includes(':')
  }

  isUserUnmuteMessage(message) {
    return message.includes('has unmuted') && !message.includes(':')
  }

  isCannotMuteMoreThanOneMonth(message) {
    return message.includes('You cannot mute someone for more than one month') && !message.includes(':')
  }

  isGuildMuteMessage(message) {
    return message.includes('has muted the guild chat for') && !message.includes(':')
  }

  isGuildUnmuteMessage(message) {
    return message.includes('has unmuted the guild chat!') && !message.includes(':')
  }

  isSetrankFail(message) {
    return message.includes("I couldn't find a rank by the name of ") && !message.includes(':')
  }

  isAlreadyMuted(message) {
    return message.includes('This player is already muted!') && !message.includes(':')
  }

  isNotInGuild(message) {
    return message.includes(' is not in your guild!') && !message.includes(':')
  }

  isLowestRank(message) {
    return message.includes("is already the lowest rank you've created!") && !message.includes(':')
  }

  isAlreadyHasRank(message) {
    return message.includes('They already have that rank!') && !message.includes(':')
  }
    
  isLobbyJoinMessage(message) {
    return (message.endsWith(' the lobby!') || message.endsWith(' the lobby! <<<')) && message.includes('[MVP+')
  }

  isTooFast(message) {
    return message.includes('You are sending commands too fast! Please slow down.') && !message.includes(':')
  }

  isPlayerNotFound(message) {
    return message.startsWith(`Can't find a player by the name of`)
  }
}

module.exports = StateHandler