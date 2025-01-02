const axios = require('axios');
const key = process.env.KEY;
const { handleError, handlePlayer } = require('../handle/handleError');


async function getGarden(profileid, uuid) {
    if (!profileid || !uuid) {
        return handleError("playerNotFound");
    }
    try {
        let gardenData = await axios.get(`https://api.hypixel.net/v2/skyblock/garden?key=${key}&profile=${profileid}`);
        return {
            gardenRes: gardenData.data,
            gardenData: gardenData.data.garden,
            gardenXP: gardenData.data.garden.garden_experience || 0,
        }
    } catch (error) {
        return handleError(error);
    }
}

module.exports = { getGarden };