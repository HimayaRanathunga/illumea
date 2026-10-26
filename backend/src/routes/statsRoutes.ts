import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET dashboard statistics & KPI
router.get('/', (_req, res) => {
  try {
    const stats = db.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error });
  }
});

export default router;
