import axios from 'axios';

// Backend Base URLs with port fallbacks
const API_BASE_URLS = [
  'http://localhost:8001/api',
  'http://localhost:8000/api',
  'http://localhost:5000/api'
];

let activeBaseUrl = API_BASE_URLS[0];

const api = axios.create({
  baseURL: activeBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000
});

// Helper to update token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// API Services
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  registerHotel: (hotelData) => api.post('/auth/register-hotel', hotelData),
  getMe: () => api.get('/auth/me')
};

export const adminApi = {
  getHotels: () => api.get('/admin/hotels'),
  provisionHotel: (hotelData) => api.post('/admin/hotels', hotelData),
  toggleHotelStatus: (hotelId) => api.patch(`/admin/hotels/${hotelId}/status`),
  getStats: () => api.get('/admin/stats')
};

export const managerApi = {
  getMenu: (hotelId = 'H101') => api.get(`/manager/menu?hotelId=${hotelId}`),
  addMenuItem: (dishData) => api.post('/manager/menu', dishData),
  toggleStock: (dishId) => api.put(`/manager/menu/${dishId}/toggle-stock`),
  deleteMenuItem: (dishId) => api.delete(`/manager/menu/${dishId}`),
  getStaff: (hotelId = 'H101') => api.get(`/manager/staff?hotelId=${hotelId}`),
  addStaff: (staffData) => api.post('/manager/staff', staffData),
  getFinances: (hotelId = 'H101') => api.get(`/manager/finances?hotelId=${hotelId}`),
  addExpense: (expenseData) => api.post('/manager/expenses', expenseData)
};

export const guestApi = {
  getHotel: (hotelId = 'H101') => api.get(`/guest/hotel/${hotelId}`),
  getMenu: (hotelId = 'H101') => api.get(`/guest/menu/${hotelId}`),
  placeOrder: (orderData) => api.post('/guest/orders', orderData),
  trackOrder: (orderId) => api.get(`/guest/orders/${orderId}`)
};

export const opsApi = {
  getKitchenOrders: (hotelId = 'H101') => api.get(`/ops/kitchen-orders/${hotelId}`),
  updateOrderStatus: (orderId, status) => api.patch(`/ops/orders/${orderId}/status`, { status }),
  requestWaiterCall: (callData) => api.post('/ops/waiter-call', callData),
  getWaiterCalls: (hotelId = 'H101') => api.get(`/ops/waiter-calls/${hotelId}`),
  resolveWaiterCall: (callId) => api.delete(`/ops/waiter-calls/${callId}`)
};

export default api;
