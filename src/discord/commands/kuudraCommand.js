const { default: axios } = require('axios');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const messages = require('../../../messages.json')
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const {getLatestProfile} = require('../../../API/functions/getLatestProfile');
const {addNotation,capitalize,addCommas} = require('../../contracts/helperFunctions')
const config = require('../../../config.json')

module.exports = {
    name: 'kuudra',
    description: 'Shows your kuudra data',
    options: [
        {
            name: 'name',
            description: 'minecraft username',
            type: 3,
            required: true
        },

        
      ],
    execute: async (interaction, client, InteractionCreate) => {
        let name = interaction.options.getString("name") || messages.defaultvalues.defaultname
        const data = await getLatestProfile(name)
        const uuid = await getUUID(name)
        const profilename = (data.profileData.cute_name)
        
        const funny = (data.profileData.members)

        console.log(funny)

        const embed = {
            title: `Kuudra Data For ${name} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: (`Party Finder Message: **text**\nParty Finder Requirement: **text**`),
            fields: [
                {
                    name: "Kuudra Tier 1",
                    value: "Times Completed: \`number\`\nHighest Wave: \`number\`",
                    inline: false
                },
                {
                    name: "Kuudra Tier 2",
                    value: "Times Completed: \`number\`\nHighest Wave: \`number\`",
                    inline: true
                },
                {
                    name: "Kuudra Tier 3",
                    value: "Times Completed: \`number\`\nHighest Wave: \`number\`",
                    inline: false
                },
                {
                    name: "Kuudra Tier 4",
                    value: "Times Completed: \`number\`\nHighest Wave: \`number\`",
                    inline: true
                },
                {
                    name: "Kuudra Tier 5",
                    value: "Times Completed: \`number\`\nHighest Wave: \`number\`",
                    inline: false
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };


            await interaction.reply({  embeds: [ embed ] })

    }
};;