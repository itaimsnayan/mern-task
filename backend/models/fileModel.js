import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true,
  },
  access: {
    type: Object,
    default: [],
  },
});

const fileModel = mongoose.model("File", fileSchema);
export default fileModel;
