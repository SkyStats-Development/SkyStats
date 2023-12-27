const config = require ('../../../config.json')
const { EmbedBuilder } = require("discord.js")
const axios = require('axios')
const db = require('../../functions/handle/handleDatabase');
const messages = config.messages.discord
async function addLinkedAccounts(discordId, minecraftUuid) {
    try {
      const collection = db.getDb().collection('linkedAccounts');
      await collection.deleteMany({ discordId: discordId });
      await collection.insertOne({ discordId: discordId, minecraftUuid: minecraftUuid });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

module.exports = {
    name: 'verifyforce',
    description: 'Connect your Discord account to Minecraft',
    options: [
    {
      name: 'name',
      description: 'Minecraft Username',
      type: 3,
      required: true
    },
    {
        name: 'user',
        description: 'Discord user',
        type: 6,
        required: true
      }],
  
    execute: async (interaction, client) => {
const guild = await client.guilds.fetch('1058272411247714425');
  if (guild.members.cache.get(interaction.user.id)?.roles.cache.has(config.discord.developmentRole)) {
    const username = interaction.options.getString("name");
    const name = interaction.options.getUser("user")
    const uuid = (  await axios.get(`https://playerdb.co/api/player/minecraft/${username}`)).data.data.player.id
    try {
                await addLinkedAccounts(name.id, uuid);
                const successfullyLinked = new EmbedBuilder()
                    .setColor(5763719)
                    .setAuthor({ name: 'Successfully linked!'})
                    .setDescription(`Your account has been successfully linked to \`${username}\``)
                    .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
                await interaction.reply({ embeds: [successfullyLinked] });
    } catch(error) {
        const errorEmbed = new EmbedBuilder()
            .setColor(15548997)
            .setAuthor({ name: 'An Error has occurred'})
            .setDescription(error)
            .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
        interaction.reply({ embeds: [errorEmbed] });
    }
    }
    else {
        interaction.reply({ content: `You do not have permission from the developers to use this command.`, ephemeral: true})
    }
},
};
