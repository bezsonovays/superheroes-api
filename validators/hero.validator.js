const Joi = require('joi');

const {
  nicknameValidator,
  realNameValidator,
  originDescriptionValidator,
  superpowersValidator,
  catchPhraseValidator
} = require("./common.validator");

module.exports = {
  newHeroValidator: Joi.object({
    nickname: nicknameValidator.required(),
    real_name: realNameValidator.required(),
    origin_description: originDescriptionValidator.required(),
    superpowers: superpowersValidator.required(),
    catch_phrase: catchPhraseValidator.required(),
  }),

  updateHeroValidator: Joi.object({
    nickname: nicknameValidator,
    real_name: realNameValidator,
    origin_description: originDescriptionValidator,
    superpowers: superpowersValidator,
    catch_phrase: catchPhraseValidator,
  }),
};
