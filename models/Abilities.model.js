const { Schema, model } = require('mongoose');

const abilitySchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Ability = model('Ability', abilitySchema);

module.exports = Ability;
