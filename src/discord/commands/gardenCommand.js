const { addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const wait = require('node:timers/promises').setTimeout;
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
      const start = new Date().getTime();
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
      title: `Minecraft Warp`,
      description: `<a:loading:1099498139855098018> Attempting to warp **${username}**...`,
      timestamp: new Date().toISOString(),
      footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
    }
    const end = new Date().getTime();
    const time = (end - start) / 1000;
    const ree = {
      title: `Minecraft Warp`,
      thumbnail: {
        url: `https://api.mineatar.io/body/full/${uuid2}`,
    },
      description: `Successfully warped **${username}** and left the party!\n Time taken: **${addCommas(time)}**`,
      timestamp: new Date().toISOString(),
      footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
    }
  const embed = await interaction.reply({embeds: [daddy], ephemeral: false})
  await wait(6000);
await  embed.edit({embeds: [ree], ephemeral: false})
 // await interaction.editReply({embeds: [ree], ephemeral: false})

} catch (error) {
  const errorEmbed = handleError(error);
  await interaction.editReply({ embeds: [errorEmbed] });
}}
    }
}


