import { getFileExtension } from "./helpers";

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const {userId, timestamp} = req.body;
    if (userId && timestamp) {
      cb(null, "public/files");
    } else {
      cb("User Id and timestamp is required");
    }
  },
  filename: function (req, file, cb) {
    const {userId, timestamp} = req.body;
    cb(
      null,
      userId + "_" + timestamp + getFileExtension(file.originalname)
    );
  },
});

export var upload = multer({ storage: storage });
