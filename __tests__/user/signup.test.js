const request = require("supertest");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/signup Endpoint", () => {
  it("Should register user successfully", async (done) => {
    const res = await request(app)
      .post("/signup")
      .send({
        user: {
          email: "jvm@gmail.com",
          password: "allo1234",
          fullname: "Test man",
        },
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
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

  it("Should throw error if email already exists", async (done) => {
    const breh = await request(app)
      .post("/signup")
      .send({
        user: {
          email: "jvm1@gmail.com",
          password: "allo1234",
          fullname: "Test man",
        },
      });
    const res = await request(app)
      .post("/signup")
      .send({
        user: {
          email: "jvm1@gmail.com",
          password: "allo1234",
          fullname: "Bruh moment",
        },
      });
    expect(res.statusCode).toEqual(403);
    done();
  });
});
