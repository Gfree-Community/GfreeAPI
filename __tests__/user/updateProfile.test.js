const request = require("supertest");
const User = require("../../api/controllers/User");
const app = require("../../app");
const { setupDB } = require("../../test-setup");
setupDB();

describe("/updateProfile endpoint", () => {
  it("Should update profile successefuly", async (done) => {
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
    // Update User email and fullname.
    const res = await request(app)
      .post("/updateProfile")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user: {
          email: "jvm3@gmail.com",
          fullname: "Test man2",
        },
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.user.email).toBe("jvm3@gmail.com");
    expect(res.body.user.fullname).toBe("Test man2");
    expect(res.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          _id: expect.any(String),
          email: expect.any(String),
          fullname: expect.any(String),
        }),
      })
    );

    done();
  });
});
