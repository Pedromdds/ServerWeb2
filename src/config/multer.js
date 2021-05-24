const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "src", "tmp", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "src", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  }),
};