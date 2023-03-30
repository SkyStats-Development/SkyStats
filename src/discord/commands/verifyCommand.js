const hypixel = require('../../contracts/API/HypixelRebornAPI')
const config = require ('../../../config.json')
const { EmbedBuilder } = require("discord.js")
const { writeAt } = require('../../contracts/helperFunctions')
const db = require('../../../API/functions/getDatabase');

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
    name: 'verify',
    description: 'Connect your Discord account to Minecraft',
    options: [{
      name: 'name',
      description: 'Minecraft Username',
      type: 3,
      required: true
    }],
  
    execute: async (interaction, client) => {
        const username = interaction.options.getString("name");
        try {
            hypixel.getPlayer(username).then(async player => {
                let found = false;
                player.socialMedia.forEach(media => {if (media.link === interaction.user.tag) {found = true}})
                if (found) {
                    await addLinkedAccounts(interaction.user.id, player.uuid);

                    const successfullyLinked = new EmbedBuilder()
                        .setColor(5763719)
                        .setAuthor({ name: 'Successfully linked!'})
                        .setDescription(`Your account has been successfully linked to \`${username}\``)
                        .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
                    await interaction.reply({ embeds: [successfullyLinked] });
                        
                } else {
                    const verificationTutorialEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setAuthor({ name: 'Link with Hypixel Social Media', iconURL: 'https://cdn.discordapp.com/avatars/486155512568741900/164084b936b4461fe9505398f7383a0e.png?size=4096' })
                        .setDescription(`**Instructions:** \n1) Use your Minecraft client to connect to Hypixel. \n2) Once connected, and while in the lobby, right click "My Profile" inmyour hotbar. It is option #2. \n3) Click "Social Media" - this button is to the left of the Redstone block (the Status button). \n4) Click "Discord" - it is the second last option. \n5) Paste your Discord username into chat and hit enter. For reference: \`${interaction.user.tag}\`\n6) You're done! Wait around 30 seconds and then try again.\n \n**Getting "The URL isn't valid!"?** \nHypixel has limitations on the characters supported in a Discord username. Try changing your Discord username temporarily to something without special characters, updating it in-game, and trying again.`)
                        .setThumbnail('https://thumbs.gfycat.com/DentalTemptingLeonberger-size_restricted.gif') 
                        .setTimestamp()
                        .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
                    await interaction.reply({ content: 'Your Minecraft\'s linked account does not match with the Discord.', embeds: [verificationTutorialEmbed] });
                }
    
            }).catch(error => {
                const errorEmbed = new EmbedBuilder()
                    .setColor(15548997)
                    .setAuthor({ name: 'An Error has occurred'})
                    .setDescription(`\`${error}\``)
                    .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
                interaction.reply({ embeds: [errorEmbed] });
            })  

        } catch(error) {
            const errorEmbed = new EmbedBuilder()
                .setColor(15548997)
                .setAuthor({ name: 'An Error has occurred'})
                .setDescription(error)
                .setFooter({ text: `made by /credits  | /help [command] for more information`, iconURL: 'https://i.imgur.com/hggczHP.png' });
            interaction.reply({ embeds: [errorEmbed] });
        }
    },
  };