const axios = require('axios');

async function getSBID(name) {
  try {
    const response = await axios.get('https://api.hypixel.net/resources/skyblock/items');
    const items = response.data.items;
    const matchingItem = items.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (matchingItem) {
      return matchingItem.id;
    } else {
      console.log(`No item found with name ${name}`);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  getSBID,
};