import React, { useState, useEffect } from 'react';
import { RefreshCw, X, Phone } from 'lucide-react';
import { api } from '../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'inquiries' | 'stats'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, statsRes] = await Promise.all([
        api.getOrders(statusFilter, search),
        api.getStats()
      ]);
      if (ordersRes?.data) setOrders(ordersRes.data);
      if (statsRes) setStats(statsRes);

      // fetch inquiries
      try {
        const inqRes = await fetch('http://localhost:5000/api/contact');
        const inqJson = await inqRes.json();
        if (inqJson?.data) setInquiries(inqJson.data);
      } catch {
        // ignore
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, statusFilter, search]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      loadData();
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-stone-200 overflow-hidden my-4 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200 bg-[#fbf9f5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b3b22] text-amber-300 flex items-center justify-center font-bold">
              🌿
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-title text-stone-900">
                Illumea Store Management Dashboard
              </h2>
              <p className="text-xs text-stone-500">
                Sansu International Pvt Ltd • Live Backend Connected (port 5000)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-xl transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-5 bg-[#faf8f4] border-b border-stone-200 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
            <span className="text-stone-500 block">Total Revenue</span>
            <div className="text-xl font-bold text-[#1b3b22] mt-1">
              රු {stats?.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
            <span className="text-stone-500 block">Total Orders</span>
            <div className="text-xl font-bold text-stone-900 mt-1">
              {stats?.totalOrders || orders.length}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
            <span className="text-stone-500 block">Pending Orders</span>
            <div className="text-xl font-bold text-amber-600 mt-1">
              {stats?.pendingOrders || 0}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200/70 shadow-2xs">
            <span className="text-stone-500 block">Customer Inquiries</span>
            <div className="text-xl font-bold text-blue-600 mt-1">
              {inquiries.length}
            </div>
          </div>
        </div>

        {/* Tabs & Controls */}
        <div className="px-5 pt-3 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 text-xs font-bold transition border-b-2 px-2 ${
                activeTab === 'orders'
                  ? 'border-[#1b3b22] text-[#1b3b22]'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`pb-3 text-xs font-bold transition border-b-2 px-2 ${
                activeTab === 'inquiries'
                  ? 'border-[#1b3b22] text-[#1b3b22]'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              Customer Inquiries ({inquiries.length})
            </button>
          </div>

          {activeTab === 'orders' && (
            <div className="flex items-center gap-2 pb-2">
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-lg border border-stone-300 w-36 sm:w-48"
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No orders recorded yet. Make a purchase via checkout to see it appear here!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-600">
                        <th className="p-3 font-semibold">Order ID</th>
                        <th className="p-3 font-semibold">Customer Details</th>
                        <th className="p-3 font-semibold">Ordered Items</th>
                        <th className="p-3 font-semibold">Total Amount</th>
                        <th className="p-3 font-semibold">Payment</th>
                        <th className="p-3 font-semibold">Order Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-stone-50/60 transition">
                          <td className="p-3 font-mono font-bold text-stone-900 align-top">
                            {order.id}
                            <span className="block text-[10px] text-stone-400 font-sans mt-0.5">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="p-3 align-top">
                            <strong className="block text-stone-900">{order.customer?.fullName}</strong>
                            <div className="text-stone-500 text-[11px] flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {order.customer?.phone}
                            </div>
                            <div className="text-stone-500 text-[11px]">
                              {order.customer?.address}, {order.customer?.city} ({order.customer?.district})
                            </div>
                          </td>

                          <td className="p-3 align-top max-w-xs">
                            <ul className="space-y-1">
                              {order.items?.map((it: any, idx: number) => (
                                <li key={idx} className="text-[11px] text-stone-700">
                                  • {it.name} ({it.size}) × <strong>{it.quantity}</strong>
                                </li>
                              ))}
                            </ul>
                          </td>

                          <td className="p-3 font-bold text-[#1b3b22] align-top whitespace-nowrap">
                            රු {order.total?.toLocaleString()}
                          </td>

                          <td className="p-3 align-top uppercase text-[10px] font-bold text-stone-600">
                            <span className="px-2 py-0.5 bg-stone-100 rounded-md border border-stone-200">
                              {order.paymentMethod}
                            </span>
                          </td>

                          <td className="p-3 align-top">
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                                order.status === 'delivered'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                  : order.status === 'dispatched'
                                  ? 'bg-blue-50 border-blue-300 text-blue-800'
                                  : order.status === 'confirmed'
                                  ? 'bg-purple-50 border-purple-300 text-purple-800'
                                  : order.status === 'cancelled'
                                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                                  : 'bg-amber-50 border-amber-300 text-amber-800'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs">
                  No inquiries received yet.
                </div>
              ) : (
                inquiries.map((inq: any) => (
                  <div key={inq.id} className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-stone-900 text-sm">
                        {inq.name} <span className="text-stone-400 text-xs font-normal">({inq.phone})</span>
                      </div>
                      <span className="text-[10px] text-stone-400">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {inq.subject && (
                      <div className="font-semibold text-emerald-900">
                        Subject: {inq.subject}
                      </div>
                    )}
                    <p className="text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      "{inq.message}"
                    </p>
                    <div className="flex gap-2 pt-1">
                      <a
                        href={`https://wa.me/94${inq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.name)}%2C%20regarding%20your%20inquiry%20to%20Illumea...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-[#25D366] text-white rounded-lg text-[11px] font-bold"
                      >
                        Reply on WhatsApp
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center text-xs text-stone-500">
          <span>Backend API: <code>http://localhost:5000/api</code></span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1b3b22] text-white rounded-xl text-xs font-semibold hover:bg-[#142d1a] transition"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
