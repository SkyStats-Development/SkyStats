
const config = require('../../../config.json')
const ms = require('ms');
const messages = require('../../../messages.json')
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { exec } = require("child_process");
const ping = require('ping');
const axios = require(`axios`)
const key = config.api.hypixelAPIkey

async function checkApiKey(key) {
    try {
      const response = await axios.get(`https://api.hypixel.net/key?key=${key}`);
      if (response.data.success) {
        return 'Valid';
      } else {
        return 'Invalid';
      }
    } catch (error) {
      return 'Invalid';
    }
  }






module.exports = {
    name: 'ping',
    description: 'shows the guild and your current stats',

    execute: async (interaction, client) => {
        const heartBeat = ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })
        const current_bot = config.discord.clientID
        const latancy_to_discord = client.ws.ping


        async function pingMultipleIPs(ipList) {
            const promises = ipList.map(ip => ping.promise.probe(ip));
            const results = await Promise.all(promises);
            return results.map(result => result.time);
          }
          
          (async function() {
              const ipList = ['103.54.59.82', 'hypixel.net', 'api.hypixel.net', 'sky.shiiyu.moe', '170.52.76.214'];
              const names = ['host', 'hypixel', 'hypixelAPI', 'skycrypt', 'development'];
            
              const msValues = await pingMultipleIPs(ipList);
              const ipData = {};
              names.forEach((name, index) => {
                ipData[name] = msValues[index];
              });
              
              const host = ipData.host;
              const hypixel = ipData.hypixel;
              const hypixelAPI = ipData.hypixelAPI;
              const skycrypt = ipData.skycrypt;
              const development = ipData.development;


              (async function() {
                const validity = await checkApiKey(key);







        const stats = {
            color: 0xffa600,
            title: `Pinged in: ${interaction.guild.name}`,
            description: (`<:discord:1090128313181278228> **Discord Ping**: \`${latancy_to_discord}\`ms\n❤️ **Last Heartbeat**: \`${heartBeat}\`ago\n🤖**Current Bot**: <@${current_bot}>\n\n<:hypixel:1090128921623797861> **Hypixel Network Ping**: \`${hypixel}\`ms\n<:hypixel:1090128921623797861> **Hypixel API Key**: \`${validity}\`\n<:hypixel:1090128921623797861> **Hypixel API Ping**: \`${hypixelAPI}\`ms\n\n<:logo1:1090129857075228743> **SkyStats API, Database**: \`${host}\`ms\n<:logo1:1090129857075228743> **Website, Bot**: \`${host}\`ms\n<:logo1:1090129857075228743> **Development**: \`${development}\`ms\n\n<:buni:1090130555678498877> **SkyCrypt API**: \`${skycrypt}\`ms`),
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.sogayowner}`, iconURL: `${messages.footer.icon}`},
                };
        await interaction.reply({ embeds: [stats] })
    })();
})();
            }

      }
