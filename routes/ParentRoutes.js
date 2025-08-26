import express from 'express';
const router= express.Router();

import {RegisterParent, getallParent, getParentWithStudents, getparentrecord, updateparentrecord, deleteparentrecord} from '../controllers/ParentController.js';

router.post('/register', RegisterParent);
router.get('/all', getallParent);
router.get('/students/:email', getParentWithStudents);
router.get('/parent/:email', getparentrecord);
router.put('/updateparent/:email', updateparentrecord);
router.delete('/deleteparent/:email', deleteparentrecord);

export default router;