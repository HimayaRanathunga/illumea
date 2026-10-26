import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Creams' | 'Face Packs' | 'Toners & Lotions' | 'Cleansers & Scrubs';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  size: string;
  tag?: string;
  isDiscount?: boolean;
  isBestSeller?: boolean;
  description: string;
  benefits: string[];
  ingredients: string[];
  usage: string;
  stock: number;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'bank' | 'card';
  notes?: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'brightening-night-cream-50g',
    name: 'Brightening Night Cream',
    subtitle: 'Intensive overnight restorative herbal treatment',
    category: 'Creams',
    price: 3775,
    originalPrice: 4200,
    rating: 4.9,
    reviewCount: 38,
    image: '/images/night-cream.jpg',
    size: '50g',
    tag: 'Best Seller',
    isBestSeller: true,
    isDiscount: true,
    stock: 50,
    description: 'A luxurious night formulation infused with potent botanical extracts that work overnight to repair skin cells, reduce hyperpigmentation, and restore an illuminated, youthful glow by morning.',
    benefits: [
      'Visible skin brightening & tone evening within 14 days',
      'Fades dark spots, acne scars, and sun pigmentation',
      'Deep cellular hydration without clogging pores',
      'Rich in natural antioxidants that fight premature aging'
    ],
    ingredients: ['Licorice Root Extract', 'Saffron Extract', 'Niacinamide (Vitamin B3)', 'Almond Oil', 'Aloe Vera Leaf Juice', 'Vitamin E'],
    usage: 'After cleansing and toning at night, gently massage a coin-sized amount onto face and neck in upward circular motions until fully absorbed.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'activated-charcoal-face-pack-100g',
    name: 'Activated Charcoal Face Pack',
    subtitle: 'Deep detoxifying & pore refining clay pack',
    category: 'Face Packs',
    price: 3000,
    rating: 4.8,
    reviewCount: 26,
    image: '/images/charcoal-pack.jpg',
    size: '100g',
    tag: 'Popular',
    stock: 45,
    description: 'Formulated with ultra-fine activated bamboo charcoal and purifying mineral clays that draw out micro-pollutants, excess sebum, and blackheads to reveal fresh, balanced skin.',
    benefits: [
      'Draws out impurities, toxins, and environmental pollutants',
      'Unclogs and visually shrinks enlarged pores',
      'Controls excess oil production without stripping natural moisture',
      'Soothes inflammation and prevents breakout cycles'
    ],
    ingredients: ['Activated Bamboo Charcoal', 'Kaolin Clay', 'Bentonite Clay', 'Tea Tree Essential Oil', 'Witch Hazel Extract', 'Cucumber Extract'],
    usage: 'Apply an even layer over cleansed face, avoiding delicate eye and lip areas. Leave on for 15-20 minutes until dry, then rinse gently with lukewarm water.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'anti-aging-cream-100ml',
    name: 'Illumea Anti-Aging Cream',
    subtitle: 'Firming, wrinkle smoothing & collagen boosting cream',
    category: 'Creams',
    price: 4500,
    originalPrice: 5100,
    rating: 4.9,
    reviewCount: 42,
    image: '/images/anti-aging.jpg',
    size: '100ml',
    tag: 'Advanced Care',
    isDiscount: true,
    stock: 35,
    description: 'An advanced age-defying cream developed with clinically proven herbal peptides and botanical oils that boost skin elasticity, reduce fine lines, and firm sagging skin contour.',
    benefits: [
      'Reduces appearance of fine lines, wrinkles, and crow’s feet',
      'Enhances collagen synthesis and natural skin firmness',
      'Intensely nourishes dry and mature skin barriers',
      'Provides an instant lifting and smoothing effect'
    ],
    ingredients: ['Gotu Kola (Centella Asiatica) Extract', 'Rosehip Seed Oil', 'Hyaluronic Acid Complex', 'Retinyl Palmitate (Gentle Retinol)', 'Coenzyme Q10'],
    usage: 'Apply morning and night to face, neck, and décolletage after serums. Smooth upwards with gentle pressure.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'pigment-cure-cream-50g',
    name: 'Illumea Pigment Cure Cream',
    subtitle: 'Targeted correction for melasma, spots & pigmentation',
    category: 'Creams',
    price: 7900,
    originalPrice: 8500,
    rating: 5.0,
    reviewCount: 57,
    image: '/images/pigment-cure.jpg',
    size: '50g',
    tag: 'Clinical Strength',
    isBestSeller: true,
    isDiscount: true,
    stock: 40,
    description: 'A targeted clinical herbal solution specifically engineered to eliminate stubborn pigmentation, melasma, dark patches, and acne marks with zero harsh bleaching agents.',
    benefits: [
      'Blocks melanin overproduction at the cellular level',
      'Clinically safe for sensitive Asian and tropical skin tones',
      'Free from hydroquinone, steroids, and harmful bleaching agents',
      'Leaves skin visibly clearer, radiant, and spot-free'
    ],
    ingredients: ['Alpha Arbutin', 'Turmeric Rhizome Extract', 'Kojic Dipalmitate', 'Mulberry Root Extract', 'Kakadu Plum (Vitamin C)', 'Jojoba Oil'],
    usage: 'Apply a targeted thin layer to hyperpigmented areas or full face before bedtime. Use consistently for 4 to 8 weeks.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'moisturizing-body-lotion-300ml',
    name: 'Illumea Moisturizing Body Lotion',
    subtitle: '24-hour deep hydrating & skin softening lotion',
    category: 'Toners & Lotions',
    price: 4600,
    rating: 4.8,
    reviewCount: 31,
    image: '/images/body-lotion.jpg',
    size: '300ml',
    stock: 60,
    description: 'Enriched with pure virgin coconut oil, shea butter, and natural emollients to cocoon your body in silk-like softness, lock in moisture for 24 hours, and restore natural glow.',
    benefits: [
      'Non-greasy, fast-absorbing luxury formula',
      'Relieves dry, flaky, and rough patches on elbows and legs',
      'Scented with gentle, calming natural botanical aromas',
      'Protects skin barrier against tropical humidity and air conditioning'
    ],
    ingredients: ['Virgin Coconut Oil', 'Raw Shea Butter', 'Sweet Almond Extract', 'Glycerin', 'Vitamin E Acetate', 'Calendula Flower Water'],
    usage: 'Smooth generously over entire body following your bath or shower. Reapply throughout the day as needed.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'fairness-sun-protective-day-cream-50g',
    name: 'Fairness & Sun Protective Day Cream',
    subtitle: 'UV defense SPF 30+ & radiant daily shield',
    category: 'Creams',
    price: 3600,
    rating: 4.7,
    reviewCount: 34,
    image: '/images/day-cream.jpg',
    size: '50g',
    tag: 'Daily Shield',
    stock: 55,
    description: 'A dual-action daily moisturizer and broad-spectrum sun defense that shields your skin from UVA/UVB rays and blue light while maintaining all-day matte radiance.',
    benefits: [
      'Broad spectrum SPF protection against sun tan & dark spots',
      'Lightweight, zero white-cast formulation suited for everyday wear',
      'Provides natural instant brightness and satin finish',
      'Works seamlessly under makeup or as a stand-alone protector'
    ],
    ingredients: ['Micronized Zinc Oxide', 'Red Sandalwood Extract', 'Licorice Extract', 'Green Tea Extract', 'Niacinamide'],
    usage: 'Apply evenly on face and exposed areas 15 minutes before sun exposure. Reapply every 3-4 hours if outdoors.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'hydrating-toner',
    name: 'Illumea Hydrating Toner',
    subtitle: 'Pore-tightening & balancing herbal mist',
    category: 'Toners & Lotions',
    price: 1350,
    originalPrice: 1550,
    rating: 4.9,
    reviewCount: 45,
    image: '/images/toner.jpg',
    size: '120ml',
    tag: 'Value Choice',
    isDiscount: true,
    stock: 70,
    description: 'A refreshing botanical face mist that restores the natural pH balance of your skin, sweeps away residual dead cells, and preps your complexion for maximum moisture absorption.',
    benefits: [
      'Balances skin pH immediately after facial cleansing',
      'Tightens pores and minimizes oil accumulation',
      'Calms redness, irritation, and sunburn sensitivity',
      'Can be misted throughout the day to rehydrate and refresh skin'
    ],
    ingredients: ['Steam-Distilled Rose Petal Hydrosol', 'Witch Hazel Water', 'Chamomile Extract', 'Hyaluronic Acid', 'Aloe Vera'],
    usage: 'Spray directly over face with eyes closed, or apply with a soft cotton pad across skin after cleansing.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'scrub-100g',
    name: 'Illumea Exfoliating Scrub',
    subtitle: 'Gentle micro-exfoliation for glowing, silky skin',
    category: 'Cleansers & Scrubs',
    price: 3000,
    rating: 4.8,
    reviewCount: 29,
    image: '/images/scrub.jpg',
    size: '100g',
    stock: 40,
    description: 'A gentle exfoliating formula blended with finely milled walnut kernels and herbal oils that softly sweeps away dead skin cells without micro-tears, restoring radiant smoothness.',
    benefits: [
      'Removes dull, dead outer surface cells instantly',
      'Prevents ingrown hair and stubborn blackhead build-up',
      'Stimulates microcirculation for a natural rosy flush',
      'Non-abrasive, suitable for all skin types'
    ],
    ingredients: ['Finely Ground Walnut Shells', 'Sandalwood Powder', 'Turmeric Root Oil', 'Apricot Kernel Oil', 'Honey Extract'],
    usage: 'Gently massage in circular motions on damp skin for 1-2 minutes, paying attention to T-zone. Rinse thoroughly with lukewarm water. Use twice a week.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'face-wash-100ml',
    name: 'Illumea Gentle Herbal Face Wash',
    subtitle: 'Soap-free daily foaming cleanser for pure skin',
    category: 'Cleansers & Scrubs',
    price: 2250,
    rating: 4.9,
    reviewCount: 39,
    image: '/images/night-cream.jpg',
    size: '100ml',
    stock: 65,
    description: 'A pH-balanced, sulfate-free cleanser formulated with calming herbs that purifies deep inside pores while retaining natural moisture, leaving your face clean, soft, and refreshed.',
    benefits: [
      '100% soap-free and sulfate-free (SLS/SLES free)',
      'Removes daily dirt, makeup traces, and oil without tightness',
      'Maintains natural skin moisture barrier',
      'Dermatologically tested for daily morning & night use'
    ],
    ingredients: ['Neem Leaf Extract', 'Tulsi (Holy Basil)', 'Aloe Vera', 'Vegetable Glycerin', 'Vitamin B5'],
    usage: 'Lather a small pump in wet palms, massage over damp face in circular motions, and rinse clean with water.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'anti-acne-face-wash-100ml',
    name: 'Illumea Anti-Acne Face Wash',
    subtitle: 'Clarifying formula with tea tree & neem extracts',
    category: 'Cleansers & Scrubs',
    price: 2500,
    rating: 4.9,
    reviewCount: 44,
    image: '/images/charcoal-pack.jpg',
    size: '100ml',
    tag: 'Acne Care',
    stock: 50,
    description: 'Targeted clarifying cleanser specially created for blemish-prone and oily skin. Powered by tea tree oil and salicylic acid to combat acne bacteria and clear stubborn pimples.',
    benefits: [
      'Targets active acne, pimples, and reduces inflammation',
      'Controls sebum without causing rebound dryness',
      'Clears clogged pores and blackheads',
      'Soothes redness and post-acne pigmentation'
    ],
    ingredients: ['Australian Tea Tree Oil', 'Neem Extract', 'Salicylic Acid (Natural Willow Bark)', 'Zinc PCA', 'Clove Bud Extract'],
    usage: 'Use twice daily. Apply gently onto wet skin, work into a rich lather, let sit for 30 seconds, and rinse off.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'deep-cleanser-100ml',
    name: 'Illumea Deep Cleanser',
    subtitle: 'Purifying micellar cleansing milk for makeup & impurities',
    category: 'Cleansers & Scrubs',
    price: 2400,
    rating: 4.7,
    reviewCount: 22,
    image: '/images/body-lotion.jpg',
    size: '100ml',
    stock: 45,
    description: 'A silky cleansing emulsion that melts away waterproof makeup, sunscreen, and stubborn urban pollution particles without stripping the delicate facial acid mantle.',
    benefits: [
      'Dissolves heavy makeup and waterproof sunblock effortlessly',
      'Leaves skin silky smooth, soft, and deeply purified',
      'Enriched with soothing botanicals to prevent redness',
      'Ideal as step one in double cleansing'
    ],
    ingredients: ['Almond Oil', 'Cucumber Fruit Extract', 'Chamomile Floral Water', 'Coconut Triglycerides', 'Vitamin E'],
    usage: 'Apply onto dry or damp skin, massage gently across face and neck, then wipe away with a warm damp washcloth or rinse clean.',
    createdAt: new Date().toISOString()
  }
];

