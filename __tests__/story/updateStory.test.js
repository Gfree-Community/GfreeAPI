const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/updateStory endpoint", () => {
  it("Should update Story Successfully", async (done) => {
    const newStory = {
      title: "Understand the Superpower of Optional Chaining in JavaScript",
      body: 
          "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
      thumbnail:
        "https://miro.medium.com/max/1400/1*jbC9WZGu0PU2POMmGr9rWg.jpeg",
      readtime: "120",
      description:
        "The optional chaining will check if an object left to the operator is valid (not null and undefined).",
      tags: ["home", "bro"],
    };

    const updateStory = (_id) => ({
      _id,
      title: "update story",
      body:
          "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
      thumbnail: "update story",
      cookingTime: "140",
      description: "update story",
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

    // create Story
    const res2 = await request(app)
      .post("/createStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: newStory,
      });

    const story = res2.body.story;

    const res = await request(app)
      .post("/updateStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: updateStory(story._id),
      });

    const updatedStory = res.body.story;
    const expectedStory = updateStory(story._id);

    expect(res.statusCode).toEqual(201);
    Object.keys(expectedStory).forEach((key) => {
      expect(expectedStory[key]).toEqual(expectedStory[key]);
    });

    done();
  });
});

