const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

aws.config.update({
  accessKeyId: "AKIAWA7MZYKNVD6SAKP7",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "eu-west-3",
});

const sendUploadSignature = router.post("/", (req, res, next) => {
  const {
    file: { type },
  } = req.body;
  const s3 = new aws.S3();
  const fileName = uuidv4();
  const params = {
    Bucket: "gfreebucket",
    Key: fileName,
    ACL: "public-read",
    Expires: 60,
    ContentType: type,
  };
  s3.getSignedUrl("putObject", params, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ token: data, fileName });
    }
  });
});

module.exports = sendUploadSignature;
