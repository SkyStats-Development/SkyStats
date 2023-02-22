const chalk = require("chalk");


console.log(`───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───`)
console.log(`───█▒▒░░░░░░░░░▒▒█───`)
console.log(`────█░░█░░░░░█░░█────`)
console.log(`─▄▄──█░░░▀█▀░░░█──▄▄─`)
console.log(`█░░█─▀▄░░░░░░░▄▀─█░░█`)
console.log(`───█░░░▀▄░░░▄▀░░░█───`)
console.log(`───█░░░░░▀▀▀░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───█░░░░░░░░░░░░░█───`)
console.log(`───▀█▄         ▄█▀──`)
chalk.green(console.log(`Welcome to SkyStats v1.0.0 (Beta) Created by: Axle and the SkyStats Team`))

process.on("uncaughtException", function (err) {
  console.log(err);
});
const app = require("./src/Application");

app
  .register()
  .then(() => {
    app.connect();
  })
  .catch((err) => {
    console.error(err);
  });
