import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET all contact inquiries
router.get('/', (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch inquiries', error });
  }
});

// POST submit new contact inquiry
router.post('/', (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.'
      });
    }

    const newInquiry = db.createInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : undefined,
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      data: newInquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit inquiry', error });
  }
});

// PATCH update inquiry status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry status' });
    }
    const updated = db.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update inquiry status', error });
  }
});

export default router;
