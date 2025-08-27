import express from 'express';
const router = express.Router();

import { addFee,getAllFees, getFeesByStudentId, updateFees, deleteFees, getallPendingFees, getallPaidFees } from '../controllers/FeeController.js';

router.post('/add', addFee);
router.get('/allfees', getAllFees);
router.get('/fees/:studentId', getFeesByStudentId);
router.put('/update/:studentId', updateFees);
router.delete('/delete/:studentId', deleteFees);
router.get('/pendingfees', getallPendingFees);
router.get('/paidfees', getallPaidFees);

export default router;