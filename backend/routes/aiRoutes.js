import express from 'express';
import { getAiValuation } from '../controllers/aiController.js';

const router = express.Router();

// POST /api/ai/predict-valuation
router.post('/predict-valuation', getAiValuation);

export default router;