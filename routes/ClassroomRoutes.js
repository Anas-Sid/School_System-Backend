import express from 'express';
const router = express.Router();

import { addclassroom,getAllClassrooms, getclassroom, updateclassroom, deleteclassroom } from '../controllers/ClassroomController.js';

router.post('/addclassroom', addclassroom);
router.get('/allclassrooms', getAllClassrooms);
router.get('/classroom/:id', getclassroom);
router.put('/classroom/:id', updateclassroom);
router.delete('/classroom/:id', deleteclassroom);

export default router;