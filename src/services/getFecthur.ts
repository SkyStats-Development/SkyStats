import fetchurItems, { FetchurItem } from '../utils/fetchur_items';

/**
 * Get today's Fetchur item.
 */
export function getFetchur(): FetchurItem | undefined {
	try {
		const today = new Date();
		today.setHours(today.getHours() - 6);
		const day = today.getDate();
		let item: FetchurItem | undefined;
		if (day <= 12) {
			item = fetchurItems[day];
		}
		item = fetchurItems[day % 12];
		return item;
	} catch (error) {
		console.log(error);
	}
}
