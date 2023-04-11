const { isUuid } = require('../utils/uuid');
const config = require('../../config.json');
const { parseHypixel } = require('../utils/hypixel');
const axios = require('axios');
const { getUUID } = require('../../src/contracts/API/PlayerDBAPI');
const key = process.env.KEY;
async function getLatestProfile(uuid) {
    try {
        if (!isUuid(uuid)) {
            try {
                uuid = await getUUID(uuid);
            } catch (error) {
                return error.response.data
            }
        }

        const [ playerRes, profileRes ] = await Promise.all([
            axios.get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid}`),
            axios.get(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`)
        ]);

        const player = parseHypixel(playerRes, uuid);

        if (!profileRes.data.profiles)  return ({ status: 404, reason: `Found no SkyBlock profiles for a user with a UUID of '${uuid}'.` });
        
        const profileData = profileRes.data.profiles.find((a) => a.selected);
        const profile = profileData.members[uuid];

        return { profile: profile, profileData: profileData, playerRes: playerRes.data, player: player, uuid: uuid }
    }
    catch (error) {
        return ({ status: 404, reason: error });
    }
}

module.exports = { getLatestProfile }
