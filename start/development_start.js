require("dotenv").config();
process.env.TOKEN = process.env.DEV;
process.env.ID = process.env.DEVID;

process.on("uncaughtException", function (err) {
  console.log(err);
});
const app = require("../src/Application");
const db = require("../src/functions/handle/handleDatabase");
db.connect();
app
  .register()
  .then(() => {
    app.connect();
  })
  .catch((err) => {
    console.error(err);
  });


  inventory_value: addNotation("numbers", addCommas(inventory.toString().split(".")[0])),
  talisman_bag_value: addNotation("numbers", addCommas(accessories.toString().split(".")[0])),
  armor_value: addNotation("numbers", addCommas(armor.toString().split(".")[0])),
  enderchest_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),
  equipment_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),
  personal_vault_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),
  storage_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),
  museum_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),
  pet_value: addNotation("numbers", addCommas(networthRaw.toString().split(".")[0])),