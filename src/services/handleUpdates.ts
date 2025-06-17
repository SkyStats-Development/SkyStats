import { exec } from 'child_process';
import { Logger } from './Logger';

/**
 * Handles updating the bot from the latest git changes.
 */
export function handleUpdates(): void {
	exec('git pull', (err, stdout, stderr) => {
		if (stdout.includes('Already up to date.')) Logger.updateGood('Already up to date!');
		else if (stdout.includes('Updating')) Logger.updateUpdating('Repository Updated from latest Github changes!');
	});
}
