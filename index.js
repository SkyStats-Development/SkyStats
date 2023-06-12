require('dotenv').config();
process.env.TOKEN = process.env.PROD;
process.env.ID = process.env.PRODID;

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
