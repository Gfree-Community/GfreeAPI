const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../../test-setup");

setupDB();


describe("getPopularIn Endpoint", () => {
  it("Should Show 5 Discussions", async (done) => {
    const res = await request(app).get("/getDiscussionsPopularIn").query({
      count: 5,
      page: 1,
      time: "forever",
    });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    done();
  });
});


