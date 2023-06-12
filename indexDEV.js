require('dotenv').config();
process.env.TOKEN = process.env.DEV;
process.env.ID = process.env.DEVID;


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
  