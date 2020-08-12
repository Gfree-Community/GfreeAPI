const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
const { deleteComment } = require("../../api/controllers/Recipe");
setupDB();

const newStory = {
  title: "Understand the Superpower of Optional Chaining in JavaScript",
  body:
    "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",

  thumbnail: "https://miro.medium.com/max/1400/1*jbC9WZGu0PU2POMmGr9rWg.jpeg",
  readtime: "120",
  description:
    "The optional chaining will check if an object left to the operator is valid (not null and undefined).",
  tags: ["home", "bro"],
};

describe("/updateStoryComment endpoint", () => {
  it.only("Should get a story Successfully", async (done) => {
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

    // Create a story
    const {
      body: {
        story: { _id: storyId },
      },
    } = await request(app)
      .post("/createStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: newStory,
      });

    // Add comments
    await request(app)
      .post("/addCommentToStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: {
          _id: storyId,
        },
        comment: {
          comment: "Hello world",
        },
      });

    await request(app)
      .post("/addCommentToStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: {
          _id: storyId,
        },
        comment: {
          comment: "Hello world2",
        },
      });

    // Retrive a story
    const res = await request(app)
      .post("/getStory")
      .send({
        story: {
          _id: storyId,
        },
      });
    const story = res.body.story;

    //Delete Comment
    const deletedCommentRes = await request(app)
      .post("/updateStoryComment")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: {
          _id: storyId,
          commentId: story.comments[1]._id,
          updatedComment: "Hello world3"
        },
      });

    // Retrive a story
    const {body: {story: updatedStory}} = await request(app)
      .post("/getStory")
      .send({
        story: {
          _id: storyId,
        },
      });
    expect(deletedCommentRes.statusCode).toEqual(201);
    expect(updatedStory.comments[1].comment).toEqual("Hello world3");

    done();
  });
});

