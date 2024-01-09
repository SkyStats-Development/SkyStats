const config = require("../../../config.json");
const messages = config.messages.discord
const packageJson = require("../../../package.json");
const fs = require('fs')
const { releaseCreate } = require('..//events/releaseCreate');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'publish',
    description: 'Publishes a new release to the upstream',
    options: [
      {
        name: 'changelog',
        description: 'Changelog Value',
        type: 3,
        required: false
      },
      {
        name: 'version',
        description: `Version Change in format major.minor.patch.beta current version being ${packageJson.version}`,
        type: 3,
        required: false
      },
    ],
    execute: async (interaction, client) => {
    const oldVersion = packageJson.version;
      const guild = await client.guilds.fetch('1058272411247714425');
      const changelogValue = interaction.options.getString('changelog').replaceAll('\\n', '\n');
      const versionValue = interaction.options.getString('version');
      if (guild.members.cache.get(interaction.user.id)?.roles.cache.has(config.discord.developmentRole)) {

        
        const embed1 = {
          title: `🌹 An Example Has Arrived! 🌹`,
          description: `**VERSION CHANGED**\n ${packageJson.version} > ${versionValue}`,
          timestamp: new Date().toISOString(),
          fields: [
            {
              name: `ChangeLog`,
              value: `${changelogValue}`,
              inline: true,
            },
          ],
          footer: { text: `${messages.defaultbetter}`, iconURL: `${messages.icon}` },
        };
        const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Publish Changelog')
        .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
        .addComponents(cancel, confirm);



        
        interaction.reply({ embeds: [embed1], components: [row] });

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
          const response = await interaction.channel.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
          const confirmation = response;
          if (confirmation.customId === 'confirm') {
            await releaseCreate(oldVersion, versionValue, changelogValue)
            fs.readFile('package.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                  return;
                } 
                const packageData = JSON.parse(data);

                // Update the version and changelog values
                packageData.version = versionValue
                packageData.changelog = changelogValue
              
                // Convert the updated data back to JSON string
                const updatedData = JSON.stringify(packageData, null, 2);
              
                // Write the updated JSON back to the file
                fs.writeFile('package.json', updatedData, 'utf8', (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
              
                  console.log('JSON file updated successfully!');
                });
              });


            await confirmation.update({ content: 'Changelog Published to discord!', components: [] });
          } else if (confirmation.customId === 'cancel') {
            await confirmation.update({ content: 'Action cancelled', components: [] });
          }
        } catch (e) {
            console.log(e)
          await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }
      } else {
        const embed1 = {
            title: `🌹 Latest Changelog! 🌹`,
            description: `**Version:**\n ${oldVersion}`,
            timestamp: new Date().toISOString(),
            fields: [
              {
                name: `ChangeLog`,
                value: `${packageJson.changelog}`,
                inline: true,
              },
            ],
            footer: {text: `${messages.defaultbetter}`, iconURL: `${messages.icon}`},
          }
          interaction.reply({ embeds: [embed1] });
      }
    }
  };
  

