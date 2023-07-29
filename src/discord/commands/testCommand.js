const axios = require('axios');
const { getNetworth } = require('skyhelper-networth');
const { getSkyHelper } = require(`../../functions/get/getNetworth/getSkyHelper`)
const { getPets } = require('../../functions/get/getNetworth/getPets')
const { getItems, getAllItems } = require('../../functions/get/getNetworth/getItems')
const { getPlayer } = require('../../functions/get/getPlayer');
const { handleError } = require('../../functions/handle/handleError');


module.exports = {
  name: 'tast',
  description: 'Get the latest bazaar data for a specific item.',
  options: [
    {
      name: 'name',
      description: 'Minecraft Username',
      type: 3,
      required: true
    }
  ],



    async execute(interaction) {
        await interaction.deferReply();
        const id = interaction.user.id;
        const { uuid2, username, profilename, profileid, error } = await getPlayer(id, interaction.options.getString('name'));
        if (error) {
          console.log(error)
          const errorembed = {
              color: 0xff0000,
              title: `Error`,
              description: `Data: ` + error.description,
              timestamp: new Date().toISOString(),
          };
          await interaction.editReply({ embeds: [errorembed] });
      } else {
          try {
        const data = await getSkyHelper(profileid, uuid2)
        console.log(data)
            const embed1 = {

                title: `More testing`,
                description: `lol ` + data ,
                timestamp: new Date().toISOString(),
            };
            await interaction.editReply({  embeds: [ embed1 ] })
          } catch (error) {
            const errorEmbed = handleError(error);
            await interaction.editReply({ embeds: [errorEmbed] });
          }}
      },
  };
  