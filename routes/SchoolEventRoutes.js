import express from 'express';
const router= express.Router();

import {
  addevent, getallevent, getevent, updateevent, deleteevent, addStudentToEvent, addTeacherToEvent, removeStudentFromEvent, removeTeacherFromEvent
} from '../controllers/SchoolEventController.js'

router.post('/addevent', addevent);
router.get('/getallevent', getallevent);
router.get('/getevent/:eventName', getevent);
router.put('/updateevent/:eventName', updateevent);
router.delete('/deleteevent/:eventName', deleteevent);
router.post('/event/students/:eventId', addStudentToEvent);
router.post('/event/teachers/:eventId', addTeacherToEvent);
router.delete('/event/removestudent/:eventId', removeStudentFromEvent);
router.delete('/event/removeteacher/:eventId', removeTeacherFromEvent);

export default router;