const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Item = model('Item', itemSchema);
module.exports = Item;
