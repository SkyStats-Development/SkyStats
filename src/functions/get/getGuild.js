const axios = require('axios');
const key = process.env.KEY;
const { handleError, handlePlayer } = require('../handle/handleError');

/**
 * Get the guild of a player by UUID from the Hypixel API
 * see https://api.hypixel.net/#tag/Player-Data/paths/~1v2~1guild/get
 */

async function getGuild(uuid) {
    if (!uuid) {
        return handleError("playerNotFound");
    }
    try {
        let guildData = await axios.get(`https://api.hypixel.net/v2/guild?key=${key}&player=${uuid}`);
        return {
            guildData: guildData.data,
        }
    } catch (error) {
        return handleError(error);
    }
}

module.exports = { getGuild };