const { exec } = require('child_process');
const Logger = require('../../Logger')
    function handleUpdates() {
        exec('git pull', (err, stdout, stderr) => {
            if (stdout.includes('Already up to date.')) Logger.updateGoodMessage("Already up to date!");
            else if (stdout.includes('Updating')) Logger.updateUpdatingMessage("Repository Updated from latest Github changes!");
        });
    } 
    module.exports = { handleUpdates };