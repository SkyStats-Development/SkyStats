const axios = require('axios');
const config = require(`../../config.json`);


async function getDungeons() {
  try {
    const uuid2 = `fb3d9649-8a5b-4d5b-91b7-63db14b195ad`
    axios.get(`https://api.hypixel.net/skyblock/profiles?key=${config.api.hypixelAPIkey}&uuid=${uuid2}`)
    .then(response => {
      const profile = response.data.profiles.find(p => p.selected && p.members?.[uuid2]);
      const dungeonsObject = profile?.members?.[uuid2]?.dungeons;
    const catacombs_times_played = dungeonsObject.dungeon_types.catacombs.times_played
    const catacombs_times_finished = dungeonsObject.dungeon_types.catacombs.tier_completions
    const catacombs_times = dungeonsObject.dungeon_types.catacombs.fastest_time;
    const catacombs_times2 = dungeonsObject.dungeon_types.catacombs.fastest_time_s;
    const catacombs_times_3 = dungeonsObject.dungeon_types.catacombs.fastest_time_s_plus;
    
    const combinedCatacombsTimes = {};
    
    for (let i = 0; i <= 7; i++) {
      const floor = i.toString();
      combinedCatacombsTimes[floor] = catacombs_times[floor];
      combinedCatacombsTimes[`${floor}_S`] = catacombs_times2[floor];
      combinedCatacombsTimes[`${floor}_S_PLUS`] = catacombs_times_3[floor];
    }


    return{
        skystats: {
            catacombs: {
                times_played: {
                    _0: catacombs_times_played[0],
                    _1: catacombs_times_played[1],
                    _2: catacombs_times_played[2],
                    _3: catacombs_times_played[3],
                    _4: catacombs_times_played[4],
                    _5: catacombs_times_played[5],
                    _6: catacombs_times_played[6],
                    _7: catacombs_times_played[7]
                },
                tier_completions:{
                    _0: catacombs_times_finished[0],
                    _1: catacombs_times_finished[1],
                    _2: catacombs_times_finished[2],
                    _3: catacombs_times_finished[3],
                    _4: catacombs_times_finished[4],
                    _5: catacombs_times_finished[5],
                    _6: catacombs_times_finished[6],
                    _7: catacombs_times_finished[7]
                },
                times: {
                    _0: {
                        times: {
                          _0: combinedCatacombsTimes["0"],
                          _0S: combinedCatacombsTimes["0_S"],
                          _0S_PLUS: combinedCatacombsTimes["0_S_PLUS"]
                        }
                      },
                      _1: {
                        times: {
                          _1: combinedCatacombsTimes["1"],
                          _1S: combinedCatacombsTimes["1_S"],
                          _1S_PLUS: combinedCatacombsTimes["1_S_PLUS"]
                        }
                      },
                      _2: {
                        times: {
                          _2: combinedCatacombsTimes["2"],
                          _2S: combinedCatacombsTimes["2_S"],
                          _2S_PLUS: combinedCatacombsTimes["2_S_PLUS"]
                        }
                      },
                      _3: {
                        times: {
                          _3: combinedCatacombsTimes["3"],
                          _3S: combinedCatacombsTimes["3_S"],
                          _3S_PLUS: combinedCatacombsTimes["3_S_PLUS"]
                        }
                      },
                      _4: {
                        times: {
                          _4: combinedCatacombsTimes["4"],
                          _4S: combinedCatacombsTimes["4_S"],
                          _4S_PLUS: combinedCatacombsTimes["4_S_PLUS"]
                        }
                      },
                      _5: {
                        times: {
                          _5: combinedCatacombsTimes["5"],
                          _5S: combinedCatacombsTimes["5_S"],
                          _5S_PLUS: combinedCatacombsTimes["5_S_PLUS"]
                        }
                      },
                      _6: {
                        times: {
                          _6: combinedCatacombsTimes["6"],
                          _6S: combinedCatacombsTimes["6_S"],
                          _6S_PLUS: combinedCatacombsTimes["6_S_PLUS"]
                        }
                      },
                      _7: {
                        times: {
                          _7: combinedCatacombsTimes["7"],
                          _7S: combinedCatacombsTimes["7_S"],
                          _7S_PLUS: combinedCatacombsTimes["7_S_PLUS"]
                        }
                    }
                },
                experience: dungeonsObject.dungeon_types.catacombs.experience,
                highest_tier_completed: dungeonsObject.dungeon_types.catacombs.highest_tier_completed,
            },
            master_catacombs: {

            },
            player: {
                player_classes: {

                },
                journals: {

                },
                dungeons_quests: {

                },
                current_class: m,
                daily_runs: {
                    current_day_stamp: 1,
                    completed_runs_count: 15
                }

            }
        }
    }
})
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getDungeons };
