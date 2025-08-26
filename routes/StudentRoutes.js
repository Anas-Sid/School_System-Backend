import express from 'express';
const router= express.Router();
import {
   studentregister, getStudentData,getStudentCourses,getAllStudents,updateStudent,deleteStudent,courseenrollment
   }  from '../controllers/StudentController.js';
import Student from "../models/StudentModel.js";

router.post('/register', studentregister);
router.get('/studentinfo/:email', getStudentData);
router.get('/enrolledcourses/:email', getStudentCourses);
router.get('/allstudents', getAllStudents);
router.put('/update/:email', updateStudent);
router.delete('/delete/:email', deleteStudent);
router.post('/enroll/:email', courseenrollment);

export default router;