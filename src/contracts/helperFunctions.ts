import { dirname as getDirName } from 'path';
import util from 'util';
import { promises as fs } from 'fs';
import set from 'lodash/set';
import { mkdirp } from 'mkdirp';
import nbt from 'prismarine-nbt';

const parseNbt = util.promisify(nbt.parse);

/**
 * Replace all known rank tags in a string.
 */
export function replaceAllRanks(input: string): string {
	return input
		.replaceAll('[OWNER] ', '')
		.replaceAll('[ADMIN] ', '')
		.replaceAll('[MCP] ', '')
		.replaceAll('[GM] ', '')
		.replaceAll('[PIG+++] ', '')
		.replaceAll('[YOUTUBE] ', '')
		.replaceAll('[MVP++] ', '')
		.replaceAll('[MVP+] ', '')
		.replaceAll('[MVP] ', '')
		.replaceAll('[VIP+] ', '')
		.replaceAll('[VIP] ', '');
}

/**
 * Add notation to a number (e.g., K, M, B, T).
 */
export function addNotation(type: string, value: number): string {
	let returnVal: any = value;
	let notList: string[] = [];
	if (type === 'shortScale') {
		notList = [' Thousand', ' Million', ' Billion', ' Trillion', ' Quadrillion', ' Quintillion'];
	}
	if (type === 'oneLetters') {
		notList = ['K', 'M', 'B', 'T'];
	}
	let checkNum = 1000;
	if (type !== 'none' && type !== 'commas') {
		let notValue = notList[notList.length - 1];
		for (let u = notList.length; u >= 1; u--) {
			notValue = notList.shift()!;
			for (let o = 3; o >= 1; o--) {
				if (value >= checkNum) {
					returnVal = value / (checkNum / 100);
					returnVal = Math.floor(returnVal);
					returnVal = (returnVal / Math.pow(10, o)) * 10;
					returnVal = +returnVal.toFixed(o - 1) + notValue;
				}
				checkNum *= 10;
			}
		}
	} else {
		returnVal = numberWithCommas(value.toFixed(0));
	}
	return returnVal;
}

/**
 * Add commas to a number.
 */
export function addCommas(num: number): string {
	try {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} catch {
		return '0';
	}
}

/**
 * Add commas to a string number.
 */
export function numberWithCommas(x: string): string {
	return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Generate a random ID of given length.
 */
export function generateID(length: number): string {
	let result = '';
	const characters = 'abcde0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 * Get Minecraft rarity color code.
 */
export function getRarityColor(rarity: string): string {
	switch (rarity.toLowerCase()) {
		case 'mythic':
			return 'd';
		case 'legendary':
			return '6';
		case 'epic':
			return '5';
		case 'rare':
			return '9';
		case 'uncommon':
			return 'a';
		case 'common':
			return 'f';
		default:
			return 'f';
	}
}

/**
 * Fix a number to a given number of decimals.
 */
export function toFixed(num: number, fixed: number): string {
	const response = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || -1}})?`);
	return num.toString().match(response)?.[0] || '';
}

/**
 * Get time since a timestamp in human readable form.
 */
export function timeSince(timeStamp: number): string {
	const now = new Date();
	let secondsPast = (now.getTime() - timeStamp) / 1000;
	secondsPast = Math.abs(secondsPast);
	if (secondsPast < 60) return `${parseInt(secondsPast.toString())}s`;
	if (secondsPast < 3600) return `${parseInt((secondsPast / 60).toString())}m`;
	if (secondsPast <= 86400) return `${parseInt((secondsPast / 3600).toString())}h`;
	if (secondsPast > 86400) {
		const d = toFixed(parseInt((secondsPast / 86400).toString()), 0);
		secondsPast -= 3600 * 24 * parseInt(d);
		const h = toFixed(parseInt((secondsPast / 3600).toString()), 0);
		secondsPast -= 3600 * parseInt(h);
		const m = toFixed(parseInt((secondsPast / 60).toString()), 0);
		secondsPast -= 60 * parseInt(m);
		const s = toFixed(parseInt(secondsPast.toString()), 0);
		return `${d}d ${h}h ${m}m ${s}s`;
	}
	return '';
}

/**
 * Write a value at a given JSON path in a file.
 */
export async function writeAt(filePath: string, jsonPath: string, value: any): Promise<void> {
	await mkdirp(getDirName(filePath));
	try {
		const file = await fs.readFile(filePath, 'utf8');
		const json = JSON.parse(file);
		set(json, jsonPath, value);
		await fs.writeFile(filePath, JSON.stringify(json, null, 2));
	} catch {
		const json: any = {};
		set(json, jsonPath, value);
		await fs.writeFile(filePath, JSON.stringify(json, null, 2));
	}
}

/**
 * Capitalize a string (replace underscores, title case).
 */
export function capitalize(str: string): string {
	return str
		.replace(/_/g, ' ')
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.substr(1))
		.join(' ');
}

/**
 * Decode NBT data from a buffer.
 */
export async function decodeData(buffer: Buffer): Promise<any> {
	const parsedNbt = await parseNbt(buffer);
	return nbt.simplify(parsedNbt);
}
