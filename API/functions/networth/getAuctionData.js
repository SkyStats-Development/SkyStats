const axios = require('axios');
const fs = require('fs');
const config = require('../../../config.json');
// http://api.skystats.lol/v1/auctionhouse/?key=skystats-87654-321098-765-43-development&name=Crimson%20Chestplate&bin=true&lowestprice=true
async function getAuctionData(item) {
  try {
    const response = await axios.get(`http://api.skystats.lol/v1/auctionhouse/?key=${config.api.skyStatsKey}&name=${item}&bin=true&lowest_price=0`);
    const auctions = response.data.auctions;
    const auctionData = auctions.map((auction) => ({
      name: auction.item_name,
      price: auction.starting_bid,
      tier: auction.tier,
      id: auction.uuid,
      category: auction.category,
      end: auction.end,
      bin: auction.bin,
      extra: auction.extra,
    }));
    const sortedAuctionData = auctionData.sort((a, b) => b.price - a.price);
    return sortedAuctionData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = {
  getAuctionData,
};