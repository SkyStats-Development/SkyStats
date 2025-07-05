/**
 * Utility functions for string and number formatting in SkyStats.
 */
export const functions = {
	/**
	 * Convert a string to title case.
	 */
	titleCase(str: string, replaceUnderscore = false): string | null {
		try {
			if (replaceUnderscore) str = str.replace(/_/g, ' ');
			const splitStr = str.toLowerCase().split(' ');
			for (let i = 0; i < splitStr.length; i++) {
				splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1);
			}
			str = splitStr.join(' ');
			return str;
		} catch {
			return null;
		}
	},

	/**
	 * Capitalize the first letter of a string.
	 */
	capitalize(str: string): string | null {
		if (!str) return null;
		return str.charAt(0).toUpperCase() + str.slice(1);
	},

	/**
	 * Fix a number to a given number of decimals.
	 */
	toFixed(num: number, fixed: number): string {
		const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
		return num.toString().match(re)?.[0] || '';
	},

	/**
	 * Check if a code is a Minecraft format code.
	 */
	isFormatCode(code: string): boolean {
		return /[k-o]/.test(code);
	},

	/**
	 * Check if a code is a Minecraft color code.
	 */
	isColorCode(code: string): boolean {
		return /[0-9a-f]/.test(code);
	},

	/**
	 * Render Minecraft lore text with formatting codes.
	 */
	renderLore(text: string): string {
		let output = '';
		const formats = new Set<string>();
		for (const part of text.match(/(§[0-9a-fk-or])*[^§]*/g) || []) {
			if (part.length === 0) continue;
			output += '';
			if (formats.size > 0) {
				output += `${Array.from(formats, (x) => '§' + x).join(' ')}`;
			}
			output += `${part}`;
		}
		return output;
	},

	/**
	 * Format a number with K, M, B, etc.
	 */
	formatNumber(number: number, floor: boolean, rounding = 10): string {
		if (number < 1000) {
			return String(Math.floor(number));
		} else if (number < 10000) {
			if (floor) {
				return (
					(Math.floor((number / 1000) * rounding) / rounding).toFixed(rounding.toString().length - 1) + 'K'
				);
			} else {
				return (Math.ceil((number / 1000) * rounding) / rounding).toFixed(rounding.toString().length - 1) + 'K';
			}
		} else if (number < 1000000) {
			if (floor) {
				return Math.floor(number / 1000) + 'K';
			} else {
				return Math.ceil(number / 1000) + 'K';
			}
		} else if (number < 1000000000) {
			if (floor) {
				return (
					(Math.floor((number / 1000 / 1000) * rounding) / rounding).toFixed(rounding.toString().length - 1) +
					'M'
				);
			} else {
				return (
					(Math.ceil((number / 1000 / 1000) * rounding) / rounding).toFixed(rounding.toString().length - 1) +
					'M'
				);
			}
		} else if (floor) {
			return (
				(Math.floor((number / 1000 / 1000 / 1000) * rounding * 10) / (rounding * 10)).toFixed(
					rounding.toString().length,
				) + 'B'
			);
		} else {
			return (
				(Math.ceil((number / 1000 / 1000 / 1000) * rounding * 10) / (rounding * 10)).toFixed(
					rounding.toString().length,
				) + 'B'
			);
		}
	},

	/**
	 * Floor a number to a given number of decimals.
	 */
	floor(num: number, decimals = 0): number {
		return Math.floor(Math.pow(10, decimals) * num) / Math.pow(10, decimals);
	},

	/**
	 * Round a number to a given scale.
	 */
	round(num: number, scale: number): number {
		if (!('' + num).includes('e')) {
			return +(Math.round(Number(num + 'e+' + scale)) + 'e-' + scale);
		} else {
			const arr = ('' + num).split('e');
			let sig = '';
			if (+arr[1] + scale > 0) {
				sig = '+';
			}
			return +(Math.round(Number(arr[0] + 'e' + sig + (+arr[1] + scale))) + 'e-' + scale);
		}
	},
};
