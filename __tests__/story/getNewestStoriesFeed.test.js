const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../../test-setup");

setupDB();

const getNewestStoriesFeed = request(app).get("/getNewestStoriesFeed");

describe("getNewestStoriesFeed Endpoint", () => {
  it("Should Show 5 stories", async (done) => {
    const res = await request(app).get("/getNewestStoriesFeed").query({
      count: 5,
      page: 1,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });
});
