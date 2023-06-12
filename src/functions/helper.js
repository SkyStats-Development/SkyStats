const moment = require('moment');
const nbt = require("prismarine-nbt");
const util = require("util");
const parseNbt = util.promisify(nbt.parse);

const capitalize = function (str) {
  const words = str.replace(/_/g, ' ').toLowerCase().split(' ');

  const upperCased = words.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1);
  });

  return upperCased.join(' ');
};

const toTimestamp = function (timestamp) {
  return Date.parse(timestamp)/1000
}

const nth = function(i) {
  return i + ['st', 'nd', 'rd'][((((i + 90) % 100) - 10) % 10) - 1] || `${i}th`;
}


// CREDITS: https://github.com/grafana/grafana (Modified)

const units = new Set(['y', 'M', 'w', 'd', 'h', 'm', 's']);

function parseDateMath(mathString, time) {
  const strippedMathString = mathString.replace(/\s/g, '');
  const dateTime = time;
  let i = 0;
  const { length } = strippedMathString;

  while (i < length) {
    const c = strippedMathString.charAt(i);
    i += 1;
    let type;
    let number;

    if (c === '/') {
      type = 0;
    } else if (c === '+') {
      type = 1;
    } else if (c === '-') {
      type = 2;
    } else {
      return;
    }

    if (Number.isNaN(Number.parseInt(strippedMathString.charAt(i), 10))) {
      number = 1;
    } else if (strippedMathString.length === 2) {
      number = strippedMathString.charAt(i);
    } else {
      const numberFrom = i;
      while (!Number.isNaN(Number.parseInt(strippedMathString.charAt(i), 10))) {
        i += 1;
        if (i > 10) {
          return;
        }
      }
      number = Number.parseInt(strippedMathString.slice(numberFrom, i), 10);
    }

    if (type === 0 && number !== 1) {
      return;
    }

    const unit = strippedMathString.charAt(i);
    i += 1;

    if (!units.has(unit)) {
      return;
    }
    if (type === 0) {
      dateTime.startOf(unit);
    } else if (type === 1) {
      dateTime.add(number, unit);
    } else if (type === 2) {
      dateTime.subtract(number, unit);
    }
  }

  return dateTime;
}

const parseTimestamp = function(text) {
  if (!text) return;

  if (typeof text !== 'string') {
    if (moment.isMoment(text)) {
      return text;
    }
    if (moment.isDate(text)) {
      return moment(text);
    }
    return;
  }

  let time;
  let mathString = '';
  let index;
  let parseString;

  if (text.slice(0, 3) === 'now') {
    time = moment.utc();
    mathString = text.slice(3);
  } else {
    index = text.indexOf('||');
    if (index === -1) {
      parseString = text;
      mathString = '';
    } else {
      parseString = text.slice(0, Math.max(0, index));
      mathString = text.slice(Math.max(0, index + 2));
    }

    time = moment(parseString, moment.ISO_8601);
  }

  if (mathString.length === 0) {
    return time.valueOf();
  }

  const dateMath = parseDateMath(mathString, time);
  return dateMath ? dateMath.valueOf() : undefined;
}
function getProgressBar(progress) {
  let progress_string = "";
  for (let i = 1; i < 11; i++) {
    progress_string +=
      progress > i / 11
        ? "<:glass_lime:792337420103319593>"
        : "<:glass_silver:792337420338724904>";
  }

  return progress_string;
}
function formatNumber(number, decimals = 2) {
  if (number === undefined || number === 0) return 0;

  if (number < 100000) return parseInt(number).toLocaleString();

  const abbrev = ["", "K", "M", "B", "T", "Q", "S", "O", "N", "D"];
  const unformattedNumber = Math.abs(number);

  const abbrevIndex = Math.floor(Math.log10(unformattedNumber) / 3);
  const shortNumber = (
    unformattedNumber / Math.pow(10, abbrevIndex * 3)
  ).toFixed(decimals);
  return `${shortNumber}${abbrev[abbrevIndex]}`;
}





module.exports = { capitalize, toTimestamp, parseTimestamp, nth, getProgressBar, formatNumber };
