const DiscordManager = require("./discord/DiscordManager");
const MinecraftManager = require("./minecraft/MinecraftManager");

class Application {
  async register() {
    this.discord = new DiscordManager(this);
    this.minecraft = new MinecraftManager(this);
  }

  async connect() {
    this.discord.connect();
    this.minecraft.connect();
  }
}

module.exports = new Application();
