const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const archive = require("../../routes/Recipe/functions/archive");
const delet = require("../../routes/Recipe/functions/delete");
router.post("/",(req,res,next )=>{
    const id= req.body._id;
    archive(req,res,next);
    delet(id,res,next);

});
module.exports= router;
