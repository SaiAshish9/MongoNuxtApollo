const mongoose = require("mongoose"),
  Joi = require("@hapi/joi");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  gender: String,
  status: String
});

const validateCharacter = character => {
  return Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    status: Joi.string().allow(""),
    gender: Joi.string().allow(""),
    image: Joi.string().allow("")
  }).validate(character);
};

exports.Character = mongoose.model("Character", CharacterSchema);
exports.validateCharacter = validateCharacter;
