const config = require("../../../config.json");
const { handleError } = require("../../functions/handle/handleError");
const messages = config.messages.discord

module.exports = {
    name: 'testing',
    description: 'Shows a players weight',
    options: [
        {
            name: "notes",
            description: "meow",
            type: 3,
            required: false,
        },
    ],
    execute: async (interaction, client, InteractionCreate) => {
        await interaction.deferReply();
            try {
                await interaction.editReply({ content: `dont test me :anger:` })
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }