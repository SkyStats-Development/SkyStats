const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices} = require('skyhelper-networth');
const messages = require('../../../messages.json')
const { default: axios, AxiosError } = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const config = require(`../../../config.json`)
const { getPlayer } = require('../../../API/functions/getPlayer');
const getDungeons = require("../../../API/functions/getDungeons.js");
const { handleError } = require('../../../API/functions/getError');
const { buttons, embeds } = require("../../..//src/discord/constants/defaultDungeons"); 
// Credit to DuckySoLucky for this code (modified)
module.exports = {
  name: "dungeon",
  description: "View dungeon stats",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: false,
    }
  ],

  execute: async (interaction) => {
    const id = interaction.user.id;
    const { uuid, username, profilename, profileid, error, playerData, profile, profileData } = await getPlayer(id, interaction.options.getString('name'));
    if (error) {
      const errorembed = {
        color: 0xff0000,
        title: error.message,
        description: error.description,
        timestamp: new Date().toISOString(),
      };
      await interaction.reply({ embeds: [errorembed] });
    } else {
      await interaction.deferReply();
    try {
      const collector = interaction.channel.createMessageComponentCollector({
        compnentType: "DROPDOWN",
        time: 60 * 1000, // 60 seconds
      });






      const calculated = getDungeons(playerData, profile);

      if (calculated.catacombs.highest_tier_completed == null) {
        throw new SkyHelperError(
          `\`${username}\` has never played dungeons before on \`${profile.cute_name}\``,
          "/dungeons"
        );
      }

      let INTERACTION_MODE_BUTTON = buttons.mode.master;
      const INTERACTION_BUTTONS = buttons.main;
      let mode = "catacombs";

      interaction.editReply({
        embeds: [ embeds.getBasicInfoEmbed(calculated, profile, { uuid, username, cute_name: profileData.cute_name, mode }) ],
        components: [
          new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
          new ActionRowBuilder().addComponents(buttons.mode.master),
        ],
      });


      collector.on("collect", async (i) => {
        collector.resetTimer();

        if (i.customId == "dungeons_overview") {
          INTERACTION_BUTTONS.map((b) => b.setDisabled(false));
          INTERACTION_BUTTONS[0].setDisabled(true);

          i.update({
            embeds: [
              embeds.getBasicInfoEmbed(calculated, profile, { uuid, username, cute_name: profileData.cute_name, mode })
            ],
            components: [
              new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
              new ActionRowBuilder().addComponents(INTERACTION_MODE_BUTTON),
            ],
          });
        } else if (i.customId == "best_runs") {
          INTERACTION_BUTTONS.map((b) => b.setDisabled(false));
          INTERACTION_BUTTONS[1].setDisabled(true);

          i.update({
            embeds: [
              embeds.getBestRunsEmbed(calculated, profile, { uuid, username, cute_name: profileData.cute_name, mode })
            ],
            components: [
              new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
              new ActionRowBuilder().addComponents(INTERACTION_MODE_BUTTON),
            ],
          });
        } else if (i.customId == "dungeons_classes") {
          INTERACTION_BUTTONS.map((b) => b.setDisabled(false));
          INTERACTION_BUTTONS[2].setDisabled(true);

          i.update({
            embeds: [
              embeds.getClassesEmbed(calculated, profile, { uuid, username, cute_name: profileData, mode })
            ],
            components: [
              new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
              new ActionRowBuilder().addComponents(INTERACTION_MODE_BUTTON),
            ],
          });
        } else if (i.customId == "boss_collection") {
          INTERACTION_BUTTONS.map((b) => b.setDisabled(false));
          INTERACTION_BUTTONS[3].setDisabled(true);

          i.update({
            embeds: [
              embeds.getBossCollectionEmbed(calculated, profile, { uuid, username, cute_name: profileData.cute_name })
            ],
            components: [
              new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
              new ActionRowBuilder().addComponents(INTERACTION_MODE_BUTTON),
            ],
          });
        } else if (["catacombs", "master_mode"].includes(i.customId)) {
          INTERACTION_MODE_BUTTON = mode === "master_mode" ? buttons.mode.normal : buttons.mode.master;
          mode = mode === "master_mode" ? "catacombs" : "master_mode";
          INTERACTION_BUTTONS.map((b) => b.setDisabled(false));
          INTERACTION_BUTTONS[0].setDisabled(true);


          i.update({
            embeds: [
              embeds.getBasicInfoEmbed(calculated, profile, { uuid, username, cute_name: profileData.cute_name, mode })
            ],
            components: [
              new ActionRowBuilder().addComponents(INTERACTION_BUTTONS),
              new ActionRowBuilder().addComponents(INTERACTION_MODE_BUTTON),
            ],
          });
        }
      });

      collector.on("end", () => {
        interaction.editReply({
          components: [],
        });
      });
    } catch (error) {
      const errorEmbed = handleError(error);
      await interaction.reply({ embeds: [errorEmbed] });
      console.log(error);
    }
  }
  },
};