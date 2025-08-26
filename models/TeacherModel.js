import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  firstName: {
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
  subjectSpecialization: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  assignedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }],
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);


