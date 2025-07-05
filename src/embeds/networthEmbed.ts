/**
 * Networth embed builder using the new EmbedBuilder class and array-based formatting.
 */
import config from '../config/config.json';
import { EMOJIS } from '../contracts/emojis';
import { addNotation, addCommas } from '../contracts/helperFunctions';
import { EmbedBuilder } from './EmbedBuilder';

const messages = config.messages.discord;

interface NetworthItem {
	name: string;
	price: number;
}

interface NetworthPet {
	name: string;
	price: number;
	heldItem?: string | null;
}

interface NetworthData {
	networth: {
		total: {
			total_networth: number;
			irl_value: number | null;
			items_total: {
				museum: {
					museum_value: number;
					special_museum_value: number;
				};
				inventory_value: number;
				talisman_bag_value: number;
				armor_value: number;
				enderchest_value: number;
				wardrobe_value: number;
				equipment_value: number;
				personal_vault_value: number;
				storage_value: number;
				pet_value: number;
			};
		};
		soulbound: {
			value: number;
		};
		bank: {
			value: number;
			purse: number;
		};
	};
	items: {
		inventoryItems: NetworthItem[] | undefined;
		accessoritesItems: NetworthItem[] | undefined;
		enderchestItems: NetworthItem[] | undefined;
		storageItems: NetworthItem[] | undefined;
		wardrobeItems: NetworthItem[] | undefined;
		museumItems: NetworthItem[] | undefined;
		petItems: NetworthPet[] | undefined;
		armorItems: NetworthItem[] | undefined;
		equipmentItems: NetworthItem[] | undefined;
		personalvaltItems: NetworthItem[] | undefined;
	};
	sacks: {
		total: number;
		fishing_bag: number;
		sacks: number;
		essence: number;
	};
}

