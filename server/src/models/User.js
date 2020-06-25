const mongoose = require("mongoose"),
  Joi = require("@hapi/joi");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:1,
    maxlength:50,
  },
  email: {
    type: String,
    required: true,
    minlength:5,
    maxlength:100,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength:3,
    maxlength:1024
  },
  emailVerified:{
    type: Boolean,
    default:false
  }
});

const validateUser = user => {
  return Joi.object({
    name: Joi.string()
      .alphanum()
      .min(1)
      .max(50)
      .required(),
    email: Joi.string().required(),
    password: Joi.string().min(5).max(1024).required()
  }).validate(user);
};

exports.User = mongoose.model("User", UserSchema);
exports.validateUser = validateUser
