import express from 'express';
const router = express.Router();

import { addclassroom } from '../controllers/ClassroomController.js';

router.post('/addclassroom', addclassroom);

export default router;