const { addCommas } = require('../../contracts/helperFunctions')
const messages = require('../../../messages.json')
const { default: axios } = require('axios');
const { getPlayer } = require('../../../API/functions/getPlayer');

module.exports = {
    name: 'mining',
    description: 'Gets mining data on a player',
    options: [
        {
            name: 'name',
            description: 'mc username',
            type: 3,
            required: false
        },

        
      ],
    execute: async (interaction) => {
        try{
        await interaction.deferReply();
          const { uuid2, username, profilename, profileid, error } = await getPlayer(id, interaction.options.getString('name'));
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid2}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {
            if (profileraw[key].current) currentProfile = key;}
        const player = (profileraw[currentProfile])
        const hotmlvl = (player.data.mining.core.tier.level)
        const xpForNext = (player.data.mining.core.tier.xp) || `0`
        const xp = addCommas(xpForNext)
        const progress = (player.data.mining.core.tier.progress) || `100%`
        const hotmprogress = Math.round((progress) * 100) / 100
        const milestone = (player.data.mining.commissions.milestone)
        const completions = (player.data.mining.commissions.completions)
        const completionscomma = addCommas(completions)
        const pickaxe_ability = (player.data.mining.core.selected_pickaxe_ability)
        
        


        const chat = {
            color: 0xffa600,
            title: `${username}'s Mining Stats On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
            description: (``),
            thumbnail: {
                url: `https://api.mineatar.io/body/full/${uuid2}`,
            },
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "<:HeartOfTheMountain:1061814218598391818> HotM Level",
                    value: `${hotmlvl}`,
                    inline: true
                },
                {
                    name: `<:iron_nugget:1061814731905716254> HotM Exp`,
                    value: `${xp}`,
                    inline: true
                },
                {
                    name: `<:CrystalHollows:1061815055403974657> Progress Till Next Level`,
                    value: `${hotmprogress}%`, //broken !! !!
                    inline: true
                },
                {
                    name: "<:Iron_Pickaxe:1061814368196628561> Commission Milestone",
                    value: `${milestone}`,
                    inline: true
                },
                {
                    name: `<:ROYAL_PIGEON:1061815676282617896> Total Commissions`,
                    value: `${completionscomma}`,
                    inline: true
                },
                {
                    name: `<:diamond_pickaxe:1061817609177288824> Pickaxe Ability`,
                    value: `**${pickaxe_ability}**`, 
                    inline: true
                },
            ],
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };


            await interaction.editReply({  embeds: [ chat ] })

        }
     catch (error) {
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
}}