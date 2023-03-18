/*

#######################
#  DEPRICATED #########
#  #### SEE ###########
#  hypixelCommand.js ##
#######################






const {
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js')
const ms = require('ms');
const {
    getLatestProfile
} = require('../../../API/functions/getLatestProfile');
const {
    addNotation,
    capitalize,
    addCommas
} = require('../../contracts/helperFunctions')
const {
    getNetworth,
    getPrices,
    getItemNetworth
} = require('skyhelper-networth');
const hypixel = require('../../contracts/API/HypixelRebornAPI')
const config = require('../../../config.json');
const {
    trimEnd,
    lowerCase
} = require('lodash');
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const axios = require('axios');


module.exports = {
	name: 'player',
	description: 'Fetches Hypixel Data',
	options: [{
		name: 'name',
		description: 'Minecraft Username',
		type: 3,
		required: false
    }],
	execute: async (interaction, client) => {
		try {
        const linked = require('../../../data/discordLinked.json')
        const uuid = linked?.[interaction?.user?.id]?.data[0]
        let name = interaction.options.getString("name") || uuid
        const username = (await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}/`)).data.name || name
		const rank = (await hypixel.getPlayer(name)).rank
		const guild = (await hypixel.getPlayer(name)).guild || `? ? ?`
		const mcversion = (await hypixel.getPlayer(name)).mcVersion || `1.8x`
		const status = (await hypixel.getPlayer(name)).isOnline
		const level = (await hypixel.getPlayer(name)).level
		const expall = (await hypixel.getPlayer(name)).totalExperience
		const karma = (await hypixel.getPlayer(name)).karma
		const nickname = (await hypixel.getPlayer(name)).nickname
		const lang = (await hypixel.getPlayer(name)).userLanguage
		const expofall = addCommas(expall)
		const language = lowerCase(lang)
		const lanng = capitalize(language)
		const karmadata = addCommas(karma)
		const embeded = {
			color: 0xffa600,
			title: `Showing Hypixel Stats For ${username}`,
			description: (`\n`),
			thumbnail: {
				url: `https://api.mineatar.io/body/full/${name}`,
			},
			fields: [{
					name: 'Rank',
					value: `${rank}`,
					inline: true,
                },
				{
					name: 'Guild',
					value: `${guild}`,
					inline: true,
                },
				{
					name: 'Online Status',
					value: `${status}`,
					inline: true,
                },
				{
					name: 'Level',
					value: `${level}`,
                },
				{
					name: 'Total Experience',
					value: `${expofall}`,
					inline: true,
                },
				{
					name: `Total Karma`,
					value: `${karmadata}`,
					inline: true,
                },
				{
					name: 'Mc Version',
					value: `${mcversion}`,
                },
				{
					name: 'Nickname',
					value: `${nickname}`,
                },
				{
					name: 'Language',
					value: `${lanng}`,
                },
            ],
			timestamp: new Date().toISOString(),
			footer: {
				text: `${messages.footer.default}`,
				iconURL: `${messages.footer.icon}`,
			},
		};
		await interaction.reply({
			embeds: [embeded]
		})
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

*/