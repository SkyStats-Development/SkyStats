const axios = require('axios');
require("dotenv").config();
const apiKey = process.env.KEY;
const fs = require('fs');
const { addCommas, addNotation } = require("../../contracts/helperFunctions");
const { calculateTotalSenitherWeight } = require('../../functions/constants/senitherWeight')

async function farmingWeight(uuid) {
    const response = await axios.get(`https://api.elitebot.dev/Weight/${uuid}/selected`);
    function sanitizeCropWeight(obj) {
        let sanitized = '';
        let crops = [];
        for (let crop in obj.cropWeight) {
            let weight = obj.cropWeight[crop];
            weight = weight.toFixed(1);
            crops.push({ name: crop, weight: weight });
        }
        crops.sort((a, b) => b.weight - a.weight);
        for (let crop of crops) {
            sanitized += `→ ${crop.name}: **${addCommas(crop.weight)}**\n`;
        }
        return sanitized;
    }
    function sanitizeBonusWeight(obj) {
        let sanitized = '';

        for (let crop in obj.bonusWeight) {
            let weight = obj.bonusWeight[crop];
            weight = weight.toFixed(1);
            sanitized += `→ ${crop}: **${addCommas(weight)}**\n`;
        }

        return sanitized;
    }
    return {
        total_weight: addCommas(response.data.totalWeight.toFixed(1)),
        items: {
            crop_weight: sanitizeCropWeight(response.data),
            bonus_weight: sanitizeBonusWeight(response.data),
        }
    }
}

async function senitherWeight(profile) {
    const weight = await calculateTotalSenitherWeight(profile);
    function sanitizeData(obj) {
        let totalWeight = 0;
        let totalOverflow = 0;
        let skills = obj.skills;
        let slayers = obj.slayer;
        let dungeons = obj.dungeons;
        // Extract and sum skill, slayer, and dungeon weights and overflows
        for (let skill in skills) {
            totalWeight += skills[skill].weight;
            totalOverflow += skills[skill].weight_overflow;
        }

        for (let slayer in slayers) {
            totalWeight += slayers[slayer].weight;
            totalOverflow += slayers[slayer].weight_overflow;
        }

        for (let dungeon in dungeons) {
            totalWeight += dungeons[dungeon].weight;
            totalOverflow += dungeons[dungeon].weight_overflow;
        }

        // Sanitize data
        let sanitizedObj = {
            total: totalWeight + totalOverflow,
            totalWeight: totalWeight,
            totalOverflow: totalOverflow,
            skills: formatData(skills),
            slayers: formatData(slayers),
            dungeons: formatData(dungeons)
        };
        return sanitizedObj;
    }
    function formatData(data) {
        let formattedData = '';
        for (let key in data) {
            if (data[key].weight !== undefined && data[key].weight_overflow !== undefined) {
                let weight = data[key].weight.toFixed(1);
                let overflow = data[key].weight_overflow.toFixed(1);
                if (overflow !== '0.0') {
                    formattedData += `→ ${key}: **${addCommas(weight)}** (+${addCommas(overflow)})\n`;
                } else {
                    formattedData += `→ ${key}: **${addCommas(weight)}**\n`;
                }
            }
        }
        return formattedData;
    }
    const data = sanitizeData(weight)

    return data;
}

module.exports = { farmingWeight, senitherWeight }