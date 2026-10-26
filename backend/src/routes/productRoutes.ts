import { Router } from 'express';
import { db } from '../db/index.js';

const router = Router();

// GET all products with optional filtering & sorting
router.get('/', (req, res) => {
  try {
    let products = db.getProducts();
    const { category, search, discount, sort } = req.query;

    if (category && typeof category === 'string' && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (discount === 'true') {
      products = products.filter(p => p.isDiscount);
    }

    if (sort === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error });
  }
});

// GET single product by ID
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error });
  }
});

// POST create new product
router.post('/', (req, res) => {
  try {
    const { name, category, price, size, description } = req.body;
    if (!name || !category || !price || !size || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, price, size, and description are required.'
      });
    }

    const id = req.body.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newProduct = db.createProduct({
      id,
      name,
      subtitle: req.body.subtitle || '',
      category,
      price: Number(price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
      rating: req.body.rating ? Number(req.body.rating) : 5.0,
      reviewCount: req.body.reviewCount ? Number(req.body.reviewCount) : 0,
      image: req.body.image || '/images/night-cream.jpg',
      size,
      tag: req.body.tag,
      isDiscount: Boolean(req.body.isDiscount),
      isBestSeller: Boolean(req.body.isBestSeller),
      description,
      benefits: req.body.benefits || [],
      ingredients: req.body.ingredients || [],
      usage: req.body.usage || '',
      stock: req.body.stock !== undefined ? Number(req.body.stock) : 50
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error });
  }
});

// PUT update product
router.put('/:id', (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error });
  }
});

export default router;
