import Classroom from '../models/ClassroomModel.js';

const addclassroom = async (req, res) => {
  const { classroomName, capacity, buildingLocation, assignedCourses } = req.body;

  try {
    const newClassroom = new Classroom({
      classroomName,
      capacity,
      buildingLocation,
      assignedCourses
    });

    await newClassroom.save();
    res.status(201).json({ message: "Classroom created successfully", classroom: newClassroom });
  } catch (error) {
    res.status(500).json({ message: "Error creating classroom" });
  }
};

export { addclassroom };
