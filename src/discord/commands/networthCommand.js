const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");
const { getLatestProfile } = require("../../../API/functions/getLatestProfile");
const { addNotation, addCommas } = require("../../contracts/helperFunctions");
const messages = require("../../../messages.json");
const { default: axios } = require("axios");
const config = require("../../../config.json");
const { chooseFormat } = require("ytdl-core");

module.exports = {
  name: "networth",
  description: "Fetches your networth!",
  options: [
    {
      name: "name",
      description: "Minecraft Username",
      type: 3,
      required: false,
    },
  ],

  execute: async (interaction) => {
    try {
      await interaction.deferReply();
      //database
      const linked = require("../../../data/discordLinked.json");
      const uuid = linked?.[interaction?.user?.id]?.data[0];
      //discord
      const name = interaction.options.getString("name") || uuid;

      //name stuff
      const username = (
        await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
      ).data.data.player.username;
      const uuid2 = (
        await axios.get(`https://playerdb.co/api/player/minecraft/${name}`)
      ).data.data.player.raw_id;

      const data = await getLatestProfile(name);
      const profilename = data.profileData.cute_name;
      const proflieid = data.profileData.profile_id;
      const networthraw = (
        await axios.get(
          `http://103.54.59.82:3000/v2/profile/${uuid2}/${proflieid}?key=${config.api.skyStatsKey}`
        )
      ).data;

      // all item types with their networth values :D Credits to Shiiyu and SkyCrypt for the data
      //NETWORTH
      const networth = networthraw.data.networth.networth
        .toString()
        .split(".")[0];
      const formatted_networth = addNotation("numbers", addCommas(networth));
      const shortnetworth = addNotation("oneLetters", networth);
      //unsoulbound
      const soulbound = networthraw.data.networth.unsoulboundNetworth
        .toString()
        .split(".")[0];
      const formatted_soulbound = addNotation("numbers", addCommas(soulbound));
      const shortunsoulbound = addNotation("oneLetters", soulbound);
      //Cookies
      const cookieprice = (
        await axios.get(`https://sky.shiiyu.moe/api/v2/bazaar`)
      ).data.BOOSTER_COOKIE.sellPrice
        .toString()
        .split(".")[0];
      const cookies = Math.round(networth / cookieprice);
      const value = Math.round(cookies * 2.27);
      const irlnw = addNotation("numbers", addCommas(value));
      //bank
      const banku = networthraw.data.bank.toString().split(".")[0];
      const formatted_bank = addNotation("oneLetters", banku);
      //purse
      const purseu = networthraw.data.purse;
      //sacks
      const sack = networthraw.data.networth.types.sacks.total;
      const essence = networthraw.data.networth.types.essence.total;
      const sackvalue = Math.round((sack + essence) * 100) / 100;
      //misc
      const candy_inventory =
        networthraw.data.networth.types.candy_inventory.total;
      const potion_bag = networthraw.data.networth.types.potion_bag.total;
      const fishing_bag = networthraw.data.networth.types.fishing_bag.total;
      const misc =
        Math.round((candy_inventory + potion_bag + fishing_bag) * 100) / 100;
      //armor done
      const armor = networthraw.data.networth.types.armor.total;
      const armor1 =
        networthraw.data.networth.types.armor.items[0]?.name ||
        `No Items Found`;
      const armorprice1 =
        networthraw.data.networth.types.armor.items[0]?.price || ` `;
      const armor2 =
        networthraw.data.networth.types.armor.items[1]?.name || ` `;
      const armorprice2 =
        networthraw.data.networth.types.armor.items[1]?.price || ` `;
      const armor3 =
        networthraw.data.networth.types.armor.items[2]?.name || ` `;
      const armorprice3 =
        networthraw.data.networth.types.armor.items[2]?.price || ` `;
      const armor4 =
        networthraw.data.networth.types.armor.items[3]?.name || ` `;
      const armorprice4 =
        networthraw.data.networth.types.armor.items[3]?.price || ` `;
      //equipment done
      const equipment = networthraw.data.networth.types.equipment.total;
      const equipment1 =
        networthraw.data.networth.types.equipment.items[0]?.name ||
        `No Items Found`;
      const equipmentprice1 =
        networthraw.data.networth.types.equipment.items[0]?.price || ` `;
      const equipment2 =
        networthraw.data.networth.types.equipment.items[1]?.name || ` `;
      const equipmentprice2 =
        networthraw.data.networth.types.equipment.items[1]?.price || ` `;
      const equipment3 =
        networthraw.data.networth.types.equipment.items[2]?.name || ` `;
      const equipmentprice3 =
        networthraw.data.networth.types.equipment.items[2]?.price || ` `;
      const equipment4 =
        networthraw.data.networth.types.equipment.items[3]?.name || ` `;
      const equipmentprice4 =
        networthraw.data.networth.types.equipment.items[3]?.price || ` `;
      //wardrobe done
      const wardrobe = networthraw.data.networth.types.wardrobe.total;
      const wardrobe1 =
        networthraw.data.networth.types.wardrobe.items[0]?.name ||
        `No Items Found`;
      const wardrobeprice1 =
        networthraw.data.networth.types.wardrobe.items[0]?.price || ` `;
      const wardrobe2 =
        networthraw.data.networth.types.wardrobe.items[1]?.name || ` `;
      const wardrobeprice2 =
        networthraw.data.networth.types.wardrobe.items[1]?.price || ` `;
      const wardrobe3 =
        networthraw.data.networth.types.wardrobe.items[2]?.name || ` `;
      const wardrobeprice3 =
        networthraw.data.networth.types.wardrobe.items[2]?.price || ` `;
      const wardrobe4 =
        networthraw.data.networth.types.wardrobe.items[3]?.name || ` `;
      const wardrobeprice4 =
        networthraw.data.networth.types.wardrobe.items[3]?.price || ` `;
      const wardrobe5 =
        networthraw.data.networth.types.wardrobe.items[4]?.name || ` `;
      const wardrobeprice5 =
        networthraw.data.networth.types.wardrobe.items[4]?.price || ` `;
      //inventory invrecomb done
      const inventory = networthraw.data.networth.types.inventory.total;
      const inventory1 =
        networthraw.data.networth.types.inventory.items[0]?.name ||
        `No Items Found`;
      const inventoryprice1 =
        networthraw.data.networth.types.inventory.items[0]?.price || ` `;
      const inventory2 =
        networthraw.data.networth.types.inventory.items[1]?.name || ` `;
      const inventoryprice2 =
        networthraw.data.networth.types.inventory.items[1]?.price || ` `;
      const inventory3 =
        networthraw.data.networth.types.inventory.items[2]?.name || ` `;
      const inventoryprice3 =
        networthraw.data.networth.types.inventory.items[2]?.price || ` `;
      const invrecomb4 =
        (networthraw.data.networth.types.inventory.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const inventoryprice4 =
        networthraw.data.networth.types.inventory.items[3]?.price || ` `;
      const inventory5 =
        networthraw.data.networth.types.inventory.items[4]?.name || ` `;
      const inventoryprice5 =
        networthraw.data.networth.types.inventory.items[4]?.price || ` `;
      //enderchest done
      const enderchest = networthraw.data.networth.types.enderchest.total;
      const enderchest1 =
        networthraw.data.networth.types.enderchest.items[0]?.name ||
        "No Items Found";
      const enderchestprice1 =
        networthraw.data.networth.types.enderchest.items[0]?.price || ` `;
      const enderchest2 =
        networthraw.data.networth.types.enderchest.items[1]?.name || ` `;
      const enderchestprice2 =
        networthraw.data.networth.types.enderchest.items[1]?.price || ` `;
      const enderchest3 =
        networthraw.data.networth.types.enderchest.items[2]?.name || ` `;
      const enderchestprice3 =
        networthraw.data.networth.types.enderchest.items[2]?.price || ` `;
      const enderchest4 =
        networthraw.data.networth.types.enderchest.items[3]?.name || ` `;
      const enderchestprice4 =
        networthraw.data.networth.types.enderchest.items[3]?.price || ` `;
      const enderchest5 =
        networthraw.data.networth.types.enderchest.items[4]?.name || ` `;
      const enderchestprice5 =
        networthraw.data.networth.types.enderchest.items[4]?.price || ` `;
      //storage done
      const storage = networthraw.data.networth.types.storage.total;
      const storage1 =
        networthraw.data.networth.types.storage.items[0]?.name ||
        `No Items Found`;
      const storageprice1 =
        networthraw.data.networth.types.storage.items[0]?.price || ` `;
      const storage2 =
        networthraw.data.networth.types.storage.items[1]?.name || ` `;
      const storageprice2 =
        networthraw.data.networth.types.storage.items[1]?.price || ` `;
      const storage3 =
        networthraw.data.networth.types.storage.items[2]?.name || ` `;
      const storageprice3 =
        networthraw.data.networth.types.storage.items[2]?.price || ` `;
      const storage4 =
        networthraw.data.networth.types.storage.items[3]?.name || ` `;
      const storageprice4 =
        networthraw.data.networth.types.storage.items[3]?.price || ` `;
      const storage5 =
        networthraw.data.networth.types.storage.items[4]?.name || ` `;
      const storageprice5 =
        networthraw.data.networth.types.storage.items[4]?.price || ` `;
      //pets
      const pets = networthraw.data.networth.types.pets.total;
      const pets1 =
        networthraw.data.networth.types.pets.items[0]?.name || "No Items Found";
      const petsprice1 =
        networthraw.data.networth.types.pets.items[0]?.price || ` `;
      const pets2 = networthraw.data.networth.types.pets.items[1]?.name || ` `;
      const petsprice2 =
        networthraw.data.networth.types.pets.items[1]?.price || ` `;
      const pets3 = networthraw.data.networth.types.pets.items[2]?.name || ` `;
      const petsprice3 =
        networthraw.data.networth.types.pets.items[2]?.price || ` `;
      const pets4 = networthraw.data.networth.types.pets.items[3]?.name || ` `;
      const petsprice4 =
        networthraw.data.networth.types.pets.items[3]?.price || ` `;
      const pets5 = networthraw.data.networth.types.pets.items[4]?.name || ` `;
      const petsprice5 =
        networthraw.data.networth.types.pets.items[4]?.price || ` `;
      //accessories recomb done
      const accessories = networthraw.data.networth.types.accessories.total;
      const accessories1 =
        networthraw.data.networth.types.accessories.items[0]?.name ||
        `No Items Found`;
      const accessoriesprice1 =
        networthraw.data.networth.types.accessories.items[0]?.price || ` `;
      const accessories2 =
        networthraw.data.networth.types.accessories.items[1]?.name || ` `;
      const accessoriesprice2 =
        networthraw.data.networth.types.accessories.items[1]?.price || ` `;
      const accessories3 =
        networthraw.data.networth.types.accessories.items[2]?.name || ` `;
      const accessoriesprice3 =
        networthraw.data.networth.types.accessories.items[2]?.price || ` `;
      const accessories4 =
        networthraw.data.networth.types.accessories.items[3]?.name || ` `;
      const accessoriesprice4 =
        networthraw.data.networth.types.accessories.items[3]?.price || ` `;
      const accessories5 =
        networthraw.data.networth.types.accessories.items[4]?.name || ` `;
      const accessoriesprice5 =
        networthraw.data.networth.types.accessories.items[4]?.price || ` `;
      //personal_vault recomb done
      const personal_vault =
        networthraw.data.networth.types.personal_vault.total;
      const personal_vault1 =
        networthraw.data.networth.types.personal_vault.items[0]?.name ||
        `No Items Found`;
      const personal_vaultprice1 =
        networthraw.data.networth.types.personal_vault.items[0]?.price || ` `;
      const personal_vault2 =
        networthraw.data.networth.types.personal_vault.items[1]?.name || ` `;
      const personal_vaultprice2 =
        networthraw.data.networth.types.personal_vault.items[1]?.price || ` `;
      const personal_vault3 =
        networthraw.data.networth.types.personal_vault.items[2]?.name || ` `;
      const personal_vaultprice3 =
        networthraw.data.networth.types.personal_vault.items[2]?.price || ` `;
      const personal_vault4 =
        networthraw.data.networth.types.personal_vault.items[3]?.name || ` `;
      const personal_vaultprice4 =
        networthraw.data.networth.types.personal_vault.items[3]?.price || ` `;

      //recombobulator handlers :sob:
      //inventory
      const invrecomb1 =
        (networthraw.data.networth.types.inventory.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const inventoryrecombobulated1 = invrecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const invrecomb2 =
        (networthraw.data.networth.types.inventory.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const inventoryrecombobulated2 = invrecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const invrecomb3 =
        (networthraw.data.networth.types.inventory.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const inventoryrecombobulated3 = invrecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const inventory4 =
        networthraw.data.networth.types.inventory.items[3]?.name || ` `;
      const inventoryrecombobulated4 = invrecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const invrecomb5 =
        (networthraw.data.networth.types.inventory.items[4]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const inventoryrecombobulated5 = invrecomb5
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //wardrobe
      const wardroberecomb1 =
        (networthraw.data.networth.types.wardrobe.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const wardroberecombobulated1 = wardroberecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const wardroberecomb2 =
        (networthraw.data.networth.types.wardrobe.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const wardroberecombobulated2 = wardroberecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const wardroberecomb3 =
        (networthraw.data.networth.types.wardrobe.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const wardroberecombobulated3 = wardroberecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const wardroberecomb4 =
        (networthraw.data.networth.types.wardrobe.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const wardroberecombobulated4 = wardroberecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const wardroberecomb5 =
        (networthraw.data.networth.types.wardrobe.items[4]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const wardroberecombobulated5 = wardroberecomb5
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //enderchest
      const enderchestrecomb1 =
        (networthraw.data.networth.types.enderchest.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const enderchestrecombobulated1 = enderchestrecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const enderchestrecomb2 =
        (networthraw.data.networth.types.enderchest.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const enderchestrecombobulated2 = enderchestrecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const enderchestrecomb3 =
        (networthraw.data.networth.types.enderchest.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const enderchestrecombobulated3 = enderchestrecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const enderchestrecomb4 =
        (networthraw.data.networth.types.enderchest.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const enderchestrecombobulated4 = enderchestrecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const enderchestrecomb5 =
        (networthraw.data.networth.types.enderchest.items[4]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const enderchestrecombobulated5 = enderchestrecomb5
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //personal vault
      //accessories
      const accessoriesrecomb1 =
        (networthraw.data.networth.types.accessories.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const accessoriesrecombobulated1 = accessoriesrecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const accessoriesrecomb2 =
        (networthraw.data.networth.types.accessories.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const accessoriesrecombobulated2 = accessoriesrecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const accessoriesrecomb3 =
        (networthraw.data.networth.types.accessories.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const accessoriesrecombobulated3 = accessoriesrecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const accessoriesrecomb4 =
        (networthraw.data.networth.types.accessories.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const accessoriesrecombobulated4 = accessoriesrecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const accessoriesrecomb5 =
        (networthraw.data.networth.types.accessories.items[4]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const accessoriesrecombobulated5 = accessoriesrecomb5
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //storage
      const storagerecomb1 =
        (networthraw.data.networth.types.storage.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const storagerecombobulated1 = storagerecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const storagerecomb2 =
        (networthraw.data.networth.types.storage.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const storagerecombobulated2 = storagerecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const storagerecomb3 =
        (networthraw.data.networth.types.storage.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const storagerecombobulated3 = storagerecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const storagerecomb4 =
        (networthraw.data.networth.types.storage.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const storagerecombobulated4 = storagerecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const storagerecomb5 =
        (networthraw.data.networth.types.storage.items[4]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const storagerecombobulated5 = storagerecomb5
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //armor
      const armorrecomb1 =
        (networthraw.data.networth.types.armor.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const armorrecombobulated1 = armorrecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const armorrecomb2 =
        (networthraw.data.networth.types.armor.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const armorrecombobulated2 = armorrecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const armorrecomb3 =
        (networthraw.data.networth.types.armor.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const armorrecombobulated3 = armorrecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const armorrecomb4 =
        (networthraw.data.networth.types.armor.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const armorrecombobulated4 = armorrecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //equipment
      const equipmentrecomb1 =
        (networthraw.data.networth.types.equipment.items[0]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const equipmentrecombobulated1 = equipmentrecomb1
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const equipmentrecomb2 =
        (networthraw.data.networth.types.equipment.items[1]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const equipmentrecombobulated2 = equipmentrecomb2
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const equipmentrecomb3 =
        (networthraw.data.networth.types.equipment.items[2]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const equipmentrecombobulated3 = equipmentrecomb3
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      const equipmentrecomb4 =
        (networthraw.data.networth.types.equipment.items[3]?.calculation)?.some(
          (a) => a.id === "RECOMBOBULATOR_3000"
        );
      const equipmentrecombobulated4 = equipmentrecomb4
        ? "<:RECOMBOBULATOR_3000:1069185517511524362>"
        : "";
      //pet candy
      const pcandy1 = networthraw.data.networth.types.pets.items[0]?.candyUsed;
      function formatPetCandy(pcandy1) {
        return pcandy1 > 0 ? "<:carrot:1072129687427498012>" : "";
      }

      const petcandy1 = formatPetCandy(pcandy1);
      const pcandy2 = networthraw.data.networth.types.pets.items[1]?.candyUsed;
      function formatPetCandy(pcandy2) {
        return pcandy2 > 0 ? "<:carrot:1072129687427498012>" : "";
      }
      const petcandy2 = formatPetCandy(pcandy2);
      const pcandy3 = networthraw.data.networth.types.pets.items[2]?.candyUsed;
      function formatPetCandy(pcandy3) {
        return pcandy3 > 0 ? "<:carrot:1072129687427498012>" : "";
      }
      const petcandy3 = formatPetCandy(pcandy3);
      const pcandy4 = networthraw.data.networth.types.pets.items[3]?.candyUsed;
      function formatPetCandy(pcandy4) {
        return pcandy4 > 0 ? "<:carrot:1072129687427498012>" : "";
      }
      const petcandy4 = formatPetCandy(pcandy4);
      const pcandy5 = networthraw.data.networth.types.pets.items[4]?.candyUsed;
      function formatPetCandy(pcandy5) {
        return pcandy5 > 0 ? "<:carrot:1072129687427498012>" : "";
      }
      const petcandy5 = formatPetCandy(pcandy5);
      //pet items
      const petitem1 = networthraw.data.networth.types.pets.items[0]?.heldItem;
      let petItem1 = "";
      if (petitem1 === "PET_ITEM_LUCKY_CLOVER") {
        petItem1 = "<a:Lucky_Clover:1072396488346456175>";
      } else if (petitem1 === "PET_ITEM_SPOOKY_CUPCAKE") {
        petItem1 = "<:Spooky_Cupcake:1072396596400095262>";
      } else if (petitem1 === "PET_ITEM_TOY_JERRY") {
        petItem1 = "<:Jerry_3D_Glasses:1072396693494038559>";
      } else if (petitem1 === "PET_ITEM_QUICK_CLAW") {
        petItem1 = "<:Quick_Claw:1072396796766199899>";
      } else if (petitem1 === "PET_ITEM_EXP_SHARE") {
        petItem1 = "<a:Exp_Share:1072397058780168262>";
      } else if (petitem1 === "PET_ITEM_TIER_BOOST") {
        petItem1 = "<a:Tier_Boost:1072397214212702288>";
      } else if (petitem1 === "PET_ITEM_BUBBLEGUM") {
        petItem1 = "<a:Bubblegum:1072397319129006171>";
      } else if (petitem1 === "PET_ITEM_VAMPIRE_FANG") {
        petItem1 = "<:Vampire_Fang:1072397412590702663>";
      } else if (petitem1 === "PET_ITEM_FLYING_PIG") {
        petItem1 = "<:Flying_Pig:1072397499089817641>";
      } else if (petitem1 === "PET_ITEM_SADDLE") {
        petItem1 = "<a:Saddle:1072397586713030727>";
      } else if (petitem1 === "CROCHET_TIGER_PLUSHIE") {
        petItem1 = "<:Crochet_Tiger_Plushie:1072397677624569887>";
      } else if (petitem1 === "REAPER_GEM") {
        petItem1 = "<a:Reaper_Gem:1072397765809799288>";
      } else if (petitem1 === "MINOS_RELIC") {
        petItem1 = "<:Minos_Relic:1072397896139423824>";
      } else if (petitem1 === "PET_ITEM_TEXTBOOK") {
        petItem1 = "<a:Textbook:1072397987776569364>";
      } else if (petitem1 === "ANTIQUE_REMEDIES") {
        petItem1 = "<:Antique_Remedies:1072398120299790347>";
      } else if (petitem1 === "WASHED_UP_SOUVENIR") {
        petItem1 = "<:Washedup_Souvenir:1072398232589713448>";
      } else if (petitem1 === "SERRATED_CLAWS") {
        petItem1 = "<a:Serrated_Claws:1072398314126987264>";
      } else if (petitem1 === "BIGGER_TEETH") {
        petItem1 = "<:Bigger_Teeth:1072398401888587796>";
      } else if (petitem1 === "DWARF_TURTLE_SHELMET") {
        petItem1 = "<:Dwarf_Turtle_Shelmet:1072398560982745129>";
      } else if (petitem1 === "ALL_SKILLS_SUPER_BOOST") {
        petItem1 = "<a:All_Skills_Exp_SuperBoost:1072398671536209960>";
      } else if (petitem1 === "GOLD_CLAWS") {
        petItem1 = "<a:Gold_Claws:1072398736292069457>";
      } else if (petitem1 === "REINFORCED_SCALES") {
        petItem1 = "<a:Reinforced_Scales:1072398856114946098>";
      } else if (petitem1?.startsWith("PET_ITEM_IRON_CLAWS")) {
        petItem1 = "<a:Iron_Claws:1072398962654449674>";
      } else if (petitem1?.startsWith("PET_ITEM_SHARPENED_CLAWS")) {
        petItem1 = "<a:Sharpened_Claws:1072399034075058257>";
      } else if (petitem1?.startsWith("PET_ITEM_BIG_TEETH")) {
        petItem1 = "<:Big_Teeth:1072399130000003072>";
      } else if (petitem1?.startsWith("PET_ITEM_HARDEND_SCALES")) {
        petItem1 = "<a:Hardened_Scales:1072399215000002560>";
      } else if (petitem1?.startsWith("PET_ITEM_FARMING_SKILL_BOOST")) {
        petItem1 = "<a:Farming_Exp_Boost:1072399332373975040>";
      } else if (petitem1?.startsWith("PET_ITEM_FORAGING_SKILL_BOOST")) {
        petItem1 = "<a:Foraging_Exp_Boost:1072399408341200948>";
      } else if (petitem1?.startsWith("PET_ITEM_COMBAT_SKILL_BOOST")) {
        petItem1 = "<a:Combat_Exp_Boost:1072399483146612746>";
      } else if (petitem1?.startsWith("PET_ITEM_FISHING_SKILL_BOOST")) {
        petItem1 = "<a:Fishing_Exp_Boost:1072399580018245652>";
      } else if (petitem1?.startsWith("PET_ITEM_ALL_SKILLS_BOOST")) {
        petItem1 = "<a:All_Skills_Exp_Boost:1072399662306316358>";
      } else if (petitem1 === null) {
        petItem1 = "";
      } else {
        petItem1 = "";
        console.log(
          "Pet item was not found in the list... Please add it to the list."
        );
      }
      const petitem2 = networthraw.data.networth.types.pets.items[1]?.heldItem;
      let petItem2 = "";
      if (petitem2 === "PET_ITEM_LUCKY_CLOVER") {
        petItem2 = "<a:Lucky_Clover:1072396488346456175>";
      } else if (petitem2 === "PET_ITEM_SPOOKY_CUPCAKE") {
        petItem2 = "<:Spooky_Cupcake:1072396596400095262>";
      } else if (petitem2 === "PET_ITEM_TOY_JERRY") {
        petItem2 = "<:Jerry_3D_Glasses:1072396693494038559>";
      } else if (petitem2 === "PET_ITEM_QUICK_CLAW") {
        petItem2 = "<:Quick_Claw:1072396796766199899>";
      } else if (petitem2 === "PET_ITEM_EXP_SHARE") {
        petItem2 = "<a:Exp_Share:1072397058780168262>";
      } else if (petitem2 === "PET_ITEM_TIER_BOOST") {
        petItem2 = "<a:Tier_Boost:1072397214212702288>";
      } else if (petitem2 === "PET_ITEM_BUBBLEGUM") {
        petItem2 = "<a:Bubblegum:1072397319129006171>";
      } else if (petitem2 === "PET_ITEM_VAMPIRE_FANG") {
        petItem2 = "<:Vampire_Fang:1072397412590702663>";
      } else if (petitem2 === "PET_ITEM_FLYING_PIG") {
        petItem2 = "<:Flying_Pig:1072397499089817641>";
      } else if (petitem2 === "PET_ITEM_SADDLE") {
        petItem2 = "<a:Saddle:1072397586713030727>";
      } else if (petitem2 === "CROCHET_TIGER_PLUSHIE") {
        petItem2 = "<:Crochet_Tiger_Plushie:1072397677624569887>";
      } else if (petitem2 === "REAPER_GEM") {
        petItem2 = "<a:Reaper_Gem:1072397765809799288>";
      } else if (petitem2 === "MINOS_RELIC") {
        petItem2 = "<:Minos_Relic:1072397896139423824>";
      } else if (petitem2 === "PET_ITEM_TEXTBOOK") {
        petItem2 = "<a:Textbook:1072397987776569364>";
      } else if (petitem2 === "ANTIQUE_REMEDIES") {
        petItem2 = "<:Antique_Remedies:1072398120299790347>";
      } else if (petitem2 === "WASHED_UP_SOUVENIR") {
        petItem2 = "<:Washedup_Souvenir:1072398232589713448>";
      } else if (petitem2 === "SERRATED_CLAWS") {
        petItem2 = "<a:Serrated_Claws:1072398314126987264>";
      } else if (petitem2 === "BIGGER_TEETH") {
        petItem2 = "<:Bigger_Teeth:1072398401888587796>";
      } else if (petitem2 === "DWARF_TURTLE_SHELMET") {
        petItem2 = "<:Dwarf_Turtle_Shelmet:1072398560982745129>";
      } else if (petitem2 === "ALL_SKILLS_SUPER_BOOST") {
        petItem2 = "<a:All_Skills_Exp_SuperBoost:1072398671536209960>";
      } else if (petitem2 === "GOLD_CLAWS") {
        petItem2 = "<a:Gold_Claws:1072398736292069457>";
      } else if (petitem2 === "REINFORCED_SCALES") {
        petItem2 = "<a:Reinforced_Scales:1072398856114946098>";
      } else if (petitem2?.startsWith("PET_ITEM_IRON_CLAWS")) {
        petItem2 = "<a:Iron_Claws:1072398962654449674>";
      } else if (petitem2?.startsWith("PET_ITEM_SHARPENED_CLAWS")) {
        petItem2 = "<a:Sharpened_Claws:1072399034075058257>";
      } else if (petitem2?.startsWith("PET_ITEM_BIG_TEETH")) {
        petItem2 = "<:Big_Teeth:1072399130000003072>";
      } else if (petitem2?.startsWith("PET_ITEM_HARDEND_SCALES")) {
        petItem2 = "<a:Hardened_Scales:1072399215000002560>";
      } else if (petitem2?.startsWith("PET_ITEM_FARMING_SKILL_BOOST")) {
        petItem2 = "<a:Farming_Skill_Exp_Boost:1072399300000002048>";
      } else if (petitem2?.startsWith("PET_ITEM_FORAGING_SKILL_BOOST")) {
        petItem2 = "<a:Foraging_Exp_Boost:1072399408341200948>";
      } else if (petitem2?.startsWith("PET_ITEM_COMBAT_SKILL_BOOST")) {
        petItem2 = "<a:Combat_Exp_Boost:1072399483146612746>";
      } else if (petitem2?.startsWith("PET_ITEM_FISHING_SKILL_BOOST")) {
        petItem2 = "<a:Fishing_Exp_Boost:1072399580018245652>";
      } else if (petitem2?.startsWith("PET_ITEM_ALL_SKILLS_BOOST")) {
        petItem2 = "<a:All_Skills_Exp_Boost:1072399662306316358>";
      } else if (petitem2 === null) {
        petItem2 = "";
      } else {
        petItem2 = "";
        console.log(
          "Pet item was not found in the list... Please add it to the list."
        );
      }
      const petitem3 = networthraw.data.networth.types.pets.items[2]?.heldItem;
      let petItem3 = "";
      if (petitem3 === "PET_ITEM_LUCKY_CLOVER") {
        petItem3 = "<a:Lucky_Clover:1072396488346456175>";
      } else if (petitem3 === "PET_ITEM_SPOOKY_CUPCAKE") {
        petItem3 = "<:Spooky_Cupcake:1072396596400095262>";
      } else if (petitem3 === "PET_ITEM_TOY_JERRY") {
        petItem3 = "<:Jerry_3D_Glasses:1072396693494038559>";
      } else if (petitem3 === "PET_ITEM_QUICK_CLAW") {
        petItem3 = "<:Quick_Claw:1072396796766199899>";
      } else if (petitem3 === "PET_ITEM_EXP_SHARE") {
        petItem3 = "<a:Exp_Share:1072397058780168262>";
      } else if (petitem3 === "PET_ITEM_TIER_BOOST") {
        petItem3 = "<a:Tier_Boost:1072397214212702288>";
      } else if (petitem3 === "PET_ITEM_BUBBLEGUM") {
        petItem3 = "<a:Bubblegum:1072397319129006171>";
      } else if (petitem3 === "PET_ITEM_VAMPIRE_FANG") {
        petItem3 = "<:Vampire_Fang:1072397412590702663>";
      } else if (petitem3 === "PET_ITEM_FLYING_PIG") {
        petItem3 = "<:Flying_Pig:1072397499089817641>";
      } else if (petitem3 === "PET_ITEM_SADDLE") {
        petItem3 = "<a:Saddle:1072397586713030727>";
      } else if (petitem3 === "CROCHET_TIGER_PLUSHIE") {
        petItem3 = "<:Crochet_Tiger_Plushie:1072397677624569887>";
      } else if (petitem3 === "REAPER_GEM") {
        petItem3 = "<a:Reaper_Gem:1072397765809799288>";
      } else if (petitem3 === "MINOS_RELIC") {
        petItem3 = "<:Minos_Relic:1072397896139423824>";
      } else if (petitem3 === "PET_ITEM_TEXTBOOK") {
        petItem3 = "<a:Textbook:1072397987776569364>";
      } else if (petitem3 === "ANTIQUE_REMEDIES") {
        petItem3 = "<:Antique_Remedies:1072398120299790347>";
      } else if (petitem3 === "WASHED_UP_SOUVENIR") {
        petItem3 = "<:Washedup_Souvenir:1072398232589713448>";
      } else if (petitem3 === "SERRATED_CLAWS") {
        petItem3 = "<a:Serrated_Claws:1072398314126987264>";
      } else if (petitem3 === "BIGGER_TEETH") {
        petItem3 = "<:Bigger_Teeth:1072398401888587796>";
      } else if (petitem3 === "DWARF_TURTLE_SHELMET") {
        petItem3 = "<:Dwarf_Turtle_Shelmet:1072398560982745129>";
      } else if (petitem3 === "ALL_SKILLS_SUPER_BOOST") {
        petItem3 = "<a:All_Skills_Exp_SuperBoost:1072398671536209960>";
      } else if (petitem3 === "GOLD_CLAWS") {
        petItem3 = "<a:Gold_Claws:1072398736292069457>";
      } else if (petitem3 === "REINFORCED_SCALES") {
        petItem3 = "<a:Reinforced_Scales:1072398856114946098>";
      } else if (petitem3?.startsWith("PET_ITEM_IRON_CLAWS")) {
        petItem3 = "<a:Iron_Claws:1072398962654449674>";
      } else if (petitem3?.startsWith("PET_ITEM_SHARPENED_CLAWS")) {
        petItem3 = "<a:Sharpened_Claws:1072399034075058257>";
      } else if (petitem3?.startsWith("PET_ITEM_BIG_TEETH")) {
        petItem3 = "<:Big_Teeth:1072399130000003072>";
      } else if (petitem3?.startsWith("PET_ITEM_HARDEND_SCALES")) {
        petItem3 = "<a:Hardened_Scales:1072399215000002560>";
      } else if (petitem3?.startsWith("PET_ITEM_FARMING_SKILL_BOOST")) {
        petItem3 = "<a:Farming_Exp_Boost:1072399332373975040>";
      } else if (petitem3?.startsWith("PET_ITEM_FORAGING_SKILL_BOOST")) {
        petItem3 = "<a:Foraging_Exp_Boost:1072399408341200948>";
      } else if (petitem3?.startsWith("PET_ITEM_COMBAT_SKILL_BOOST")) {
        petItem3 = "<a:Combat_Exp_Boost:1072399483146612746>";
      } else if (petitem3?.startsWith("PET_ITEM_FISHING_SKILL_BOOST")) {
        petItem3 = "<a:Fishing_Exp_Boost:1072399580018245652>";
      } else if (petitem3?.startsWith("PET_ITEM_ALL_SKILLS_BOOST")) {
        petItem3 = "<a:All_Skills_Exp_Boost:1072399662306316358>";
      } else if (petitem3 === null) {
        petItem3 = "";
      } else {
        petItem3 = "";
        console.log(
          "Pet item was not found in the list... Please add it to the list."
        );
      }
      const petitem4 = networthraw.data.networth.types.pets.items[3]?.heldItem;
      let petItem4 = "";
      if (petitem4 === "PET_ITEM_LUCKY_CLOVER") {
        petItem4 = "<a:Lucky_Clover:1072396488346456175>";
      } else if (petitem4 === "PET_ITEM_SPOOKY_CUPCAKE") {
        petItem4 = "<:Spooky_Cupcake:1072396596400095262>";
      } else if (petitem4 === "PET_ITEM_TOY_JERRY") {
        petItem4 = "<:Jerry_3D_Glasses:1072396693494038559>";
      } else if (petitem4 === "PET_ITEM_QUICK_CLAW") {
        petItem4 = "<:Quick_Claw:1072396796766199899>";
      } else if (petitem4 === "PET_ITEM_EXP_SHARE") {
        petItem4 = "<a:Exp_Share:1072397058780168262>";
      } else if (petitem4 === "PET_ITEM_TIER_BOOST") {
        petItem4 = "<a:Tier_Boost:1072397214212702288>";
      } else if (petitem4 === "PET_ITEM_BUBBLEGUM") {
        petItem4 = "<a:Bubblegum:1072397319129006171>";
      } else if (petitem4 === "PET_ITEM_VAMPIRE_FANG") {
        petItem4 = "<:Vampire_Fang:1072397412590702663>";
      } else if (petitem4 === "PET_ITEM_FLYING_PIG") {
        petItem4 = "<:Flying_Pig:1072397499089817641>";
      } else if (petitem4 === "PET_ITEM_SADDLE") {
        petItem4 = "<a:Saddle:1072397586713030727>";
      } else if (petitem4 === "CROCHET_TIGER_PLUSHIE") {
        petItem4 = "<:Crochet_Tiger_Plushie:1072397677624569887>";
      } else if (petitem4 === "REAPER_GEM") {
        petItem4 = "<a:Reaper_Gem:1072397765809799288>";
      } else if (petitem4 === "MINOS_RELIC") {
        petItem4 = "<:Minos_Relic:1072397896139423824>";
      } else if (petitem4 === "PET_ITEM_TEXTBOOK") {
        petItem4 = "<a:Textbook:1072397987776569364>";
      } else if (petitem4 === "ANTIQUE_REMEDIES") {
        petItem4 = "<:Antique_Remedies:1072398120299790347>";
      } else if (petitem4 === "WASHED_UP_SOUVENIR") {
        petItem4 = "<:Washedup_Souvenir:1072398232589713448>";
      } else if (petitem4 === "SERRATED_CLAWS") {
        petItem4 = "<a:Serrated_Claws:1072398314126987264>";
      } else if (petitem4 === "BIGGER_TEETH") {
        petItem4 = "<:Bigger_Teeth:1072398401888587796>";
      } else if (petitem4 === "DWARF_TURTLE_SHELMET") {
        petItem4 = "<:Dwarf_Turtle_Shelmet:1072398560982745129>";
      } else if (petitem4 === "ALL_SKILLS_SUPER_BOOST") {
        petItem4 = "<a:All_Skills_Exp_SuperBoost:1072398671536209960>";
      } else if (petitem4 === "GOLD_CLAWS") {
        petItem4 = "<a:Gold_Claws:1072398736292069457>";
      } else if (petitem4 === "REINFORCED_SCALES") {
        petItem4 = "<a:Reinforced_Scales:1072398856114946098>";
      } else if (petitem4?.startsWith("PET_ITEM_IRON_CLAWS")) {
        petItem4 = "<a:Iron_Claws:1072398962654449674>";
      } else if (petitem4?.startsWith("PET_ITEM_SHARPENED_CLAWS")) {
        petItem4 = "<a:Sharpened_Claws:1072399034075058257>";
      } else if (petitem4?.startsWith("PET_ITEM_BIG_TEETH")) {
        petItem4 = "<:Big_Teeth:1072399130000003072>";
      } else if (petitem4?.startsWith("PET_ITEM_HARDEND_SCALES")) {
        petItem4 = "<a:Hardened_Scales:1072399215000002560>";
      } else if (petitem4?.startsWith("PET_ITEM_FARMING_SKILL_BOOST")) {
        petItem4 = "<a:Farming_Skill_Exp_Boost:1072399300000002048>";
      } else if (petitem4?.startsWith("PET_ITEM_FORAGING_SKILL_BOOST")) {
        petItem4 = "<a:Foraging_Exp_Boost:1072399408341200948>";
      } else if (petitem4?.startsWith("PET_ITEM_COMBAT_SKILL_BOOST")) {
        petItem4 = "<a:Combat_Exp_Boost:1072399483146612746>";
      } else if (petitem4?.startsWith("PET_ITEM_FISHING_SKILL_BOOST")) {
        petItem4 = "<a:Fishing_Exp_Boost:1072399580018245652>";
      } else if (petitem4?.startsWith("PET_ITEM_ALL_SKILLS_BOOST")) {
        petItem4 = "<a:All_Skills_Exp_Boost:1072399662306316358>";
      } else if (petitem4 === null) {
        petItem4 = "";
      } else {
        petItem4 = "";
        console.log(
          "Pet item was not found in the list... Please add it to the list."
        );
      }
      const petitem5 = networthraw.data.networth.types.pets.items[4]?.heldItem;
      let petItem5 = "";
      if (petitem5 === "PET_ITEM_LUCKY_CLOVER") {
        petItem5 = "<a:Lucky_Clover:1072396488346456175>";
      } else if (petitem5 === "PET_ITEM_SPOOKY_CUPCAKE") {
        petItem5 = "<:Spooky_Cupcake:1072396596400095262>";
      } else if (petitem5 === "PET_ITEM_TOY_JERRY") {
        petItem5 = "<:Jerry_3D_Glasses:1072396693494038559>";
      } else if (petitem5 === "PET_ITEM_QUICK_CLAW") {
        petItem5 = "<:Quick_Claw:1072396796766199899>";
      } else if (petitem5 === "PET_ITEM_EXP_SHARE") {
        petItem5 = "<a:Exp_Share:1072397058780168262>";
      } else if (petitem5 === "PET_ITEM_TIER_BOOST") {
        petItem5 = "<a:Tier_Boost:1072397214212702288>";
      } else if (petitem5 === "PET_ITEM_BUBBLEGUM") {
        petItem5 = "<a:Bubblegum:1072397319129006171>";
      } else if (petitem5 === "PET_ITEM_VAMPIRE_FANG") {
        petItem5 = "<:Vampire_Fang:1072397412590702663>";
      } else if (petitem5 === "PET_ITEM_FLYING_PIG") {
        petItem5 = "<:Flying_Pig:1072397499089817641>";
      } else if (petitem5 === "PET_ITEM_SADDLE") {
        petItem5 = "<a:Saddle:1072397586713030727>";
      } else if (petitem5 === "CROCHET_TIGER_PLUSHIE") {
        petItem5 = "<:Crochet_Tiger_Plushie:1072397677624569887>";
      } else if (petitem5 === "REAPER_GEM") {
        petItem5 = "<a:Reaper_Gem:1072397765809799288>";
      } else if (petitem5 === "MINOS_RELIC") {
        petItem5 = "<:Minos_Relic:1072397896139423824>";
      } else if (petitem5 === "PET_ITEM_TEXTBOOK") {
        petItem5 = "<a:Textbook:1072397987776569364>";
      } else if (petitem5 === "ANTIQUE_REMEDIES") {
        petItem5 = "<:Antique_Remedies:1072398120299790347>";
      } else if (petitem5 === "WASHED_UP_SOUVENIR") {
        petItem5 = "<:Washedup_Souvenir:1072398232589713448>";
      } else if (petitem5 === "SERRATED_CLAWS") {
        petItem5 = "<a:Serrated_Claws:1072398314126987264>";
      } else if (petitem5 === "BIGGER_TEETH") {
        petItem5 = "<:Bigger_Teeth:1072398401888587796>";
      } else if (petitem5 === "DWARF_TURTLE_SHELMET") {
        petItem5 = "<:Dwarf_Turtle_Shelmet:1072398560982745129>";
      } else if (petitem5 === "ALL_SKILLS_SUPER_BOOST") {
        petItem5 = "<a:All_Skills_Exp_SuperBoost:1072398671536209960>";
      } else if (petitem5 === "GOLD_CLAWS") {
        petItem5 = "<a:Gold_Claws:1072398736292069457>";
      } else if (petitem5 === "REINFORCED_SCALES") {
        petItem5 = "<a:Reinforced_Scales:1072398856114946098>";
      } else if (petitem5?.startsWith("PET_ITEM_IRON_CLAWS")) {
        petItem5 = "<a:Iron_Claws:1072398962654449674>";
      } else if (petitem5?.startsWith("PET_ITEM_SHARPENED_CLAWS")) {
        petItem5 = "<a:Sharpened_Claws:1072399034075058257>";
      } else if (petitem5?.startsWith("PET_ITEM_BIG_TEETH")) {
        petItem5 = "<:Big_Teeth:1072399130000003072>";
      } else if (petitem5?.startsWith("PET_ITEM_HARDEND_SCALES")) {
        petItem5 = "<a:Hardened_Scales:1072399215000002560>";
      } else if (petitem5?.startsWith("PET_ITEM_FARMING_SKILL_BOOST")) {
        petItem5 = "<a:Farming_Skill_Exp_Boost:1072399300000002048>";
      } else if (petitem5?.startsWith("PET_ITEM_FORAGING_SKILL_BOOST")) {
        petItem5 = "<a:Foraging_Exp_Boost:1072399408341200948>";
      } else if (petitem5?.startsWith("PET_ITEM_COMBAT_SKILL_BOOST")) {
        petItem5 = "<a:Combat_Exp_Boost:1072399483146612746>";
      } else if (petitem5?.startsWith("PET_ITEM_FISHING_SKILL_BOOST")) {
        petItem5 = "<a:Fishing_Exp_Boost:1072399580018245652>";
      } else if (petitem5?.startsWith("PET_ITEM_ALL_SKILLS_BOOST")) {
        petItem5 = "<a:All_Skills_Exp_Boost:1072399662306316358>";
      } else if (petitem5 === null) {
        petItem5 = "";
      } else {
        petItem5 = "";
        console.log(
          "Pet item was not found in the list... Please add it to the list."
        );
      }

      //EMBED FORMATTING STUFF
      //personal vault
      const pv1 = `→ ${personal_vault1 ?? `No Items Found`} (**${
        addNotation("oneLetters", personal_vaultprice1) ?? 0
      }**)`;
      const pv2 = `→ ${personal_vault2 ?? ``} (**${
        addNotation("oneLetters", personal_vaultprice2) ?? 0
      }**)`;
      const pv3 = `→ ${personal_vault3 ?? ``} (**${
        addNotation("oneLetters", personal_vaultprice3) ?? 0
      }**)`;
      const pv4 = `→ ${personal_vault4 ?? ``} (**${
        addNotation("oneLetters", personal_vaultprice4) ?? 0
      }**)`;
      //armor
      const ar1 = `→ ${armor1 ?? `No Items Found`}${armorrecombobulated1} (**${
        addNotation("oneLetters", armorprice1) ?? 0
      }**)`;
      const ar2 = `→ ${armor2 ?? ``}${armorrecombobulated2} (**${
        addNotation("oneLetters", armorprice2) ?? 0
      }**)`;
      const ar3 = `→ ${armor3 ?? ``}${armorrecombobulated3} (**${
        addNotation("oneLetters", armorprice3) ?? 0
      }**)`;
      const ar4 = `→ ${armor4 ?? ``}${armorrecombobulated4} (**${
        addNotation("oneLetters", armorprice4) ?? 0
      }**)`;
      //equipment
      const eq1 = `→ ${
        equipment1 ?? `No Items Found`
      }${equipmentrecombobulated1} (**${
        addNotation("oneLetters", equipmentprice1) ?? 0
      }**)`;
      const eq2 = `→ ${equipment2 ?? ``}${equipmentrecombobulated2} (**${
        addNotation("oneLetters", equipmentprice2) ?? 0
      }**)`;
      const eq3 = `→ ${equipment3 ?? ``}${equipmentrecombobulated3} (**${
        addNotation("oneLetters", equipmentprice3) ?? 0
      }**)`;
      const eq4 = `→ ${equipment4 ?? ``}${equipmentrecombobulated4} (**${
        addNotation("oneLetters", equipmentprice4) ?? 0
      }**)`;
      //wardrobe || github copilot is funky at naming variables
      const ww1 = `→ ${
        wardrobe1 ?? `No Items Found`
      }${wardroberecombobulated1} (**${
        addNotation("oneLetters", wardrobeprice1) ?? 0
      }**)`;
      const ww2 = `→ ${wardrobe2 ?? ``}${wardroberecombobulated2} (**${
        addNotation("oneLetters", wardrobeprice2) ?? 0
      }**)`;
      const ww3 = `→ ${wardrobe3 ?? ``}${wardroberecombobulated3} (**${
        addNotation("oneLetters", wardrobeprice3) ?? 0
      }**)`;
      const ww4 = `→ ${wardrobe4 ?? ``}${wardroberecombobulated4} (**${
        addNotation("oneLetters", wardrobeprice4) ?? 0
      }**)`;
      const ww5 = `→ ${wardrobe5 ?? ``}${wardroberecombobulated5} (**${
        addNotation("oneLetters", wardrobeprice5) ?? 0
      }**)`;
      //inventory
      const inv1 = `→ ${
        inventory1 ?? `No Items Found`
      }${inventoryrecombobulated1} (**${
        addNotation("oneLetters", inventoryprice1) ?? 0
      }**)`;
      const inv2 = `→ ${inventory2 ?? ``}${inventoryrecombobulated2} (**${
        addNotation("oneLetters", inventoryprice2) ?? 0
      }**)`;
      const inv3 = `→ ${inventory3 ?? ``}${inventoryrecombobulated3} (**${
        addNotation("oneLetters", inventoryprice3) ?? 0
      }**)`;
      const inv4 = `→ ${inventory4 ?? ``}${inventoryrecombobulated4} (**${
        addNotation("oneLetters", inventoryprice4) ?? 0
      }**)`;
      const inv5 = `→ ${inventory5 ?? ``}${inventoryrecombobulated5} (**${
        addNotation("oneLetters", inventoryprice5) ?? 0
      }**)`;
      //enderchest
      const ec1 = `→ ${
        enderchest1 ?? `No Items Found`
      }${enderchestrecombobulated1} (**${
        addNotation("oneLetters", enderchestprice1) ?? 0
      }**)`;
      const ec2 = `→ ${enderchest2 ?? ``}${enderchestrecombobulated2} (**${
        addNotation("oneLetters", enderchestprice2) ?? 0
      }**)`;
      const ec3 = `→ ${enderchest3 ?? ``}${enderchestrecombobulated3} (**${
        addNotation("oneLetters", enderchestprice3) ?? 0
      }**)`;
      const ec4 = `→ ${enderchest4 ?? ``}${enderchestrecombobulated4} (**${
        addNotation("oneLetters", enderchestprice4) ?? 0
      }**)`;
      const ec5 = `→ ${enderchest5 ?? ``}${enderchestrecombobulated5} (**${
        addNotation("oneLetters", enderchestprice5) ?? 0
      }**)`;
      //storage
      const st1 = `→ ${
        storage1 ?? `No Items Found`
      }${storagerecombobulated1} (**${
        addNotation("oneLetters", storageprice1) ?? 0
      }**)`;
      const st2 = `→ ${storage2 ?? ``}${storagerecombobulated2} (**${
        addNotation("oneLetters", storageprice2) ?? 0
      }**)`;
      const st3 = `→ ${storage3 ?? ``}${storagerecombobulated3} (**${
        addNotation("oneLetters", storageprice3) ?? 0
      }**)`;
      const st4 = `→ ${storage4 ?? ``}${storagerecombobulated4} (**${
        addNotation("oneLetters", storageprice4) ?? 0
      }**)`;
      const st5 = `→ ${storage5 ?? ``}${storagerecombobulated5} (**${
        addNotation("oneLetters", storageprice5) ?? 0
      }**)`;
      //accessories
      const ac1 = `→ ${
        accessories1 ?? `No Items Found`
      }${accessoriesrecombobulated1} (**${
        addNotation("oneLetters", accessoriesprice1) ?? 0
      }**)`;
      const ac2 = `→ ${accessories2 ?? ``}${accessoriesrecombobulated2} (**${
        addNotation("oneLetters", accessoriesprice2) ?? 0
      }**)`;
      const ac3 = `→ ${accessories3 ?? ``}${accessoriesrecombobulated3} (**${
        addNotation("oneLetters", accessoriesprice3) ?? 0
      }**)`;
      const ac4 = `→ ${accessories4 ?? ``}${accessoriesrecombobulated4} (**${
        addNotation("oneLetters", accessoriesprice4) ?? 0
      }**)`;
      const ac5 = `→ ${accessories5 ?? ``}${accessoriesrecombobulated5} (**${
        addNotation("oneLetters", accessoriesprice5) ?? 0
      }**)`;
      //pets
      const pt1 = `→ ${pets1 ?? `No Items Found`} ${petcandy1} ${petItem1} (**${
        addNotation("oneLetters", petsprice1) ?? 0
      }**)`;
      const pt2 = `→ ${pets2 ?? ``} ${petcandy2} ${petItem2} (**${
        addNotation("oneLetters", petsprice2) ?? 0
      }**)`;
      const pt3 = `→ ${pets3 ?? ``} ${petcandy3} ${petItem3} (**${
        addNotation("oneLetters", petsprice3) ?? 0
      }**)`;
      const pt4 = `→ ${pets4 ?? ``} ${petcandy4} ${petItem4} (**${
        addNotation("oneLetters", petsprice4) ?? 0
      }**)`;
      const pt5 = `→ ${pets5 ?? ``} ${petcandy5} ${petItem5} (**${
        addNotation("oneLetters", petsprice5) ?? 0
      }**)`;

      const embedplayer = {
        color: 0xffa600,
        title: `Networth For ${username} On ${profilename}`,
        URL: `https://sky.shiiyu.moe/stats/${name}`,
        description: `<:Purse:1059997956784279562> Networth: **${formatted_networth} (${shortnetworth})**\n<:IRON_INGOT:1070126498616455328> Unsoulbound Networth:** ${formatted_soulbound} (${shortunsoulbound})**\n<:BOOSTER_COOKIE:1070126116846710865> IRL Value: **$${irlnw} USD**`,
        thumbnail: {
          url: `https://api.mineatar.io/body/full/${name}`,
        },
        fields: [
          {
            name: "<:Purse:1059997956784279562> Purse",
            value: `${addNotation("oneLetters", purseu) ?? 0}`,
            inline: true,
          },
          {
            name: "<:Bank:1059664677606531173> Bank",
            value: `${formatted_bank ?? 0}`,
            inline: true,
          },
          {
            name: "<:sacks:1059664698095710388> Sacks",
            value: `${addNotation("oneLetters", sackvalue) ?? 0}`,
            inline: true,
          },
          {
            name: `<:DIAMOND_CHESTPLATE:1061454753357377586> Armor  (${
              addNotation("oneLetters", armor) ?? 0
            })`,
            value: `${ar1}\n${ar2}\n${ar3}\n${ar4}`,
            inline: false,
          },
          {
            name: `<:Iron_Chestplate:1061454825839144970> Equipment  (${
              addNotation("oneLetters", equipment) ?? 0
            })`,
            value: `${eq1}\n${eq2}\n${eq3}\n${eq4}`,
            inline: false,
          },
          {
            name: `<:ARMOR_STAND:1061454861071298620> Wardrobe  (${
              addNotation("oneLetters", wardrobe) ?? 0
            })`,
            value: `${ww1}\n${ww2}\n${ww3}\n${ww4}\n${ww5}`,
            inline: false,
          },
          {
            name: `<:CHEST:1061454902049656993> Inventory  (${
              addNotation("oneLetters", inventory) ?? 0
            })`,
            value: `${inv1}\n${inv2}\n${inv3}\n${inv4}\n${inv5}`,
            inline: false,
          },
          {
            name: `<:ENDER_CHEST:1061454947931140106> Ender Chest  (${
              addNotation("oneLetters", enderchest) ?? 0
            })`,
            value: `${ec1}\n${ec2}\n${ec3}\n${ec4}\n${ec5}`,
            inline: false,
          },
          {
            name: `<:storage:1059664802701656224> Storage  (${
              addNotation("oneLetters", storage) ?? 0
            })`,
            value: `${st1}\n${st2}\n${st3}\n${st4}\n${st5}`,
            inline: false,
          },
          {
            name: `<:Spawn_Null:1061455273224577024> Pets  (${
              addNotation("oneLetters", pets) ?? 0
            })`,
            value: `${pt1}\n${pt2}\n${pt3}\n${pt4}\n${pt5}`,
            inline: false,
          },
          {
            name: `<:HEGEMONY_ARTIFACT:1061455309983461486> Accessories Bag (${
              addNotation("oneLetters", accessories) ?? 0
            })`,
            value: `${ac1}\n${ac2}\n${ac3}\n${ac4}\n${ac5}`,
            inline: false,
          },
          {
            name: `<:item_2654:1061455349338615859> Personal Vault (${
              addNotation("oneLetters", personal_vault) ?? 0
            })`,
            value: `${pv1}\n${pv2}\n${pv3}\n${pv4}`,
            inline: false,
          },
          {
            name: `<:wheat:1059664236038590584> Misc (${
              addNotation("oneLetters", misc) ?? 0
            })`,
            value: `→ Candy Bag (${
              addNotation("oneLetters", candy_inventory) ?? 0
            })\n→ Fishing Bag (${
              addNotation("oneLetters", fishing_bag) ?? 0
            })\n→ Potion Bag (${addNotation("oneLetters", potion_bag) ?? 0})`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `${messages.footer.default}`,
          iconURL: `${messages.footer.icon}`,
        },
      };

      await interaction.editReply({ embeds: [embedplayer] });
    } catch (error) {
      console.log(error);
      await interaction.editReply({
        content: `Error in fetching data\n \`${error}\``,
      });
    }
  },
};
