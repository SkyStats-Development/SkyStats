const { default: axios } = require('axios');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const messages = require('../../../messages.json')
const {getLatestProfile} = require('../../../API/functions/getLatestProfile');
const {addNotation,capitalize,addCommas} = require('../../contracts/helperFunctions')
const config = require('../../../config.json');
const { toLower } = require('lodash');
const { getUUID } = require('../../contracts/API/PlayerDBAPI')
const wait = require('node:timers/promises').setTimeout;

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
        await interaction.deferReply();
		await wait(100);
        const name = interaction.options.getString("name") || messages.defaultvalues.defaultname
        const uuid = getUUID(name)
        const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${name}`)).data.profiles
        let currentProfile;
        for (var key of Object.keys(profileraw)) {if (profileraw[key].current) currentProfile = key;}
        const profilename = (profileraw[currentProfile].cute_name) || `ERROR404`
        const t1comp = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.none)   || `0`
        const t2comp = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.hot)    || `0`
        const t3comp = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.burning)    || `0`
        const t4comp = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.fiery)    || `0`
        const t5comp = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.infernal)    || `0`
        const t1wave = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.highest_wave_none)   || `0`
        const t2wave = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.highest_wave_hot)    || `0`
        const t3wave = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.highest_wave_burning)    || `0`
        const t4wave = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.highest_wave_fiery)    || `0`
        const t5wave = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_completed_tiers.highest_wave_infernal)    || `0`
        const pfmess = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_party_finder.group_builder.note) || `Paper`
        const pft = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_party_finder.group_builder.tier) || `basic`
        const pfreq = (profileraw[currentProfile].raw.nether_island_player_data.kuudra_party_finder.group_builder.combat_level_required) || `0`
        const embed = {
            color: FFA600,
            title: `Kuudra Data For ${name} On ${profilename}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: (`Party Finder Message: **${pfmess}**\nParty Finder Requirement: **${pfreq}**\nParty Finder Tier: **${toLower(pft)}**`),
            thumbnail: {
                url: `https://crafatar.com/renders/body/${uuid}`,
            },
            fields: [
                {
                    name: "Kuudra Tier 1",
                    value: `Times Completed: \`${t1comp}\`\nHighest Wave: \`${t1wave}\``,
                    inline: false
                },
                {
                    name: "Kuudra Tier 2",
                    value: `Times Completed: \`${t2comp}\`\nHighest Wave: \`${t2wave}\``,
                    inline: true
                },
                {
                    name: "Kuudra Tier 3",
                    value: `Times Completed: \`${t3comp}\`\nHighest Wave: \`${t3wave}\``,
                    inline: false
                },
                {
                    name: "Kuudra Tier 4",
                    value: `Times Completed: \`${t4comp}\`\nHighest Wave: \`${t4wave}\``,
                    inline: true
                },
                {
                    name: "Kuudra Tier 5",
                    value: `Times Completed: \`${t5comp}\`\nHighest Wave: \`${t5wave}\``,
                    inline: false
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };

            await interaction.editReply({  embeds: [ embed ] })

    }
};;