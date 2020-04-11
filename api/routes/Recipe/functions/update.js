const Recipe = require('../../../models/Recipe');
const mongoose = require('mongoose');


module.exports=(id,req,res)=>{
    
    Recipe.updateOne({_id:id},{$set:req.body})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'recipe updated',
        request:{
          type:'GET',
          url:'http://localhost:3000/products/'+ id
        }
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
}