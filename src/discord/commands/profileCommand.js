const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getPlayer } = require('../../functions/get/getPlayer');
const { handleError } = require('../../functions/handle/handleError');
const { handleProfile } = require('../../functions/handle/handleProfile');
const { getNetworth } = require(`../../functions/get/getNetworth/getNetworth`);
const { profileEmbed } = require('./embeds/profileEmbed')
module.exports = {
    name: 'profile',
    integration_types: [0, 1],
    contexts: [0, 1, 2],
    description: 'Fetches your profile!',
    options: [
        {
            name: 'name',
            description: 'Minecraft Username',
            type: 3,
            required: false,
        },
    ],

    async execute(interaction) {
        await interaction.deferReply();
        const id = interaction.user.id;
        const { uuid2, username, profilename, profileid, first_join, profile, profile_members, profile_type, profileRes, error } =
            await getPlayer(id, interaction.options.getString('name'), 'PROFILE_ONLY');
        //console.log(await getPlayer(id, interaction.options.getString('name'), 'PROFILE_ONLY'));
        if (error) {
            console.log(error);
            const errorembed = error;
            await interaction.editReply({ embeds: [errorembed] });
        } else {
            try {
                const profile_data = await handleProfile(uuid2, profile, profileid, profileRes);
                console.log("START >>>>>>>>>>>>>>>>>")
                console.log(profile_data)
                const profile_embed = await profileEmbed(uuid2, username, profilename, profileid, first_join, profile_members, profile_type, profile_data);

                await interaction.editReply({ embeds: [profile_embed] })
            } catch (error) {
                const errorEmbed = handleError(error);
                await interaction.editReply({ embeds: [errorEmbed] });
            }
        }
    },
};