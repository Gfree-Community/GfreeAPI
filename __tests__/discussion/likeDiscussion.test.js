const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

const newDiscussion = {
  title: "Understand the Superpower of Optional Chaining in JavaScript",
  body:
    "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
  tags: ["home", "bro"],
};

describe("/likeDiscussion endpoint", () => {
  it("Should like a Discussion Successfully", async (done) => {
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

    // Create a Discussion
    const {
      body: {
        discussion: { _id: discussionId },
      },
    } = await request(app)
      .post("/createDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: newDiscussion,
      });

    // Like Discussion
    const res = await request(app)
      .post("/likeDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussionId,
        },
        likes: 5,
      });

    // Retrive a Discussion
    const {
      body: { discussion },
    } = await request(app)
      .post("/getDiscussion")
      .send({
        discussion: {
          _id: discussionId,
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(discussion.likes).toEqual(5);
    expect(discussion.likedBy[0].likes).toEqual(5);

    // Like Discussion
    const resUpdated = await request(app)
      .post("/likeDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussionId,
        },
        likes: 10,
      });

    // Retrive a Discussion
    const {
      body: { discussion: updatedDiscussion },
    } = await request(app)
      .post("/getDiscussion")
      .send({
        discussion: {
          _id: discussionId,
        },
      });

    const {
      body: { user: updatedUser },
    } = await request(app)
      .get("/getUser")
      .set("Authorization", `Bearer ${token}`);

    expect(updatedDiscussion.likes).toEqual(10);
    expect(updatedDiscussion.likedBy[0].likes).toEqual(10);
    expect(updatedUser.likedDiscussions[0].likes).toEqual(10);
    done();
  });
});

