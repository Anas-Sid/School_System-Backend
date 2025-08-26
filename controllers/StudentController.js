
import Student from "../models/StudentModel.js";
import Course from "../models/CourseModel.js";

const studentregister = async(req, res)=>{
  const { firstName, lastName, email, dateOfBirth ,gender ,address , phoneNumber } = req.body;
  try{
    const alreadysxits = await Student.findOne({email});
    if(alreadysxits){
      return res.status(400).json({message: 'Student already exists'});
    }
  const student = new Student({firstName, lastName, email, dateOfBirth ,gender ,address , phoneNumber });
  await student.save();
  res.status(201).json({message: 'Student registered successfully', student});
  }
  catch (err) {
    res.status(500).json({ message: 'Server error a raha ha' });
  }
};


const getStudentData = async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getStudentCourses = async (req, res) => {
  const { email } = req.params;
  try {
    const student = await Student.findOne({ email }).populate('enrolledCourses');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ enrolledCourses: student.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses');
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const updateStudent = async (req, res) => {
  const { email } = req.params;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { email },
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteStudent = async (req, res) => {
  const { email } = req.params;
  try {
    const deletedStudent = await Student.findOneAndDelete({ email });
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const courseenrollment = async (req, res) => {
  const { email } = req.params;
  const { courseCode } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    student.enrolledCourses.push(course._id);
    await student.save();

    course.studentsEnrolled.push(student._id);
    await course.save();

    res.status(200).json({ message: 'Course enrolled successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getStudentData, studentregister, getStudentCourses, getAllStudents, updateStudent, deleteStudent, courseenrollment };
