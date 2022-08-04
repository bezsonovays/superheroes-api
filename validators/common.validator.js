const Joi = require("joi");

module.exports = {
  nicknameValidator: Joi.string().trim(),
  realNameValidator: Joi.string().trim(),
  originDescriptionValidator: Joi.string().trim(),
  superpowersValidator: Joi.string().trim(),
  catchPhraseValidator: Joi.string().trim(),
};
