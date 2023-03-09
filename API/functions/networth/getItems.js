const { addNotation } = require("./../../../src/contracts/helperFunctions.js");
const config = require("../../../config.json");
const { getSkyStats } = require("../getSkyStats.js");
const { default: axios } = require("axios");

const RECOMBOBULATOR_3000 = "<:RECOMBOBULATOR_3000:1069185517511524362>";

async function getItems(uuid2, profileid) {
    const networthRaw = (
        await axios.get(
            `http://103.54.59.82:3000/v2/profile/${uuid2}/${profileid}?key=${config.api.skyStatsKey}`
        )
    ).data;

    const inventory = networthRaw.data.networth.types.inventory.total;
    const inventoryItems = networthRaw.data.networth.types.inventory.items;
    const equipment = networthRaw.data.networth.types.equipment.total;
    const equipmentItems = networthRaw.data.networth.types.equipment.items;
    const enderchest = networthRaw.data.networth.types.enderchest.total;
    const enderchestItems = networthRaw.data.networth.types.enderchest.items;
    const armor = networthRaw.data.networth.types.armor.total;
    const armorItems = networthRaw.data.networth.types.armor.items;
    const accessories = networthRaw.data.networth.types.accessories.total;
    const accessoritesItems = networthRaw.data.networth.types.accessories.items;
    const pv = networthRaw.data.networth.types.personal_vault.total;
    const personalvaltItems = networthRaw.data.networth.types.personal_vault.items;
    const storage = networthRaw.data.networth.types.storage.total;
    const storageItems = networthRaw.data.networth.types.storage.items;
    const wardrobe = networthRaw.data.networth.types.wardrobe.total;
    const wardrobeItems = networthRaw.data.networth.types.wardrobe.items;


    const createItemString = (item) => {
        if (!item) return '';
        
        const isRecombobulated = item.calculation.some((a) => a.id === 'RECOMBOBULATOR_3000');
        const price = addNotation('oneLetters', item.price) || 0; // use || instead of ??
        
        return `→ ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''} (**${price}**)`;
      }
      
      const invItems = inventoryItems.slice(0, 5).map(createItemString);
      const accItems = accessoritesItems.map(createItemString);
      const arItems = armorItems.map(createItemString);
      const ecItems = enderchestItems.map(createItemString);
      const eqItems = equipmentItems.map(createItemString);
      const pvItems = personalvaltItems.map(createItemString); // fix typo
      const storageitems = storageItems.map(createItemString);
      const wdItems = wardrobeItems.map(createItemString);
      
      const [inv1 = 'No items in inventory.', inv2 = '', inv3 = '', inv4 = '', inv5 = ''] = invItems;
      const [acc1 = 'No Accessories.', acc2 = '', acc3 = '', acc4 = '', acc5 = ''] = accItems;
      const [ar1 = 'No Armor.', ar2 = '', ar3 = '', ar4 = ''] = arItems;
      const [ec1 = 'No items in enderchest.', ec2 = '', ec3 = '', ec4 = ``, ec5 = ''] = ecItems;
      const [eq1 = 'No equipment.', eq2 = '', eq3 = '', eq4 = ''] = eqItems;
      const [pv1 = '', pv2 = '', pv3 = '', pv4 = ''] = pvItems;
      const [storage1 = 'No items in storage.', storage2 = '', storage3 = '', storage4 = '', storage5 = ''] = storageitems;
      const [wd1 = 'No items in wardrobe.', wd2 = '', wd3 = '', wd4 = '', wd5 = ''] = wdItems;




    return { inventory, inv1, inv2, inv3, inv4, inv5, equipment, eq1, eq2, eq3, eq4, armor, ar1, ar2, ar3, ar4, accessories, acc1, acc2, acc3, acc4, acc5, enderchest, ec1, ec2, ec3, ec4, ec5, pv, pv1, pv2, pv3, pv4, storage, storage1, storage2, storage3, storage4, storage5, wardrobe, wd1, wd2, wd3, wd4, wd5  };
}

module.exports = { getItems };