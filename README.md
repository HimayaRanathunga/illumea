# Illumea Skin Care (illumea.lk) - Complete Full-Stack Web Application

A full-fledged, high-performance, modern full-stack e-commerce and brand showcase platform built for **ILLUMEA SKIN CARE** (Managed under **Sansu International Pvt Ltd** / Dr. Chaminda Malalasekara, Kandy, Sri Lanka).

---

## 🌿 Project Structure

```text
D:\E support projects\illumea\
├── backend/                   # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── db/                # Persistent JSON Database Manager & Initial Seed Data
│   │   │   └── index.ts
│   │   ├── routes/            # REST API Routes
│   │   │   ├── productRoutes.ts   # CRUD /api/products
│   │   │   ├── orderRoutes.ts     # CRUD /api/orders
│   │   │   ├── contactRoutes.ts   # /api/contact
│   │   │   ├── newsletterRoutes.ts # /api/newsletter
│   │   │   └── statsRoutes.ts     # /api/stats (KPI & analytics)
│   │   └── server.ts          # Express Server Setup (Port 5000)
│   ├── data/                  # Auto-generated JSON Data Store (products, orders, inquiries, subscribers)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── src/                       # React 19 + TypeScript + Tailwind CSS Frontend
│   ├── components/            # UI Components, Modals, Sections, Admin Dashboard
│   ├── context/               # Shopping Cart State Context
│   ├── services/              # API Client (connects to http://localhost:5000/api)
│   ├── data/                  # Products & Brand Constants
│   ├── App.tsx
│   └── main.tsx
├── public/images/             # Logo & Botanical Product Photography
├── start-fullstack.bat        # 1-Click Windows Batch Runner for both servers
└── package.json
```

---

## 🚀 How to Run the Project

### Option A: 1-Click Launch (Recommended on Windows)
Simply double-click the **`start-fullstack.bat`** file located in `D:\E support projects\illumea\start-fullstack.bat`. It will automatically open two terminal windows:
1. **Backend Server:** `http://localhost:5000`
2. **Frontend React:** `http://localhost:5173`

---

### Option B: Terminal / PowerShell Commands

#### 1. Start the Backend:
```powershell
cd "D:\E support projects\illumea\backend"
npm run dev
```
> The API server will start on **`http://localhost:5000`** and auto-seed the database if empty.

#### 2. Start the Frontend (in a second terminal):
```powershell
cd "D:\E support projects\illumea"
npm run dev
```
> Open your browser to **`http://localhost:5173/`**.

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/products` | Fetch all products (supports `?category=`, `?search=`, `?discount=true`, `?sort=`) |
| `GET` | `/api/products/:id` | Fetch single product by ID |
| `POST` | `/api/products` | Admin create new product |
| `PUT` | `/api/products/:id` | Admin update product details |
| `DELETE`| `/api/products/:id` | Admin remove product |
| `POST` | `/api/orders` | Place a new customer order (auto-calculates Sri Lanka delivery) |
| `GET` | `/api/orders` | View all customer orders (filter by `?status=pending/confirmed/dispatched/delivered`) |
| `GET` | `/api/orders/:id` | View order by tracking number (e.g. `ILM-889293`) |
| `PATCH`| `/api/orders/:id/status` | Update order delivery status |
| `POST` | `/api/contact` | Submit contact inquiry form |
| `GET` | `/api/contact` | View customer inquiries |
| `POST` | `/api/newsletter` | Register customer newsletter email |
| `GET` | `/api/newsletter` | View newsletter subscriber list |
| `GET` | `/api/stats` | Real-time store analytics (Revenue in LKR, order counts, pending status) |

---

## ⚙️ Store Owner Admin Portal

A built-in **Admin Management Dashboard** is integrated directly into the web application:
- Accessible via the **"Admin Portal ⚙️"** link at the bottom of the website footer.
- **Real-Time KPI Cards:** Total Revenue (රු), Total Orders, Pending Orders, Inquiries.
- **Interactive Order Management:** Live table of all placed orders with customer telephone numbers, delivery addresses, items list, and a status dropdown (`Pending` → `Confirmed` → `Dispatched` → `Delivered` → `Cancelled`) that updates the database instantly.
- **Customer Messages:** Direct WhatsApp 1-click reply button to contact customers who sent inquiries.

---

## 🛠️ Full-Stack Technology Details

* **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React, Canvas Confetti.
* **Backend:** Node.js, Express, TypeScript (`tsx`), CORS, Dotenv.
* **Storage:** Persistent, zero-configuration local JSON database located at `backend/data/` (no external database server required to be installed on Windows).
