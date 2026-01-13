import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  userType: { type: String, enum: ["admin", "faculty", "monitor"], default: "admin" },
  date: { type: Date, default: Date.now },
  important: { type: Boolean, default: false }
});

const NoticesModel = mongoose.model("Notices", NoticeSchema);
export default NoticesModel;
