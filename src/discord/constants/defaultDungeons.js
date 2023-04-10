const { ButtonBuilder, ButtonStyle } = require("discord.js");
const {
  formatNumber,
  getProgressBar,
  capitalize,
} = require("../../../API/functions/helper");
const { catacombs } = require("../../../API/constants/xp_tables.js");
const moment = require("moment");

module.exports = {
  buttons: {
    main: [
      new ButtonBuilder()
        .setCustomId("dungeons_overview")
        .setLabel("Basic Info")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId("best_runs")
        .setLabel("Best Runs")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("dungeons_classes")
        .setLabel("Classes")
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("boss_collection")
        .setLabel("Boss Collection")
        .setStyle(ButtonStyle.Secondary),
    ],
    mode: {
      normal: [
        new ButtonBuilder()
          .setCustomId("catacombs")
          .setLabel("\u200B")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("<:Catacombs_Pass_V:945426015751139369>"),
      ],
      master: [
        new ButtonBuilder()
          .setCustomId("master_mode")
          .setLabel("\u200B")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("<:Master_Catacombs_Pass_V:944831330653450291>"),
      ],
    },
  },
  embeds: {
    getBasicInfoEmbed: function (
      calculated,
      profile,
      { username, uuid, cute_name, mode }
    ) {
      const data = new BasicInfoEmbed(calculated, profile, mode);
      const description = data.getDescription();
      const fields = data.getFields();

      const footer =
        "by DuckySoLucky#5181 | Secrets can only be listed for all profiles combined";
      const title = `${username}'s Catacombs on ${cute_name}`;

      return this.generateEmbed(
        { title, description, fields, footer },
        { username, uuid, cute_name }
      );
    },
    getBestRunsEmbed: function (
      calculated,
      profile,
      { username, uuid, cute_name, mode }
    ) {
      const data = new BestRunsEmbed(calculated, mode);
      const fields = data.getFields();
      const description = "";

      const footer = "by DuckySoLucky#5181 | /suggest (suggestion)";
      const title = `${username}'s Best Catacombs Runs on ${cute_name}`;

      return this.generateEmbed(
        { title, description, fields, footer },
        { username, uuid, cute_name }
      );
    },
    getClassesEmbed: function (
      calculated,
      profile,
      { username, uuid, cute_name, mode }
    ) {
      const data = new ClassesEmbed(calculated, mode);

      const fields = data.getFields();
      const description = data.getDescription();

      const footer = "by DuckySoLucky#5181 | /suggest (suggestion)";
      const title = `${username}'s Catacombs Classes on ${cute_name}`;

      return this.generateEmbed(
        { title, description, fields, footer },
        { username, uuid, cute_name }
      );
    },
    getBossCollectionEmbed: function (
      calculated,
      profile,
      { username, uuid, cute_name }
    ) {
      const data = new BossCollectionEmbed(calculated);
      const fields = data.getFields();
      const description = "";

      const footer = "by DuckySoLucky#5181 | /suggest (suggestion)";
      const title = `${username}'s Boss Collection on ${cute_name}`;

      return this.generateEmbed(
        { title, description, fields, footer },
        { username, uuid, cute_name }
      );
    },
    generateEmbed: function (
      {
        title,
        description = "",
        fields = [],
        footer = "by DuckySoLucky#5181  | /suggest (suggestion)",
      },
      { username, uuid, cute_name }
    ) {
      return {
        title: title,
        type: "rich",
        description: description,
        url: "https://sky.shiiyu.moe/" + username + "/" + cute_name,
        color: 0x0099ff,
        fields: fields,
        thumbnail: {
          url: `https://api.mineatar.io/body/full/${uuid}`,
        },
        footer: {
          text: footer,
          icon_url: "https://imgur.com/tgwQJTX.png",
        },
      };
    },
  },
};

class BasicInfoEmbed {
  constructor(calculated, profile, mode) {
    this.calculated = calculated;
    this.profile = profile;
    this.mode = mode;
  }

  getFields() {
    const fields = [];

    const floors =
      this.mode === "master_mode"
        ? this.calculated.catacombs.master_mode_floors
        : this.calculated.catacombs.floors;

    for (const floor in floors) {
      fields.push({
        name: `${BOSS_EMOJIS[floor]} ${BOSS_NAMES[floor]}`,
        value: `Kills: **${formatNumber(
          this.getCompletions(floor, this.mode)
        )}**\nPB Score: ${SCORE_EMOJIS[floors[floor].best_score.name]} **${
          floors[floor].best_score.score
        }**\nPB Time: **${this.formatDungeonTime(
          floors[floor].fastest
        )}**\nPB S: **${this.formatDungeonTime(
          floors[floor].fastest_s
        )}**\nPB S+: **${this.formatDungeonTime(
          floors[floor].fastest_s_plus
        )}**\n\u200B\n`,
        inline: true,
      });
    }

    return fields;
  }

