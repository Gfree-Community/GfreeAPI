const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/getByNewestStories endpoint", () => {
  it.only("Should return stories with the right tag.", async (done) => {
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
    await request(app)
      .post("/createStory")
      .set("Authorization", `Bearer ${token}`)
      .send({
        story: newStory,
      });

    const res = await request(app).get("/getNewestStoriesByTag").query({
      tag: "bro",
    });
    expect(res.body.length).toEqual(1);

    const failedRes = await request(app).get("/getNewestStoriesByTag").query({
      tag: "brotello",
    });
    expect(failedRes.body.length).toEqual(0);

    done();
  });
});
