const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../../controllers/User");
const nodemailer = require("nodemailer");

/**Gfree email configs */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ilyassbenhakim2@gmail.com",
    pass: "zgycuieidwwlzaev",
  },
});

/**Mail payload */
const mailOptions = ({ token, email }) => ({
  from: "ilyassbenhakim2@gmail.com",
  to: email,
  subject: "Gfree, Password Reset Request",
  text: "Click the link below to reset your password",
  html: `<strong>
  <a href={http:localhost:3000/profile/change-password?token=${token}}>Change Password</a></strong>`,
});

const requestPasswordChange = router.post("/", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findUser({ email });
  /** Make sure if the user exists */
  if (!user) {
    res.send(403).json({ message: "Email doesn't exist" });
    return;
  }
  /** We'll use this JWT token to allow user to change password. */
  const token = jwt.sign({ id: email }, "t7m08", {
    expiresIn: "24h",
  });

  await transporter.sendMail(mailOptions({ token, email }));
  res.status(201);
});

module.exports = requestPasswordChange;
