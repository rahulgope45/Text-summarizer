import express from 'express';
import { getUserSummaries, summarizedText, deleteSummary } from '../controllers/summary.controller.js';

import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/summary",protectRoute, summarizedText);

router.get("/history",protectRoute, getUserSummaries)

router.delete("/history/:id",protectRoute, deleteSummary)

export default router;