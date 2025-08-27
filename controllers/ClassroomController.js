import Classroom from '../models/ClassroomModel.js';
import course from '../models/CourseModel.js';

const addclassroom = async (req, res) => {
  const { classroomName, capacity, buildingLocation } = req.body;

  try {
    const newClassroom = new Classroom({
      classroomName,
      capacity,
      buildingLocation,
    });
    await newClassroom.save();
    res.status(201).json({ message: "Classroom created successfully", classroom: newClassroom });
  } catch (error) {
    res.status(500).json({ message: "Error creating classroom" });
  }
};

const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json({ classrooms });
  } catch (error) {
    res.status(500).json({ message: "Error fetching classrooms" });
  }
};

const getclassroom = async (req, res) => {
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json({ classroom });
  } catch (error) {
    res.status(500).json({ message: "Error fetching classroom" });
  }
};

const updateclassroom = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(id, req.body, { new: true });
  console.log(updatedClassroom)
    if (!updatedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json({ message: "Classroom updated successfully", classroom: updatedClassroom });
  } catch (error) {
    res.status(500).json({ message: "Error updating classroom" });
  }
};

const deleteclassroom = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(id);
    if (!deletedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting classroom" });
  }
};

const addcourseinclassroom = async (req, res) => {
  const { id } = req.params;
  const { courseId } = req.body;

  try {
    const classroom = await Classroom.findById(id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    classroom.assignedCourses.push(courseId);
    await classroom.save();

    res.status(200).json({ message: "Course added to classroom successfully", classroom });
  } catch (error) {
    res.status(500).json({ message: "Error adding course to classroom" });
  }
};

export { addclassroom, getAllClassrooms, getclassroom, updateclassroom, deleteclassroom, addcourseinclassroom };
