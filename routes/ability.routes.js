/**
 * @swagger
 * components:
 *   schemas:
 *     Ability:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the ability.
 *           example: Adaptability
 *         description:
 *           type: string
 *           description: A description of the ability.
 *           example: Powers up moves of the same type as the Pokémon.
 */

const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { checkAdmin } = require('../middleware/admin.middleware');
const Ability = require('../models/Abilities.model');
const Pokemon = require('../models/Pokemons.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
  try {
    const allAbilities = await Ability.find();
    res.status(200).json(allAbilities);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:abilityId/pokemon', async (req, res) => {
  const { abilityId } = req.params;
  if (!ObjectId.isValid(abilityId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const hiddenAbility = await Pokemon.find({ hiddenAbility: abilityId });

    const normalAbility = await Pokemon.find({ abilities: abilityId });

    const all = hiddenAbility.concat(normalAbility).sort((a, b) => a.dexNumber - b.dexNumber);
    res.status(200).json(all);
  } catch (error) {
    console.log(error);
  }
});

router.get('/:abilityId', async (req, res) => {
  const { abilityId } = req.params;
  if (!ObjectId.isValid(abilityId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const oneAbility = await Ability.findById(abilityId);
    if (oneAbility) {
      res.status(200).json(oneAbility);
    } else {
      res.status(404).json('No ability with that id found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', isAuthenticated, checkAdmin, async (req, res) => {
  const { name, description } = req.body;
  if (name === '' || description === '') {
    res.status(406).json('Name and Description are required');
    return;
  }
  try {
    const newAbility = await Ability.create({ name, description });
    res.status(201).json(newAbility);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/:abilityId', isAuthenticated, checkAdmin, async (req, res) => {
  const { name, description } = req.body;
  if (name === '' || description === '') {
    res.status(406).json('Name and Description are required.');
    return;
  }
  const { abilityId } = req.params;
  if (!ObjectId.isValid(abilityId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const updated = await Ability.findByIdAndUpdate(abilityId, { name, description }, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/:abilityId', isAuthenticated, checkAdmin, async (req, res) => {
  const { abilityId } = req.params;
  if (!ObjectId.isValid(abilityId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const deleted = await Ability.findByIdAndDelete(abilityId);
    res.status(202).json('Ability deleted successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
