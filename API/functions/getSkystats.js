const axios = require("axios");
const { getCookiePrice } = require("./getCookie");
const { addCommas, addNotation } = require("./../../src/contracts/helperFunctions.js");
const config = require("../../config.json");

async function getSkyStats(uuid2, profileid) {
  const networthRaw = (
    await axios.get(
      `http://103.54.59.82:3000/v2/profile/${uuid2}/${profileid}?key=${config.api.skyStatsKey}`
    )
  ).data;

  const networth = networthRaw.data.networth.networth
    .toString()
    .split(".")[0];
  const formattedNetworth = addNotation("numbers", addCommas(networth));
  const shortNetworth = addNotation("oneLetters", networth);

  const soulbound = networthRaw.data.networth.unsoulboundNetworth
    .toString()
    .split(".")[0];
  const formattedSoulbound = addNotation("numbers", addCommas(soulbound));
  const shortUnsoulbound = addNotation("oneLetters", soulbound);

  const cookiePrice = await getCookiePrice();
  const cookies = Math.round(networth / cookiePrice);
  const value = Math.round(cookies * 2.27);
  const irlnw = addNotation("numbers", addCommas(value));

  const banku = networthRaw.data.bank.toString().split(".")[0];
  const formattedBank = addNotation("oneLetters", banku);

  const purseu = networthRaw.data.purse;

  const sack = networthRaw.data.networth.types.sacks.total;
  const essence = networthRaw.data.networth.types.essence.total;
  const sackValue = Math.round((sack + essence) * 100) / 100;

  const candyInventory = networthRaw.data.networth.types.candy_inventory.total;
  const potionBag = networthRaw.data.networth.types.potion_bag.total;
  const fishingBag = networthRaw.data.networth.types.fishing_bag.total;
  const misc =
    Math.round((candyInventory + potionBag + fishingBag) * 100) / 100;

  return {
    networth: {
      total: networth,
      formatted: formattedNetworth,
      short: shortNetworth,
    },
    soulbound: {
      total: soulbound,
      formatted: formattedSoulbound,
      short: shortUnsoulbound,
    },
    irlnw,
    bank: {
      total: banku,
      formatted: formattedBank,
    },
    purse: purseu,
    sacks: {
      total: sackValue,
      essence,
      sacks: sack,
    },
    misc: {
      total: misc,
      candy_inventory: candyInventory,
      potion_bag: potionBag,
      fishing_bag: fishingBag,
    },
  };
}

module.exports = { getSkyStats };