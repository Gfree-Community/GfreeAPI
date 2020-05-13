const router = require("express").Router();
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");
const User = require("../../controllers/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const RequestMsg = ({ token, email }) => ({
  to: email,
  from: "test@example.com",
  subject: "Gfree,Password Reset Request",
  text: "Click the link below to reset your password",
  html: `<strong>
  <a href={http:localhost:3000/profile/change-password?token=${token}}>Change Password</a></strong>`,
});

const requestPasswordChange = router.body("/", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findUser({ email });
  /** Make sure if the user exists */
  if (!user) {
    res.send(401).json({ message: "Email doesn't exist" });
    return;
  }
  /** We'll use this JWT token to allow user to change password. */
  const token = jwt.sign({ id: email }, "t7m08", {
    expiresIn: "24h",
  });
  await sgMail.send(
    RequestMsg({
      email,
      token,
    })
  );
  res.status(201);
});

module.exports = requestPasswordChange;
