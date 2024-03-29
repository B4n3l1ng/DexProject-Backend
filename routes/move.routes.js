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

router.put('/:moveId', isAuthenticated, checkAdmin, async (req, res) => {
  const { moveId } = req.params;
  if (!ObjectId.isValid(moveId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  const { name, description, typing, type } = req.body;
  if (name === '' || description === '' || typing === '' || type === '') {
    res.status(406).json('Name, Description, Typing and Type are required');
    return;
  }
  const payload = { name, description, typing, type };
  if (req.body.power) {
    payload.power = parseInt(req.body.power);
  }
  if (req.body.accuracy) {
    payload.accuracy = parseInt(req.body.accuracy);
  }
  try {
    const updated = await Move.findByIdAndUpdate(moveId, payload, { new: true });
    res.status(202).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', isAuthenticated, checkAdmin, async (req, res) => {
  const { name, description, typing, type } = req.body;
  if (name === '' || description === '' || typing === '' || type === '') {
    res.status(406).json('Name, Description, Typing and Type are required');
    return;
  }
  const payload = { name, description, typing, type };
  if (req.body.power) {
    payload.power = parseInt(req.body.power);
  }
  if (req.body.accuracy) {
    payload.accuracy = parseInt(req.body.accuracy);
  }
  try {
    const newMove = await Move.create(payload);
    res.status(201).json(newMove);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/:moveId', isAuthenticated, checkAdmin, async (req, res) => {
  const { moveId } = req.params;
  if (!ObjectId.isValid(moveId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const deleted = await Move.findByIdAndDelete(moveId);
    res.status(202).json('Move deleted successfully.');
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
