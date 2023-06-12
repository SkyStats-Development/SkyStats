const axios = require('axios');

async function getCookiePrice() {
  try {
    const response = await axios.get('https://sky.shiiyu.moe/api/v2/bazaar');
    const cookiePrice = response.data.BOOSTER_COOKIE.sellPrice;
    return cookiePrice;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getCookiePrice };