const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { getLatestProfile } = require('../../../API/functions/getLatestProfile');
const { addNotation, addCommas } = require('../../contracts/helperFunctions')
const { getNetworth, getPrices} = require('skyhelper-networth');
const messages = require('../../../messages.json')
const { default: axios, AxiosError } = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const { getAuctionData } = require('../../../API/functions/networth/getAuctionData');



module.exports = {
    name: 'ah',
    description: 'mm',
    options: [
        {
            name: 'item',
            description: 'item to search for',
            type: 3,
            required: false
        },

        
    ],
    execute: async (interaction, client, InteractionCreate) => {
    try{
        await interaction.deferReply();
        const item = interaction.options.getString("item");
        const formattedAuctions = await getAuctionData();
        
        const matchingAuctions = formattedAuctions.filter((auction) => {
          // Convert item name to lowercase for case-insensitive comparison
          const formattedItemName = auction.name.toLowerCase();
          const formattedSearchTerm = item.toLowerCase();
        
          // Check if formatted item name starts with the search term
          return formattedItemName.startsWith(formattedSearchTerm);
        });
        
        // Do something with the matching auctions
        console.log(matchingAuctions);
        





    
    await interaction.editReply({ content: `${matchingAuctions} m` });
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
}