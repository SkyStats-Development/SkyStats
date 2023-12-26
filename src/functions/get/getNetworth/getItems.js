const { addNotation } = require("../../../contracts/helperFunctions");
const config = require("../../../../config.json");
const { default: axios } = require("axios");
const { getSkyHelper } = require("./getSkyHelper")

const RECOMBOBULATOR_3000 = "<:RECOMBOBULATOR_3000:1069185517511524362>";

async function getAllItems(uuid, profileid) {

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
    

const createItemStrings = (items, maxItems = 20) => {
    const itemStrings = items.slice(0, maxItems).map(createItemString);
    if (items.length > maxItems) {
    itemStrings[maxItems - 1] += `\n→ **And \`${items.length - maxItems}\` more...**`;
    }
    return itemStrings;
};


    const invItems = createItemStrings(inventoryItems);
    const accItems = createItemStrings(accessoritesItems);
    const arItems = createItemStrings(armorItems, 4);
    const ecItems = createItemStrings(enderchestItems);
    const eqItems = createItemStrings(equipmentItems, 4);
    const pvItems = createItemStrings(personalvaltItems, 4);
    const storageitems = createItemStrings(storageItems);
    const wdItems = createItemStrings(wardrobeItems);
    const musItems = createItemStrings(museumItems);

    const [inv1 = 'No items in inventory.', inv2 = '', inv3 = '', inv4 = '', inv5 = ''] = invItems;
    const [acc1 = 'No accessories in accessory bag.', acc2 = '', acc3 = '', acc4 = '', acc5 = ''] = accItems;
    const [ar1 = 'No Armor.', ar2 = '', ar3 = '', ar4 = ''] = arItems;
    const [ec1 = 'No items in enderchest.', ec2 = '', ec3 = '', ec4 = '', ec5 = ''] = ecItems;
    const [eq1 = 'No equipment.', eq2 = '', eq3 = '', eq4 = ''] = eqItems;
    const [pv1 = 'No items in personal vault.', pv2 = 'This may be due to API issues.', pv3 = '', pv4 = ''] = pvItems;
    const [storage1 = 'No items in storage.', storage2 = '', storage3 = '', storage4 = '', storage5 = ''] = storageitems;
    const [wd1 = 'No items in wardrobe.', wd2 = '', wd3 = '', wd4 = '', wd5 = ''] = wdItems;
    const [mus1 = 'No Museum Items\nTry checking your API !', mus2 = '', mus3 = '', mus4 = '', mus5 = '' ] = musItems;

const [wd6 = '', wd7 = '', wd8 = '', wd9 = '', wd10 = '', wd11 = '', wd12 = '', wd13 = '', wd14 = '', wd15 = '', wd16 = '', wd17 = '', wd18 = '', wd19 = '', wd20 = ''] = wdItems;
const [storage6 = '', storage7 = '', storage8 = '', storage9 = '', storage10 = '', storage11 = '', storage12 = '', storage13 = '', storage14 = '', storage15 = '', storage16 = '', storage17 = '', storage18 = '', storage19 = '', storage20 = ''] = storageitems;
const [pv5 = '', pv6 = '', pv7 = '', pv8 = '', pv9 = '', pv10 = '', pv11 = '', pv12 = '', pv13 = '', pv14 = '', pv15 = '', pv16 = '', pv17 = '', pv18 = '', pv19 = '', pv20 = ''] = pvItems;
const [ec6 = '', ec7 = '', ec8 = '', ec9 = '', ec10 = '', ec11 = '', ec12 = '', ec13 = '', ec14 = '', ec15 = '', ec16 = '', ec17 = '', ec18 = '', ec19 = '', ec20 = ''] = ecItems;
const [inv6 = '', inv7 = '', inv8 = '', inv9 = '', inv10 = '', inv11 = '', inv12 = '', inv13 = '', inv14 = '', inv15 = '', inv16 = '', inv17 = '', inv18 = '', inv19 = '', inv20 = ''] = invItems;
const [acc6 = '', acc7 = '', acc8 = '', acc9 = '', acc10 = '', acc11 = '', acc12 = '', acc13 = '', acc14 = '', acc15 = '', acc16 = '', acc17 = '', acc18 = '', acc19 = '', acc20 = ''] = accItems;
const [mus6 = '', mus7 = '', mus8 = '', mus9 = '', mus10 = '', mus11 = '', mus12 = '', mus13 = '', mus14 = '', mus15 = '', mus16 = '', mus17 = '', mus18 = '', mus19 = '', mus20 = ''] = musItems;

const allInv = `${inv1}\n${inv2}\n${inv3}\n${inv4}\n${inv5}\n${inv6}\n${inv7}\n${inv8}\n${inv9}\n${inv10}\n${inv11}\n${inv12}\n${inv13}\n${inv14}\n${inv15}\n${inv16}\n${inv17}\n${inv18}\n${inv19}\n${inv20}`;
const allArmor = `${ar1}\n${ar2}\n${ar3}\n${ar4}`;
const allAccessories = `${acc1}\n${acc2}\n${acc3}\n${acc4}\n${acc5}\n${acc6}\n${acc7}\n${acc8}\n${acc9}\n${acc10}\n${acc11}\n${acc12}\n${acc13}\n${acc14}\n${acc15}\n${acc16}\n${acc17}\n${acc18}\n${acc19}\n${acc20}`;
const allWardrobe = `${wd1}\n${wd2}\n${wd3}\n${wd4}\n${wd5}\n${wd6}\n${wd7}\n${wd8}\n${wd9}\n${wd10}\n${wd11}\n${wd12}\n${wd13}\n${wd14}\n${wd15}\n${wd16}\n${wd17}\n${wd18}\n${wd19}\n${wd20}`;
const allEnderchest = `${ec1}\n${ec2}\n${ec3}\n${ec4}\n${ec5}\n${ec6}\n${ec7}\n${ec8}\n${ec9}\n${ec10}\n${ec11}\n${ec12}\n${ec13}\n${ec14}\n${ec15}\n${ec16}\n${ec17}\n${ec18}\n${ec19}\n${ec20}`;
const allPersonalVault = `${pv1}\n${pv2}\n${pv3}\n${pv4}\n${pv5}\n${pv6}\n${pv7}\n${pv8}\n${pv9}\n${pv10}\n${pv11}\n${pv12}\n${pv13}\n${pv14}\n${pv15}\n${pv16}\n${pv17}\n${pv18}\n${pv19}\n${pv20}`;
const allMuseum = `${mus1}\n${mus2}\n${mus3}\n${mus4}\n${mus5}\n${mus6}\n${mus7}\n${mus8}\n${mus9}\n${mus10}\n${mus11}\n${mus12}\n${mus13}\n${mus14}\n${mus15}\n${mus16}\n${mus17}\n${mus18}\n${mus19}\n${mus20}`;
const allStorage = `${storage1}\n${storage2}\n${storage3}\n${storage4}\n${storage5}\n${storage6}\n${storage7}\n${storage8}\n${storage9}\n${storage10}\n${storage11}\n${storage12}\n${storage13}\n${storage14}\n${storage15}\n${storage16}\n${storage17}\n${storage18}\n${storage19}\n${storage20}`;
const allEquipment = `${eq1}\n${eq2}\n${eq3}\n${eq4}`;
/*
Did you know you could save 15% or more on car insurance? 
Try SkyStats Insurance today!
*/
return { allInv, allMuseum, allArmor,allAccessories, allWardrobe, allEnderchest, allPersonalVault, allStorage, allEquipment}
    }

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
            const itemStrings = items.slice(0, maxItems).map(createItemString);
            if (items.length > maxItems) {
                itemStrings[maxItems - 1] += `\n→ **And \`${items.length - maxItems}\` more...**`;
            }
            return itemStrings;
        };
    
        const invItems = createItemStrings(inventoryItems);
        const accItems = createItemStrings(accessoritesItems);
        const arItems = createItemStrings(armorItems, 4);
        const ecItems = createItemStrings(enderchestItems);
        const eqItems = createItemStrings(equipmentItems, 4);
        const pvItems = createItemStrings(personalvaltItems, 4);
        const storageitems = createItemStrings(storageItems);
        const wdItems = createItemStrings(wardrobeItems);
        const musItems = createItemStrings(museumItems);
    
        const [inv1 = 'No items in inventory.', inv2 = '', inv3 = '', inv4 = '', inv5 = ''] = invItems;
        const [acc1 = 'No accessories in accessory bag.', acc2 = '', acc3 = '', acc4 = '', acc5 = ''] = accItems;
        const [ar1 = 'No Armor.', ar2 = '', ar3 = '', ar4 = ''] = arItems;
        const [ec1 = 'No items in enderchest.', ec2 = '', ec3 = '', ec4 = '', ec5 = ''] = ecItems;
        const [eq1 = 'No equipment.', eq2 = '', eq3 = '', eq4 = ''] = eqItems;
        const [pv1 = 'No items in personal vault.\nThis may be due to API issues.', pv2 = '', pv3 = '', pv4 = ''] = pvItems;
        const [storage1 = 'No items in storage.', storage2 = '', storage3 = '', storage4 = '', storage5 = ''] = storageitems;
        const [wd1 = 'No items in wardrobe.', wd2 = '', wd3 = '', wd4 = '', wd5 = ''] = wdItems;
        const [mus1 = 'No Museum Items\nTry checking your API !', mus2 = '', mus3 = '', mus4 = '', mus5 = '' ] = musItems;

        const inv = `${inv1}\n${inv2}\n${inv3}\n${inv4}\n${inv5}`;
        const ar = `${ar1}\n${ar2}\n${ar3}\n${ar4}`;
        const mus = `${mus1}\n${mus2}\n${mus3}\n${mus4}\n${mus5}`
        const acc = `${acc1}\n${acc2}\n${acc3}\n${acc4}\n${acc5}`;
        const wd = `${wd1}\n${wd2}\n${wd3}\n${wd4}`;
        const ec = `${ec1}\n${ec2}\n${ec3}\n${ec4}\n${ec5}`;
        const personalV = `${pv1}\n${pv2}\n${pv3}\n${pv4}`;
        const storageL = `${storage1}\n${storage2}\n${storage3}\n${storage4}\n${storage5}`;
        const eq = `${eq1}\n${eq2}\n${eq3}\n${eq4}`;

        return { inventory, inv, equipment, eq, armor, ar, accessories, acc, enderchest, ec, pv, personalV, storage, storageL, wardrobe, wd, museum, museumSpecial, mus };
    }

module.exports = { getAllItems, getItems };