const aws = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

aws.config.update({
  accessKeyId: "AKIA43Q46XZFE5NEVTPK",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "us-east-2",
});

const sendUploadSignature = router.post("/", (req, res, next) => {
  const {
    file: { type },
  } = req.body;
  const s3 = new aws.S3();
  const fileName = uuidv4();
  const params = {
    Bucket: "gfree-bucket",
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
