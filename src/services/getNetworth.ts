import { getSkyHelper } from './getSkyHelper';

/**
 * Get a full, modernized networth breakdown for a Skyblock profile.
 * All data must be provided (no API calls here). Returns only raw, unformatted data.
 */
export async function getNetworth(
	uuid: string,
	profileid: string,
	memberData: any,
	bankBalance: number | null,
	museumData: any,
	cookiePrice: number | undefined,
) {
	const networthRaw = await getSkyHelper(memberData, bankBalance, museumData);
	const { total: petTotal, items: petItems } = networthRaw.networth.types.pets;
	const {
		inventory: { total: inventory, items: inventoryItems },
		equipment: { total: equipment, items: equipmentItems },
		enderchest: { total: enderchest, items: enderchestItems },
		armor: { total: armor, items: armorItems },
		accessories: { total: accessories, items: accessoritesItems },
		personal_vault: { total: personal_vault, items: personalvaltItems },
		storage: { total: storage, items: storageItems },
		wardrobe: { total: wardrobe, items: wardrobeItems },
		museum: { total: museum, unsoulboundTotal: museumSpecial, items: museumItems },
	} = networthRaw.networth.types;

	return {
		networth: {
			soulbound: {
				value: networthRaw.networth.unsoulboundNetworth,
			},
			bank: {
				value: networthRaw.networth.bank,
				purse: networthRaw.networth.purse,
			},
			total: {
				irl_value: cookiePrice
					? Math.round(Math.round(networthRaw.networth.networth / (cookiePrice || 1)) * 2.27)
					: null,
				total_networth: networthRaw.networth.networth,
				items_total: {
					museum: {
						museum_value: museum,
						special_museum_value: museumSpecial,
					},
					inventory_value: inventory,
					talisman_bag_value: accessories,
					armor_value: armor,
					enderchest_value: enderchest,
					wardrobe_value: wardrobe,
					equipment_value: equipment,
					personal_vault_value: personal_vault,
					storage_value: storage,
					pet_value: petTotal,
				},
			},
		},
		items: {
			inventoryItems,
			accessoritesItems,
			enderchestItems,
			storageItems,
			wardrobeItems,
			museumItems,
			petItems,
			armorItems,
			equipmentItems,
			personalvaltItems,
		},
		sacks: {
			total:
				Math.round(
					(networthRaw.networth.types.sacks.total +
						networthRaw.networth.types.essence.total +
						networthRaw.networth.types.fishing_bag.total) *
						100,
				) / 100,
			fishing_bag: networthRaw.networth.types.fishing_bag.total,
			essence: networthRaw.networth.types.essence.total,
			sacks: networthRaw.networth.types.sacks.total,
		},
	};
}
