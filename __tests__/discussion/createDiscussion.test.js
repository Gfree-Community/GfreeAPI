const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/createDiscussion endpoint", () => {
  it("Should createDiscussion Successfully", async (done) => {
    const newDiscussion = {
      title: "Understand the Superpower of Optional Chaining in JavaScript",
      body:
        "To solve the above problem what we do is , we will add check if name property available in the user object",
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
    const res = await request(app)
      .post("/createDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: newDiscussion,
      });

    const discussion = res.body.discussion;

    expect(res.statusCode).toEqual(201);
    Object.keys(newDiscussion).forEach((key) => {
      expect(newDiscussion[key]).toEqual(discussion[key]);
    });

    done();
  });
});

