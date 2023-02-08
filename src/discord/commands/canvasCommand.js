const { AttachmentBuilder, Client, Events, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const config = require("../../../config.json");
const fs = require("fs");
const messages = require("../../../messages.json");
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');


module.exports = {
    name: "canvas",
    description: "smh idk",

    execute: async (interaction, client) => {
        try{
            const applyText = (canvas, text) => {
                const context = canvas.getContext('2d');
                let fontSize = 70;
            
                do {
                    context.font = `${fontSize -= 10}px sans-serif`;
                } while (context.measureText(text).width > canvas.width - 300);
            
                return context.font;
            };
            const canvas = createCanvas(700, 250);
            const context = canvas.getContext('2d');
            const members = interaction.guild.memberCount
            const channel = client.channels.cache.get(`1069940710473748570`);
            guild.member.join

    
            const background = await readFile('src/discord/commands/welcomme.png');
            const backgroundImage = new Image();
            backgroundImage.src = background;
            context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
            context.strokeStyle = '#0099ff';
            context.strokeRect(0, 0, canvas.width, canvas.height);
    
            context.font = '28px Avantgarde';
            context.fillStyle = '#FFFFFF';
            context.fillText(`SkyStats User #${members}`, canvas.width / 2.8, canvas.height / 3.5);
    
            context.font = applyText(canvas, `${interaction.member.displayName}!`);
            context.fillStyle = '#FFFFFF';
            context.fillText(`Welcome ${interaction.member.displayName}`, canvas.width / 2.8, canvas.height / 1.8);

            context.font = '28px Avantgarde';
            context.fillStyle = '#FFFFFF';
            context.fillText('To SkyStats Development!', canvas.width / 2.8, canvas.height / 1.3);
    
            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
    
            const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
            const avatar = new Image();
            avatar.src = Buffer.from(await body.arrayBuffer());
            context.drawImage(avatar, 25, 25, 200, 200);
    
            const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });
    
            channel.send ({ files: [attachment] });
            await interaction.reply({content: "zzz", ephemeral: false})


    
}   catch (error) {

        console.log(error);
        const errorEmbed = new EmbedBuilder()
            .setTitle("Error")
            .setDescription(`An error has occured. Please try again later: ${error}`)
            .setColor("FFFFFF")
        await interaction.reply({ embeds: [errorEmbed] });

}
    }}


