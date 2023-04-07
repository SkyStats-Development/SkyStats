const { getPlayer } = require('../../../API/functions/getPlayer');
const { handleError } = require('../../../API/functions/getError');
const { padTo2Digits, convertMsToMinutesSeconds } = require('../../../API/utils/timeUtils');
const emoji = require(`../../../API/utils/emoji`)
const {getSkyStats} = require('../../../API/functions/getSkystats')
const getSkyblockCalendar = require(`../../../API/functions/getCalendar.js`)
const emojis = emoji.emoji().emojis
const { getDungeons } = require(`../../../API/functions/getDungeons.js`)
const {dungeons} = require (`../../../API/functions/dungeons`)





module.exports = {
    name: 'dungeon',
    description: 'rewrite WIP',
    options: [
        {
            name: 'name',
            description: 'mc username',
            type: 3,
            required: false
        },
    ],
    execute: async (interaction, client, InteractionCreate) => {
    await interaction.deferReply();
    const id = interaction.user.id;
    const { uuid2, username, profilename, profileid, error } = await getPlayer(id, interaction.options.getString('name'));
if (error) {
    const errorembed = error
    await interaction.editReply({ embeds: [errorembed] });
} else {
  try {

const embed = (await dungeons(uuid2, username, profilename, profileid)).embeds

    await interaction.editReply({embeds: [embed.dungeon]})
} catch (error) {
  const errorEmbed = handleError(error);
  await interaction.editReply({ embeds: [errorEmbed] });
}}
    }
}