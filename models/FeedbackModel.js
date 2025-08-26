import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
},{timestamps: true});

module.exports = mongoose.model("Feedback", feedbackSchema);