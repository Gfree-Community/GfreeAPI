const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Recipe = require("../../models/Recipe");
const getnew = require("../../routes/Recipe/functions/get");

router.get("/",(req,res,next )=>{
const num = req.body.num;

    getnew(num,res);

});//needs more work 