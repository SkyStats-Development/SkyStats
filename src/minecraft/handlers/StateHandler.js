const EventHandler = require("../../contracts/EventHandler");
const Logger = require("../../Logger");

class StateHandler extends EventHandler {
  constructor(minecraft) {
    super();

    this.minecraft = minecraft;
    this.loginAttempts = 0;
    this.exactDelay = 0;
  }

  registerEvents(bot) {
    this.bot = bot;

    this.bot.on("login", (...args) => this.onLogin(...args));
    this.bot.on("kicked", (...args) => this.onKicked(...args));
  }

  onLogin() {
    Logger.minecraftMessage("Client ready, logged in as " + this.bot.username);

    this.loginAttempts = 0;
    this.exactDelay = 0;
  }

  onKicked(reason) {
    Logger.warnMessage(`Minecraft bot has been kicked from the server for "${reason}"`);

    this.loginAttempts++;
  }
}

module.exports = StateHandler;
