import { getNetworth } from 'skyhelper-networth';

/**
 * Get networth data using SkyHelper API, using only provided data.
 */
export const getSkyHelper = async (memberData: any, bankBalance: number | null, museumData: any) => {
	const networth = await getNetworth(memberData, bankBalance ?? 0, {
		v2Endpoint: true,
		museumData,
	});
	return { networth };
};
