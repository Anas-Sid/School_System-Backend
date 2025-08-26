import Teacher from "../models/TeacherModel.js";
import Course from "../models/CourseModel.js";

const teacherregister = async(req , res)=>{
  const {firstName, lastName, email, subjectSpecialization, phoneNumber, address } = req.body;
  try {
    const alreadyexists = await Teacher.findOne({email});
    if(alreadyexists){
      return res.status(400).json({message: "teacher already exists"});
    }
    const teacher = new Teacher({firstName, lastName, email, subjectSpecialization, phoneNumber, address});
    await teacher.save();
    res.status(200).json({message: "Teacher Registered Successfully"});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
  }
};

const getAllTeacher = async (req,res) => {
  try{
    const teachers = await Teacher.find();
    res.status(200).json({teachers});
  }catch(err){
    res.status(500).json({message: "Internal Server Error"});
  }
};

const getteacherrecord = async (req, res) => {
  const { email } = req.params;
  try {
    const teacher = await Teacher.findOne({email});
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getteacherenrolledcourses = async (req, res) => {
  const { email } = req.params;
  try {
    const teacher = await Teacher.findOne({ email }).populate('assignedCourses');
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ enrolledCourses: teacher.assignedCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateteacherrecord = async (req , res ) =>{
  const {email} = req.params;
  try{
  const updatedteacher = await Teacher.findOneAndUpdate({email}, req.body, {new: true});
  if(!updatedteacher){
    return res.status(404).json({message: "Teacher not found"});
  }
  res.status(200).json({message: "Teacher record updated successfully", updatedteacher});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
  }
};

const deleteTeacher = async (req,res)=> {
  const {email} = req.params;
  try{
    const deletedTeacher = await Teacher.findOneAndDelete({email});
    if(!deletedTeacher){
      return res.status(404).json({message: "Teacher not found"});
    }
    return res.status(200).json({message: "Teacher Deleted Successfully"});
  }
  catch(err){
    res.status(500).json({message:"internal Server Error"})
  }
};

const addteacheroncourse = async (req, res) => {
  const { email } = req.params;
  const { courseCode } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    teacher.assignedCourses.push(course._id);
    await teacher.save();

    course.TeacherId.push(teacher._id);
    await course.save();

    res.status(200).json({ message: 'Teacher assigned to course successfully', teacher });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export { teacherregister, getAllTeacher,getteacherrecord,getteacherenrolledcourses,updateteacherrecord, deleteTeacher, addteacheroncourse };