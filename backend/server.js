import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute";
import fileRoute from "./routes/fileRoute";
var bodyParser = require("body-parser");

env.config();
const app = express();
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/file", fileRoute);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("connected to database."))
  .catch((error) => console.log("error in connecting to dataabase: ", error));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
