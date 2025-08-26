import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  }],
}, {timestamps: true});

export default mongoose.model("Parent", parentSchema);
