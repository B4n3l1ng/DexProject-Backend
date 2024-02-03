const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemons.model');
const Move = require('../models/Moves.model');
const Ability = require('../models/Abilities.model');
const { default: axios } = require('axios');
const { capitalizeName } = require('../utils/utils');

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

/* router.get('/seed', async (req, res, next) => {
  try {
    const { data } = await axios('https://pokeapi.co/api/v2/pokemon?limit=1025');
    const promisesArray = data.results.map((object) => axios(object.url));
    const allFullfilled = await Promise.all(promisesArray);
    const allData = allFullfilled.map((fullfill) => fullfill.data);

    const allMoves = await Move.find();
    const allAbilities = await Ability.find();
    console.log('Starting to curate data');

    const curatedData = allData.map((pokemon) => {
      //getting the types in an array:
      const typesArray = pokemon.types.map((obj) => obj.type.name);
      //getting the base stats in an object:
      const baseStatsObject = {
        hp: pokemon.stats[0].base_stat,
        atk: pokemon.stats[1].base_stat,
        def: pokemon.stats[2].base_stat,
        sp_atk: pokemon.stats[3].base_stat,
        sp_def: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
      };
      //Splitting the abilities into hidden and non-hidden:
      const abilitiesArray = pokemon.abilities.map((ability) => {
        if (!ability.is_hidden) {
          return capitalizeName(ability.ability.name);
        }
      });
      let hiddenAbility;
      pokemon.abilities.forEach((ability) => {
        if (ability.is_hidden) {
          hiddenAbility = capitalizeName(ability.ability.name);
        }
      });
      //cross referencing the abilities with the ids from the database:
      const abilitiesIDs = abilitiesArray.map((abilityFromAPI) => {
        const abilityID = allAbilities.find((abilityFromDB) => abilityFromAPI === abilityFromDB.name);
        if (abilityID) {
          return abilityID._id;
        }
      });
      let hiddenAbilityId;
      if (hiddenAbility) {
        const id = allAbilities.find((ability) => capitalizeName(hiddenAbility) === ability.name);
        if (id) {
          hiddenAbilityId = id._id;
        }
      }

      //cross referencing the moves
      const moveNames = pokemon.moves.map((move) => capitalizeName(move.move.name));
      const moveIds = moveNames.map((move) => {
        const moveFromDB = allMoves.find((moveDB) => moveDB.name === move);
        if (moveFromDB) {
          return moveFromDB._id;
        }
      });
      return {
        name: capitalizeName(pokemon.name),
        dexNumber: pokemon.id,
        type: typesArray,
        baseStats: baseStatsObject,
        thumbnail: pokemon.sprites.front_default,
        abilities: abilitiesIDs.filter((ability) => {
          if (ability !== undefined) {
            return ability;
          }
        }),
        hiddenAbility: hiddenAbilityId,
        moves: moveIds.filter((move) => {
          if (move !== undefined) {
            return move;
          }
        }),
      };
    });
    console.log('Starting insert');
    const added = await Pokemon.insertMany(curatedData);
    res.status(201).json('All good');
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}); */

module.exports = router;
