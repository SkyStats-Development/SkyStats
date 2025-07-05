/**
 * Base error class for all application errors
 */
export abstract class BaseError extends Error {
	abstract readonly statusCode: number;
	abstract readonly isOperational: boolean;
	abstract readonly errorCode: string;

	constructor(
		message: string,
		public readonly cause?: Error,
	) {
		super(message);
		this.name = this.constructor.name;

		// Maintains proper stack trace for where our error was thrown
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}

	/**
	 * Get error details for logging
	 */
	getErrorDetails(): ErrorDetails {
		return {
			name: this.name,
			message: this.message,
			statusCode: this.statusCode,
			errorCode: this.errorCode,
			isOperational: this.isOperational,
			stack: this.stack,
			cause: this.cause?.message,
			timestamp: new Date().toISOString(),
		};
	}
}

export interface ErrorDetails {
	name: string;
	message: string;
	statusCode: number;
	errorCode: string;
	isOperational: boolean;
	stack?: string;
	cause?: string;
	timestamp: string;
}
