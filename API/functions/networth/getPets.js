const { addNotation } = require("./../../../src/contracts/helperFunctions.js");
const config = require("../../../config.json");
const { getSkyStats } = require("../getSkystats.js");
const { default: axios } = require("axios");

const NETWORTH_TYPES = {
  PETS: "pets",
};

const PET_ITEMS = {
  LUCKY_CLOVER: "PET_ITEM_LUCKY_CLOVER",
  SPOOKY_CUPCAKE: "PET_ITEM_SPOOKY_CUPCAKE",
  TOY_JERRY: "PET_ITEM_TOY_JERRY",
  QUICK_CLAW: "PET_ITEM_QUICK_CLAW",
  EXP_SHARE: "PET_ITEM_EXP_SHARE",
  TIER_BOOST: "PET_ITEM_TIER_BOOST",
  BUBBLEGUM: "PET_ITEM_BUBBLEGUM",
  VAMPIRE_FANG: "PET_ITEM_VAMPIRE_FANG",
};

const PET_ITEM_EMOJIS = {
  [PET_ITEMS.LUCKY_CLOVER]: "<a:Lucky_Clover:1072396488346456175>",
  [PET_ITEMS.SPOOKY_CUPCAKE]: "<:Spooky_Cupcake:1072396596400095262>",
  [PET_ITEMS.TOY_JERRY]: "<:Jerry_3D_Glasses:1072396693494038559>",
  [PET_ITEMS.QUICK_CLAW]: "<:Quick_Claw:1072396796766199899>",
  [PET_ITEMS.EXP_SHARE]: "<a:Exp_Share:1072397058780168262>",
  [PET_ITEMS.TIER_BOOST]: "<a:Tier_Boost:1072397214212702288>",
  [PET_ITEMS.BUBBLEGUM]: "<a:Bubblegum:1072397319129006171>",
  [PET_ITEMS.VAMPIRE_FANG]: "<a:Vampire_Tooth:1072397421914736128>",
};

async function getPets(uuid2, profileid) {
  try {
    const { data } = await axios.get(`http://103.54.59.82:3000/v2/profile/${uuid2}/${profileid}?key=${config.api.skyStatsKey}`);

    const pets = data?.networth?.types?.[NETWORTH_TYPES.PETS];
    if (!pets) return "";

<<<<<<< Updated upstream
    const getPetsInfo = (itemIndex) => {
      const item = pets.items[itemIndex];
      if (!item) return { name: "", price: "", candyUsed: 0, petItem: "" };
=======
      function getPetInfo(index) {
        const { name: petName, price: petsPrice, candyUsed: petCandy, heldItem: petItem} = networthRaw.data.networth.types.pets.items[index] || {};
        const petCandyEmoji = petCandy > 0 ? "<:carrot:1072129687427498012>" : "";
        const petItemEmoji = petItem ? startsWith(emojis[petItem]) || "" : "";
        const petPrice = addNotation("oneLetters", petsPrice) ;
        return `→ ${index === 0 ? (petName ?? "No Items Found") : petName || ""} ${petCandyEmoji} ${petItemEmoji} (**${petPrice}**)`;
      }
      
      const pet1 = getPetInfo(0);
      const pet2 = getPetInfo(1);
      const pet3 = getPetInfo(2);
      const pet4 = getPetInfo(3);
      const pet5 = getPetInfo(4);
>>>>>>> Stashed changes

      const candy = item.candyUsed > 0 ? "<:carrot:1072129687427498012>" : "";
      const petItem = PET_ITEM_EMOJIS[item.heldItem] || "";
      return { name: item.name, price: item.price, candyUsed: candy, petItem };
    };

    const petsInfo = [
      getPetsInfo(0),
      getPetsInfo(1),
      getPetsInfo(2),
      getPetsInfo(3),
      getPetsInfo(4),
    ];

    return `
      ${petsInfo.map(({ name, price, candyUsed, petItem }) => `
        **${name}**: ${price} ${candyUsed} ${petItem}
      `).join("\n")}
    `;
  } catch (error) {
    return "";
  }
}

module.exports = { getPets };
