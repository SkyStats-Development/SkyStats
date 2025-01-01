const config = require("../../../config.json");
const key = process.env.KEY;
const messages = config.messages.discord;
const axios = require(`axios`);
const { addNotation, addCommas } = require("../../contracts/helperFunctions");

let messageSent = false;
let messageId;

//setInterval(banTracker, 30000);

async function banTracker() {
  try {
    const data = await axios.get(
      `https://api.hypixel.net/punishmentstats`
    );

    const channel = client.channels.cache.get(config.discord.ban_log_channel);
    const embed1 = {
      title: `🔨 Hypixel Ban Statistics 🔨`,
      description: `Hypixel ban statistics are updated every 10 secounds`,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: `🔨 Total Statistics 🔨`,
          value: `🚓 **Staff Total**: ${addCommas(data.data.staff_total)}\n<a:doge:1129093360733388880> **Watchdog Total**: ${addCommas(data.data.watchdog_total)}`
        },
        {
          name: `🔃 Rolling Daily Ban Statistics 🔃`,
          value: `🚓 **Staff**: ${addCommas(
            data.data.staff_rollingDaily
          )}\n<a:doge:1129093360733388880> **Watchdog**: ${addCommas(data.data.watchdog_rollingDaily)}`,
          inline: true,
        },
      ],
      footer: {
        text: `${messages.defaultbetter}`,
        iconURL: `${messages.icon}`,
      },
    };

    if (messageSent) {
      // Edit the existing message
      await channel.messages.fetch(messageId).then((msg) => {
        msg.edit({ embeds: [embed1] });
      });
    } else {
      // Send a new message
      await channel.send({ embeds: [embed1] }).then((msg) => {
        messageId = msg.id;
        messageSent = true;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { banTracker };
