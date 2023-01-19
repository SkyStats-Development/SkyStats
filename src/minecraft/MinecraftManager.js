const CommunicationBridge = require("../contracts/CommunicationBridge");
const StateHandler = require("./handlers/StateHandler");
const ErrorHandler = require("./handlers/ErrorHandler");
const ChatHandler = require("./handlers/ChatHandler");
const CommandHandler = require("./CommandHandler");
const config = require("../../config.json");
const mineflayer = require("mineflayer");
const Filter = require("bad-words");
const Logger = require("../Logger");
const filter = new Filter();

class MinecraftManager extends CommunicationBridge {
  constructor(app) {
    super();

    this.app = app;

    this.stateHandler = new StateHandler(this);
    this.errorHandler = new ErrorHandler(this);
    this.chatHandler = new ChatHandler(this, new CommandHandler(this));

  }

  connect() {
    global.bot = this.createBotConnection();
    this.bot = bot;

    this.errorHandler.registerEvents(this.bot);
    this.stateHandler.registerEvents(this.bot);
    this.chatHandler.registerEvents(this.bot);
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: "mc.hypixel.net",
      port: 25565,
      auth: "microsoft",
      version: '1.8.9',
      viewDistance: 'tiny',
      chatLengthLimit: 256,
    });
  }


}

module.exports = MinecraftManager;
