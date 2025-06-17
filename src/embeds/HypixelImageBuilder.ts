/**
 * HypixelImageBuilder - Generates a custom Hypixel player card image using Canvas
 *
 * All image/canvas logic for the hypixelCommand should be encapsulated here.
 *
 * @module HypixelImageBuilder
 */
import { readFile } from 'fs/promises';
import * as path from 'path';
import { createCanvas, registerFont, Image, CanvasRenderingContext2D } from 'canvas';
import { addNotation, addCommas } from '../contracts/helperFunctions';

/**
 * Input type for HypixelImageBuilder
 */
export interface HypixelImageBuilderInput {
	uuid2: string;
	username: string;
	playerData: any; // TODO: Replace with strict type
	guild?: any;
}

/**
 * Config for stat fields to render
 */
const STAT_FIELDS = [
	{
		label: 'Achievement Points',
		value: (p: any) => addCommas(p?.achievementPoints || 0),
		align: 'center',
		x: (w: number) => w / 2 + 145,
		yLabel: 140,
		yValue: 172,
		font: '32px Minecraft',
	},
	{
		label: 'Network Level',
		value: (p: any) => HypixelImageBuilder.getNetworkLevel(p?.networkExp).toString(),
		align: 'center',
		x: (w: number) => w / 2 - 145,
		yLabel: 140,
		yValue: 172,
		font: '32px Minecraft',
	},
	{
		label: 'Quests',
		value: (p: any) => {
			const quests = (p?.quests || {}) as Record<string, any>;
			return Object.values(quests)
				.reduce((acc: number, quest: any) => acc + (quest.completions?.length || 0), 0)
				.toString();
		},
		align: 'center',
		x: (w: number) => w / 2 + 145,
		yLabel: 205,
		yValue: 235,
		font: '32px Minecraft',
	},
	{
		label: 'Challenges',
		value: (p: any) => {
			const challenges = (p?.challenges?.all_time || {}) as Record<string, any>;
			return Object.values(challenges)
				.reduce((acc: number, val: any) => acc + val, 0)
				.toString();
		},
		align: 'center',
		x: (w: number) => w / 2 - 145,
		yLabel: 205,
		yValue: 235,
		font: '32px Minecraft',
	},
	{
		label: 'Karma',
		value: (p: any) => addNotation('oneLetters', p?.karma || 1),
		align: 'center',
		x: (w: number) => w / 2 - 220,
		yLabel: 266,
		yValue: 295,
		font: '32px Minecraft',
	},
	{
		label: 'Reward Streak',
		value: (p: any) => (p?.rewardStreak || 0).toString(),
		align: 'center',
		x: (w: number) => w / 2 - 70,
		yLabel: 266,
		yValue: 295,
		font: '32px Minecraft',
	},
	{
		label: 'Ranks Gifted',
		value: (p: any) => (p?.giftingMeta?.ranksGiven || 0).toString(),
		align: 'center',
		x: (w: number) => w / 2 + 220,
		yLabel: 266,
		yValue: 295,
		font: '32px Minecraft',
	},
	{
		label: 'Gifts Sent',
		value: (p: any) => (p?.giftingMeta?.giftsSent || 0).toString(),
		align: 'center',
		x: (w: number) => w / 2 + 70,
		yLabel: 266,
		yValue: 295,
		font: '32px Minecraft',
	},
];

/**
 * Modern, production-ready Hypixel image builder
 */
export class HypixelImageBuilder {
	private static fontsRegistered = false;
	private static backgroundImage: Buffer | null = null;

	private static registerFonts() {
		if (this.fontsRegistered) return;
		const fontDir = path.join(__dirname, '../Fonts');
		registerFont(path.join(fontDir, 'mc.ttf'), { family: 'Minecraft' });
		registerFont(path.join(fontDir, 'unifont.ttf'), { family: 'font' });
		registerFont(path.join(fontDir, 'mc-bold.otf'), {
			family: 'MinecraftBOLD',
		});
		this.fontsRegistered = true;
	}

	private static async getBackgroundImage(): Promise<Buffer> {
		if (!this.backgroundImage) {
			const imgPath = path.join(__dirname, '../images/hypixelCommand.png');
			this.backgroundImage = await readFile(imgPath);
		}
		return this.backgroundImage;
	}

