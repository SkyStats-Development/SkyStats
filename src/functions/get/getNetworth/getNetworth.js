const axios = require('axios');
const {
	addCommas,
	addNotation,
} = require('../../../contracts/helperFunctions');
const config = require('../../../../config.json');
const { getSkyHelper } = require('./getSkyHelper');
require('dotenv').config();
const apiKey = process.env.KEY;
const RECOMBOBULATOR_3000 = '<:RECOMBOBULATOR_3000:1069185517511524362>';
const emojis = {
	PET_ITEM_LUCKY_CLOVER: '<a:Lucky_Clover:1072396488346456175>',
	PET_ITEM_SPOOKY_CUPCAKE: '<:Spooky_Cupcake:1072396596400095262>',
	PET_ITEM_TOY_JERRY: '<:Jerry_3D_Glasses:1072396693494038559>',
	PET_ITEM_QUICK_CLAW: '<:Quick_Claw:1072396796766199899>',
	PET_ITEM_EXP_SHARE: '<a:Exp_Share:1072397058780168262>',
	PET_ITEM_TIER_BOOST: '<a:Tier_Boost:1072397214212702288>',
	PET_ITEM_BUBBLEGUM: '<a:Bubblegum:1072397319129006171>',
	PET_ITEM_VAMPIRE_FANG: '<:Vampire_Fang:1072397412590702663>',
	PET_ITEM_FLYING_PIG: '<:Flying_Pig:1072397499089817641>',
	PET_ITEM_SADDLE: '<a:Saddle:1072397586713030727>',
	CROCHET_TIGER_PLUSHIE: '<:Crochet_Tiger_Plushie:1072397677624569887>',
	REAPER_GEM: '<a:Reaper_Gem:1072397765809799288>',
	MINOS_RELIC: '<:Minos_Relic:1072397896139423824>',
	PET_ITEM_TEXTBOOK: '<a:Textbook:1072397987776569364>',
	ANTIQUE_REMEDIES: '<:Antique_Remedies:1072398120299790347>',
	WASHED_UP_SOUVENIR: '<:Washedup_Souvenir:1072398232589713448>',
	SERRATED_CLAWS: '<a:Serrated_Claws:1072398314126987264>',
	BIGGER_TEETH: '<:Bigger_Teeth:1072398401888587796>',
	DWARF_TURTLE_SHELMET: '<:Dwarf_Turtle_Shelmet:1072398560982745129>',
	ALL_SKILLS_SUPER_BOOST: '<a:All_Skills_Exp_SuperBoost:1072398671536209960>',
	GOLD_CLAWS: '<a:Gold_Claws:1072398736292069457>',
	REINFORCED_SCALES: '<a:Reinforced_Scales:1072398856114946098>',
	PET_ITEM_IRON_CLAWS: '<a:Iron_Claws:1072398962654449674>',
	PET_ITEM_SHARPENED_CLAWS: '<a:Sharpened_Claws:1072399034075058257>',
	PET_ITEM_BIG_TEETH: '<:Big_Teeth:1072399115620712468>',
	PET_ITEM_HARDEND_SCALES: '<a:Hardened_Scales:1072399214115557397>',
	PET_ITEM_FARMING_SKILL_BOOST: '<a:Farming_Exp_Boost:1072399332373975040>',
	PET_ITEM_FORAGING_SKILL_BOOST: '<a:Foraging_Exp_Boost:1072399408341200948>',
	PET_ITEM_COMBAT_SKILL_BOOST: '<a:Combat_Exp_Boost:1072399483146612746>',
	PET_ITEM_MINING_SKILL_BOOST: '<a:Mining_Exp_Boost:1189809609230254140>',
	PET_ITEM_FISHING_SKILL_BOOST: '<a:Fishing_Exp_Boost:1072399580018245652>',
	PET_ITEM_ALL_SKILLS_BOOST: '<a:All_Skills_Exp_Boost:1072399662306316358>',
};

async function getCookiePrice() {
	try {
		const response = await axios.get(
			`https://api.hypixel.net/v2/skyblock/bazaar?key=${apiKey}`
		);
		const cookiePrice =
			response.data.products.BOOSTER_COOKIE.quick_status.buyPrice;
		return cookiePrice;
	} catch (error) {
		console.error(error);
	}
}
function handleSplits(value) {
	if (
		value === 0 ||
		value === NaN ||
		value === undefined ||
		value ===
		Infinity /* (yeah infinity happened once we dont talk about it) */
	) {
		return value;
	} else {
		return Math.round(value.toString());
	}
}

