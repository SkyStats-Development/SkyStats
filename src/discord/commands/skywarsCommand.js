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
    const linked = require("../../../data/discordLinked.json");
    const uuid = linked?.[interaction?.user?.id]?.data[0];
    let name = interaction.options.getString("name") || uuid;
    const username =
      (
        await axios.get(
          `https://sessionserver.mojang.com/session/minecraft/profile/${name}/`
        )
      ).data.name || name;
    const player = await hypixel.getPlayer(name);
    const embed = {
      color: 0xffa600,
      title: `SkyWars Stats For ${player}`,
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
  },
};
