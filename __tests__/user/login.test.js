const request = require("supertest");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

const createUser = () =>
  test("Should login user successfully", async (done) => {
    expect.assertions(1);
    const user = await request(app)
      .post("/signup")
      .send({
        user: {
          email: "jvm@gmail.com",
          password: "allo1234",
          fullname: "Test man",
        },
      });
    const res = await request(app)
      .post("/signin")
      .send({
        user: {
          email: "jvm@gmail.com",
          password: "allo1234",
        },
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          _id: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
          fullname: expect.any(String),
        }),
      })
    );

    done();
  });

test("Should throw error if password is wrong", async (done) => {
  const res = await request(app)
    .post("/signin")
    .send({
      user: {
        email: "jvm@gmail.com",
        password: "allo12340",
      },
    });
  expect(res.statusCode).toEqual(422);
  done();
});

test("Should throw error if email is wrong", async (done) => {
  const res = await request(app)
    .post("/signin")
    .send({
      user: {
        email: "jvm1@gmail.com",
        password: "allo12440",
      },
    });
  expect(res.statusCode).toEqual(422);
  done();
});