async function getNetworth(uuid, profileid, profileRes) {
	const cookiePrice = await getCookiePrice();
	const networthRaw = await getSkyHelper(profileid, uuid, profileRes);
	const { total: petTotal, items: petItems } =
		networthRaw.networth.types.pets;

	const createPetString = (pet) => {
		const {
			name: petName,
			price: petsPrice,
			candyUsed: petCandy,
			heldItem: petItem,
		} = pet || {};
		const petCandyEmoji =
			uuid !== '833e1fe3ad644ae6aad9a30e04bd6417' && petCandy > 0
				? '<:carrot:1072129687427498012>'
				: '';
		const petItemEmoji = petItem
			? Object.keys(emojis).find((key) => petItem.startsWith(key))
				? emojis[
				Object.keys(emojis).find((key) =>
					petItem.startsWith(key)
				)
				]
				: ''
			: '';
		const petPrice = addNotation('oneLetters', petsPrice) || 0;
		if (petName === null || petName === undefined) {
			return '';
		}
		return `→ ${petName} ${petCandyEmoji} ${petItemEmoji} (**${petPrice}**)`;
	};

	const createPetStrings = (pets, maxPets = Infinity) => {
		const petStrings = pets.slice(0, maxPets).map(createPetString);
		if (pets.length > maxPets) {
			petStrings[maxPets - 1] += `\n**And \`${pets.length - maxPets
				}\` more...**`;
		}
		return petStrings.join('\n');
	};
	const {
		inventory: { total: inventory, items: inventoryItems },
		equipment: { total: equipment, items: equipmentItems },
		enderchest: { total: enderchest, items: enderchestItems },
		armor: { total: armor, items: armorItems },
		accessories: { total: accessories, items: accessoritesItems },
		personal_vault: { total: personal_vault, items: personalvaltItems },
		storage: { total: storage, items: storageItems },
		wardrobe: { total: wardrobe, items: wardrobeItems },
		museum: {
			total: museum,
			unsoulboundTotal: museumSpecial,
			items: museumItems,
		},
	} = networthRaw.networth.types;

	const createItemString = (item) => {
		if (!item) return '';
		const isRecombobulated = item.calculation.some(
			(a) => a.id === 'RECOMBOBULATOR_3000'
		);
		const price = addNotation('oneLetters', handleSplits(item.price)) || 0;
		if (item.count >= 2) {
			return `→ \`${item.count}x\` ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''
				} (**${price}**)`;
		} else {
			return `→ ${item.name}${isRecombobulated ? `${RECOMBOBULATOR_3000}` : ''
				} (**${price}**)`;
		}
	};
	const createItemStrings = (items, maxItems) => {
		const itemStrings = items.slice(0, maxItems).map(createItemString);
		if (items.length > maxItems) {
			itemStrings[maxItems - 1] += `\n-# → **And \`${items.length - maxItems
				}\` more...**`;
		}
		if (itemStrings.length === 0) {
			return 'No items or API off';
		}
		return itemStrings.join('\n');
	};
	return {
		networth: {
			soulbound: {
				formatted: addNotation(
					'numbers',
					addCommas(
						networthRaw.networth.unsoulboundNetworth
							.toString()
							.split('.')[0]
					)
				),
				short: addNotation(
					'oneLetters',
					networthRaw.networth.unsoulboundNetworth
				),
			},
			bank: {
				formatted: addNotation(
					'oneLetters',
					handleSplits(networthRaw.networth.bank)
				),
				purse: Math.round(networthRaw.networth.purse),
			},
			total: {
				irl_value: addNotation(
					'numbers',
					addCommas(
						Math.round(
							Math.round(
								networthRaw.networth.networth / cookiePrice
							) * 2.27
						)
					)
				),
				total_networth: addNotation(
					'numbers',
					addCommas(
						networthRaw.networth.networth.toString().split('.')[0]
					)
				),
				short_networth: addNotation(
					'oneLetters',
					networthRaw.networth.networth
				),
				items_total: {
					museum: {
						museum_value: handleSplits(museum),
						special_museum_value: handleSplits(museumSpecial),
					},
					inventory_value: handleSplits(inventory),
					talisman_bag_value: handleSplits(accessories),
					armor_value: handleSplits(armor),
					enderchest_value: handleSplits(enderchest),
					wardrobe_value: handleSplits(wardrobe),
					equipment_value: handleSplits(equipment),
					personal_vault_value: handleSplits(personal_vault),
					storage_value: handleSplits(storage),
					pet_value: handleSplits(petTotal),
				},
			},
		},
		items: {
			items_20: {
				inventory_items_20: createItemStrings(inventoryItems, 20),
				talisman_bag_items_20: createItemStrings(accessoritesItems, 20),
				enderchest_items_20: createItemStrings(enderchestItems, 20),
				storage_items_20: createItemStrings(storageItems, 20),
				wardrobe_items_20: createItemStrings(wardrobeItems, 20),
				museum_items_20: createItemStrings(museumItems, 20),
				pet_items_20: createPetStrings(petItems, 20),
			},
			items_4: {
				inventory_items: createItemStrings(inventoryItems, 5),
				talisman_bag_items: createItemStrings(accessoritesItems, 5),
				armor_items: createItemStrings(armorItems, 4),
				enderchest_items: createItemStrings(enderchestItems, 5),
				equipment_items: createItemStrings(equipmentItems, 5),
				personal_vault_items: createItemStrings(personalvaltItems, 5),
				storage_items: createItemStrings(storageItems, 5),
				wardrobe_items: createItemStrings(wardrobeItems, 5),
				museum_items: createItemStrings(museumItems, 5),
				pet_items: createPetStrings(petItems, 4),
			},
		},
		sacks: {
			total:
				Math.round(
					(networthRaw.networth.types.sacks.total +
						networthRaw.networth.types.essence.total +
						networthRaw.networth.types.fishing_bag.total) *
					100
				) / 100,
			fishing_bag: networthRaw.networth.types.fishing_bag.total,
			essence: networthRaw.networth.types.essence.total,
			sacks: networthRaw.networth.types.sacks.total,
		},
	};
}

module.exports = { getNetworth, getCookiePrice };
