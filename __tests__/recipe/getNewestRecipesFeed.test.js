const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../../test-setup");

setupDB();

const getNewestRecipesFeed = request(app).get("/getNewestRecipesFeed");

describe("getNewestRecipesFeed Endpoint", () => {
  it("Should Show 5 recipes", async (done) => {
    const res = await request(app).get("/getNewestRecipesFeed").query({
      count: 5,
      page: 1,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });
});
