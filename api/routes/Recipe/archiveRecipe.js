const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const archive = require("../../routes/Recipe/functions/archive");

router.post("/",(req,res,next )=>{

    archive(req,res);

});