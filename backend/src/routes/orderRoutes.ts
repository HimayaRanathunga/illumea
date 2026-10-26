import { Router } from 'express';
import { db, Order } from '../db/index.js';

const router = Router();

// GET all orders
router.get('/', (req, res) => {
  try {
    let orders = db.getOrders();
    const { status, search } = req.query;

    if (status && typeof status === 'string' && status !== 'all') {
      orders = orders.filter(o => o.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      orders = orders.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error });
  }
});

// GET single order by ID
router.get('/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch order', error });
  }
});

// POST create new order
router.post('/', (req, res) => {
  try {
    const { customer, items, paymentMethod, notes } = req.body;

    if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city) {
      return res.status(400).json({
        success: false,
        message: 'Customer fullName, phone, address, and city are required.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item.'
      });
    }

    const subtotal = items.reduce((sum: number, it: any) => sum + (it.price * it.quantity), 0);
    // Free delivery for orders >= 5000, otherwise Rs. 350
    const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : 350;
    const total = subtotal + deliveryFee;

    const newOrder = db.createOrder({
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        city: customer.city.trim(),
        district: customer.district || 'Kandy'
      },
      items: items.map((it: any) => ({
        productId: it.productId || it.id,
        name: it.name,
        size: it.size || 'Standard',
        price: Number(it.price),
        quantity: Number(it.quantity)
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: paymentMethod || 'cod',
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to place order', error });
  }
});

// PATCH update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses: Order['status'][] = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
});

export default router;
