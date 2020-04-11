const Recipe = require('../../../models/Recipe');
const mongoose = require('mongoose');


module.exports=(req,res)=>{
    
    const recipe = new Recipe({
        title : req.body.title,
        body: req.body.body,
        author: req.body.author,
        thumbnail:req.body.thumbnail,
        cookingTime: req.body.cookingTime,
        description: req.body.description,
        tags: req.body.tags
        
    });

    recipe.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message:'Recipe saved',
            createdRecipe: result
        });
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
}