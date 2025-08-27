import express from 'express';
const router = express.Router();

import { addFee } from '../controllers/FeeController.js';

router.post('/add', addFee);

export default router;