const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

aws.config.update({
  accessKeyId: "AKIAWA7MZYKNR5YRIFDV",
  secretAccessKey: "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",
});

const sendUploadSignature = router.post("/", (req, res, next) => {
  const {
    file: { type },
  } = req.body;
  const s3 = new aws.S3();
  const params = {
    Bucket: "gfreebucket",
    Key: uuidv4(),
    Expires: 60,
    ContentType: type,
  };
  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ token: data });
    }
  });
});

module.exports = sendUploadSignature;
