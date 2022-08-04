const router = require('express').Router();

const { heroController } = require('../controllers');
const { commonMiddleware, heroMiddleware, fileMiddleware } = require('../middlewares');
const { heroValidator } = require('../validators');

router.get('/',
    heroController.findHeros);
router.post('/',
    commonMiddleware.isDateValid(heroValidator.newHeroValidator),
    fileMiddleware.checkHeroImages,
    fileMiddleware.checkImagesCountForCreate,
    heroMiddleware.isHeroUniq,
    heroController.createHero);

router.get('/:id',
    commonMiddleware.isIdValid,
    heroMiddleware.isHeroPresent,
    heroController.getHeroById);
router.put('/:id',
    commonMiddleware.isIdValid,
    fileMiddleware.checkHeroImages,
    commonMiddleware.isDateValid(heroValidator.updateHeroValidator),
    heroMiddleware.isHeroUniq,
    heroMiddleware.isHeroPresent,
    fileMiddleware.checkImagesCountForUpdate,
    heroController.updateHeroById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    heroMiddleware.isHeroPresent,
    heroController.deleteHeroById);

router.delete('/:id/images',
    commonMiddleware.isIdValid,
    heroMiddleware.isHeroPresent,
    fileMiddleware.isImagesExist,
    fileMiddleware.checkImagesCountForDelete,
    heroController.deleteImages);

module.exports = router;
