import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET all subscribers
router.get('/', (req, res) => {
  try {
    const subscribers = db.getSubscribers();
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers', error });
  }
});

// POST subscribe email
router.post('/', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    const result = db.addSubscriber(email);
    res.status(result.isNew ? 201 : 200).json({
      success: true,
      message: result.isNew ? 'Subscribed successfully! Offer code: ILLUMEA10' : 'Already subscribed! Your discount code is ILLUMEA10',
      data: result.subscriber
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to subscribe', error });
  }
});

export default router;
