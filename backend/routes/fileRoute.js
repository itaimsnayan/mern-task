import express from "express";
import { getFileExtension, sendResponse } from "../helpers";
import File from "../models/fileModel";
import { upload } from "../multer";
import auth from "./verifyToken";
const multer = require("multer");

const router = express.Router();

router.get("/list", auth, async (req, res) => {
  const files = await File.find().populate("userId");
  if (files)
    sendResponse(res, 200, true, "File list fetched successfully", files);
  else sendResponse(res, 400, false, "Error in fetching user file.");
});

router.post("/add", upload.single("myFile"), async (req, res, next) => {
  var url = req.protocol + "://" + req.get("host");

  const myfile = req.file;
  const { userId, timestamp, filename, access } = req.body;

  if (!myfile) {
    return sendResponse(res, 400, false, "Please Upload a file.");
  } else {
    const path =
      url +
      "/files/" +
      userId +
      "_" +
      timestamp +
      getFileExtension(myfile.originalname);

      let useraccess = [];
      if (typeof access === "string") useraccess.push(access);
      else useraccess = access; 

    const file = new File({ userId, path, filename, access: useraccess });
    const savedFile = await file.save();
    if (savedFile)
      return sendResponse(
        res,
        200,
        true,
        "File uploaded and saved successfully!",
        savedFile
      );
    else
      return sendResponse(
        res,
        400,
        false,
        "Error in uploading and saving the file!"
      );
  }
});

export default router;
