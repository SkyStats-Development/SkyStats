const { getFetchur } = require('../../../API/functions/getFecthur');


module.exports = {
    name: 'fetchur',
    description: 'Fetches the current fetchur item',

    execute: async (interaction, client, InteractionCreate) => {
        try {
        const fetchur = await getFetchur();
        const name = fetchur.name;
        const quantity = fetchur.quantity;
        const text = fetchur.text;
        const image = fetchur.image;
        const description = fetchur.description;

        const embed = {
            color: 0xffa600,
            title: `Todays Fetchur Item Is: ${text}`,
            description: `\`${quantity}\`x **${name}**\n\n${description}`,
            thumbnail: {
                url: image,
            },
        }
        interaction.reply({ embeds: [embed] });

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

