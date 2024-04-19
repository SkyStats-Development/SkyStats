const config = require("../../../config.json");
const { handleError } = require("../../functions/handle/handleError");
const { farmingWeight } = require("../../functions/get/getWeight")
const { farmingWeight_Embed, SenitherWeight_Embed } = require('./embeds/weightEmbed')
const { getPlayer } = require("../../functions/get/getPlayer")
const messages = config.messages.discord

module.exports = {
    name: 'testing',
    description: 'Shows a players weight',
    options: [
        {
            name: "player",
            description: "meow",
            type: 3,
            required: false,
        },
    ],
    execute: async (interaction, client, InteractionCreate) => {
        const id = interaction.user.id;
        const { uuid2, username, profilename, profileid, playerData, profileData, profile, error } = await getPlayer(
          id,
          interaction.options.getString("name")
        );

            try {
                await interaction.deferReply();
                const farming_weight_embed = await farmingWeight_Embed(uuid2, username, profilename)
                const senither_weight_embed = await SenitherWeight_Embed(profile, username, profilename, uuid2)
        
                await interaction.editReply({   embeds: [senither_weight_embed, farming_weight_embed ]   })
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }