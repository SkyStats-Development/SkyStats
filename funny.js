const chalk = require("chalk")

Logger()


function Logger(message){
  let space = chalk.bgBlack.black(" ")
  let color_bars = {
    error: chalk.bgBlack.red.bold("[ERROR]"),
    broadcast: chalk.bgBlack.bold.blue("[BRODCAST]"),
    internal: chalk.bgBlack.green.bold("[Internal]"),
    debug: chalk.bgBlack.gray.bold("[DEBUG]"),
    warn: chalk.bgBlack.yellow.bold("[WARN]")
  }
    Object.keys(color_bars).forEach(key => {
      console.log(color_bars[key]);
    });
  }
  let skystatsColor = chalk.hex("ffa600");
  return console.log(skystatsColor.bold.bgBlack(`[SkyStats | 10:43:33]`)
  )
