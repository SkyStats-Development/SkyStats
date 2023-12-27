const config = require("../../../config.json");
const { getPlayer } = require("../../functions/get/getPlayer");
const { handleError } = require("../../functions/handle/handleError");
const messages = config.messages.discord
const { networthEmbed } = require("./embeds/networthEmbed.js")

module.exports = {
    name: 'weight',
    description: 'Shows a players weight',
    options: [
        {
            name: "name",
            description: "Minecraft Username",
            type: 3,
            required: false,
        },
    ],
    execute: async (interaction, client, InteractionCreate) => {
        await interaction.deferReply();
        const id = interaction.user.id;
        const { uuid2, username, profilename, profileid, error } = await getPlayer(id,interaction.options.getString("name"));
        if (error) {
            console.log(error);
            const errorembed = {
                color: 0xffa600,
                title: `Error`,
                description: `Data: ` + error.description,
                timestamp: new Date().toISOString(),
            };
            await interaction.editReply({ embeds: [errorembed] });
        } else {
            try {
                const embed = networthEmbed(uuid2, profileid);
                await interaction.editReply({  embeds: [ embed ] })
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    }
};;