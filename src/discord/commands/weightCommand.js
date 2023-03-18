const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, capitalize, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices, getItemNetworth} = require('skyhelper-networth');
const getWeight = require('../../../API/stats/weight');
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const wait = require('node:timers/promises').setTimeout;
const axios = require('axios');
const config = require(`../../../config.json`)
const { MongoClient } = require('mongodb');
const uri = config.database.uri;
const client = new MongoClient(uri, { useUnifiedTopology: true });
const dbName = 'discordLinkedDB';

client.connect();

async function getLinkedAccount(discordId) {
  const db = client.db(dbName);
  const collection = db.collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}


let prices;
    getPrices().then((data) => { 
        prices = data
    }
)

    setInterval(async () => {
    prices = await getPrices();
    }, 1000 * 60 * 5
); 

module.exports = {
    name: 'weight',
    description: 'Fetches your senither weight!',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false
        }
      ],
    
  
    execute: async (interaction, client) => {
        try{
        await interaction.deferReply();
        const minecraftUuid = await getLinkedAccount(interaction.user.id) || ``
        const name = interaction.options.getString("name") || minecraftUuid;
        const username = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.username;
          const uuid2 = (
            await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
          ).data.data.player.raw_id;
        const data = await getLatestProfile(name)
        name = data.profileData?.game_mode ? `♲ ${name}` : name
        const profileweight = await getWeight(data.profile, data.uuid) 
        const profilename = (data.profileData.cute_name)

        const embedplayer = {
            color: 0xffa600,
            title: `Weight For ${username} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: `\n`,
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            fields: [
                {
                    name: 'Senither Weight',
                    value: `${Math.round((profileweight.weight.senither.total) * 100) / 100}`,
                },
                {
                    name: '<:MasterMode:1059665473379246091> Dungeon Weight',
                    value: `${Math.round((profileweight.weight.senither.dungeons.total) * 100) / 100}`,
                    inline: true,
                },
                {
                    name: '<:sword:1060045450897539122> Skill Weight',
                    value: `${Math.round((profileweight.weight.senither.skills.alchemy.total + profileweight.weight.senither.skills.combat.total + profileweight.weight.senither.skills.enchanting.total + profileweight.weight.senither.skills.farming.total + profileweight.weight.senither.skills.fishing.total + profileweight.weight.senither.skills.foraging.total + profileweight.weight.senither.skills.mining.total + profileweight.weight.senither.skills.taming.total) * 100) / 100}`,
                    inline: true,
                },
                {
                    name: '<:Slayer:1060045486712696872> Slayer Weight',
                    value: `${Math.round((profileweight.weight.senither.slayer.total) * 100) / 100}`,
                    inline: true,
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`,
            },
        };

    
        await interaction.editReply({ embeds: [embedplayer] });
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
            description: `An error with validating the username provided has occured. Please try again later.\nIf the error persists, please contact the bot developer.\nIf your account is not linked, please link your account with \`/link\`.`,
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
    },
  };