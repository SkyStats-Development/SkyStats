//EZ GG WP wxkydoodle @ W4ckydoodle 4ever!!!!
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const { addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const axios = require('axios')

const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}


module.exports = {
    name: 'bedwars',
    description: 'Gets BedWars Data',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false
        },  
      ],

    execute: async (interaction, client, InteractionCreate) => {
        try{
          const minecraftUuid = await getLinkedAccount(interaction.user.id) || ``
          const name = interaction.options.getString("name") || minecraftUuid;
        const username = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.username;
          const uuid2 = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.raw_id;
        const player = await hypixel.getPlayer(name)
        const embed = {
            color: 0xffa600,
            title: `Bedwars Stats For ${player}`,
            description: (`\n`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${username}`,
            },
            fields: [
            {
                name: 'Level',
                value: `[${player.stats.bedwars.level}✫]`,
            },
            {
                name: `Final Kills`,
                value: `${addCommas(player.stats.bedwars.finalKills)}`,
            },
            {
                name: `FKDR`,
                value: `${player.stats.bedwars.finalKDRatio}`,
            },
            {
                name: `Wins`,
                value: `${player.stats.bedwars.wins}`,
            },
            {
                name: `WLR`,
                value: `${player.stats.bedwars.WLRatio}`,
            },
            {
                name: `Beds Broken`,
                value: `${player.stats.bedwars.beds.broken}`,
            },
            {
                name: `BBLR`,
                value: `${player.stats.bedwars.beds.BLRatio}`,
            },
            {
                name: `:sparkles: Winstreak :sparkles:`,
                value: `${player.stats.bedwars.winstreak}`,
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