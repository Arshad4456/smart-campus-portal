import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema({
  registration_no: { type: String, required: true },
  name: String,
  department: String,
  semester: String,
  total_fee: Number,
  paid_fee: Number,
  remaining_fee: Number,
  status: { type: String, enum: ["Paid", "Partial", "Unpaid"], default: "Unpaid" },
  date: { type: Date, default: Date.now }
});

const FeesModel = mongoose.model("Fees", FeeSchema);
export default FeesModel;
