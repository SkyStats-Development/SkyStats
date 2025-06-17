/**
 * Represents a single order summary (buy or sell) in the Skyblock Bazaar API.
 */
export interface BazaarOrderSummary {
	amount: number;
	pricePerUnit: number;
	orders: number;
}

/**
 * Represents the quick status object for a product in the Skyblock Bazaar API.
 */
export interface BazaarQuickStatus {
	productId: string;
	sellPrice: number;
	sellVolume: number;
	sellMovingWeek: number;
	sellOrders: number;
	buyPrice: number;
	buyVolume: number;
	buyMovingWeek: number;
	buyOrders: number;
}

/**
 * Represents a single product entry in the Skyblock Bazaar API.
 */
export interface BazaarProduct {
	product_id: string;
	sell_summary: BazaarOrderSummary[];
	buy_summary: BazaarOrderSummary[];
	quick_status: BazaarQuickStatus;
}

/**
 * Represents the full Skyblock Bazaar API response.
 */
export interface SkyblockBazaarResponse {
	success: boolean;
	lastUpdated: number;
	products: Record<string, BazaarProduct>;
}
