const config = require("../../../config.json");
const { handleError } = require("../../functions/handle/handleError");
const { farmingWeight } = require("../../functions/get/getWeight")
const { farmingWeight_Embed } = require('./embeds/weightEmbed')
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
        const { uuid2, username, profilename, profileid, error } = await getPlayer(
          id,
          interaction.options.getString("name")
        );
        const farming_weight_embed = await farmingWeight_Embed(uuid2, username, profilename)
        await interaction.deferReply();
            try {
                await interaction.editReply({   embeds: [farming_weight_embed ]   })
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }