const { writeAt } = require("../../contracts/helperFunctions");
const fs = require('fs');
const Rss = require('rss-parser');
const parser = new Rss();
const config = require("../../../config.json");
const messages = config.messages.discord;
const path = require('path');

setInterval(checkForSkyblockUpdates, 10000);
setInterval(checkForIncidents, 10000);
// funny shit below
const eventsFolderPath = path.join(__dirname);
const filePath = path.join(eventsFolderPath, 'skyblockNotifier.json');
const dir = filePath


async function checkForIncidents() {
    try {
        const status = await parser.parseURL('https://status.hypixel.net/history.rss');
        const channel = client.channels.cache.get(`1068059513866952754`);
        for (const data of status.items) {
            const currentStatus = (JSON.parse(fs.readFileSync(dir))).skyblockStatus;
            const content = JSON.stringify(data.contentSnippet).replaceAll('"', '').replaceAll('  ', ' ').split('\\n');
            for (let i = 0; i < content.length; i++) {
                const incident = content[i];
                if (i % 2 === 0) continue;
                if (!currentStatus.includes(`${data.title} | ${incident} | ${content[i-1]}`)) {
                    currentStatus.push(`${data.title} | ${incident} | ${content[i-1]}`);
                    await writeAt(dir, 'skyblockStatus', currentStatus);
                    const embed = {
                        "title": `${data.title}`,
                        "description": `${incident}`,
                        "url": `${data.link}`,
                        "color": 16711680,
                        "timestamp": `${data.isoDate}`,
                        "footer": {
                            "text": `${messages.defaultbetter}` 
                        },
                    }
                    await channel.send({ embeds: [ embed ] })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function checkForSkyblockUpdates() {
    try {
        const feed = await parser.parseURL('https://hypixel.net/forums/skyblock-patch-notes.158/index.rss');
        const channel = client.channels.cache.get(`1068059513866952754`);
        for (const data of feed.items) {
            const currentUpdates = (JSON.parse(fs.readFileSync(dir))).skyblockNews;
            if (!currentUpdates.includes(`${data.title} | ${data.link}`)) {
                currentUpdates.push(`${data.title} | ${data.link}`);
                await writeAt(dir, 'skyblockNews', currentUpdates);
                const embed = {
                    "title": `${data.title}`,
                    "description": `${data.contentSnippet}`,
                    "url": `${data.link}`,
                    "color": 16711680,
                    "timestamp": `${data.isoDate}`,
                    "footer": {
                        "text": `${messages.defaultbetter}`
                    },
                }
                await channel.send({ embeds: [ embed ] })
            }
        }
     } catch (error) {
        console.log(error);
    }
}