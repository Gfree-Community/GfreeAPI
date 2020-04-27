const Recipe = require("../../../models/Recipe");
const mongoose = require("mongoose");

module.exports = (id) => Recipe.remove({ _id: id }).exec();