	/**
	 * Main entry: builds the player card image as a PNG buffer.
	 * @param data All raw player/guild data needed for rendering
	 */
	public static async build(data: HypixelImageBuilderInput): Promise<Buffer> {
		this.registerFonts();
		const canvas = createCanvas(590, 352);
		const ctx = canvas.getContext('2d');
		const bg = await this.getBackgroundImage();
		const bgImg = new Image();
		bgImg.src = bg;
		ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

		// Draw player avatar
		await this.drawAvatar(ctx, data.uuid2);

		const player = data.playerData;
		const guild = data.guild?.guildData?.guild || {};

		// Header fields (login/logout/status/guild)
		const headerFields = [
			{
				label: `First Login: ${this.formatDate(player?.firstLogin)}`,
				x: canvas.width / 2 + 45,
				y: 75,
			},
			{
				label: `Last Login: ${this.formatDate(player?.lastLogin)}`,
				x: canvas.width / 2 + 45,
				y: 95,
			},
			{
				label: `Status: ${player?.lastLogin > player?.lastLogout ? 'Online' : 'Offline'}`,
				x: canvas.width / 2 - 145,
				y: 72,
			},
			{
				label: `Guild: ${guild?.name || 'Unknown'}`,
				x: canvas.width / 2 - 145,
				y: 104,
			},
		];
		ctx.font = '16px Minecraft';
		ctx.textAlign = 'left';
		ctx.fillStyle = this.createGradient(ctx, 0, 0, canvas.width, 0, '#f73100', '#ffb600');
		headerFields.forEach((f) => ctx.fillText(f.label, f.x, f.y));

		// Stat fields (array-driven)
		STAT_FIELDS.forEach((field) => {
			ctx.font = '16px Minecraft';
			ctx.textAlign = field.align as CanvasTextAlign;
			ctx.fillStyle = '#fff';
			ctx.fillText(field.label, field.x(canvas.width), field.yLabel);
			ctx.font = field.font;
			ctx.fillText(field.value(player), field.x(canvas.width), field.yValue);
		});

		// Draw rank and username
		this.drawRankAndName(ctx, canvas, data.username, player, guild);

		// Footer
		ctx.fillStyle = this.createGradient(ctx, 0, 0, canvas.width, 0, '#f73100', '#ffb600');
		ctx.font = '20px Minecraft';
		ctx.textAlign = 'center';
		ctx.fillText(' SkyStats Development ', canvas.width / 2, 337);

		return canvas.toBuffer('image/png');
	}

	private static async drawAvatar(ctx: CanvasRenderingContext2D, uuid2: string) {
		const imageUrl = `https://visage.surgeplay.com/bust/${uuid2}`;
		try {
			const response = await fetch(imageUrl);
			const imageBuffer = Buffer.from(await response.arrayBuffer());
			const avatarImg = new Image();
			avatarImg.src = imageBuffer;
			ctx.drawImage(avatarImg, 10, 10, 80, 80);
		} catch {
			// Avatar fetch failed, skip drawing
		}
	}

	private static drawRankAndName(
		ctx: CanvasRenderingContext2D,
		canvas: { width: number },
		username: string,
		player: any,
		guild: any,
	) {
		const { pureRank, purePlusColor, pureBracket, rankColor, plusCount } = this.formatRank(player);
		const rankMap: Record<string, string> = {
			MVP_PLUS: 'MVP',
			MVP: 'MVP',
			VIP_PLUS: 'VIP',
			VIP: 'VIP',
			ADMIN: 'ADMIN',
			OWNER: 'OWNER',
			YOUTUBE: 'YOUTUBE',
			GAME_MASTER: 'GM',
			PIG_RANK: 'PIG',
			DEFAULT: 'DEFAULT',
			MVP_PLUS_PLUS: 'MVP',
			MVP_PLUS_PLUS_AQUA: 'MVP',
		};
		ctx.fillStyle = rankColor ?? '#FFFFFF';
		ctx.font = '20px Minecraft';
		ctx.textAlign = 'right';
		const safeRank = pureRank ?? 'DEFAULT';
		const rankText = `[${rankMap[safeRank] ?? 'DEFAULT'}`;
		const rankWidth = ctx.measureText(rankText).width;
		const nameWidth = ctx.measureText(username).width;
		const rankX = canvas.width / 2 - (rankWidth + nameWidth) / 2;
		ctx.fillText(rankText, rankX, 35);
		const stars = this.replaceWithStars(Number(plusCount) || 0);
		if (purePlusColor) {
			ctx.fillStyle = purePlusColor;
			ctx.fillText(stars, rankX + rankWidth / 2, 35);
		}
		if (pureBracket) {
			ctx.fillStyle = pureBracket;
			ctx.fillText('[', rankX - ctx.measureText('[').width, 35);
			ctx.fillText(']', rankX + rankWidth + ctx.measureText('[').width, 35);
		}
		ctx.fillStyle = rankColor ?? '#FFFFFF';
		ctx.textAlign = 'left';
		ctx.fillText(`] ${username}`, rankX + ctx.measureText(stars).width, 35);

		const gtag = guild?.tag || '';
		const gTag = gtag ? `[${gtag}]` : '';
		const gtagcolor = guild?.tagColor || '#FFFFFF';
		ctx.fillStyle = gtagcolor;
		ctx.font = '20px font';
		ctx.textAlign = 'left';
		ctx.fillText(gTag, rankX + rankWidth + ctx.measureText(username).width + 24, 35);
	}

