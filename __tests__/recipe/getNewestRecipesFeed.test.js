const request = require("supertest");
const app = require("../../server");

describe("getNewestRecipesFeed Endpoint", () => {
  it("Should Show 5 recipes", async () => {
    const res = await request(app).get("/getNewestRecipesFeed").query({
      count: 5,
      page: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.recipe.length).toEqual(5);
  });
});
