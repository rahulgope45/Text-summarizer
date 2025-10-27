import express from 'express';
import { summarizedText } from '../controllers/summary.controller.js';

const router = express.Router();

router.post("/summary", summarizedText);

export default router;