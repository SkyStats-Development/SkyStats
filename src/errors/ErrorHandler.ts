import { Logger } from '../services/Logger';
import { BaseError } from './BaseError';

/**
 * Global error handler for the application
 */
export class ErrorHandler {
	private static instance: ErrorHandler;

	private constructor() {
		// Private constructor for singleton
	}

	/**
	 * Get singleton instance
	 */
	static getInstance(): ErrorHandler {
		if (!ErrorHandler.instance) {
			ErrorHandler.instance = new ErrorHandler();
		}
		return ErrorHandler.instance;
	}

	/**
	 * Handle application errors
	 */
	async handleError(error: Error): Promise<void> {
		if (error instanceof BaseError) {
			await this.handleBaseError(error);
		} else {
			await this.handleUnknownError(error);
		}
	}

	/**
	 * Handle known application errors
	 */
	private async handleBaseError(error: BaseError): Promise<void> {
		// Log based on error type
		if (error.isOperational) {
			await Logger.error(`Operational error: ${error.message} | Code: ${error.errorCode}`);
		} else {
			await Logger.error(`Programming error: ${error.message} | Code: ${error.errorCode}`);
			// For non-operational errors, we might want to restart the application
			// This depends on your deployment strategy
		}
	}

	/**
	 * Handle unknown errors
	 */
	private async handleUnknownError(error: Error): Promise<void> {
		await Logger.error(`Unknown error: ${error.message} | Stack: ${error.stack}`);
	}

	/**
	 * Check if error is operational
	 */
	isOperationalError(error: Error): boolean {
		if (error instanceof BaseError) {
			return error.isOperational;
		}
		return false;
	}
}

/**
 * Global error handler setup
 */
export const setupGlobalErrorHandling = (): void => {
	const errorHandler = ErrorHandler.getInstance();

	// Handle uncaught exceptions
	process.on('uncaughtException', (error: Error) => {
		console.error('Uncaught Exception:', error);
		errorHandler.handleError(error);

		// For uncaught exceptions, we should exit the process
		process.exit(1);
	});

	// Handle unhandled promise rejections
	process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
		console.error('Unhandled Rejection at:', promise, 'reason:', reason);

		const error = reason instanceof Error ? reason : new Error(String(reason));
		errorHandler.handleError(error);
	});
};
