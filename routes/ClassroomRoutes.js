import express from 'express';
const router = express.Router();

import { addclassroom,getAllClassrooms, getclassroom, updateclassroom } from '../controllers/ClassroomController.js';

router.post('/addclassroom', addclassroom);
router.get('/allclassrooms', getAllClassrooms);
router.get('/classroom/:id', getclassroom);
router.put('/classroom/:id', updateclassroom);

export default router;