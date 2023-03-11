const hypixel = require("../../contracts/API/HypixelRebornAPI");
const { addCommas } = require("../../contracts/helperFunctions");
const messages = require("../../../messages.json");
const { getUUID } = require("../../contracts/API/PlayerDBAPI");
const axios = require("axios");

module.exports = {
  name: "skywars",
  description: "Gets SkyWars Data",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: false,
    },
  ],

  execute: async (interaction, client, InteractionCreate) => {
    try {
    const linked = require("../../../data/discordLinked.json");
    const uuid = linked?.[interaction?.user?.id]?.data[0];
    let name = interaction.options.getString("name") || uuid;
    const username = (
      await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
    ).data.data.player.username;
    const uuid2 = (
      await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
    ).data.data.player.raw_id;
    const player = await hypixel.getPlayer(name);
    const embed = {
      color: 0xffa600,
      title: `SkyWars Stats For ${username}`,
      description: `\n`,
      thumbnail: {
        url: `https://api.mineatar.io/body/full/${username}`,
      },
      fields: [
        {
          name: "Level",
          value: `[${player.stats.skywars.level}✫]`,
        },
        {
          name: `Played Games`,
          value: `${player.stats.skywars.playedGames}`,
        },
        {
          name: `KDR`,
          value: `${player.stats.skywars.KDRatio}`,
        },
        {
          name: `WLR`,
          value: `${player.stats.skywars.WLRatio}`,
        },
        {
          name: `Wins`,
          value: `${player.stats.skywars.wins}`,
        },
        {
          name: `Kills`,
          value: `${player.stats.skywars.kills}`,
        },
        {
          name: `Deaths`,
          value: `${player.stats.skywars.deaths}`,
        },
        {
          name: `:sparkles: Winstreak :sparkles:`,
          value: `${player.stats.skywars.winstreak}`,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: `${messages.footer.defaultbetter}`,
        iconURL: `${messages.footer.icon}`,
      },
    };

    await interaction.reply({ embeds: [embed] });
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
  },
};
