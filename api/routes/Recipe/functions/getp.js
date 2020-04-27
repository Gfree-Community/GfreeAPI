const Recipe = require('../../../models/Recipe');
const mongoose = require('mongoose');

module.exports=(num,res)=>{

    Recipe.find()
    .sort({'Likes':-1})
    .limit(+num)
    .exec()
    .then(
        docs=>{
            const response ={
                count :docs.lenght,
                recipe: docs.map(doc=>{
                    return{
                        _id: doc._id,
                        title : doc.title,
                        body: doc.body,
                        author: doc.author,
                        likedBy: doc.likedBy,
                        Likes:doc.Likes,
                        recipeComments: doc.recipeComments,
                        thumbnail:doc.thumbnail,
                        cookingTime: doc.cookingTime,
                        description: doc.description,
                        tags: doc.tags
                    }
                })
            };
            res.status(200).json(response);
        }
    )


}
