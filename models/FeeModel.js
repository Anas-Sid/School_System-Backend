
import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  },
  dueDate: {
    type: Date,
    required: true
  },
  paidDate: {
    type: Date,
    required: true
  },
}, {timestamps: true});

export default mongoose.model("Fee", feeSchema);