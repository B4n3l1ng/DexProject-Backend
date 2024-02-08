/**
 * @swagger
 * components:
 *   schemas:
 *     Move:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - typing
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the move.
 *           example: Thunderbolt
 *         description:
 *           type: string
 *           description: A description of the move.
 *           example: A powerful electric-type move that may paralyze the target.
 *         typing:
 *           type: string
 *           enum:
 *             - Normal
 *             - Fire
 *             - Water
 *             - Grass
 *             - Flying
 *             - Fighting
 *             - Poison
 *             - Electric
 *             - Ground
 *             - Rock
 *             - Psychic
 *             - Ice
 *             - Bug
 *             - Ghost
 *             - Steel
 *             - Dragon
 *             - Dark
 *             - Fairy
 *           description: The typing of the move.
 *           example: Electric
 *         type:
 *           type: string
 *           enum:
 *             - Physical
 *             - Special
 *             - Status
 *           description: The type of move.
 *           example: Special
 *         power:
 *           type: number
 *           minimum: 1
 *           description: The power of the move.
 *           example: 90
 *         accuracy:
 *           type: number
 *           minimum: 1
 *           maximum: 100
 *           description: The accuracy of the move.
 *           example: 100
 */

const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { checkAdmin } = require('../middleware/admin.middleware');
const Move = require('../models/Moves.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
  try {
    const allMoves = await Move.find();
    res.status(200).json(allMoves);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:moveId', async (req, res) => {
  const { moveId } = req.params;
  if (!ObjectId.isValid(moveId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const oneMove = await Move.findById(moveId);
    if (oneMove) {
      res.status(200).json(oneMove);
    } else {
      res.status(404).json('No move found with that id.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(oneMove);
  }
});

module.exports = router;
