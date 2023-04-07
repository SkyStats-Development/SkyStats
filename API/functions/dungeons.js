//fuck this shit
const { getDungeons } = require(`../../API/functions/getDungeons.js`)
const messages = require(`../../messages.json`)
const emoji = require(`../../API/utils/emoji`)

const emojis = emoji.emoji().emojis
const EMOTE = emojis.dungeons.dungeons

async function dungeons(uuid2, username, profilename, profileid) {

const dungeons = await getDungeons(uuid2)

    const dungeonEmbed = {
        color: 0xffa600,
        title: `${username}'s Catacombs Stats On ${profilename}`,
        URL: `https://sky.shiiyu.moe/stats/${uuid2}`,
        description: (`${EMOTE.DUNGEON_SKULL} Catacombs Level: **${dungeons.catalvl}**\n${EMOTE.CLASS_AVERAGE} Class Level: **${dungeons.classavrg}**\n${EMOTE.SECRET} Secrets found: **${dungeons.secrets}**`),
        thumbnail: {
            url: `https://api.mineatar.io/body/full/${uuid2}`,
        },
        timestamp: new Date().toISOString(),
        fields: [
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: ``,
                value: ``,
                inline: true,
            }
        ],
        footer: {text: `${messages.footer.defaultbetter}`, iconURL: `${messages.footer.icon}`},
        };



    return {
        embeds: {
            dungeon: dungeonEmbed,
  //          master: masterEmbed,
    //        collection: collectionEmbed,
   //         class: classEmbed
        }
    }
}


module.exports = {dungeons}