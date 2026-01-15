import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userType: { type: String },

  name: { type: String },
  father_name: { type: String },

  registration_no: { type: String, required: true },

  // Academic fields (optional for staff too)
  department: { type: String },
  program: { type: String }, // renamed from field
  level: { type: String },   // BS / MS / MPhil / PhD

  email: { type: String },
  password: { type: String, required: true },

  contact_no: { type: String },
  address: { type: String },
});

const studentSchema = new mongoose.Schema({
  userType: { type: String },

  name: { type: String },
  father_name: { type: String },

  registration_no: { type: String, required: true },

  // ✅ Academic fields (students)
  department: { type: String },
  program: { type: String },
  level: { type: String },
  semester: { type: Number },

  // ✅ NEW student-only fields
  batchYear: { type: Number },                 // e.g. 2023
  section: { type: String },                   // e.g. "A"
  shift: { type: String },                     // e.g. "Morning" / "Evening"
  status: { type: String, default: "Active" }, // Active / Alumni / Left

  email: { type: String },
  password: { type: String, required: true },

  contact_no: { type: String },
  address: { type: String },
});

const usersSchema = new mongoose.Schema({
  admins: [userSchema],
  monitors: [userSchema],
  faculties: [userSchema],
  students: [studentSchema],
});

const Users = mongoose.model("Users", usersSchema);
export default Users;
