const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  effect: { type: String, required: true, trim: true },
  image: String,
});

const Item = model('Item', itemSchema);
module.exports = Item;