  getDescription() {
    return [
      this.getCatacombsLevel(),
      this.getSecrets(),
      this.getTotalRuns(),
      this.getBestiaryKills(),
      this.getSelectedClass(),
      this.getClassAverage(),
      this.getFormattedProgressBar(),
      "\u200B",
    ].join("\n");
  }

  getCatacombsLevel() {
    const { level, xpCurrent, xpForNext, totalXp } =
      this.calculated.catacombs.skill;

    return `<:Catacombs:776390092545064961> Catacombs: ${level} (\`${formatNumber(
      xpCurrent
    )}\`/\`${formatNumber(xpForNext)}\`) \`${formatNumber(totalXp)}\``;
  }

  getSecrets() {
    const { secrets_found } = this.calculated;
    const completions = this.getCompletions();

    return `:chest: Secrets found: **${formatNumber(
      secrets_found
    )}** (Per Run: **${formatNumber(secrets_found / completions)}**)`;
  }

  getTotalRuns() {
    return `🏃‍♂️ Total Runs: **${formatNumber(this.getCompletions())}**`;
  }

  getBestiaryKills() {
    const { bestiary } = this.profile;

    return `<:bestiary_67:925024691524083763> Blood Mob Kills: **${formatNumber(
      bestiary.kills_family_watcher_summon_undead
    )}**`;
  }

  getSelectedClass() {
    const { classes, selected_class } = this.calculated;

    return `<:netherstar:785202913094008902> Selected Class: **${capitalize(
      selected_class
    )}** (**${classes[selected_class.toLowerCase()].level}**)`;
  }

  getClassAverage() {
    const classLevels = Object.keys(this.calculated.classes).map(
      (class_name) => this.calculated.classes[class_name].level
    );
    const classAverage =
      classLevels.reduce((a, b) => a + b, 0) / classLevels.length;

    return `<:dungeons:822784599590567936> Class Average: **${classAverage.toFixed(
      2
    )}**`;
  }

  getFormattedProgressBar() {
    const { totalXp } = this.calculated.catacombs.skill;
    const maxXp = catacombs.reduce((a, b) => a + b, 0);

    const progressBar = getProgressBar(totalXp / maxXp);
    const progress = ((totalXp / maxXp) * 100).toFixed(1);

    return `${progressBar} (**${progress}% of level 50 maxed**)`;
  }

  formatDungeonTime(s) {
    const formattedDuration = moment(s).format("m:ss", { trim: true });

    return formattedDuration === "0:00" ? "/" : formattedDuration;
  }

  getCompletions(floor, mode) {
    const { floors: catacombs, master_mode_floors: master_mode } =
      this.calculated.catacombs;

    if (floor === undefined) {
      const cCompletions = Object.keys(catacombs)
        .map((floor) => catacombs[floor].completions)
        .reduce((a, b) => a + b, 0);

      const mCompletions = Object.keys(master_mode)
        .map((floor) => master_mode[floor].completions)
        .reduce((a, b) => a + b, 0);

      return cCompletions + mCompletions ?? 0;
    }

    if (mode === "master_mode") {
      return master_mode[floor]?.completions ?? 0;
    } else if (mode === "catacombs") {
      return catacombs[floor]?.completions ?? 0;
    }

    const cCompletions = catacombs[floor].completions ?? 0;
    const mCompletions = master_mode[floor]?.completions ?? 0;

    return cCompletions + mCompletions ?? 0;
  }
}

class BestRunsEmbed {
  constructor(calculated, mode) {
    this.calculated = calculated;
    this.mode = mode;
  }

  getFields() {
    const fields = [];

    const floors =
      this.mode === "master_mode"
        ? this.calculated.catacombs.master_mode_floors
        : this.calculated.catacombs.floors;

    for (const floor in floors) {
      const best_run = floors[floor].best_run;

      fields.push({
        name: `${BOSS_EMOJIS[floor]} ${BOSS_NAMES[floor]}`,
        value: `Score: ${
          SCORE_EMOJIS[this.getScoreName(this.getScore(best_run))]
        } **${this.getScoreName(this.getScore(best_run))} ${this.getScore(
          best_run
        )}**\nTime: **${this.formatDungeonTime(
          best_run.elapsed_time
        )}**\nClass: **${capitalize(
          best_run.dungeon_class
        )}**\nDamage: **${formatNumber(
          best_run.damage_dealt
        )}**\nMobs Killed: **${formatNumber(
          best_run.mobs_killed
        )}**\nSecrets Found: **${formatNumber(
          best_run.secrets_found
        )}**\n\u200B\n`,
        inline: true,
      });
    }

    return fields;
  }

  getScore(best_run) {
    return (
      best_run.score_exploration +
      best_run.score_speed +
      best_run.score_bonus +
      best_run.score_skill
    );
  }

