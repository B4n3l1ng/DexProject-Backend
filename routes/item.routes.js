/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item.
 *           example: Potion
 *         description:
 *           type: string
 *           description: A description of the item.
 *           example: Restores a small amount of HP to the user's Pokémon.
 */

const router = require('express').Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const { checkAdmin } = require('../middleware/admin.middleware');
const Item = require('../models/Items.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.get('/', async (req, res) => {
  try {
    const allItems = await Item.find();
    res.status(200).json(allItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/', isAuthenticated, checkAdmin, async (req, res) => {
  const { effect, name } = req.body;
  if (effect === '' || name === '') {
    res.status(406).json('Name and Effect entries are required');
    return;
  }
  try {
    const newItem = await Item.create({ effect, name });
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  if (!ObjectId.isValid(itemId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const item = await Item.findById(itemId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json('No item with that id found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete('/:itemId', isAuthenticated, checkAdmin, async (req, res) => {
  const { itemId } = req.params;
  if (!ObjectId.isValid(itemId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  try {
    const deleted = await Item.findByIdAndDelete(itemId);
    res.status(202).json('Item deleted');
  } catch (error) {
    //console.log('the error', error);
    if (error.status === 401) {
      res.status(401).json('Operation limited to logged in users.');
      return;
    }
    res.status(500).json(error);
  }
});

router.put('/:itemId', isAuthenticated, checkAdmin, async (req, res) => {
  const { itemId } = req.params;
  if (!ObjectId.isValid(itemId)) {
    res.status(400).json('Not a valid Id');
    return;
  }
  const { name, effect } = req.body;
  if (name === '' || effect === '') {
    res.status(406).json('Name and Effect are required');
    return;
  }
  try {
    const updated = await Item.findByIdAndUpdate(itemId, { name, effect }, { new: true });
    res.status(202).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
