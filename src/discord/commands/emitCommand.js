const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../../../config.json')
const messages = require('../../../messages.json')
const db = require('../../../API/functions/getDatabase');
async function getLinkedAccount(discordId) {
  const collection = db.getDb().collection('linkedAccounts');
  const result = await collection.findOne({ discordId: discordId });
  return result ? result.minecraftUuid : null;
}

module.exports = {
    name: 'emit',
    description: 'Emits a message',
    options: [
        {
            name: 'message',
            description: 'message to send',
            type: 3,
            required: true
        },

        
      ],
      
    execute: async (interaction, client, InteractionCreate) => {
        const guild = await client.guilds.fetch('1058272411247714425');
        if (guild.members.cache.get(interaction.user.id)?.roles.cache.has(config.discord.developmentRole)) {
        let message = interaction.options.getString('message').replaceAll('\\n', '\n')
            await interaction.channel.send(`${message}`);
            await interaction.reply({content: "Success.", ephemeral: true})
        }
        else if (interaction.user.id === `790736254714642453`) {
            let message = interaction.options.getString('message').replaceAll('\\n', '\n')
            await interaction.channel.send(`${message}`);
            await interaction.reply({content: "Success.", ephemeral: true})
        }
         else {
            interaction.reply({ content: `${messages.commandfailed.serverless}`, ephemeral: true})
            }
    }
};;
