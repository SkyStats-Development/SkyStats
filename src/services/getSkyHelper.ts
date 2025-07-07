import { getNetworth } from 'skyhelper-networth';

/**
 * Get networth data using SkyHelper API, using only provided data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSkyHelper = async (memberData: any, bankBalance: number | null, museumData: any) => {
	const networth = await getNetworth(memberData, bankBalance ?? 0, {
		v2Endpoint: true,
		museumData,
	});
	console.log(networth);
	return { networth };
};
