const config = require("../../../config.json");
const messages = config.messages.discord;
const axios = require(`axios`);
const { addNotation, addCommas } = require("../../contracts/helperFunctions");

let messageId;

setInterval(banTracker, 30000);

async function banTracker() {
  try {
    const data = await axios.get(
      `https://api.hypixel.net/punishmentstats?key=${config.api.hypixel.KEY}`
    );

    const channel = client.channels.cache.get(`1129086757405737091`);
    const embed1 = {
      title: `A wild 🔨 Ban 🔨 has appeared!`,
      description: `(This should be updated every minute)`,
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: `Latest Ban(s)`,
          value: `🚓\`${data.data.watchdog_lastMinute}\` Ban(s) in the last minute`,
          inline: true,
        },
      ],
      footer: {
        text: `${messages.defaultbetter}`,
        iconURL: `${messages.icon}`,
      },
    };

    if (messageId) {
      // Fetch the previous message and delete it
      const previousMessage = await channel.messages.fetch(messageId);
      if (previousMessage) {
        await previousMessage.delete();
      }
    }

    // Send the updated message and store its ID
    const sentMessage = await channel.send({ embeds: [embed1] });
    messageId = sentMessage.id;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { banTracker };