  getScoreName(score) {
    if (score >= 300) return "S+";
    if (score >= 270) return "S";
    if (score >= 240) return "A";
    if (score >= 175) return "B";
    return "C";
  }

  formatDungeonTime(s) {
    const formattedDuration = moment(s).format("m:ss", { trim: true });

    return formattedDuration === "0:00" ? "/" : formattedDuration;
  }
}

class ClassesEmbed {
  constructor(calculated, mode) {
    this.calculated = calculated;
    this.mode = mode;
  }

  getClassAverage() {
    const classLevels = Object.keys(this.calculated.classes).map(
      (class_name) => this.calculated.classes[class_name].level
    );
    const classAverage =
      classLevels.reduce((a, b) => a + b, 0) / classLevels.length;

    return classAverage;
  }

  getFloorN(floor) {
    return floor == "entrance" ? "0" : floor.split("_")[1];
  }

  getClassDescription(className, floor, floor_data) {
    let description = `Floor ${this.getFloorN(floor)}:`;

    if (className === "healer") {
      const damage = formatNumber(
        floor_data?.[`most_damage_${className}`] ?? 0
      );
      const healing = formatNumber(floor_data?.[`most_healing`] ?? 0);

      description += ` **${damage}** (**${healing}** healing)\n`;
    } else {
      const damage = formatNumber(
        floor_data?.[`most_damage_${className}`] ?? 0
      );

      description += ` **${damage}**\n`;
    }

    return description;
  }

  getFields() {
    const fields = [];
    const { classes } = this.calculated;

    const floors =
      this.mode === "master_mode"
        ? this.calculated.catacombs.master_mode_floors
        : this.calculated.catacombs.floors;

    for (const dungeon_class in classes) {
      let description = "";
      for (const floor in floors) {
        const floor_data = floors[floor];

        description += this.getClassDescription(
          dungeon_class,
          floor,
          floor_data
        );
      }

      const { level, totalXp } = classes[dungeon_class];

      fields.push({
        name: `${CLASS_EMOJIS[dungeon_class]} ${capitalize(
          dungeon_class
        )} ${level}`,
        value: `Experience: **${formatNumber(totalXp)}**\n${description}\n`,
        inline: true,
      });
    }

    return fields;
  }

  getDescription() {
    const description = `<:dungeons:822784599590567936> Class Average: **${this.getClassAverage()}**`;

    return description;
  }
}

class BossCollectionEmbed {
  constructor(calculated) {
    this.calculated = calculated;
  }

  getFields() {
    const fields = [];

    for (const floor in this.calculated.catacombs.floors) {
      if (floor == "entrance") continue;

      fields.push({
        name: `${BOSS_EMOJIS[floor]} ${BOSS_NAMES[floor]}`,
        value: `**${formatNumber(this.getCompletions(floor))}** kills\n`,
        inline: true,
      });
    }

    return fields;
  }

  getCompletions(floor) {
    const { floors: catacombs, master_mode_floors: master_mode } =
      this.calculated.catacombs;

    if (floor === undefined) {
      const cCompletions = Object.keys(catacombs)
        .map((floor) => catacombs[floor].completions)
        .reduce((a, b) => a + b, 0);

      const mCompletions = Object.keys(master_mode)
        .map((floor) => master_mode[floor].completions)
        .reduce((a, b) => a + b, 0);

      return cCompletions + mCompletions ?? 0;
    }

    const cCompletions = catacombs[floor].completions ?? 0;
    const mCompletions = master_mode[floor]?.completions ?? 0;

    return cCompletions + mCompletions ?? 0;
  }
}

const CLASS_EMOJIS = {
  mage: "<:Blaze_Rod:945261768744259594>",
  berserk: "<:Stone_Sword:945081900635144212>",
  archer: "<:Bow:944584274240217168>",
  tank: "<:Leather_Chestplate:945077757728153621>",
  healer: "<a:E_Splash_Potion_6:945902476794687578>",
};

const BOSS_EMOJIS = {
  entrance: "<:the_watcher:956569127928094770>",
  floor_1: "<:bonzo:785196577727709234>",
  floor_2: "<:scarf:785196577467269193>",
  floor_3: "<:theprofessor:785196577559412737>",
  floor_4: "<:thorn:785196577777123384>",
  floor_5: "<:livid:785196578049753108>",
  floor_6: "<:sadan:785196577886175242>",
  floor_7: "<:necron:785196577802682388>",
};

const BOSS_NAMES = {
  entrance: "The Watcher",
  floor_1: "Bonzo",
  floor_2: "Scarf",
  floor_3: "The Professor",
  floor_4: "Thorn",
  floor_5: "Livid",
  floor_6: "Sadan",
  floor_7: "Necron",
};

const SCORE_EMOJIS = {
  B: "<:b_score:949651871495233556>",
  A: "<:a_score:949651871767863336>",
  S: "<:s_score:949651871512027168>",
  "S+": "<:s_plus_score:949651871830794260>",
};
