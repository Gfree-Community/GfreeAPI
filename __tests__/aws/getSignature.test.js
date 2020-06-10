const request = require("supertest");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

const newRecipe = {
  title: "Understand the Superpower of Optional Chaining in JavaScript",
  body: {
    ingredients:
      "Optional chaining will eliminate the need for manually checking if a property is available in an object . With optional chaining the checking will be done internally.",
    preparations:
      "To solve the above problem what we do is , we will add check if name property available in the user object",
  },
  thumbnail: "https://miro.medium.com/max/1400/1*jbC9WZGu0PU2POMmGr9rWg.jpeg",
  cookingTime: "120",
  description:
    "The optional chaining will check if an object left to the operator is valid (not null and undefined).",
  tags: ["home", "bro"],
};

describe("/getRecipe endpoint", () => {
  it.only("Should get a recipe Successfully", async (done) => {
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

    // Aws get Signature
    const res = await request(app)
      .post("/getS3Signature")
      .set("Authorization", `Bearer ${token}`)
      .send({
        file: { type: "jpg" },
      });
    console.log(res.body);

    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.token).toBe("string");

    done();
  });
});
