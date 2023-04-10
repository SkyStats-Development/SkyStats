const { getLatestProfile } = require('../../API/functions/getLatestProfile');
const db = require('../../API/functions/getDatabase');
const axios = require('axios');
const messages = require(`../../messages.json`);
const config = require(`../../config.json`)


async function getPlayer(id, name) {
    const collection = db.getDb().collection('linkedAccounts');
    let minecraftUuid = '';
    try {
        const result = await collection.findOne({ discordId: id });
        if (result) {
            minecraftUuid = result.minecraftUuid;
        } else if (!name) {
            throw new Error('No linked account found');
        }
    } catch (error) {
        return {
            error: {
                color: 0xff0000,
                title: `Error`,
                description: 'You do not currently have an account verified with SkyStats, please verify your Minecraft account with `/verify`.',
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
            }
        };
    }

    name = name || minecraftUuid;



    try {
        const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
        const { username, raw_id: uuid2 } = player;
        const [ playerRes, profileRes ] = await Promise.all([
          axios.get(`https://api.hypixel.net/player?key=${config.api.hypixelAPIkey}&uuid=${uuid2}`),
          axios.get(`https://api.hypixel.net/skyblock/profiles?key=${config.api.hypixelAPIkey}&uuid=${uuid2}`)
        ]);
        if (playerRes.status !== 200 || profileRes.status !== 200) {
          throw new Error(`Error getting player or profile data.`);
        }
        const playerData = playerRes.data;
        const profileData = profileRes.data.profiles.find((a) => a.selected);
        const profile = profileData.members[uuid2];
        const { cute_name: profilename, profile_id: profileid } = profileData;
        return { uuid2, username, profilename, profileid, playerData, profileData, profile };
        
    } catch (error) {
        console.log(error);
        return {
            error: {
                color: 0xff0000,
                title: `Error`,
                description: 'An error occurred while retrieving player data. Please check your input and try again later.',
                timestamp: new Date().toISOString(),
                footer: {
                    text: `${messages.footer.default}`,
                    iconURL: `${messages.footer.icon}`,
                },
            }
        };
        
    }
}


module.exports = { getPlayer };