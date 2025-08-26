
import mongoose from "mongoose";

const assignmentSchema = new moongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  }],
},{timestamps: true});

module.exports = mongoose.model("Assignment", assignmentSchema);