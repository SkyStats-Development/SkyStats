const axios = require('axios');
const key = process.env.KEY;
// ! no database connection player data, this requires a player name.
async function getPlayer2(name) {
    try {
        const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
        const { username, raw_id: uuid2 } = player;
        const [ playerRes, profileRes ] = await Promise.all([
          axios.get(`https://api.hypixel.net/player?key=${key}&uuid=${uuid2}`),
          axios.get(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid2}`)
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
        return {
            error: `error`
        };
    }
}
module.exports = { getPlayer2 };