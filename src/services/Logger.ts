import chalk from 'chalk';

/**
 * Logger class for SkyStats. Handles colored, timestamped logs for various subsystems.
 */
export class Logger {
	/**
	 * Log a Discord-related message.
	 * @param message The message to log
	 */
	static async discord(message: string): Promise<void> {
		console.log(
			chalk.bgMagenta.black(`[${await Logger.getCurrentTime()}] Discord >`) + ' ' + chalk.magenta(message),
		);
	}

	/**
	 * Log a database-related message.
	 * @param message The message to log
	 */
	static async database(message: string): Promise<void> {
		console.log(
			chalk.bgMagentaBright.black(`[${await Logger.getCurrentTime()}] Database >`) +
				' ' +
				chalk.magentaBright(message),
		);
	}

	/**
	 * Log a logout message.
	 * @param message The message to log
	 */
	static async logout(message: string): Promise<void> {
		console.log(
			chalk.bgRedBright.black(`[${await Logger.getCurrentTime()}] Discord >`) + ' ' + chalk.redBright(message),
		);
	}

	/**
	 * Log a success message.
	 * @param message The message to log
	 */
	static async success(message: string): Promise<void> {
		console.log(
			chalk.bgGreenBright.black(`[${await Logger.getCurrentTime()}] Discord >`) +
				' ' +
				chalk.greenBright(message),
		);
	}

	/**
	 * Log a warning message.
	 * @param message The message to log
	 */
	static async warn(message: string): Promise<void> {
		console.log(chalk.bgYellow.black(`[${await Logger.getCurrentTime()}] Warning >`) + ' ' + chalk.yellow(message));
	}

	/**
	 * Log an error message.
	 * @param message The message to log
	 */
	static async error(message: string): Promise<void> {
		//console.error(message);
		console.log(
			chalk.bgRedBright.black(`[${await Logger.getCurrentTime()}] Error >`) + ' ' + chalk.redBright(message),
		);
	}

	/**
	 * Log a successful update message.
	 * @param message The message to log
	 */
	static async updateGood(message: string): Promise<void> {
		console.log(
			chalk.bgGreenBright.black(`[${await Logger.getCurrentTime()}] Update Checker >`) +
				' ' +
				chalk.greenBright(message),
		);
	}

	/**
	 * Log an update-in-progress message.
	 * @param message The message to log
	 */
	static async updateUpdating(message: string): Promise<void> {
		console.log(
			chalk.bgRedBright.black(`[${await Logger.getCurrentTime()}] Update Checker >`) +
				' ' +
				chalk.redBright(message),
		);
	}

	/**
	 * Log a broadcast message to a location.
	 * @param message The message to log
	 * @param location The location of the broadcast
	 */
	static async broadcast(message: string, location: string): Promise<void> {
		console.log(chalk.inverse(`[${await Logger.getCurrentTime()}] ${location} Broadcast >`) + ' ' + message);
	}

	/**
	 * Get the current time as a string.
	 * @returns The current time in HH:mm format
	 */
	static async getCurrentTime(): Promise<string> {
		return new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		});
	}
}
