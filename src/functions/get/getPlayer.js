const db = require('../handle/handleDatabase');
const axios = require('axios');
const key = process.env.KEY;
const { handleError, handlePlayer } = require('../handle/handleError');
const { errorMessage } = require('../../Logger');

const cache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

async function getPlayer(id, name, flag) {
    const cacheKey = `${id}-${name}-${flag}`;
    const now = Date.now();

    // Check if the data is in the cache and not expired
    if (cache[cacheKey] && (now - cache[cacheKey].timestamp < CACHE_DURATION)) {
        return cache[cacheKey].data;
    }

    const collection = db.getDb().collection('linkedAccounts');
    let minecraftUuid = '';
    try {
        const result = await collection.findOne({ discordId: id });
        if (result) {
            minecraftUuid = result.minecraftUuid;
        } else if (!name || name === undefined) {
            throw new Error('No linked account found');
        }
    } catch (error) {
        const errorMessage = handlePlayer('unlinked');
        return errorMessage;
    }
    name = name || minecraftUuid;

    try {
        const {
            data: {
                data: { player },
            },
        } = await axios.get(`https://playerdb.co/api/player/minecraft/${name}`);
        const { username, raw_id: uuid2 } = player;
        const [playerRes, profileRes] = await Promise.all([
            axios.get(`https://api.hypixel.net/v2/player?key=${key}&uuid=${uuid2}`),
            axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${uuid2}`),
        ]);
        if (playerRes.status !== 200 || profileRes.status !== 200) {
            throw new Error(`Error getting player or profile data.`);
        }
        const playerData = playerRes?.data;
        const profileData = profileRes?.data?.profiles?.find((a) => a.selected);
        const profile = profileData?.members[uuid2];
        const first_join = profileData?.members[uuid2]?.profile?.first_join;
        const { cute_name: profilename, profile_id: profileid } = profileData;
        const profile_type = profileData?.game_mode || "normal";
        const bankBalance = profileData?.banking?.balance || null;
        let profile_members = [];
        if (flag === "PROFILE_ONLY" || flag === "CHECK_MEMBERS") {
            const memberIds = Object.keys(profileData.members);
            profile_members = await Promise.all(memberIds.map(async (memberId) => {
                const memberResponse = await axios.get(`https://playerdb.co/api/player/minecraft/${memberId}`);
                const { username, raw_id: uuid } = memberResponse.data.data.player;
                const memberProfile = profileData.members[memberId];
                const deleted = memberProfile.profile?.deletion_notice ? true : false;
                return { username, uuid, deleted };
            }));
        }

        const responseData = {
            uuid2,
            username,
            profilename,
            profileid,
            playerData,
            profileData,
            profile,
            first_join,
            profile_type,
            bankBalance,
            profileRes,
            ...(flag === "PROFILE_ONLY" || flag === "CHECK_MEMBERS" ? { profile_members } : {}),
        };

        cache[cacheKey] = {
            timestamp: now,
            data: responseData,
        };

        return responseData;
    } catch (error) {
        const errorMessage = handleError(error);
        return {
            error: errorMessage,
        };
    }
}

module.exports = { getPlayer };