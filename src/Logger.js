const chalk = require("chalk");

async function discordMessage(message) {
  return console.log(
    chalk.bgMagenta.black(`[${await getCurrentTime()}] Discord >`) +
      " " +
      chalk.magenta(message)
  );
}
async function databaseMessage(message) {
  return console.log(
    chalk.bgMagentaBright.black(`[${await getCurrentTime()}] Database >`) +
      " " +
      chalk.magentaBright(message)
  );
}
async function logoutMessage(message) {
  return console.log(
    chalk.bgRedBright.black(`[${await getCurrentTime()}] Discord >`) +
      " " +
      chalk.redBright(message)
  );
}

async function successfulMessage(message) {
  return console.log(
    chalk.bgGreenBright.black(`[${await getCurrentTime()}] Discord >`) +
      " " +
      chalk.greenBright(message)
  );
}

async function warnMessage(message) {
  return console.log(
    chalk.bgYellow.black(`[${await getCurrentTime()}] Warning >`) +
      " " +
      chalk.yellow(message)
  );
}

async function errorMessage(message) {
  return console.log(
    chalk.bgRedBright.black(`[${await getCurrentTime()}] Error >`) +
      " " +
      chalk.redBright(message)
  );
}

async function updateGoodMessage(message) {
  return console.log(
    chalk.bgGreenBright.black(`[${await getCurrentTime()}] Update Checker >`) +
      " " +
      chalk.greenBright(message)
  );
}

async function updateUpdatingMessage(message) {
  return console.log(
    chalk.bgRedBright.black(`[${await getCurrentTime()}] Update Checker >`) +
      " " +
      chalk.redBright(message)
  );
}

async function broadcastMessage(message, location) {
  return console.log(
    chalk.inverse(`[${await getCurrentTime()}] ${location} Broadcast >`) +
      " " +
      message
  );
}

async function getCurrentTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

module.exports = {
  discordMessage,
  successfulMessage,
  databaseMessage,
  logoutMessage,
  warnMessage,
  errorMessage,
  updateUpdatingMessage,
  updateGoodMessage,
  broadcastMessage,
  getCurrentTime,
};
