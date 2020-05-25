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

describe("/likeRecipe endpoint", () => {
  it.only("Should like a recipe Successfully", async (done) => {
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

    // Like Recipe
    const res = await request(app)
      .post("/likeRecipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: {
          _id: recipeId,
        },
        likes: 5,
      });

    // Retrive a recipe
    const {
      body: { recipe },
    } = await request(app)
      .post("/getRecipe")
      .send({
        recipe: {
          _id: recipeId,
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(recipe.likes).toEqual(5);
    expect(recipe.likedBy[0].likes).toEqual(5);

    // Like Recipe
    const resUpdated = await request(app)
      .post("/likeRecipe")
      .set("Authorization", `Bearer ${token}`)
      .send({
        recipe: {
          _id: recipeId,
        },
        likes: 10,
      });

    // Retrive a recipe
    const {
      body: { recipe: updatedRecipe },
    } = await request(app)
      .post("/getRecipe")
      .send({
        recipe: {
          _id: recipeId,
        },
      });

    const {
      body: { user: updatedUser },
    } = await request(app)
      .get("/getUser")
      .set("Authorization", `Bearer ${token}`);

    expect(updatedRecipe.likes).toEqual(10);
    expect(updatedRecipe.likedBy[0].likes).toEqual(10);
    expect(updatedUser.likedRecipes[0].likes).toEqual(10);
    done();
  });
});
