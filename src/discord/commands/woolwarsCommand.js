const config = require('../../../config.json')
const axios = require('axios')
const { toFixed } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const {getWoolWarsStar } = require(`../../../API/SkyStats-apis/API/skystats/getWWStar`)
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}
const key = process.env.KEY;

module.exports = {
    name: 'woolwars',
    description: 'Gets WoolWars Data',
    options: [
        {
            name: 'player',
            description: 'Minecraft Username',
            type: 3,
            required: true
        },  
      ],

    execute: async (interaction, client, InteractionCreate) => {
        try {
        let name = interaction.options.getString('player')
        const uuid = await getUUID(player)
        const woolWars = (await axios.get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`)).data.player.stats.WoolGames
        const level = getWoolWarsStar(woolWars.progression.experience)
        const kdrw = toFixed(woolWars.wool_wars.stats.kills) || `no kills GG`
        const deathss = toFixed(woolWars.wool_wars.stats.deaths) || `no deaths GG`

        const embed = {
            color: 0xffa600,
            title: `WoolWars Stats For ${name}`,
            description: (`\n`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            fields: [
            {
                name: 'Level',
                value: `[${toFixed(level, 0)}✫]`,
            },
            {
                name: `Wins`,
                value: `${woolWars.wool_wars.stats.wins}`,
            },
            {
                name: `Win - Loss Ratio`,
                value: `${toFixed(woolWars.wool_wars.stats.wins/woolWars.wool_wars.stats.games_played, 2)}`,
            },
            {
                name: `Kills`,
                value: `${kdrw}`,
            },
            {
                name: `Deaths`,
                value: `${deathss}`,
            },
            {
                name: `Blocks Broken`,
                value: `${woolWars.wool_wars.stats.blocks_broken}`,
            },
            {
                name: `Blocks Placed`,
                value: `${woolWars.wool_wars.stats.wool_placed}`,
            },
        ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.defaultbetter}` , iconURL: `${messages.footer.icon}`,
            },
        };
 
            await interaction.reply({ embeds:[embed] })

        } catch (error) {
            if (error instanceof TypeError && error.message.includes("Cannot read properties of undefined (reading 'cute_name')")) {
              console.error("Error: cute_name is undefined");
              const errorembed = {
                color: 0xff0000,
                title: `Error`,
                description: `An error with the hypixel api has occured. Please try again later.\nIf the error persists, please contact the bot developer.`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
              }
              await interaction.editReply({ embeds: [errorembed] });
            } else if (error instanceof AxiosError) {
              console.error(`Error: ${error.message}`);
              console.log(error.response.data);
              const errorembed2 = {
                color: 0xff0000,
                title: `Error`,
                description: `An error with validating the username provided has occured. Please try again later.\nIf the error persists, please contact the bot developer.\nIf your account is not linked, please link your account with \`/verify\`.`,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
              }
              await interaction.editReply({ embeds: [errorembed2] });
            } else if (error instanceof Error) {
              if (error.stack) {
                const matches = error.stack.match(/.*:(\d+):\d+\)/);
                const line = matches ? matches[1] : "unknown";
                console.error(`Error on line ${line}: ${error.message}`);
                console.log(error.stack)
                console.log(error)
                const errorembed2m = {
                  color: 0xff0000,
                  title: `Error`,
                  description: `An error has occurred. Please try again later.\nIf the error persists, please contact the bot developer.\n\nError: ${error.message}\nLine: ${line}`,
                  timestamp: new Date().toISOString(),
                  footer: {
                      text: `${messages.footer.default}`,
                      iconURL: `${messages.footer.icon}`,
                  },
                }
                await interaction.editReply({ embeds: [errorembed2m] });
              } else {
                console.error(`Error: ${error.message}`);
                await interaction.editReply({ content: `Error: ${error.message}` })
              }
            } else {
              console.error(`Error: ${error}`);
              await interaction.editReply({ content: `Oops! an unexpected error has happened!` })
            }
          }

    }
};;
