import Course from "../models/CourseModel.js";

const addcourse = async (req,res) => {
  const {courseName, courseCode, CourseDescription, CreditHours} = req.body;
  try{
    const alreadyexists = await Course.findOne({courseCode});
    if(alreadyexists){
      return res.status(400).json({message: "Course already exists"});
    }
    const course = new Course({
      courseName,
      courseCode,
      CourseDescription,
      CreditHours
    });
    await course.save();
    res.status(201).json({message: "Course added successfully"});
  }catch(error){
    res.status(500).json({message: "Internal server error"});
  }
};

const getallcourses = async (req,res) =>{
  try{
    const courses =await Course.find();
    return res.status(200).json({courses})
  }
  catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
};

const getsinglecourse = async (req,res) =>{
  const {courseCode} = req.params;
  try{
    const course = await Course.findOne({courseCode});
    if(!course){
      return res.status(400).json({message: "Course not Found"});
    }
    return res.status(200).json({course});
  }
  catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
};

const updatecourse = async(req,res) => {
  const {courseCode} = req.params;
  try{
    const course = await Course.findOneAndUpdate({courseCode}, req.body, {new: true});
    if(!course){
      return res.status(400).json({message: "Course not Found"});
    }
    return res.status(200).json({message: "Course updated successfully"});
  }
  catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
};

const deletecourse = async (req, res) => {
  const { courseCode } = req.params;
  try{
    const deletedCourse = await Course.findOneAndDelete({courseCode});
    if(!deletedCourse){
      return res.status(404).json({message: "Course not found"});
    }
    return res.status(200).json({message: "Course deleted successfully"});
  }
  catch(err){
    return res.status(500).json({message: "Internal server error"});
  }
};

const courseenrolledstudents = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const course = await Course.findOne({ courseCode })
      .populate('studentsEnrolled', 'name email firstName lastName gender address phoneNumber');
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ studentsEnrolled: course.studentsEnrolled });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


const courseassignedteacher = async (req, res) => {
  const { courseCode } = req.params;
  try {
    const course = await Course.findOne({ courseCode }).populate('TeacherId');
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ TeacherId: course.TeacherId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export { addcourse, getallcourses, getsinglecourse, updatecourse, deletecourse, courseenrolledstudents, courseassignedteacher };