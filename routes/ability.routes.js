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

module.exports = router;
