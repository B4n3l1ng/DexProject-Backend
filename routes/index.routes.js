const express = require('express');
const router = express.Router();
/* const Pokemon = require('../models/Pokemons.model');
const Move = require('../models/Moves.model');
const Ability = require('../models/Abilities.model');
const { capitalizeName } = require('../utils/utils');
const pokemonData = require('../pokemon.json');
const speciesData = require('../species.json'); */

/* function filterByVersionGroup(arr, groupName) {
  return arr
    .map(function (obj) {
      const filteredDetails = obj.version_group_details.find(function (detail) {
        return detail.version_group.name === groupName;
      });
      if (filteredDetails) {
        return {
          move: obj.move.name,
          level_learned_at: filteredDetails.level_learned_at,
          move_learn_method: filteredDetails.move_learn_method,
        };
      } else {
        return null; // If no matching details found, return null
      }
    })
    .filter(Boolean); // Remove any null values
}
function filterMoveMethod(arr, methodName) {
  return arr
    .map(function (obj) {
      if (obj.move_learn_method.name === methodName) {
        return obj.move;
      } else {
        return null; // If the method name doesn't match, return null
      }
    })
    .filter(Boolean); // Remove any null values
}
function filterMoveMethodAndLevel(arr, methodName) {
  return arr
    .map(function (obj) {
      if (obj.move_learn_method.name === methodName) {
        return { move: obj.move, level: obj.level_learned_at };
      } else {
        return null; // If the method name doesn't match, return null
      }
    })
    .filter(Boolean); // Remove any null values
}

function findIdsByMoveName(moveNames, moves) {
  const moveMap = new Map(moves.map((move) => [move.name, move._id]));
  return moveNames.map((moveName) => moveMap.get(capitalizeName(moveName)) || null).filter(Boolean);
}
function findIdsByAbilityName(abilityNames, abilities) {
  const abilityMap = new Map(abilities.map((ability) => [ability.name, ability._id]));
  return abilityNames.map((abilityName) => abilityMap.get(abilityName) || null).filter(Boolean);
}

function findIdsAndLevelsByMoveName(moveNames, moves) {
  const moveMap = new Map(moves.map((move) => [move.name, move._id]));
  return moveNames
    .map((moveName) => {
      const capitalizedMoveName = capitalizeName(moveName.move);
      const moveId = moveMap.get(capitalizedMoveName);
      return moveId ? { _id: moveId, level: moveName.level } : null;
    })
    .filter(Boolean);
} */

/* router.get('/seed', async (req, res) => {
  try {
    const allMoves = await Move.find();
    const allAbilities = await Ability.find();
    const curated = pokemonData.map((pokemon) => {
      //Grabbing abilities
      const normalAbilitiesArray = pokemon.abilities
        .map((object) => {
          if (!object.is_hidden) {
            return capitalizeName(object.ability.name);
          }
        })
        .filter(Boolean);
      const hiddenAbilityArray = pokemon.abilities
        .map((object) => {
          if (object.is_hidden) {
            return capitalizeName(object.ability.name);
          }
        })
        .filter(Boolean);
      const normalAbilitiesId = findIdsByAbilityName(normalAbilitiesArray, allAbilities);
      const hiddenAbilityId = findIdsByAbilityName(hiddenAbilityArray, allAbilities);

      //Grabbing Moves
      const onlyScarletViolet = filterByVersionGroup(pokemon.moves, 'scarlet-violet');
      const onlyLevelUp = filterMoveMethodAndLevel(onlyScarletViolet, 'level-up');
      const onlyEgg = filterMoveMethod(onlyScarletViolet, 'egg');
      const onlyTutor = filterMoveMethod(onlyScarletViolet, 'tutor');
      const onlyMachine = filterMoveMethod(onlyScarletViolet, 'machine');
      const levelUpIds = findIdsAndLevelsByMoveName(onlyLevelUp, allMoves);
      const eggIds = findIdsByMoveName(onlyEgg, allMoves);
      const tutorIds = findIdsByMoveName(onlyTutor, allMoves);
      const machineIds = findIdsByMoveName(onlyMachine, allMoves);
      //Images
      const normalImage = pokemon.sprites.front_default;
      const shinyImage = pokemon.sprites.front_shiny;
      //Name
      const name = capitalizeName(pokemon.name);

      //DexNumber
      const dexNumber = pokemon.id;

      //DexEntry
      let generation = 'IX';
      const speciesInfo = speciesData.find((species) => species.name === pokemon.name);
      let dexEntry = 'No info available at this time';
      if (speciesInfo) {
        const only9GenEnglish = speciesInfo.flavor_text_entries.filter((entry) => {
          if (entry.language.name === 'en' && (entry.version.name === 'shield' || entry.version.name === 'scarlet')) {
            return entry.flavor_text;
          }
        });
        if (only9GenEnglish.length > 0) {
          dexEntry = only9GenEnglish[0].flavor_text;
        }

        generation = capitalizeName(speciesInfo.generation.name.split('-')[1]);
      }

      //Types
      const type = pokemon.types.map((type) => type.type.name);

      //Base Stats
      const baseStats = {
        hp: pokemon.stats[0].base_stat,
        atk: pokemon.stats[1].base_stat,
        def: pokemon.stats[2].base_stat,
        sp_atk: pokemon.stats[3].base_stat,
        sp_def: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
      };

      return {
        name,
        dexNumber,
        type,
        baseStats,
        abilities: normalAbilitiesId,
        hiddenAbility: hiddenAbilityId[0],
        levelUpMoves: levelUpIds,
        machineMoves: machineIds,
        tutorMoves: tutorIds,
        eggMoves: eggIds,
        thumbnail: normalImage,
        shinyThumbnail: shinyImage,
        dexEntry,
        generation: generation?.toUpperCase(),
      };
    });
    await Pokemon.insertMany(curated);
    res.status(201).json('All fucking good');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}); */

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

const itemRoutes = require('./item.routes');
router.use('/items', itemRoutes);

const abilityRoutes = require('./ability.routes');
router.use('/abilities', abilityRoutes);

const moveRoutes = require('./move.routes');
router.use('/moves', moveRoutes);

const pokemonRoutes = require('./pokemon.routes');
router.use('/pokemon', pokemonRoutes);

module.exports = router;
