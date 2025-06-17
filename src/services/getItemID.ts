import axios from 'axios';

/**
 * Get the item ID for a given item name from the Hypixel API.
 */
export async function getItemID(name: string): Promise<string | null> {
	try {
		const response = await axios.get('https://api.hypixel.net/resources/skyblock/items');
		const items = response.data.items;
		const matchingItem = items.find((item: any) => item.name.toLowerCase() === name.toLowerCase());
		if (matchingItem) {
			return matchingItem.id;
		} else {
			console.log(`No item found with name ${name}`);
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
}
