export { BaseError } from './BaseError';
export {
	APIError,
	DatabaseError,
	CacheError,
	ValidationError,
	DiscordError,
	ConfigError,
	NotFoundError,
	RateLimitError,
} from './ApplicationErrors';
export { ErrorHandler, setupGlobalErrorHandling } from './ErrorHandler';
