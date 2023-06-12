const calcSkill = require("../../API/utils/calcSkills");
const { capitalize } = require("../../API/functions/helper");

const getScoreName = (score) => {
  if (score >= 300) return "S+";
  if (score >= 270) return "S";
  if (score >= 240) return "A";
  if (score >= 175) return "B";
  return "C";
};

async function getDungeons(player, profile)  {
  try {
    const { catacombs = {}, master_catacombs = {} } = profile?.dungeons?.dungeon_types || {};
    const available_floors = Object.keys(catacombs?.times_played?.[0] ?? []);
    const floors = available_floors.reduce((acc, floor) => {
      const floor_name = floor === "0" ? "entrance" : `floor_${floor}`;
      acc[floor_name] = {
        times_played: catacombs?.times_played?.[floor] ?? 0,
        completions: catacombs?.tier_completions?.[floor] ?? 0,
        best_score: {
          score: catacombs?.best_score?.[floor] ?? 0,
          name: getScoreName(catacombs?.best_score?.[floor] ?? 0),
        },
        fastest: catacombs?.fastest_time?.[floor] ?? 0,
        fastest_s: catacombs?.fastest_time_s?.[floor] ?? 0,
        fastest_s_plus: catacombs?.fastest_time_s_plus?.[floor] ?? 0,
        mobs_killed: catacombs?.mobs_killed?.[floor] ?? 0,
        best_run: catacombs?.best_runs?.[floor]?.[0] || null,
      };
      for (const key of Object.keys(catacombs)) {
        if (key.startsWith("most_damage") || key.startsWith("most_healing")) {
          acc[floor_name][key] = catacombs?.[key]?.[floor];
        }
      }
      return acc;
    }, {});

    const master_mode_floors = Array.from({ length: master_catacombs?.highest_tier_completed || 0 }, (_, i) => {
      const floor = i + 1;
      return {
        [`floor_${floor}`]: {
          completions: master_catacombs?.tier_completions?.[floor] ?? 0,
          best_score: {
            score: master_catacombs?.best_score?.[floor] ?? 0,
            name: getScoreName(master_catacombs?.best_score?.[floor] ?? 0),
          },
          fastest: master_catacombs?.fastest_time?.[floor] ?? 0,
          fastest_s: master_catacombs?.fastest_time_s?.[floor] ?? 0,
          fastest_s_plus: master_catacombs?.fastest_time_s_plus?.[floor] ?? 0,
          mobs_killed: master_catacombs?.mobs_killed?.[floor] ?? 0,
          best_run: master_catacombs?.best_runs?.[floor]?.[0] || null,
        },
      };
    }).reduce((acc, obj) => ({ ...acc, ...obj }), {});

    const highest_tier_completed = master_catacombs?.highest_tier_completed
      ? `M${master_catacombs.highest_tier_completed}`
      : catacombs?.highest_tier_completed
      ? `F${catacombs?.highest_tier_completed}`
      : null;

    return {
      selected_class: capitalize(profile?.dungeons?.selected_dungeon_class ?? "none"),
      secrets_found: player?.achievements?.skyblock_treasure_hunter ?? 0,
      classes: {
        mage: calcSkill("dungeoneering", profile?.dungeons?.player_classes?.mage?.experience ?? 0),
        berserk: calcSkill("dungeoneering", profile?.dungeons?.player_classes?.berserk?.experience ?? 0),
        archer: calcSkill("dungeoneering", profile?.dungeons?.player_classes?.archer?.experience ?? 0),
        tank: calcSkill("dungeoneering", profile?.dungeons?.player_classes?.tank?.experience ?? 0),
        healer: calcSkill("dungeoneering", profile?.dungeons?.player_classes?.healer?.experience ?? 0),
      },
      catacombs: {
        skill: calcSkill("dungeoneering", catacombs?.experience ?? 0),
        highest_tier_completed,
        floors,
        master_mode_floors,
      },
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getDungeons };