const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

const newRecipe = {
  title: "Understand the Superpower of Optional Chaining in JavaScript",
  body: {
    ingredients:
      "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
    preparations:
      "To solve the above problem what we do is , we will add check if name property available in the user object",
  },
  thumbnail: "https://miro.medium.com/max/1400/1*jbC9WZGu0PU2POMmGr9rWg.jpeg",
  cookingTime: "120",
  description:
    "The optional chaining will check if an object left to the operator is valid (not null and undefined).",
  tags: ["home", "bro"],
};

describe("/deleteRecipeComment endpoint", () => {
  it.only("Should get a recipe Successfully", async (done) => {
    const user = {
      email: "jvm@gmail.com",
      password: "allo1234",
      fullname: "Test man",
    };
    // Register User
    await request(app).post("/signup").send({
      user,
    });
    // Login User to get Token
    const {
      body: { token },
    } = await request(app)
      .post("/signin")
      .send({
        user: {
          email: user.email,
          password: user.password,
        },
      });

    // Create a recipe
    const {
      body: {
        recipe: { _id: recipeId },
      },
    } = await request(app)
      .post("/createRecipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: newRecipe,
      });

    // Add comments
    await request(app)
      .post("/addComment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: {
          _id: recipeId,
        },
        comment: {
          comment: "Hello world",
        },
      });
    await request(app)
      .post("/addComment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: {
          _id: recipeId,
        },
        comment: {
          comment: "Hello world2",
        },
      });

    // Retrive a recipe
    const res = await request(app)
      .post("/getRecipe")
      .send({
        recipe: {
          _id: recipeId,
        },
      });

    const recipe = res.body.recipe;

    //Delete Comment
    const deletedCommentRes = await request(app)
      .post("/deleteRecipeComment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: {
          _id: recipeId,
          commentId: recipe.comments[1]._id,
        },
      });

    const updatedRes = await request(app)
      .post("/getRecipe")
      .send({
        recipe: {
          _id: recipeId,
        },
      });
    const updatedRecipe = updatedRes.body.recipe;

    expect(deletedCommentRes.statusCode).toEqual(201);
    expect(updatedRecipe.comments[0].comment).toEqual("Hello world");

    done();
  });
});