class DatabaseManager {
  private productsFile = path.join(DATA_DIR, 'products.json');
  private ordersFile = path.join(DATA_DIR, 'orders.json');
  private inquiriesFile = path.join(DATA_DIR, 'inquiries.json');
  private subscribersFile = path.join(DATA_DIR, 'subscribers.json');

  constructor() {
    this.initDatabase();
  }

  private readJson<T>(filePath: string, defaultValue: T): T {
    try {
      if (!fs.existsSync(filePath)) {
        this.writeJson(filePath, defaultValue);
        return defaultValue;
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (e) {
      console.error(`Error reading ${filePath}:`, e);
      return defaultValue;
    }
  }

  private writeJson<T>(filePath: string, data: T): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error(`Error writing to ${filePath}:`, e);
    }
  }

  private initDatabase(): void {
    if (!fs.existsSync(this.productsFile)) {
      this.writeJson(this.productsFile, INITIAL_PRODUCTS);
      console.log('Seeded database with initial Illumea products.');
    }
    if (!fs.existsSync(this.ordersFile)) {
      this.writeJson(this.ordersFile, []);
    }
    if (!fs.existsSync(this.inquiriesFile)) {
      this.writeJson(this.inquiriesFile, []);
    }
    if (!fs.existsSync(this.subscribersFile)) {
      this.writeJson(this.subscribersFile, []);
    }
  }

