const request = require("supertest");
const app = require("../../server");
const { setupDB } = require("../../test-setup");

setupDB();

describe("getNewestDiscussionsFeed Endpoint", () => {
  it("Should Show 5 Discussions", async (done) => {
    const res = await request(app).get("/getNewestDiscussionsFeed").query({
      count: 5,
      page: 1,
    });
    expect(res.statusCode).toEqual(200);
    done();
  });
});

