const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getPlayer } = require("../../functions/get/getPlayer");
const { networthEmbed } = require("./embeds/networthEmbed.js");
const { handleError } = require("../../functions/handle/handleError");


module.exports = {
  name: "networth",
  description: "Fetches your networth!",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: false,
    },
  ],

  async execute(interaction) {
    await interaction.deferReply();
    const id = interaction.user.id;
    const { uuid2, username, profilename, profileid, error } = await getPlayer(
      id,
      interaction.options.getString("name")
    );
    if (error) {
      console.log(error);
      const errorembed = {
        color: 0xff0000,
        title: `Error`,
        description: `Data: ` + error.description,
        timestamp: new Date().toISOString(),
      };
      await interaction.editReply({ embeds: [errorembed] });
    } else {
      try {
        const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('selectmenu')
        .setPlaceholder('Select A field...')
        .addOptions([
            {
                label: 'Wardrobe',
                value: 'id_armor',
                // wardrobe_embed
            },
            {
                label: 'Inventory',
                value: 'id_inventory',
                // inventory_embed
            },
          {
            label: `Ender Chest`,
            value: `id_ender_chest`,
            // enderchest_embed
          },
          {
            label: `Storage`,
            value: `id_storage`,
            // storage_embed
          },
          {
            label: `Museum`,
            value: `id_museum`,
            // museum_embed
          },
          {
            label: "Pets",
            value: "id_pet_menu",
            // pet_embed
          },
          {
            label: "Accessory Bag",
            value: "id_talisman_bag",
            //talisman_bag_embed
            
          }
        ]);
        const row1 = new ActionRowBuilder().addComponents(selectMenu);
        function networthEmbeds(uuid, profileId, username, profileName) {
          const embedData = {
              "totals_embed": "Totals",
              "wardrobe_embed": "Wardrobe",
              "inventory_embed": "Inventory",
              "enderchest_embed": "Enderchest",
              "storage_embed": "Storage",
              "pet_embed": "Pet",
              "talisman_bag_embed": "Talisman Bag",
              "museum_embed": "Museum"
          };
          const embedPromises = [];
          for (const [key, value] of Object.entries(embedData)) {
              embedPromises.push(networthEmbed(key, uuid, profileId, username, profileName, value));
          }
          const embeds = Promise.all(embedPromises);
          return embeds;
      }
      const [totals_embed, wardrobe_embed, inventory_embed, enderchest_embed, storage_embed, pet_embed, talisman_bag_embed, museum_embed] = await networthEmbeds(uuid2, profileid, username, profilename);


        await interaction.editReply({ embeds: [totals_embed], components: [row1] });

        client.on('interactionCreate', async (interaction) => {
          if (!interaction.isStringSelectMenu()) return;
  
          // Check if the select menu is for this command
          if (interaction.customId !== 'selectmenu') return;
  
          // Check if the user who interacted with the select menu is the one who used the command
          if (interaction.user.id !== interaction.message.interaction.user.id) {
              await interaction.reply({ content: 'You can\'t use this select menu.', ephemeral: true });
              return;
          }
  
          // Delete the select menu after 1 minute
          setTimeout(async () => {
              const filter = (i) => i.customId === 'selectmenu';
              const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
              collector.on('collect', async (i) => {
                  await i.update({ components: [] });
              });
          }, 60000);

          // Return the selected option
          if (interaction.values[0] === 'id_armor') {
            await interaction.reply({ embeds: [wardrobe_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_inventory') {
            await interaction.reply({ embeds: [inventory_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_ender_chest') {
            await interaction.reply({ embeds: [enderchest_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_storage') {
            await interaction.reply({ embeds: [storage_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_museum') {
            await interaction.reply({ embeds: [museum_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_pet_menu') {
            await interaction.reply({ embeds: [pet_embed], ephemeral: true });
        } else if (interaction.values[0] === 'id_talisman_bag') {
            await interaction.reply({ embeds: [talisman_bag_embed], ephemeral: true });
        }
      });

      } catch (error) {
        const errorEmbed = handleError(error);
        await interaction.editReply({ embeds: [errorEmbed] });
      }
    }
  },
};
