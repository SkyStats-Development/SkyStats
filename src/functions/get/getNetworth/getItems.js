const { addNotation } = require("../../../contracts/helperFunctions");
const config = require("../../../../config.json");
const { default: axios } = require("axios");
const { getSkyHelper } = require("./getSkyHelper")

const RECOMBOBULATOR_3000 = "<:RECOMBOBULATOR_3000:1069185517511524362>";

async function getAllItems(uuid, profileid) {

    const networthRaw = await getSkyHelper(profileid, uuid);
    const {
/*
personal_vault: { total: pv, items: personalvaltItems },
 equipment: { total: equipment, items: equipmentItems },
armor: { total: armor, items: armorItems },
*/
        inventory: { items: inventoryItems },
        enderchest: { items: enderchestItems },
        accessories: { items: accessoritesItems },
        storage: { items: storageItems },
        wardrobe: { items: wardrobeItems },
        museum: { items: museumItems },
    } = networthRaw.networth.types;


    const createItemString = (item) => {
        if (!item) return '';
        
        const isRecombobulated = item.calculation.some((a) => a.id === 'RECOMBOBULATOR_3000');
        const price = addNotation('oneLetters', item.price) || 0; 
        
        if (item.count >= 2) {
            return `→ \`${item.count}x\` ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''} (**${price}**)`;
        } else {
            return `→ ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''} (**${price}**)`;
        }
    }
    
    const createItemStrings = (items, maxItems = 20) => {
        if (!items || !Array.isArray(items)) {
            return "No items\nTry Checking your Hypixel API settings!";
        }
        const itemStrings = items.slice(0, maxItems).map(createItemString);
        
        if (items.length > maxItems) {
            itemStrings[maxItems - 1] += `\n→ **And \`${items.length - maxItems}\` more...**`;
        }
        
        return itemStrings.join('\n');
    };
    const allInv = createItemStrings(inventoryItems);
    const allAccessories = createItemStrings(accessoritesItems);
    console.log(wardrobeItems)
    const allEnderchest = createItemStrings(enderchestItems);
    const allStorage = createItemStrings(storageItems);
    const allWardrobe = createItemStrings(wardrobeItems);
    const allMuseum = createItemStrings(museumItems);
    console.log(allWardrobe)
//  const allArmor = createItemStrings(armorItems, 4);
//  const allEquipment = createItemStrings(equipmentItems, 4);
//  const allPersonalVault = createItemStrings(personalvaltItems, 4);




return { allInv, allMuseum, allAccessories, allWardrobe, allEnderchest, allStorage}

    }
/*
Did you know you could save 15% or more on car insurance? 
Try SkyStats Insurance today!
*/
    async function getItems(uuid, profileid) {
        const networthRaw = await getSkyHelper(profileid, uuid);
        const {
            inventory: { total: inventory, items: inventoryItems },
            equipment: { total: equipment, items: equipmentItems },
            enderchest: { total: enderchest, items: enderchestItems },
            armor: { total: armor, items: armorItems },
            accessories: { total: accessories, items: accessoritesItems },
            personal_vault: { total: pv, items: personalvaltItems },
            storage: { total: storage, items: storageItems },
            wardrobe: { total: wardrobe, items: wardrobeItems },
            museum: { total: museum, unsoulboundTotal: museumSpecial, items: museumItems },
        } = networthRaw.networth.types;

        const createItemString = (item) => {
            if (!item) return '';
    
            const isRecombobulated = item.calculation.some((a) => a.id === 'RECOMBOBULATOR_3000');
            const price = addNotation('oneLetters', item.price) || 0; 
    
            if (item.count >= 2) {
                return `→ \`${item.count}x\` ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''} (**${price}**)`;
            } else {
                return `→ ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''} (**${price}**)`;
            }
        }
    
        const createItemStrings = (items, maxItems = 4) => {
            if (!items || !Array.isArray(items)) {
                return "No items\nTry Checking your Hypixel API settings!";
            }
            const itemStrings = items.slice(0, maxItems).map(createItemString);
            
            if (items.length > maxItems) {
                itemStrings[maxItems - 1] += `\n→ **And \`${items.length - maxItems}\` more...**`;
            }
            
            return itemStrings.join('\n');
        };
    
        const inventory_items = createItemStrings(inventoryItems);
        const talisman_bag_items = createItemStrings(accessoritesItems);
        const armor_items = createItemStrings(armorItems, 4);
        const enderchest_items = createItemStrings(enderchestItems);
        const equipment_items = createItemStrings(equipmentItems, 4);
        const personal_vault_items = createItemStrings(personalvaltItems, 4);
        const storage_items = createItemStrings(storageItems);
        const wardrobe_items = createItemStrings(wardrobeItems);
        const museum_items = createItemStrings(museumItems);



        return { inventory, equipment, armor, accessories, enderchest, pv, storage, wardrobe, museum, museumSpecial, inventory_items, talisman_bag_items, armor_items, enderchest_items, equipment_items, personal_vault_items, storage_items, wardrobe_items, museum_items };
    }

module.exports = { getAllItems, getItems };