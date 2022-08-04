const { Hero } = require('../dataBase');

module.exports = {
  findHeros: (params = {}) => {
    return Hero.find(params).select(['-catch_phrase', '-superpowers', '-origin_description', '-real_name']).lean();
  },

  findOneHero: (params = {}) => {
    return Hero.findOne(params);
  },

  findByUniq: (nickname, real_name) => {
    return Hero.findOne({ $or: [{ nickname }, { real_name }] });
  },

  createHero: (hero) => {
    return Hero.create(hero);
  },

  updateOneHero: (params, heroData, options = { new: true }) => {
    return Hero.findOneAndUpdate(params, heroData, options);
  },

  deleteOneHero: (params) => {
    return Hero.deleteOne(params);
  },
};
