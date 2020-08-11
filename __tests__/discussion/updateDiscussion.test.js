const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/updateDiscussion endpoint", () => {
  it("Should update Discussion Successfully", async (done) => {
    const newDiscussion = {
      title: "Understand the Superpower of Optional Chaining in JavaScript",
      body: 
          "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
      tags: ["home", "bro"],
    };

    const updateDiscussion = (_id) => ({
      _id,
      title: "update Discussion",
      body:
          "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
      tags: ["update"],
    });

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
    const res2 = await request(app)
      .post("/createDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: newDiscussion,
      });

    const discussion = res2.body.discussion;

    const res = await request(app)
      .post("/updateDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: updateDiscussion(discussion._id),
      });

    const updatedDiscussion = res.body.discussion;
    const expectedDiscussion = updateDiscussion(discussion._id);

    expect(res.statusCode).toEqual(201);
    Object.keys(expectedDiscussion).forEach((key) => {
      expect(expectedDiscussion[key]).toEqual(expectedDiscussion[key]);
    });

    done();
  });
});


