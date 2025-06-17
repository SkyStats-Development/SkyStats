/**
 * Networth embed builder using the new EmbedBuilder class and array-based formatting.
 */
import config from '../config/config.json';
import { addNotation, addCommas } from '../contracts/helperFunctions';
import EMOJIS from '../contracts/emojis';
import { EmbedBuilder } from './EmbedBuilder';

const messages = config.messages.discord;

export async function buildNetworthEmbed(
	embedId: string,
	uuid: string,
	profileId: string,
	username: string,
	profileName: string,
	networth: any,
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
					})`,
					value: formatItemList(networth.items.armorItems, 5),
					inline: false,
				},
				{
					name: `${EMOJIS.EQUIPMENT_ICON} Equipment  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.equipment_value)) ?? 0
					})`,
					value: formatItemList(networth.items.equipmentItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.WARDROBE_ICON} Wardrobe  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.wardrobe_value)) ?? 0
					})`,
					value: formatItemList(networth.items.wardrobeItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.INVENTORY_ICON} Inventory  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.inventory_value)) ?? 0
					})`,
					value: formatItemList(networth.items.inventoryItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.ENDER_CHEST_ICON} Ender Chest  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.enderchest_value)) ?? 0
					})`,
					value: formatItemList(networth.items.enderchestItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.STORAGE_ICON} Storage  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.storage_value)) ?? 0
					})`,
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
					})`,
					value: formatItemList(networth.items.museumItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.PET_ICON} Pets  (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.pet_value)) ?? 0
					})`,
					value: formatPetList(networth.items.petItems, uuid, 5),
					inline: false,
				},
				{
					name: `${EMOJIS.ACCESSORY_BAG_ICON} Accessory Bag (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.talisman_bag_value)) ?? 0
					})`,
					value: formatItemList(networth.items.accessoritesItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.PERSONAL_VAULT_ICON} Personal Vault (${
						addNotation('oneLetters', Number(networth.networth.total.items_total.personal_vault_value)) ?? 0
					})`,
					value: formatItemList(networth.items.personalvaltItems, 4),
					inline: false,
				},
				{
					name: `${EMOJIS.MISC_ICON} Misc (${addNotation('oneLetters', Number(networth.sacks.total)) ?? 0})`,
					value: `→ Fishing Bag (**${addNotation('oneLetters', Number(networth.sacks.fishing_bag)) ?? 0}**)
→ Sacks (**${addNotation('oneLetters', Number(networth.sacks.sacks)) ?? 0}**)
→ Essence (**${addNotation('oneLetters', Number(networth.sacks.essence)) ?? 0}**)`,
					inline: false,
				},
			]);
		return builder.build();
	}
	// TODO: Add other embed types (wardrobe, inventory, etc.) using the same pattern
	return builder.setTitle('Unknown Embed').setDescription('Unknown embed type.').build();
}

function formatItemList(items: { name: string; price: number }[] = [], maxItems = 4): string {
	if (!items || !Array.isArray(items) || items.length === 0) return 'No items or API off';
	return items
		.slice(0, maxItems)
		.map((item) => `→ ${item.name} (**${addNotation('oneLetters', item.price)})**`)
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
function formatPetList(
	pets: { name: string; price: number; heldItem: string }[] = [],
	uuid: string,
	maxItems = 4,
): string {
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
