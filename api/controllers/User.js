const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");

const setPassword = ({ password }) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, 11, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

const validatePassword = ({ password, hash }) => 
bcrypt.compareSync(password, hash);

const findUser = ({ email }) => User.findOne({ email }).exec();

const createUser = ({ email, password, fullname }) =>
  new User({
    _id: new mongoose.Types.ObjectId(),
    email,
    password,
    fullname,
  }).save();

const findUsers = () => User.find().exec();

module.exports = {
  setPassword,
  validatePassword,
  findUser,
  createUser,
  findUsers,
};
