import mongoose from "mongoose";

const classroomSchema = new mongoose.Schema({
  classroomName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  buildingLocation: {
    type: String,
    required: true,
  },
  assignedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],
}, {timestamps: true});

export default mongoose.model("Classroom", classroomSchema);