  // --- PRODUCTS ---
  getProducts(): Product[] {
    return this.readJson<Product[]>(this.productsFile, []);
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  }

  createProduct(product: Omit<Product, 'createdAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    this.writeJson(this.productsFile, products);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;

    products[idx] = { ...products[idx], ...updates };
    this.writeJson(this.productsFile, products);
    return products[idx];
  }

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    this.writeJson(this.productsFile, filtered);
    return true;
  }

  // --- ORDERS ---
  getOrders(): Order[] {
    return this.readJson<Order[]>(this.ordersFile, []);
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  }

  createOrder(orderData: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Order {
    const orders = this.getOrders();
    const orderId = `ILM-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    orders.unshift(newOrder); // newest first
    this.writeJson(this.ordersFile, orders);

    // Update product stock
    const products = this.getProducts();
    orderData.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod && prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
      }
    });
    this.writeJson(this.productsFile, products);

    return newOrder;
  }

  updateOrderStatus(id: string, status: Order['status']): Order | null {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === id);
    if (idx === -1) return null;

    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    this.writeJson(this.ordersFile, orders);
    return orders[idx];
  }

  // --- INQUIRIES ---
  getInquiries(): Inquiry[] {
    return this.readJson<Inquiry[]>(this.inquiriesFile, []);
  }

  createInquiry(data: Omit<Inquiry, 'id' | 'status' | 'createdAt'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...data,
      id: `INQ-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    inquiries.unshift(newInquiry);
    this.writeJson(this.inquiriesFile, inquiries);
    return newInquiry;
  }

  updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex(i => i.id === id);
    if (idx === -1) return null;
    inquiries[idx].status = status;
    this.writeJson(this.inquiriesFile, inquiries);
    return inquiries[idx];
  }

  // --- SUBSCRIBERS ---
  getSubscribers(): Subscriber[] {
    return this.readJson<Subscriber[]>(this.subscribersFile, []);
  }

  addSubscriber(email: string): { subscriber: Subscriber; isNew: boolean } {
    const subscribers = this.getSubscribers();
    const cleanEmail = email.trim().toLowerCase();
    const existing = subscribers.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { subscriber: existing, isNew: false };
    }

    const newSub: Subscriber = {
      id: `SUB-${Date.now()}`,
      email: cleanEmail,
      createdAt: new Date().toISOString()
    };
    subscribers.unshift(newSub);
    this.writeJson(this.subscribersFile, subscribers);
    return { subscriber: newSub, isNew: true };
  }

  // --- DASHBOARD STATS ---
  getStats() {
    const orders = this.getOrders();
    const products = this.getProducts();
    const inquiries = this.getInquiries();
    const subscribers = this.getSubscribers();

    const totalRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const unreadInquiries = inquiries.filter(i => i.status === 'unread').length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingOrders,
      deliveredOrders,
      totalProducts: products.length,
      unreadInquiries,
      totalSubscribers: subscribers.length
    };
  }
}

export const db = new DatabaseManager();
