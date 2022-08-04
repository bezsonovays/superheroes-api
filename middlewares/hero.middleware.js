const { CustomError } = require('../errors');
const { heroService } = require('../services');

module.exports = {
  isHeroPresent: async (req, res, next) => {
    try {
      const { id } = req.params;

      const hero = await heroService.findOneHero({ _id: id });
      if (!hero) {
        return next(new CustomError('Hero not found'));
      }

      req.hero = hero;
      next();
    } catch (e) {
      next(e);
    }
  },

  isHeroUniq: async (req, res, next) => {
    try {
      const { nickname, real_name } = req.body;

      const hero = await heroService.findByUniq(nickname, real_name);
      if (hero) {
        return next(new CustomError(`Hero with this nickname is exist`, 409));
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
