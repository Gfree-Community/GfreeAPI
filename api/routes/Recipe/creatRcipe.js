const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require("../../models/Recipe");
const RP = require("../../routes/Recipe/functions/post");

router.post("/",(req,res,next )=>{

    RP(req,res);

});