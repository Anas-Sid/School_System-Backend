
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  CourseDescription: {
    type: String,
    required: true
  },
  CreditHours: {
    type: String,
    required: true
  },
  TeacherId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  }],
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }]
},
{ timestamps: true }
);

export default mongoose.model("Course", courseSchema);


