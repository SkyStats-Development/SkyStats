const config = require('../../../../config.json')
const axios = require('axios')
const { toFixed } = require('../../../../src/contracts/helperFunctions')
const { getUUID } = require('../../../../src/contracts/API/PlayerDBAPI')

function getWoolWarsStar(exp) {
    const minimalExp = [0, 1e3, 3e3, 6e3, 1e4, 15e3];
    const baseLevel = minimalExp.length;
    const baseExp = minimalExp[minimalExp.length - 1];
    if (exp >= baseExp) return (exp - baseExp) / 5e3 + baseLevel;
    const lvl = minimalExp.findIndex((x)=>exp < x);
    return lvl + exp / minimalExp[lvl];
  }

  module.exports = { getWoolWarsStar }