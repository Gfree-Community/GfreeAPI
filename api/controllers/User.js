const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");

const setPassword = ({ password }) => bcrypt(password, 12);

const validatePassword = ({ password, hash }) => bcrypt.compare(password, hash);

const findUser = ({ email }) => User.findOne({ email });

const createUser = ({ email, password, fullname }) =>
  new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
    fullname
  }).save();

const findUsers = () => User.find().sort({ createdAt: -1 }).limit(10).exec();

module.exports = {
  setPassword,
  validatePassword,
  findUser,
  createUser,
  findUsers,
};
