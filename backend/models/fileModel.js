import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true
  }
});

const fileModel = mongoose.model("File", fileSchema);
export default fileModel;
