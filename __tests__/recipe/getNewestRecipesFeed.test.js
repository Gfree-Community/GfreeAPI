const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../test-setup")

// Initialisation DB
setupDB();

const getNewestRecipesFeed = request(app).get("/getNewestRecipesFeed");

describe("getNewestRecipesFeed Endpoint", () => {
  it("Should Show 5 recipes", async () => {
    const res = await getNewestRecipesFeed.query({
      count: 5,
      page: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.recipe.length).toEqual(5);
  });

  it("Should have Recipes with Required Properties", async () => {
    const res = await getNewestRecipesFeed;
    res.body.recipe.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          _id: expect.any(String),
          title: expect.any(String),
          body: expect.any,
          author: expect.any(String),
          thumbnail: expect.any(String),
          createdAt: expect.any(String),
          cookingTime: expect.any(String),
          description: expect.any(String),
          tags: expect.any(Array),
        })
      );
    });
  });
});
