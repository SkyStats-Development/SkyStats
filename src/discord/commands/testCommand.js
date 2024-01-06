const { ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { handleError } = require("../../functions/handle/handleError");
const { farmingWeight } = require("../../functions/get/getWeight")
const { senitherWeight } = require("../../functions/get/getWeight")
const { farmingWeight_Embed } = require('./embeds/weightEmbed')
const { calculateTotalSenitherWeight } = require('../../functions/constants/senitherWeight')
const { getPlayer } = require("../../functions/get/getPlayer")
module.exports = {
    name: 'test',
    description: 'bot credits',
    options: [
        {
            name: 'name',
            description: 'message to send',
            type: 3,
            required: false
        },

        
      ],

      execute: async (interaction, client, InteractionCreate) => {
        const id = interaction.user.id;
        const { uuid2, username, profilename, profileid, playerData, profileData, profile, error } = await getPlayer(
          id,
          interaction.options.getString("name")
        );
     //   console.log(await calculateTotalSenitherWeight(profile))
        console.log(await senitherWeight(profile))
        await interaction.deferReply();

            try {
                await interaction.editReply({content: "Success."})
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }