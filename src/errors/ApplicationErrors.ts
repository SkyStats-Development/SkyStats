import { BaseError } from './BaseError';

/**
 * API-related errors (Hypixel, external services)
 */
export class APIError extends BaseError {
	readonly statusCode = 500;
	readonly isOperational = true;
	readonly errorCode = 'API_ERROR';

	constructor(
		message: string,
		public readonly service: string,
		cause?: Error,
	) {
		super(`API Error (${service}): ${message}`, cause);
	}
}

/**
 * Database operation errors
 */
export class DatabaseError extends BaseError {
	readonly statusCode = 500;
	readonly isOperational = true;
	readonly errorCode = 'DATABASE_ERROR';

	constructor(message: string, cause?: Error) {
		super(`Database Error: ${message}`, cause);
	}
}

/**
 * Cache-related errors
 */
export class CacheError extends BaseError {
	readonly statusCode = 500;
	readonly isOperational = true;
	readonly errorCode = 'CACHE_ERROR';

	constructor(message: string, cause?: Error) {
		super(`Cache Error: ${message}`, cause);
	}
}

/**
 * User input validation errors
 */
export class ValidationError extends BaseError {
	readonly statusCode = 400;
	readonly isOperational = true;
	readonly errorCode = 'VALIDATION_ERROR';

	constructor(message: string, cause?: Error) {
		super(`Validation Error: ${message}`, cause);
	}
}

/**
 * Discord interaction errors
 */
export class DiscordError extends BaseError {
	readonly statusCode = 500;
	readonly isOperational = true;
	readonly errorCode = 'DISCORD_ERROR';

	constructor(message: string, cause?: Error) {
		super(`Discord Error: ${message}`, cause);
	}
}

/**
 * Configuration errors
 */
export class ConfigError extends BaseError {
	readonly statusCode = 500;
	readonly isOperational = false;
	readonly errorCode = 'CONFIG_ERROR';

	constructor(message: string, cause?: Error) {
		super(`Configuration Error: ${message}`, cause);
	}
}

/**
 * Player/profile not found errors
 */
export class NotFoundError extends BaseError {
	readonly statusCode = 404;
	readonly isOperational = true;
	readonly errorCode = 'NOT_FOUND';

	constructor(message: string, cause?: Error) {
		super(`Not Found: ${message}`, cause);
	}
}

/**
 * Rate limit errors
 */
export class RateLimitError extends BaseError {
	readonly statusCode = 429;
	readonly isOperational = true;
	readonly errorCode = 'RATE_LIMIT';

	constructor(
		message: string,
		public readonly retryAfter?: number,
		cause?: Error,
	) {
		super(`Rate Limited: ${message}`, cause);
	}
}
