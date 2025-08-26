import express from 'express';
const router= express.Router();
import {addcourse, getallcourses, getsinglecourse, updatecourse , deletecourse, courseenrolledstudents, courseassignedteacher} from '../controllers/CourseController.js';

router.post('/addcourse', addcourse);
router.get('/allcourses', getallcourses);
router.get('/course/:courseCode', getsinglecourse);
router.put('/course/:courseCode', updatecourse);
router.delete('/course/:courseCode', deletecourse);
router.get('/course/enrolledstudents/:courseCode', courseenrolledstudents);
router.get('/course/assignedteacher/:courseCode', courseassignedteacher);
export default router;