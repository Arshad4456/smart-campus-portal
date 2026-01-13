import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  userType: { type: String, enum: ["student", "faculty", "monitor", "admin"], required: true },
  registration_no: { type: String, required: true },
  name: String,
  department: String,
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["Present", "Absent", "Leave"], required: true }
});

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
export default AttendanceModel;
