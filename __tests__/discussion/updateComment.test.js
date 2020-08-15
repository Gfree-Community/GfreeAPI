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

describe("/updateDiscussionComment endpoint", () => {
  it.only("Should get a discussion Successfully", async (done) => {
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

    // Create a discussion
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

    await request(app)
      .post("/addCommentToDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussionId,
        },
        comment: {
          comment: "Hello world",
        },
      });

    await request(app)
      .post("/addCommentToDiscussion")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussionId,
        },
        comment: {
          comment: "Hello world2",
        },
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

    const updateCommentRes = await request(app)
      .post("/updateDiscussionComment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        discussion: {
          _id: discussionId,
          commentId: discussion.comments[1]._id,
          updatedComment: "Hello world3",
        },
      });

    const {
      body: { discussion: updatedDiscussion },
    } = await request(app)
      .post("/getDiscussion")
      .send({
        discussion: {
          _id: discussionId,
        },
      });

    expect(updateCommentRes.statusCode).toEqual(201);
    expect(updatedDiscussion.comments[1].comment).toEqual("Hello world3");

    done();
  });
});
