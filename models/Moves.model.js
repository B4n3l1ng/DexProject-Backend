const { Schema, model } = require('mongoose');

const moveSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  typing: {
    type: String,
    enum: [
      'Normal',
      'Fire',
      'Water',
      'Grass',
      'Flying',
      'Fighting',
      'Poison',
      'Electric',
      'Ground',
      'Rock',
      'Psychic',
      'Ice',
      'Bug',
      'Ghost',
      'Steel',
      'Dragon',
      'Dark',
      'Fairy',
    ],
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Physical', 'Special', 'Status'],
  },
  power: {
    type: Number,
    min: 1,
  },
  acuracy: {
    type: Number,
    min: 1,
    max: 100,
  },
});

const Move = model('Move', moveSchema);

module.exports = Move;