	private static formatDate(dateInput: number | string): string {
		if (!dateInput) return 'N/A';
		const date = new Date(dateInput);
		const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substring(2)}`;
		const formattedTime = `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${
			date.getHours() >= 12 ? 'PM' : 'AM'
		}`;
		return `${formattedDate}, ${formattedTime}`;
	}

	private static createGradient(
		context: CanvasRenderingContext2D,
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		colorStart: string,
		colorEnd: string,
	) {
		const gradient = context.createLinearGradient(x0, y0, x1, y1);
		gradient.addColorStop(0, colorStart);
		gradient.addColorStop(1, colorEnd);
		return gradient;
	}

	public static getNetworkLevel(exp: number): number {
		if (!exp) return 0;
		return Math.floor(Math.sqrt(2 * exp + 30625) / 50 - 2.5);
	}

	private static formatRank(hypixelPlayer: any) {
		const colorToHexTable: Record<string, string> = {
			BLACK: '#000000',
			DARK_BLUE: '#0000AA',
			DARK_GREEN: '#00AA00',
			DARK_AQUA: '#00AAAA',
			DARK_RED: '#AA0000',
			DARK_PURPLE: '#AA00AA',
			GOLD: '#FFAA00',
			GRAY: '#AAAAAA',
			DARK_GRAY: '#555555',
			BLUE: '#5555FF',
			GREEN: '#55FF55',
			AQUA: '#55FFFF',
			RED: '#FF5555',
			LIGHT_PURPLE: '#FF55FF',
			YELLOW: '#FFFF55',
			WHITE: '#FFFFFF',
		};
		const rankColorTable: Record<string, string> = {
			VIP: '#55FF55',
			MVP: '#55FFFF',
			VIP_PLUS: '#55FF55',
			MVP_PLUS: '#55FFFF',
			MVP_PLUS_PLUS_AQUA: '#55FFFF',
			MVP_PLUS_PLUS: '#FFAA00',
			ADMIN: '#FF5555',
			OWNER: '#FF5555',
			YOUTUBE: '#FFF',
			GAME_MASTER: '#00AA00',
			PIG_RANK: '#FF55FF',
		};
		if (!hypixelPlayer)
			return {
				pureRank: 'DEFAULT',
				purePlusColor: '',
				pureBracket: '',
				rankColor: '#FFFFFF',
				plusCount: 0,
			};
		let pureRank = 'DEFAULT',
			purePlusColor = '',
			pureBracket = '',
			plusCount = 0;
		const rankLogic = [
			{
				condition: (p: any) => p.newPackageRank && p.monthlyPackageRank === 'NONE',
				result: (p: any) => ({
					pureRank: p.newPackageRank,
					purePlusColor,
					pureBracket,
					plusCount,
				}),
			},
			{
				condition: (p: any) => p.rank === 'ADMIN',
				result: (p: any) => ({
					pureRank: p.prefix === '§c[OWNER]' ? 'OWNER' : 'ADMIN',
					purePlusColor,
					pureBracket,
					plusCount,
				}),
			},
			{
				condition: (p: any) => p.rank === 'GAME_MASTER',
				result: (p: any) => ({
					pureRank: 'GAME_MASTER',
					purePlusColor,
					pureBracket,
					plusCount,
				}),
			},
			{
				condition: (p: any) => p.rank === 'YOUTUBER',
				result: (p: any) => ({
					pureRank: p.prefix === '§d[PIG§b+++§d]' ? 'PIG_RANK' : 'YOUTUBE',
					purePlusColor,
					pureBracket,
					plusCount,
				}),
			},
			{
				condition: (p: any) => p.newPackageRank === 'MVP_PLUS' && p.monthlyPackageRank === 'NONE',
				result: (p: any) => ({
					pureRank: 'MVP_PLUS',
					purePlusColor: p.rankPlusColor || 'RED',
					pureBracket,
					plusCount: 1,
				}),
			},
			{
				condition: (p: any) => p.monthlyPackageRank,
				result: (p: any) => ({
					pureRank: p.monthlyRankColor === 'AQUA' ? 'MVP_PLUS_PLUS_AQUA' : 'MVP_PLUS_PLUS',
					purePlusColor: p.rankPlusColor || 'RED',
					pureBracket,
					plusCount: 2,
				}),
			},
			{
				condition: (p: any) => p.newPackageRank === 'VIP_PLUS',
				result: (p: any) => ({
					pureRank,
					purePlusColor: 'GOLD',
					pureBracket,
					plusCount: 1,
				}),
			},
		];
		for (const logic of rankLogic) {
			if (logic.condition(hypixelPlayer)) {
				const res = logic.result(hypixelPlayer);
				pureRank = res.pureRank;
				purePlusColor = res.purePlusColor;
				pureBracket = res.pureBracket;
				plusCount = res.plusCount;
			}
		}
		if (pureRank === 'YOUTUBE') pureBracket = 'RED';
		if (pureRank === 'PIG_RANK') {
			plusCount = 3;
			purePlusColor = 'AQUA';
		}
		return {
			pureRank,
			purePlusColor: colorToHexTable[purePlusColor] || '',
			pureBracket: colorToHexTable[pureBracket] || '',
			rankColor: rankColorTable[pureRank] || '#FFFFFF',
			plusCount,
		};
	}

	private static replaceWithStars(n: number): string {
		return n > 0 && n <= 4 ? '+'.repeat(n) : '';
	}
}
