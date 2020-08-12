const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/deleteDiscussion endpoint", () => {
  it("Should deleteDiscussion Successfully", async (done) => {
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

    await request(app)
      .post("/deleteDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussion._id,
        },
      });

    // Retreive a Discussion
    const {
      body: { discussion: deletedDiscussion },
    } = await request(app)
      .post("/getDiscussion")
      .send({
        discussion: {
          _id: discussion._id,
        },
      });

    expect(deletedDiscussion).toBeNull();
    done();
  });
});
