const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})

const userSchemaByAdmin = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  roles: Joi.array().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required()
})

const userSchemaByManager = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email(),
  roles: Joi.array().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required()
})

module.exports = {
  insert,
  insertByAdmin,
  insertByManager
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function insertByAdmin(user) {
  user = await Joi.validate(user, userSchemaByAdmin, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()
  user.lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
  user.fullname = user.firstName + ' ' + user.lastName;
  delete user.password;
  return await new User(user).save();
}

async function insertByManager(user) {
  user = await Joi.validate(user, userSchemaByManager, { abortEarly: false });
  user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()
  user.lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
  user.fullname = user.firstName + ' ' + user.lastName;
  user.password = (user.firstName[0] + user.lastName).toLowerCase();
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}
