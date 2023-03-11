const axios = require('axios');
const fs = require('fs');
const { Worker } = require('worker_threads');

const config = require('../../../config.json');

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

let cachedData = null;
let cacheExpirationTime = null;

async function getAuctionData() {
  if (cachedData && Date.now() < cacheExpirationTime) {
    console.log('Using cached data');
    return cachedData;
  }

  const totalPages = await getTotalPages();
  console.log(`Total pages: ${totalPages}`);

  const workers = [];
  for (let i = 0; i < totalPages; i++) {
    workers.push(new Worker('./auctionWorker.js', { workerData: i }));
  }

  const allAuctions = [];

  for (const worker of workers) {
    const auctions = await new Promise((resolve, reject) => {
      worker.on('message', resolve);
      worker.on('error', reject);
    });
    allAuctions.push(...auctions);
  }

  const filteredAuctions = allAuctions.filter((auction) => auction.bin === true);
  const formattedAuctions = filteredAuctions.map((auction) => ({
    name: formatItemName(auction.item_name),
    starting_bid: auction.starting_bid,
    start: auction.start,
    end: auction.end,
    stars: getStarsFromName(auction.item_name),
    item_id: '',
  }));

  await addItemIdToAuctions(formattedAuctions);

  cachedData = formattedAuctions;
  cacheExpirationTime = Date.now() + CACHE_EXPIRATION_TIME;

  console.log('Writing data to file');
  fs.writeFileSync('auctionData.json', JSON.stringify(formattedAuctions));

  return formattedAuctions;
}

async function getTotalPages() {
  const response = await axios.get(`https://api.hypixel.net/skyblock/auctions?key=${config.api.hypixelAPIkey}`);
  return response.data.totalPages;
}

function formatItemName(name) {
  return name.replace(/\\u0027/g, "'");
}

function getStarsFromName(name) {
  const starLevels = ['✪', '✪✪', '✪✪✪', '✪✪✪✪', '✪✪✪✪✪'];
  for (const level of starLevels) {
    if (name.includes(level)) {
      return level;
    }
  }
  return '';
}

async function addItemIdToAuctions(auctions) {
  const itemsResponse = await axios.get(`https://api.hypixel.net/resources/skyblock/items?key=${config.api.hypixelAPIkey}`);
  const items = itemsResponse.data.items;

  for (const auction of auctions) {
    const matchingItem = items.find((item) => auction.name.startsWith(item.name));
    if (matchingItem) {
      auction.item_id = matchingItem.id;
    }
  }
}

module.exports = {
  getAuctionData,
};