export async function buildNetworthEmbed(
	embedId: string,
	uuid: string,
	profileId: string,
	username: string,
	profileName: string,
	networth: NetworthData,
) {
	const builder = new EmbedBuilder()
		.setColor(0xffa600)
		.setThumbnail(`https://api.mineatar.io/body/full/${uuid}`)
		.setURL(`https://sky.shiiyu.moe/stats/${uuid}`)
		.setFooter(messages.default, messages.icon);

	if (embedId === 'totals_embed') {
		builder
			.setTitle(`Networth For ${username} On ${profileName}`)
			.setDescription(
				`${EMOJIS.PURSE_ICON} Networth: **${addCommas(Number(networth.networth.total.total_networth.toFixed(2)))} (${addNotation('oneLetters', Number(networth.networth.total.total_networth))})**\n` +
					`${EMOJIS.SOULBOUND_ICON} Unsoulbound Networth: **${addCommas(Number(networth.networth.soulbound.value.toFixed(2)))} (${addNotation('oneLetters', Number(networth.networth.soulbound.value))})**\n` +
					`${EMOJIS.BOOSTER_COOKIE_ICON} IRL Value: **$${addCommas(Number(networth.networth.total.irl_value))} USD**`,
			)
			.addFields([
				{
					name: `${EMOJIS.PURSE_ICON} Purse`,
					value: `${addNotation('oneLetters', Number(networth.networth.bank.purse)) ?? 0}`,
					inline: true,
				},
				{
					name: `${EMOJIS.BANK_ICON} Bank`,
					value: `${addNotation('oneLetters', Number(networth.networth.bank.value.toFixed(2))) ?? 0}`,
					inline: true,
				},
				{
					name: `${EMOJIS.SACK_ICON} Sacks`,
					value: `${addNotation('oneLetters', Number(networth.sacks.total)) ?? 0}`,
					inline: true,
				},
				{
					name: `${EMOJIS.ARMOR_ICON} Armor  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.armor_value)) ?? 0
					}`,
					value: formatItemList(networth.items.armorItems, 5),
					inline: false,
				},
				{
					name: `${EMOJIS.EQUIPMENT_ICON} Equipment  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.equipment_value)) ?? 0
					}`,
					value: formatItemList(networth.items.equipmentItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.WARDROBE_ICON} Wardrobe  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.wardrobe_value)) ?? 0
					}`,
					value: formatItemList(networth.items.wardrobeItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.INVENTORY_ICON} Inventory  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.inventory_value)) ?? 0
					}`,
					value: formatItemList(networth.items.inventoryItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.ENDER_CHEST_ICON} Ender Chest  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.enderchest_value)) ?? 0
					}`,
					value: formatItemList(networth.items.enderchestItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.STORAGE_ICON} Storage  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.storage_value)) ?? 0
					}`,
					value: formatItemList(networth.items.storageItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.MUSEUM_ICON} Museum (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.museum.museum_value)) ?? 0
					}/$${
						addNotation(
							'oneLetters',
							Number(networth.networth.total.items_total.museum.special_museum_value),
						) ?? 0
					}`,
					value: formatItemList(networth.items.museumItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.PET_ICON} Pets  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.pet_value)) ?? 0
					}`,
					value: formatPetList(networth.items.petItems, uuid, 5),
					inline: false,
				},
				{
					name: `${EMOJIS.ACCESSORY_BAG_ICON} Accessory Bag (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.talisman_bag_value)) ?? 0
					}`,
					value: formatItemList(networth.items.accessoritesItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.PERSONAL_VAULT_ICON} Personal Vault (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.personal_vault_value)) ?? 0
					}`,
					value: formatItemList(networth.items.personalvaltItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.MISC_ICON} Misc (${addNotation('oneLetters', Number(networth.sacks.total)) ?? 0}`,
					value: `→ Fishing Bag (**${addNotation('oneLetters', Number(networth.sacks.fishing_bag)) ?? 0}**)
→ Sacks (**${addNotation('oneLetters', Number(networth.sacks.sacks)) ?? 0}**)
→ Essence (**${addNotation('oneLetters', Number(networth.sacks.essence)) ?? 0}**)`,
					inline: false,
				},
			]);
		return builder.build();
	}

	// Individual section embeds
	if (embedId === 'wardrobe_embed') {
		builder
			.setTitle(`Wardrobe for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.wardrobe_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.WARDROBE_ICON} Wardrobe Items`,
					value: formatItemList(networth.items.wardrobeItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'inventory_embed') {
		builder
			.setTitle(`Inventory for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.inventory_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.INVENTORY_ICON} Inventory Items`,
					value: formatItemList(networth.items.inventoryItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'armor_embed') {
		builder
			.setTitle(`Armor for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.armor_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ARMOR_ICON} Armor Items`,
					value: formatItemList(networth.items.armorItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'equipment_embed') {
		builder
			.setTitle(`Equipment for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.equipment_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.EQUIPMENT_ICON} Equipment Items`,
					value: formatItemList(networth.items.equipmentItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'enderchest_embed') {
		builder
			.setTitle(`Ender Chest for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.enderchest_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ENDER_CHEST_ICON} Ender Chest Items`,
					value: formatItemList(networth.items.enderchestItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'storage_embed') {
		builder
			.setTitle(`Storage for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.storage_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.STORAGE_ICON} Storage Items`,
					value: formatItemList(networth.items.storageItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'pet_embed') {
		builder
			.setTitle(`Pets for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.pet_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.PET_ICON} Pet Collection`,
					value: formatPetList(networth.items.petItems, uuid, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'talisman_bag_embed') {
		builder
			.setTitle(`Accessory Bag for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.talisman_bag_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ACCESSORY_BAG_ICON} Accessories`,
					value: formatItemList(networth.items.accessoritesItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'museum_embed') {
		builder
			.setTitle(`Museum for ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.museum.museum_value))}** | Special: **${addNotation('oneLetters', Number(networth.networth.total.items_total.museum.special_museum_value))}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.MUSEUM_ICON} Museum Items`,
					value: formatItemList(networth.items.museumItems, 25),
					inline: false,
				},
			]);
		return builder.build();
	}

	// Individual section embeds
	if (embedId === 'wardrobe_embed') {
		builder
			.setTitle(`Wardrobe - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.wardrobe_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.WARDROBE_ICON} Items`,
					value: formatItemList(networth.items.wardrobeItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'inventory_embed') {
		builder
			.setTitle(`Inventory - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.inventory_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.INVENTORY_ICON} Items`,
					value: formatItemList(networth.items.inventoryItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'armor_embed') {
		builder
			.setTitle(`Armor - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.armor_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ARMOR_ICON} Items`,
					value: formatItemList(networth.items.armorItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'equipment_embed') {
		builder
			.setTitle(`Equipment - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.equipment_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.EQUIPMENT_ICON} Items`,
					value: formatItemList(networth.items.equipmentItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'enderchest_embed') {
		builder
			.setTitle(`Ender Chest - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.enderchest_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ENDER_CHEST_ICON} Items`,
					value: formatItemList(networth.items.enderchestItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'storage_embed') {
		builder
			.setTitle(`Storage - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.storage_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.STORAGE_ICON} Items`,
					value: formatItemList(networth.items.storageItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'pet_embed') {
		builder
			.setTitle(`Pets - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.pet_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.PET_ICON} Pets`,
					value: formatPetList(networth.items.petItems, uuid, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'talisman_bag_embed') {
		builder
			.setTitle(`Accessory Bag - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.talisman_bag_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.ACCESSORY_BAG_ICON} Items`,
					value: formatItemList(networth.items.accessoritesItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	if (embedId === 'museum_embed') {
		builder
			.setTitle(`Museum - ${username} on ${profileName}`)
			.setDescription(
				`Total Value: **${addNotation('oneLetters', Number(networth.networth.total.items_total.museum.museum_value)) ?? 0}** / Special: **${addNotation('oneLetters', Number(networth.networth.total.items_total.museum.special_museum_value)) ?? 0}**`,
			)
			.addFields([
				{
					name: `${EMOJIS.MUSEUM_ICON} Items`,
					value: formatItemList(networth.items.museumItems, 10),
					inline: false,
				},
			]);
		return builder.build();
	}

	return builder.setTitle('Unknown Embed').setDescription('Unknown embed type.').build();
}

function formatItemList(items: NetworthItem[] | undefined, maxItems = 4): string {
	if (!items || !Array.isArray(items) || items.length === 0) return 'No items or API off';
	return items
		.slice(0, maxItems)
		.map((item) => `→ ${item.name} (**${addNotation('oneLetters', item.price)})**)`)
		.join('\n');
}

/**
 * Formats a list of pets for display, including held item emojis if available.
 * @param {Array} pets - List of pet objects.
 * @param {string} uuid - Player UUID.
 * @param {number} maxItems - Max pets to display.
 * @returns {string} Formatted pet list.
 */
/**
 * Formats a list of pets for display, including held item emojis if available.
 * @param {Array} pets - List of pet objects.
 * @param {string} uuid - Player UUID.
 * @param {number} maxItems - Max pets to display.
 * @returns {string} Formatted pet list.
 */
function formatPetList(pets: NetworthPet[] | undefined, uuid: string, maxItems = 4): string {
	if (!pets || !Array.isArray(pets) || pets.length === 0) return 'No pets or API off';
	return pets
		.slice(0, maxItems)
		.map((pet) => {
			const heldItemKey = pet.heldItem || '';
			const emoji = EMOJIS[heldItemKey as keyof typeof EMOJIS] ?? '';
			if (heldItemKey && !emoji) {
				console.warn(`Missing emoji for heldItem: ${heldItemKey}`);
			}
			return `→ ${pet.name} ${emoji} (**${addNotation('oneLetters', pet.price)})**`;
		})
		.join('\n');
}
