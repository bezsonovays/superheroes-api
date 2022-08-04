const { heroService, s3Service } = require('../services');
const { heroPresenter } = require('../presenters');

module.exports = {
  findHeros: async (req, res, next) => {
    try {
      const heros = await heroService.findHeros();

      const listForResponse = heroPresenter.herosList(heros);
      res.json(listForResponse);
    } catch (e) {
      next(e);
    }
  },

  createHero: async (req, res, next) => {
    try {
      const { body, images } = req;
      const hero = await heroService.createHero(body);

      const urls = [];

      for (const image of images) {
        const { Location } = await s3Service.uploadFile(image, 'hero', hero._id);
        urls.push(Location);
      }

      const heroWithPhoto = await heroService.updateOneHero({ _id: hero._id }, { images: urls });

      const heroForResponse = heroPresenter.heroDetail(heroWithPhoto);
      res.status(201).json(heroForResponse);
    } catch (e) {
      next(e);
    }
  },

  getHeroById: async (req, res, next) => {
    try {
      const { hero } = req;

      const heroForResponse = heroPresenter.heroDetail(hero);
      res.json(heroForResponse);
    } catch (e) {
      next(e);
    }
  },

  updateHeroById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { images, hero, body } = req;
      const urls = [];

      if (images) {
        for (const image of images) {
          const { Location } = await s3Service.uploadFile(image, 'hero', hero._id);
          urls.push(Location);
        }
      }

      const updatedHero = await heroService.updateOneHero({ _id: id }, {
        ...body,
        images: [...hero.images, ...urls],
      });

      const heroForResponse = heroPresenter.heroDetail(updatedHero);
      res.status(201).json(heroForResponse);
    } catch (e) {
      next(e);
    }
  },

  deleteHeroById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { images } = req.hero;

      await heroService.deleteOneHero({ _id: id });

      if (images?.length) {
        await Promise.all(images.map((image) => {
          s3Service.deleteFile(image);
        }));
      }

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },

  deleteImages: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { images, body } = req;

      const updatedHero = await heroService.updateOneHero({ _id: id }, { images }, { new: true, select: ['images'] });

      await Promise.all(body.map((image) => {
          s3Service.deleteFile(image);
      }));

      res.status(201).json(updatedHero.images);
    } catch (e) {
      next(e);
    }
  },
};
