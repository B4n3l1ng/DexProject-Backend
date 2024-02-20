const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dexNumber: {
    type: Number,
    min: 1,
    required: true,
  },
  type: [
    {
      type: String,
      enum: [
        'normal',
        'fire',
        'water',
        'grass',
        'flying',
        'fighting',
        'poison',
        'electric',
        'ground',
        'rock',
        'psychic',
        'ice',
        'bug',
        'ghost',
        'steel',
        'dragon',
        'dark',
        'fairy',
      ],
    },
  ],
  baseStats: {
    type: {
      hp: Number,
      atk: Number,
      def: Number,
      sp_atk: Number,
      sp_def: Number,
      speed: Number,
    },
    required: true,
  },
  abilities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ability',
    },
  ],
  hiddenAbility: { type: Schema.Types.ObjectId, ref: 'Ability' },
  levelUpMoves: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Move',
      },
      level: { type: Number, min: 0, max: 100 },
    },
  ],
  machineMoves: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
  tutorMoves: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
  eggMoves: [{ type: Schema.Types.ObjectId, ref: 'Move' }],
  thumbnail: { type: String, required: true },
  shinyThumbnail: { type: String },
  dexEntry: { type: String, required: true },
  generation: { type: String, required: true, enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'] },
});

const Pokemon = model('Pokemon', pokemonSchema);

module.exports = Pokemon;
