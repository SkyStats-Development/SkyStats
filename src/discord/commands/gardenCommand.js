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
const { handleError } = require('../../../API/functions/getError');



module.exports = {
    name: 'garden',
    description: 'Gets garden data on a player',
    options: [
        {
            name: 'name',
            description: 'mc username',
            type: 3,
            required: false
        },

        
    ],
    execute: async (interaction, client, InteractionCreate) => {
const id = interaction.user.id;
const { uuid2, username, profilename, profileid, error } = await getPlayer(id, interaction.options.getString('name'));
if (error) {
    const errorembed = {
        color: 0xff0000,
        title: error.message,
        description: error.description,
        timestamp: new Date().toISOString(),
    };
    await interaction.reply({ embeds: [errorembed] });
} else {
  try {
    const daddy = {
      title: `hi`,
      description: "mf what <:Dark_Oak_Minion_XI:944570482303336458>  <:rw3LQAL6gBrChAJG:1057029493820244059>"
    }
  await interaction.reply({content: `woah <:Dark_Oak_Minion_XI:944570482303336458>`, embeds: [daddy], ephemeral: false})

} catch (error) {
  const errorEmbed = handleError(error);
  await interaction.editReply({ embeds: [errorEmbed] });
}}
    }
}


