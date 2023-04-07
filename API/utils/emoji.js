function emoji() {

    const pets = {
        PET_ITEM_LUCKY_CLOVER: "<a:Lucky_Clover:1072396488346456175>",
        PET_ITEM_SPOOKY_CUPCAKE: "<:Spooky_Cupcake:1072396596400095262>",
        PET_ITEM_TOY_JERRY: "<:Jerry_3D_Glasses:1072396693494038559>",
        PET_ITEM_QUICK_CLAW: "<:Quick_Claw:1072396796766199899>",
        PET_ITEM_EXP_SHARE: "<a:Exp_Share:1072397058780168262>",
        PET_ITEM_TIER_BOOST: "<a:Tier_Boost:1072397214212702288>",
        PET_ITEM_BUBBLEGUM: "<a:Bubblegum:1072397319129006171>",
        PET_ITEM_VAMPIRE_FANG: "<:Vampire_Fang:1072397412590702663>",
        PET_ITEM_FLYING_PIG: "<:Flying_Pig:1072397499089817641>",
        PET_ITEM_SADDLE: "<a:Saddle:1072397586713030727>",
        CROCHET_TIGER_PLUSHIE: "<:Crochet_Tiger_Plushie:1072397677624569887>",
        REAPER_GEM: "<a:Reaper_Gem:1072397765809799288>",
        MINOS_RELIC: "<:Minos_Relic:1072397896139423824>",
        PET_ITEM_TEXTBOOK: "<a:Textbook:1072397987776569364>",
        ANTIQUE_REMEDIES: "<:Antique_Remedies:1072398120299790347>",
        WASHED_UP_SOUVENIR: "<:Washedup_Souvenir:1072398232589713448>",
        SERRATED_CLAWS: "<a:Serrated_Claws:1072398314126987264>",
        BIGGER_TEETH: "<:Bigger_Teeth:1072398401888587796>",
        DWARF_TURTLE_SHELMET: "<:Dwarf_Turtle_Shelmet:1072398560982745129>",
        ALL_SKILLS_SUPER_BOOST: "<a:All_Skills_Exp_SuperBoost:1072398671536209960>",
        GOLD_CLAWS: "<a:Gold_Claws:1072398736292069457>",
        REINFORCED_SCALES: "<a:Reinforced_Scales:1072398856114946098>",
        PET_ITEM_IRON_CLAWS: "<a:Iron_Claws:1072398962654449674>",
        PET_ITEM_SHARPENED_CLAWS: "<a:Sharpened_Claws:1072399034075058257>",
        PET_ITEM_BIG_TEETH: "<:Big_Teeth:1072399115620712468>",
        PET_ITEM_HARDEND_SCALES: "<a:Hardened_Scales:1072399214115557397>",
        PET_ITEM_FARMING_SKILL_BOOST: "<a:Farming_Exp_Boost:1072399332373975040>",
        PET_ITEM_FORAGING_SKILL_BOOST: "<a:Foraging_Exp_Boost:1072399408341200948>",
        PET_ITEM_COMBAT_SKILL_BOOST: "<a:Combat_Exp_Boost:1072399483146612746>",
        PET_ITEM_FISHING_SKILL_BOOST: "<a:Fishing_Exp_Boost:1072399580018245652>",
        PET_ITEM_ALL_SKILLS_BOOST: "<a:All_Skills_Exp_Boost:1072399662306316358>"
    }
    const misc = {
        RECOMBOBULATOR_3000: "<:RECOMBOBULATOR_3000:1069185517511524362>",
    }
    const dungeons = {
        DUNGEON_SKULL: "<:dungeons:1062778077735829615>",
        CLASS_AVERAGE: "<:Iron_Chestplate:1061454825839144970>",
        SECRET: "<:CHEST:1061454902049656993>",
        HEAD: "<:bestiary_67:1062778101223936090>",
        S_SCORE: "<:s_score:1062777386124460042>",
        NETHER_STAR: "<:NETHER_STAR:1062777758645768325>",
        S_PLUS_SCORE: "<:s_plus_score:1062777348564471869>",
        FLOOR_1: "<:f1:1059665222232702976>",
        FLOOR_2: "<:f2:1059665244345094244>",
        FLOOR_3: "<:f3:1059665271188639784>",
        FLOOR_4: "<:f4:1059665296656437358>",
        FLOOR_5: "<:f5:1059665323449667695>",
        FLOOR_6: "<:f6:1059665342231744634>",
        FLOOR_7: "<:f7:1059665388570419210>",
        MASTER_1: "<:m1:1059664958280958037>",
        MASTER_2: "<:m2:1059665011808681995>",
        MASTER_3: "<:m3:1059665028397150268>",
        MASTER_4: "<:m4:1059665056423489647>",
        MASTER_5: "<:m5:1059665078313549824>",
        MASTER_6: "<:m6:1059665099507376259>",
        MASTER_7: "<:m7:1059665136878637136>",
        BERSERK_DUNGEON_ORB: "<:Berserk_Dungeon_Orb:1062777901948358787>",
        ARCHER_DUNGEON_ORB: "<:Archer_Dungeon_Orb:1059665553918267442>",
        TANK_DUNGEON_ORB: "<:Tank_Dungeon_Orb:1062778004343881888>",
        SKULL_ITEM_1: "<:SKULL_ITEM_1:1062777707127123998>",
        MASTER_MODE: "<:MasterMode:1059665473379246091>",
        HEALER_DUNGEON_ORB: "<:Healer_Dungeon_Orb:1062777963311022201>"
      };
      
    return {
        emojis: {
            pet_ITEMS: {
                // ? stuff for networth, mostly for pets, example pet items 
                pets
            },
            dungeons: {
                // ? stuff for dungeons example S+ emoji
                dungeons

            },
            networth: {
                // ? stuff for networth example a purse icon

            },
            misc: {
            // ? For anything useful example a player head
                misc
            }
        }
    }
}

module.exports = { emoji
  };
