import express from "express";
import { createToken, sendResponse } from "../helpers";
import User from "../models/userModel";
import auth from "./verifyToken";

const router = express.Router();

router.get("/list", auth, async (req, res) => {
  const users = await User.find();
  if (users)
    sendResponse(res, 200, true, "User list fetched successfully", users);
  else sendResponse(res, 400, false, "Error in fetching user list.");
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    if (savedUser)
      sendResponse(res, 200, true, "Signin Successfull", savedUser);
    else sendResponse(res, 400, false, "Error in signing up.");
  } catch (err) {
    sendResponse(res, 400, false, err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return sendResponse(res, 400, false, "Email and Password is mandatory.");

    const user = await User.findOne({ email });
    if (user) {
      const { password } = req.body;
      if (password === user.password) {
          const token = createToken(user._id)
         const user_data = {
           _id: user._id,
           username: user.username,
           email,
           token,
         }
        sendResponse(res, 200, true, "Login successfull", user_data);
      } else sendResponse(res, 400, false, "Incorrect password Entered");
    } else sendResponse(res, 400, false, "User not found");
  } catch (error) {
    sendResponse(res, 400, false, error.message);
  }
});
export default router;
