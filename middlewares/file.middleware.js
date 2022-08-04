const { CustomError } = require('../errors');
const { constants } = require('../configs');

module.exports = {
  checkHeroImages: async (req, res, next) => {
    try {
      if (!req.files?.images) {
        return next();
      }

      let { images } = req.files;
      if (!images.length) images = [images];

      images.forEach(({ mimetype, size }) => {
        if (size > constants.IMAGE_MAX_SIZE) {
          return next(new CustomError(`Max size ${constants.IMAGE_MAX_SIZE / 1024 / 1024}MB`));
        }

        if (!constants.IMAGE_MIMETYPES.includes(mimetype)) {
          return next(new CustomError('Wrong file type'));
        }
      });

      req.images = images;
      next();
    } catch (e) {
      next(e);
    }
  },

  isImagesExist: async (req, res, next) => {
    try {
      const { body, hero } = req;

      const isExistAll = body.every((image) => hero.images.includes(image));

      if (!isExistAll) {
        return next(new CustomError('Some image not found'));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkImagesCountForCreate: async (req, res, next) => {
    try {
      if (!req.images) {
        return next(new CustomError('You need to add image'));
      }

      if (req.images.length > constants.IMAGE_MAX_COUNT) {
        return next(new CustomError(`Max images count is ${constants.IMAGE_MAX_COUNT}`));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkImagesCountForUpdate: async (req, res, next) => {
    try {
      const { images, hero } = req;

      if (!images) {
        return next();
      }

      if (images.length + hero.images.length > constants.IMAGE_MAX_COUNT) {
        return next(new CustomError(`Max images count is ${constants.IMAGE_MAX_COUNT}`));
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkImagesCountForDelete: async (req, res, next) => {
    try {
      const { body, hero: { images } } = req;

      const newImagesList = images.filter((image) => !body.includes(image));

      if (newImagesList < constants.IMAGE_MIN_COUNT) {
        return next(new CustomError(`Min images count is ${constants.IMAGE_MIN_COUNT}`));
      }

      req.images = newImagesList;
      next();
    } catch (e) {
      next(e);
    }
  },
}
