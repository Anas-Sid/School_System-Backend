import Parent from '../models/ParentModel.js';
import Course from '../models/CourseModel.js';
import Student from '../models/StudentModel.js';
import Teacher from '../models/TeacherModel.js';

const RegisterParent = async (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;
  try {
    const alreadyExists = await Parent.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: "Parent already exists" });
    }
    const parent = new Parent({ firstName, lastName, email, phoneNumber});
    await parent.save();
    res.status(201).json({ message: "Parent registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getallParent = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// const getParentWithStudents = async (req, res) => {
//   const { email } = req.params; 
//   const { studentEmail } = req.body; 

//   try {
    
//     const parent = await Parent.findOne({ email: email });
//     if (!parent) {
//       return res.status(404).json({ message: "Parent not found" });
//     }
//     console.log("Parent Data:", parent);

    
//     const student = await Student.findOne({ email: studentEmail });
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     console.log("Student Data:", student);

    
//     if (!parent.students.includes(student._id)) {
//       parent.students.push(student._id); 
//       await parent.save(); 
//     }

    
//     const parentData = await Parent.aggregate([
//       {
//         $match: { email: email }
//       },
//       {
//         $lookup: {
//           from: "students",
//           localField: "students",
//           foreignField: "_id",
//           as: "studentDetails"
//         }
//       },
//       {
//         $match: { "studentDetails.email": studentEmail } 
//       },
//       {
//         $project: {
//           firstName: 1,
//           lastName: 1,
//           email: 1,
//           phoneNumber: 1,
//           "studentDetails.firstName": 1,
//           "studentDetails.lastName": 1,
//           "studentDetails.email": 1
//         }
//       }
//     ]);

//     if (!parentData) {
//       return res.status(404).json({ message: "Parent or Student not found" });
//     }

//     res.json(parentData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const getParentWithStudents = async (req, res) => {
  const { email } = req.params;
  const { studentEmail } = req.body;

  try {
    const parent = await Parent.findOne({ email });
    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    const students = await Student.findOne({ studentEmail });
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "Students not found" });
    }

    parent.students.push(students._id);
    await parent.save();

    res.status(200).json({ parent, students });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getparentrecord = async (req, res) => {
  const { email } = req.params;
  try {
    const parent = await Parent.findOne({ email }).populate("students");
    if (!parent) {
      return res.status(404).json({ message: "Parent record not found" });
    }
    res.status(200).json({ parent });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateparentrecord = async (req, res) => {
  const { email } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;

  try {
    const parent = await Parent.findOneAndUpdate(
      { email },
      { firstName, lastName, phoneNumber },
      { new: true }
    );

    if (!parent) {
      return res.status(404).json({ message: "Parent record not found" });
    }

    res.status(200).json({ message: "Parent record updated successfully", parent });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteparentrecord = async (req, res) => {
  const { email } = req.params;

  try {
    const deletedParent = await Parent.findOneAndDelete({ email });
    if (!deletedParent) {
      return res.status(404).json({ message: "Parent record not found" });
    }

    res.status(200).json({ message: "Parent record deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { RegisterParent, getallParent, getParentWithStudents, getparentrecord, updateparentrecord, deleteparentrecord };