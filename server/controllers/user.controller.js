const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().regex(/^[a-zA-Z0-9]{6,16}$/).min(6),
  repeatPassword: Joi.string().valid(Joi.ref('password')),
  roles: Joi.array().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required()
})

const userSchemaByAdmin = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().trim().regex(/^[a-zA-Z0-9]{6,16}$/).min(6),
  repeatPassword: Joi.string().valid(Joi.ref('password')),
  roles: Joi.array().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required()
}).with('password', ['repeatPassword']);

const userSchemaByManager = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  roles: Joi.array().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().required()
})

const userSchemaPassword = Joi.object({
  password: Joi.string().trim().required().regex(/^[a-zA-Z0-9]{6,16}$/).min(6),
  repeatPassword: Joi.string().valid(Joi.ref('password')).required(),
})

module.exports = {
  insert,
  insertByAdmin,
  insertByManager,
  updateByAdmin,
  changePassword
}

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function insertByAdmin(user) {
  user = await Joi.validate(user, userSchemaByAdmin, { abortEarly: false });
  user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()
  user.lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
  user.fullname = user.firstName + ' ' + user.lastName;
  if (user.password === undefined) {
    user.password = (user.firstName[0] + user.lastName).toLowerCase();
  }
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
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

async function updateByAdmin(user) {
  delete user._id
  user = await Joi.validate(user, userSchemaByAdmin, { abortEarly: false });
  user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()
  user.lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1).toLowerCase();
  user.fullname = user.firstName + ' ' + user.lastName;
  if (user.password === undefined) {
    user.password = (user.firstName[0] + user.lastName).toLowerCase();
  }
  if (user.password === 'password') {
    //do not change password
  } else {
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
  }
  delete user.password;
  return await user;
}

async function changePassword(user) {
  delete user._id
  user = await Joi.validate(user, userSchemaPassword, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await user;
}