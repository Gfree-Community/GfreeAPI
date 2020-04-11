const Recipe = require('../../../models/Recipe');
const mongoose = require('mongoose');



module.exports= (id,res)=>{

    Recipe.remove({_id: id})
    .exec()
    .then(result =>{
      res.status(200).json({
        message:'product deleted'
      });
  
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
      
}