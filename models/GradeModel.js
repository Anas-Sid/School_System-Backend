import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    grade: {
      type: String,
      required: true
    },
}, { timestamps: true });

module.exports = mongoose.model("Grade", gradeSchema);