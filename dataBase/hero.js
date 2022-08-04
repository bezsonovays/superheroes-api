const { Schema, model } = require('mongoose');

const HeroSchema = new Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  real_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  origin_description: {
    type: String,
    required: true,
    trim: true,
  },

  superpowers: {
    type: String,
    required: true,
    trim: true,
  },

  catch_phrase: {
    type: String,
    required: true,
    trim: true,
  },

  images: [String],

}, { timestamps: true });

module.exports = model('hero', HeroSchema);
