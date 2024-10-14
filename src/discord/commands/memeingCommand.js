const config = require("../../../config.json");
const messages = config.messages.discord

module.exports = {
    name: 'factsbro',
    description: 'Report an issue with the bot and its commands',
    options: [
        {
            name: 'message',
            description: 'Message to send to developers! (Please be as detailed as possible)',
            type: 3,
            required: true
        },
        {
            name: 'command',
            description: 'Command that is having issues',
            type: 3,
            required: false
        },
        ],

        execute: async (interaction, client, InteractionCreate) => {
            const message = interaction.options.getString('message').replaceAll('\\n', '\n')
            const command = interaction.options.getString('command') || 'None'
            const channel = client.channels.cache.get(`1113961740863017020`);
            const user = interaction.user.id
            const guild = interaction.guild.name
            const messagelink = `https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}/${interaction.id}`
            const embed = {
                title: `Safe Mods`,
                description: (`Below is a list of mods considered safe by Ratter Scanner, alongside their official github repo and other links!!\n*Wish to see another popular mod on this list? Please let us know by opening a ticket with the buttons at the bottom of this message!*`),
                timestamp: new Date().toISOString(),
                fields: [
                    {
                      name: 'Skytils',
                      value: `Developers: Nick or smth idk bunch of catboys\n[Github Repo](https://github.com/SkyStats-Development) || [Discord](https://discord.gg/ytdpGZM5)`,
                      inline: true,
                    },
                    {
                        name: 'Not Enough Updates(NEU)',
                        value: 'Developers: People who hate me\n[Old Repo](https://github.com/SkyStats-Development) || [New Repo](https://github.com/SkyStats-Development) || [Discord](https://github.com/SkyStats-Development)',
                        inline: true,
                      },
                    {
                      name: '[PAID MOD] Oringo Client',
                      value: `Developers: Oringo, Daduduze\n[This is a paid mod - read our article on it](https://discord.gg/ytdpGZM5)`,
                      inline: true,
                    },
                  ],
                footer: {text: `Giggacum Projecter Link`},
                };
                
                await channel.send({ embeds: [ embed ] })
                await interaction.reply({content: "Your report has been shared with the developers, do not delete this message.", ephemeral: false})

            }
    };;
    