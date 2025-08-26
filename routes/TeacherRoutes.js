import express from "express";
const router = express.Router();
import { teacherregister, getAllTeacher,getteacherrecord,getteacherenrolledcourses,updateteacherrecord,deleteTeacher,addteacheroncourse } from "../controllers/TeacherController.js";
import Teacher from "../models/TeacherModel.js";

router.post("/register", teacherregister);
router.get("/teachers", getAllTeacher);
router.get("/teachers/:email", getteacherrecord);
router.get("/enrolled-courses/:email", getteacherenrolledcourses);
router.put("/update-teachers/:email", updateteacherrecord);
router.delete("/delete-teacher/:email",deleteTeacher);
router.post("/assign-course/:email", addteacheroncourse);

export default router;