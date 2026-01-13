

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
    },
    name: {
      type: String,
    },
    father_name:{
      type: String,
    },
  registration_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
  },
  address: {
    type: String,
  },
});

const studentSchema = new mongoose.Schema({
  userType: {
        type: String,
    },
    name: {
      type: String,
    },
    father_name:{
      type: String,
    },
  registration_no: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
  },
  field: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
  },
  address: {
    type: String,
  },
})
const usersSchema = new mongoose.Schema({
    admins: [userSchema],
  monitors: [userSchema],
  faculties: [userSchema],
  students: [studentSchema],
});

// === Export model ===
const Users = mongoose.model("Users", usersSchema);

export default Users;
