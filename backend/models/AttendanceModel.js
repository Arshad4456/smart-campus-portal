// backend/models/AttendanceModel.js
import mongoose from "mongoose";

const studentRowSchema = new mongoose.Schema(
  {
    registration_no: { type: String, required: true },
    name: { type: String, default: "" },

    // days: { "1": "P", "2": "A", "3": "L", ... }
    days: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { _id: false }
);

const attendanceSheetSchema = new mongoose.Schema(
  {
    userType: { type: String, required: true, enum: ["student", "faculty"] },

    // Scope for filtering
    department: { type: String, default: "" },
    program: { type: String, default: "" },
    level: { type: String, default: "" }, // BS / MS / MPhil / PhD
    semester: { type: Number },

    // Month & year
    month: { type: Number, required: true }, // 1..12
    year: { type: Number, required: true },

    // Sheet rows
    records: { type: [studentRowSchema], default: [] },

    createdBy: { type: String, default: "" }, // registration_no of creator (admin/faculty)
    updatedBy: { type: String, default: "" },
  },
  { timestamps: true }
);

// Prevent duplicate sheets for same scope
attendanceSheetSchema.index(
  { userType: 1, department: 1, program: 1, level: 1, semester: 1, month: 1, year: 1 },
  { unique: true }
);

const Attendance = mongoose.model("Attendance", attendanceSheetSchema);
export default Attendance;
