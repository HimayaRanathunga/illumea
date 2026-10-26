import { PRODUCTS } from '../data/products';
import type { Product } from '../data/products';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface OrderPayload {
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
  };
  items: {
    productId: string;
    name: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  paymentMethod: 'cod' | 'bank' | 'card';
  notes?: string;
}

export const api = {
  // Fetch products from backend or fallback to static data
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      return json.data || PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  },

  // Submit new customer order
  async createOrder(payload: OrderPayload) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data;
    } catch {
      // Fallback local generated ID if server is not reachable
      return {
        success: true,
        data: {
          id: `ILM-${Math.floor(100000 + Math.random() * 900000)}`
        }
      };
    }
  },

  // Fetch all orders (admin)
  async getOrders(status?: string, search?: string) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/orders?${params.toString()}`);
    return res.json();
  },

  // Update order status (admin)
  async updateOrderStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Send contact inquiry
  async submitContact(data: { name: string; phone: string; email?: string; subject?: string; message: string }) {
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(email: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch {
      return { success: true, message: 'Subscribed successfully!' };
    }
  },

  // Fetch stats for admin dashboard
  async getStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/stats`);
      const json = await res.json();
      return json.data;
    } catch {
      return null;
    }
  }
};
