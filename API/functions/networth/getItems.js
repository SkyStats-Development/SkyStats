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


    const inv1 =
        inventoryItems[0] != null
            ? `→ ${inventoryItems[0].name}${inventoryItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    inventoryItems[0].price
                ) ?? 0}**)`
            : null;
    const inv2 =
        inventoryItems[1] != null
            ? `→ ${inventoryItems[1].name}${inventoryItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    inventoryItems[1].price
                ) ?? 0}**)`
            : null;
    const inv3 =
        inventoryItems[2] != null
            ? `→ ${inventoryItems[2].name}${inventoryItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    inventoryItems[2].price
                ) ?? 0}**)`
            : null;
    const inv4 =
        inventoryItems[3] != null
            ? `→ ${inventoryItems[3].name}${inventoryItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    inventoryItems[3].price
                ) ?? 0}**)`
            : null;
    const inv5 =
        inventoryItems[4] != null
            ? `→ ${inventoryItems[4].name}${inventoryItems[4].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    inventoryItems[4].price
                ) ?? 0}**)`
            : null;

    const acc1 =
        accessoritesItems[0] != null
            ? `→ ${accessoritesItems[0].name}${accessoritesItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    accessoritesItems[0].price
                ) ?? 0}**)`
            : null;
    const acc2 =
        accessoritesItems[1] != null
            ? `→ ${accessoritesItems[1].name}${accessoritesItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    accessoritesItems[1].price
                ) ?? 0}**)`
            : null;
    const acc3 =
        accessoritesItems[2] != null
            ? `→ ${accessoritesItems[2].name}${accessoritesItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    accessoritesItems[2].price
                ) ?? 0}**)`
            : null;
    const acc4 =
        accessoritesItems[3] != null
            ? `→ ${accessoritesItems[3].name}${accessoritesItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    accessoritesItems[3].price
                ) ?? 0}**)`
            : null;
    const acc5 =
        accessoritesItems[4] != null
            ? `→ ${accessoritesItems[4].name}${accessoritesItems[4].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    accessoritesItems[4].price
                ) ?? 0}**)`
            : null;

    const ar1 =
        armorItems[0] != null
            ? `→ ${armorItems[0].name}${armorItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    armorItems[0].price
                ) ?? 0}**)`
            : null;
    const ar2 =
        armorItems[1] != null
            ? `→ ${armorItems[1].name}${armorItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    armorItems[1].price
                ) ?? 0}**)`
            : null;
    const ar3 =
        armorItems[2] != null
            ? `→ ${armorItems[2].name}${armorItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    armorItems[2].price
                ) ?? 0}**)`
            : null;
    const ar4 =
        armorItems[3] != null
            ? `→ ${armorItems[3].name}${armorItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    armorItems[3].price
                ) ?? 0}**)`
            : null;

    const ec1 =
        enderchestItems[0] != null
            ? `→ ${enderchestItems[0].name}${enderchestItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    enderchestItems[0].price
                ) ?? 0}**)`
            : null;
    const ec2 =
        enderchestItems[1] != null
            ? `→ ${enderchestItems[1].name}${enderchestItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    enderchestItems[1].price
                ) ?? 0}**)`
            : null;
    const ec3 =
        enderchestItems[2] != null
            ? `→ ${enderchestItems[2].name}${enderchestItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    enderchestItems[2].price
                ) ?? 0}**)`
            : null;
    const ec4 =
        enderchestItems[3] != null
            ? `→ ${enderchestItems[3].name}${enderchestItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    enderchestItems[3].price
                ) ?? 0}**)`
            : null;
    const ec5 =
        enderchestItems[4] != null
            ? `→ ${enderchestItems[4].name}${enderchestItems[4].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    enderchestItems[4].price
                ) ?? 0}**)`
            : null;

    const eq1 =
        equipmentItems[0] != null
            ? `→ ${equipmentItems[0].name}${equipmentItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    equipmentItems[0].price
                ) ?? 0}**)`
            : null;
    const eq2 =
        equipmentItems[1] != null
            ? `→ ${equipmentItems[1].name}${equipmentItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    equipmentItems[1].price
                ) ?? 0}**)`
            : null;
    const eq3 =
        equipmentItems[2] != null
            ? `→ ${equipmentItems[2].name}${equipmentItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    equipmentItems[2].price
                ) ?? 0}**)`
            : null;
    const eq4 =
        equipmentItems[3] != null
            ? `→ ${equipmentItems[3].name}${equipmentItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    equipmentItems[3].price
                ) ?? 0}**)`
            : null;

    const pv1 =
        personalvaltItems[0] != null
            ? `→ ${personalvaltItems[0].name}${personalvaltItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    personalvaltItems[0].price
                ) ?? 0}**)`
            : null;
    const pv2 =
        personalvaltItems[1] != null
            ? `→ ${personalvaltItems[1].name}${personalvaltItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    personalvaltItems[1].price
                ) ?? 0}**)`
            : null;
    const pv3 =
        personalvaltItems[2] != null
            ? `→ ${personalvaltItems[2].name}${personalvaltItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    personalvaltItems[2].price
                ) ?? 0}**)`
            : null;
    const pv4 =
        personalvaltItems[3] != null
            ? `→ ${personalvaltItems[3].name}${personalvaltItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    personalvaltItems[3].price
                ) ?? 0}**)`
            : null;

    const storage1 =
        storageItems[0] != null
            ? `→ ${storageItems[0].name}${storageItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    storageItems[0].price
                ) ?? 0}**)`
            : null;
    const storage2 =
        storageItems[1] != null
            ? `→ ${storageItems[1].name}${storageItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    storageItems[1].price
                ) ?? 0}**)`
            : null;
    const storage3 =
        storageItems[2] != null
            ? `→ ${storageItems[2].name}${storageItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    storageItems[2].price
                ) ?? 0}**)`
            : null;
    const storage4 =
        storageItems[3] != null
            ? `→ ${storageItems[3].name}${storageItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    storageItems[3].price
                ) ?? 0}**)`
            : null;
    const storage5 =
        storageItems[4] != null
            ? `→ ${storageItems[4].name}${storageItems[4].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    storageItems[4].price
                ) ?? 0}**)`
            : null;

    const wd1 =
        wardrobeItems[0] != null
            ? `→ ${wardrobeItems[0].name}${wardrobeItems[0].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    wardrobeItems[0].price
                ) ?? 0}**)`
            : null;
    const wd2 =
        wardrobeItems[1] != null
            ? `→ ${wardrobeItems[1].name}${wardrobeItems[1].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    wardrobeItems[1].price
                ) ?? 0}**)`
            : null;
    const wd3 =
        wardrobeItems[2] != null
            ? `→ ${wardrobeItems[2].name}${wardrobeItems[2].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    wardrobeItems[2].price
                ) ?? 0}**)`
            : null;
    const wd4 =
        wardrobeItems[3] != null
            ? `→ ${wardrobeItems[3].name}${wardrobeItems[3].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    wardrobeItems[3].price
                ) ?? 0}**)`
            : null;
    const wd5 =
        wardrobeItems[4] != null
            ? `→ ${wardrobeItems[4].name}${wardrobeItems[4].calculation.some(
                (a) => a.id === "RECOMBOBULATOR_3000"
            )
                ? RECOMBOBULATOR_3000
                : ""} (**${addNotation(
                    "oneLetters",
                    wardrobeItems[4].price
                ) ?? 0}**)`
            : null;





    return { inventory, inv1, inv2, inv3, inv4, inv5, equipment, eq1, eq2, eq3, eq4, armor, ar1, ar2, ar3, ar4, accessories, acc1, acc2, acc3, acc4, acc5, enderchest, ec1, ec2, ec3, ec4, ec5, pv, pv1, pv2, pv3, pv4, storage, storage1, storage2, storage3, storage4, storage5, wardrobe, wd1, wd2, wd3, wd4, wd5  };
}

module.exports = { getItems };