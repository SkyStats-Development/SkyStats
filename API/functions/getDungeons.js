const axios = require('axios');

async function getDungeons(uuid) {
  const profileraw = (await axios.get(`https://sky.shiiyu.moe/api/v2/profile/${uuid}`)).data.profiles;
  let currentProfile;
  for (var key of Object.keys(profileraw)) {
    if (profileraw[key]?.current) currentProfile = key;
  }
  const player = (profileraw[currentProfile]);

  const catalvl = (player.data.dungeons.catacombs.level.level) || `0`;
  const secrets = (player.data.dungeons.secrets_found) || `0`;
  const selectedclass = (player.data.dungeons.selected_class) || `DEFAULT`;
  const classavrg = (player.data.dungeons.class_average) || `0`;

  return {
    catalvl,
    secrets,
    selectedclass,
    classavrg
  };
}

module.exports = {getDungeons};