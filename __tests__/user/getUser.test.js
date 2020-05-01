const request = require("supertest");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
const User = require("../../api/controllers/User");
setupDB();

test("/getUser Should return user from Token", async (done) => {
  await request(app)
    .post("/signup")
    .send({
      user: {
        email: "jvma@gmail.com",
        password: "allo1234",
        fullname: "Test man",
      },
    });

  const {
    body: { user, token },
  } = await request(app)
    .post("/signin")
    .send({
      user: {
        email: "jvma@gmail.com",
        password: "allo1234",
      },
    });

  const res = await request(app)
    .get("/getUser")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toEqual(200);
  expect(res.body.user).toEqual(user);

  done();
});
