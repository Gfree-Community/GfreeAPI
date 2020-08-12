const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/getByNewestDiscussions endpoint", () => {
  it.only("Should return discussions with the right tag.", async (done) => {
    const newDiscussion = {
      title: "Understand the Superpower of Optional Chaining in JavaScript",
      body:
        "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
      tags: ["home", "bro"],
    };

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

    // create Discussion
    await request(app)
      .post("/createDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: newDiscussion,
      });

    const res = await request(app).get("/getNewestDiscussionsByTag").query({
      tag: "bro",
    });
    expect(res.body.length).toEqual(1);

    const failedRes = await request(app)
      .get("/getNewestDiscussionsByTag")
      .query({
        tag: "brotello",
      });
    expect(failedRes.body.length).toEqual(0);

    done();
  });
});
