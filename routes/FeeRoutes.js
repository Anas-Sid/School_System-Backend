import express from 'express';
const router = express.Router();

import { addFee,getAllFees } from '../controllers/FeeController.js';

router.post('/add', addFee);
router.get('/allfees', getAllFees);

export default router;