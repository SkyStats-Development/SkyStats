const HypixelAPIReborn = require('hypixel-api-reborn');
const config = require('../../../config.json')
const key = process.env.KEY;

const hypixel = new HypixelAPIReborn.Client(key, {cache: true});

module.exports = hypixel;