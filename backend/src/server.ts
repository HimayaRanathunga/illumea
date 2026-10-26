import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for dev / flexibility
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Illumea Skin Care API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/stats', statsRoutes);

// Root greeting
app.get('/', (_req: Request, res: Response) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 600px; margin: auto; text-align: center;">
      <h1 style="color: #1b3b22;">🌿 Illumea Skin Care Backend API</h1>
      <p style="color: #555;">Managed under Sansu International Pvt Ltd</p>
      <div style="background: #f4f1ea; padding: 1.5rem; border-radius: 1rem; text-align: left; font-size: 14px;">
        <p><strong>Available API Endpoints:</strong></p>
        <ul>
          <li><code>GET /api/products</code> - List all herbal products</li>
          <li><code>POST /api/orders</code> - Place a new customer order</li>
          <li><code>GET /api/orders</code> - View orders</li>
          <li><code>POST /api/contact</code> - Submit customer inquiry</li>
          <li><code>POST /api/newsletter</code> - Newsletter subscription</li>
          <li><code>GET /api/stats</code> - Dashboard business analytics</li>
          <li><code>GET /api/health</code> - API Status check</li>
        </ul>
      </div>
    </div>
  `);
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`
=====================================================
🌿 ILLUMEA SKIN CARE BACKEND SERVER RUNNING
📡 API URL: http://localhost:${PORT}
🚀 Health:  http://localhost:${PORT}/api/health
📦 Products: http://localhost:${PORT}/api/products
=====================================================
  `);
});
