const { default: axios } = require('axios');
const messages = require('../../../messages.json')
const { toLower } = require('lodash');
const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}

module.exports = {
    name: 'kuudra',
    description: 'Shows your kuudra data',
    options: [
        {
            name: 'name',
            description: 'minecraft username',
            type: 3,
            required: false
        },

        
      ],
      execute: async (interaction) => {
        try{
        await interaction.deferReply();
        const minecraftUuid = await getLinkedAccount(interaction.user.id) || ``
        const name = interaction.options.getString("name") || minecraftUuid;
        const { data } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
        const username = data.data.player.username;
        const uuid2 = data.data.player.raw_id;
        const { profiles } = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid2}`)).data
        const currentProfile = Object.keys(profiles).find(key => profiles[key].current);
        const { cute_name, raw } = profiles[currentProfile];
        const { kuudra_completed_tiers } = raw.nether_island_player_data;
        const tiers = ["none", "hot", "burning", "fiery", "infernal"];
        const waves = ["highest_wave_none", "highest_wave_hot", "highest_wave_burning", "highest_wave_fiery", "highest_wave_infernal"];
        const t1comp = kuudra_completed_tiers[tiers[0]] ?? "0";
        const t2comp = kuudra_completed_tiers[tiers[1]] ?? "0";
        const t3comp = kuudra_completed_tiers[tiers[2]] ?? "0";
        const t4comp = kuudra_completed_tiers[tiers[3]] ?? "0";
        const t5comp = kuudra_completed_tiers[tiers[4]] ?? "0";
        const t1wave = kuudra_completed_tiers[waves[0]] ?? "0";
        const t2wave = kuudra_completed_tiers[waves[1]] ?? "0";
        const t3wave = kuudra_completed_tiers[waves[2]] ?? "0";
        const t4wave = kuudra_completed_tiers[waves[3]] ?? "0";
        const t5wave = kuudra_completed_tiers[waves[4]] ?? "0";
        const pfmess = raw.nether_island_player_data.kuudra_party_finder.group_builder.note ?? "Paper";
        const pft = raw.nether_island_player_data.kuudra_party_finder.group_builder.tier ?? "basic";
        const pfreq = raw.nether_island_player_data.kuudra_party_finder.group_builder.combat_level_required ?? "0";

        const embed = {
            color: 0xffa600,
            title: `Kuudra Data For ${username} On ${cute_name}`,
            URL: `https://sky.shiiyu.moe/stats/${name}`,
            description: (`Party Finder Message: **${pfmess}**\nParty Finder Requirement: **${pfreq}**\nParty Finder Tier: **${toLower(pft)}**`),
      thumbnail: {
                url: `https://api.mineatar.io/body/full/${name}`,
            },
            fields: [
                {
                    name: "<:kuudra_t1:1070821104727367761> Kuudra Tier 1",
                    value: `Times Completed: \`${t1comp}\`\nHighest Wave: \`${t1wave}\``,
                    inline: false
                },
                {
                    name: "<:kuudra_t2:1070821070497648660> Kuudra Tier 2",
                    value: `Times Completed: \`${t2comp}\`\nHighest Wave: \`${t2wave}\``,
                    inline: true
                },
                {
                    name: "<:kuudra_t3:1070821045088551003> Kuudra Tier 3",
                    value: `Times Completed: \`${t3comp}\`\nHighest Wave: \`${t3wave}\``,
                    inline: false
                },
                {
                    name: "<:kuudra_t4:1070821020296028181> Kuudra Tier 4",
                    value: `Times Completed: \`${t4comp}\`\nHighest Wave: \`${t4wave}\``,
                    inline: true
                },
                {
                    name: "<:kuudra_t5:1070820991330160761> Kuudra Tier 5",
                    value: `Times Completed: \`${t5comp}\`\nHighest Wave: \`${t5wave}\``,
                    inline: false
                },

            ],
            timestamp: new Date().toISOString(),
            footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
            };

            await interaction.editReply({  embeds: [ embed ] })

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