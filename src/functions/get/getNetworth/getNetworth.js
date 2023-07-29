const axios = require("axios");
const { getCookiePrice } = require("../getCookie");
const { addCommas, addNotation } = require("../../../contracts/helperFunctions");
const config = require("../../../../config.json");
const { getSkyHelper } = require("./getSkyHelper")

async function getNetworth(uuid, profileid) {

  const networthRaw = await getSkyHelper(profileid, uuid)

  const networth = networthRaw.networth.networth
    .toString()
    .split(".")[0];
  const formattedNetworth = addNotation("numbers", addCommas(networth));
  const shortNetworth = addNotation("oneLetters", networth);

  const soulbound = networthRaw.networth.unsoulboundNetworth
    .toString()
    .split(".")[0];
  const formattedSoulbound = addNotation("numbers", addCommas(soulbound));
  const shortUnsoulbound = addNotation("oneLetters", soulbound);

  const cookiePrice = await getCookiePrice();
  const cookies = Math.round(networth / cookiePrice);
  const value = Math.round(cookies * 2.27);
  const irlnw = addNotation("numbers", addCommas(value));
  const banku = networthRaw.networth.bank;
  const formattedBank = addNotation("oneLetters", banku);

  const purseu = networthRaw.networth.purse;

  const sack = networthRaw.networth.types.sacks.total;
  const essence = networthRaw.networth.types.essence.total;
  const sackValue = Math.round((sack + essence) * 100) / 100;

  const candyInventory = networthRaw.networth.types.candy_inventory.total;
  const potionBag = networthRaw.networth.types.potion_bag.total;
  const fishingBag = networthRaw.networth.types.fishing_bag.total;
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


module.exports = { getNetworth};