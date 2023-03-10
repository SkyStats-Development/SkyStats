const { addNotation } = require("./../../../src/contracts/helperFunctions.js");
const config = require("../../../config.json");
const { getSkyStats } = require("../getSkystats.js");
const { default: axios } = require("axios");

const emojis = {
  PET_ITEM_LUCKY_CLOVER: "<a:Lucky_Clover:1072396488346456175>",
  PET_ITEM_SPOOKY_CUPCAKE: "<:Spooky_Cupcake:1072396596400095262>",
  PET_ITEM_TOY_JERRY: "<:Jerry_3D_Glasses:1072396693494038559>",
  PET_ITEM_QUICK_CLAW: "<:Quick_Claw:1072396796766199899>",
  PET_ITEM_EXP_SHARE: "<a:Exp_Share:1072397058780168262>",
  PET_ITEM_TIER_BOOST: "<a:Tier_Boost:1072397214212702288>",
  PET_ITEM_BUBBLEGUM: "<a:Bubblegum:1072397319129006171>",
  PET_ITEM_VAMPIRE_FANG: "<:Vampire_Fang:1072397412590702663>",
  PET_ITEM_FLYING_PIG: "<:Flying_Pig:1072397499089817641>",
  PET_ITEM_SADDLE: "<a:Saddle:1072397586713030727>",
  CROCHET_TIGER_PLUSHIE: "<:Crochet_Tiger_Plushie:1072397677624569887>",
  REAPER_GEM: "<a:Reaper_Gem:1072397765809799288>",
  MINOS_RELIC: "<:Minos_Relic:1072397896139423824>",
  PET_ITEM_TEXTBOOK: "<a:Textbook:1072397987776569364>",
  ANTIQUE_REMEDIES: "<:Antique_Remedies:1072398120299790347>",
  WASHED_UP_SOUVENIR: "<:Washedup_Souvenir:1072398232589713448>",
  SERRATED_CLAWS: "<a:Serrated_Claws:1072398314126987264>",
  BIGGER_TEETH: "<:Bigger_Teeth:1072398401888587796>",
  DWARF_TURTLE_SHELMET: "<:Dwarf_Turtle_Shelmet:1072398560982745129>",
  ALL_SKILLS_SUPER_BOOST: "<a:All_Skills_Exp_SuperBoost:1072398671536209960>",
  GOLD_CLAWS: "<a:Gold_Claws:1072398736292069457>",
  REINFORCED_SCALES: "<a:Reinforced_Scales:1072398856114946098>",
  PET_ITEM_IRON_CLAWS: "<a:Iron_Claws:1072398962654449674>",
  PET_ITEM_SHARPENED_CLAWS: "<a:Sharpened_Claws:1072399034075058257>",
  PET_ITEM_BIG_TEETH: "<:Big_Teeth:1072399115620712468>",
  PET_ITEM_HARDEND_SCALES: "<a:Hardened_Scales:1072399214115557397>",
  PET_ITEM_FARMING_SKILL_BOOST: "<a:Farming_Exp_Boost:1072399332373975040>",
  PET_ITEM_FORAGING_SKILL_BOOST: "<a:Foraging_Exp_Boost:1072399408341200948>",
  PET_ITEM_COMBAT_SKILL_BOOST: "<a:Combat_Exp_Boost:1072399483146612746>",
  PET_ITEM_FISHING_SKILL_BOOST: "<a:Fishing_Exp_Boost:1072399580018245652>",
  PET_ITEM_ALL_SKILLS_BOOST: "<a:All_Skills_Exp_Boost:1072399662306316358>"
};


async function getPets(uuid2, profileid) {
  const networthRaw = (
      await axios.get(
          `http://103.54.59.82:3000/v2/profile/${uuid2}/${profileid}?key=${config.api.skyStatsKey}`
      )
  ).data;

  const petValue = networthRaw.data.networth.types.pets.total;

  function getPetInfo(index) {
    const { name: petName, price: petsPrice, candyUsed: petCandy, heldItem: petItem} = networthRaw.data.networth.types.pets.items[index] || {};
    const petCandyEmoji = uuid2 !== "833e1fe3ad644ae6aad9a30e04bd6417" && petCandy > 0 ? "<:carrot:1072129687427498012>" : "";
    const petItemEmoji = petItem ? (Object.keys(emojis).find(key => petItem.startsWith(key)) ? emojis[Object.keys(emojis).find(key => petItem.startsWith(key))] : "") : ""
    const petPrice = addNotation("oneLetters", petsPrice);
    const formatted_petPrice = `(**${petPrice}**)`
    
    return `${index === 0 && (petName === null || petName === undefined) ? "No pets :(" : `${petName !== null && petName !== undefined ? "→ " : ""}${petName ?? ""}`} ${petCandyEmoji} ${petItemEmoji} ${formatted_petPrice !== `(**undefined**)` ? formatted_petPrice : ""}`;

  }

  const pet1 = getPetInfo(0);
  const pet2 = getPetInfo(1);
  const pet3 = getPetInfo(2);
  const pet4 = getPetInfo(3);
  const pet5 = getPetInfo(4);

  return {petValue, pet1, pet2, pet3, pet4, pet5};
}

module.exports = { getPets };
