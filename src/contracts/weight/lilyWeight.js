const LilyWeight = require("lilyweight");
const config = require("../../../config.json");
const key = process.env.KEY;
const lily = new LilyWeight(key);

async function getLilyWeightUsername(username) {
  return await lily.getWeightFromUsername(username);
}

async function getLilyWeight(uuid) {
  return await lily.getWeight(uuid);
}

module.exports = { getLilyWeight, getLilyWeightUsername };
