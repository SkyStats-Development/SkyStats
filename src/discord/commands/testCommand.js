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
            
            const embed1 = {
                title: `More testing\nLol\nLol`,
                description: `lol ` ,
                timestamp: new Date().toISOString(),
            };

            const select = new StringSelectMenuBuilder()
            .setCustomId('starter')
            .setPlaceholder('Make a selection!')
            .addOptions(
              new StringSelectMenuOptionBuilder()
                .setLabel('Bulbasaur')
                .setDescription('The dual-type Grass/Poison Seed Pokémon.')
                .setValue('bulbasaur'),
              new StringSelectMenuOptionBuilder()
                .setLabel('Charmander')
                .setDescription('The Fire-type Lizard Pokémon.')
                .setValue('charmander'),
              new StringSelectMenuOptionBuilder()
                .setLabel('Squirtle')
                .setDescription('The Water-type Tiny Turtle Pokémon.')
                .setValue('squirtle'),
            );
      
          const row = new ActionRowBuilder()
            .addComponents(select);
      
            await interaction.editReply({  embeds: [ embed1 ], components: [row] })
          } catch (error) {
            const errorEmbed = handleError(error);
            await interaction.editReply({ embeds: [errorEmbed] });
          }}
      },
  };
  