import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
  timeout: 15000
});

export const getErrorMessage = (error) =>
  error.response?.data?.error ||
  (error.request ? `Cannot reach Medichain backend at ${API_BASE_URL}.` : error.message || 'Unexpected error');

export const checkHealth = async () => (await api.get('/health')).data;
export const getAllMedicines = async () => {
  const data = (await api.get('/medicines')).data;
  return Array.isArray(data) ? data : [];
};
export const createMedicine = async (medicine) => (await api.post('/medicines', medicine)).data;
export const verifyMedicine = async (id, payload) => (await api.post(`/medicines/${encodeURIComponent(id)}/verify`, payload)).data;
export const transferMedicine = async (id, payload) => (await api.post(`/medicines/${encodeURIComponent(id)}/transfer`, payload)).data;
export const recallMedicine = async (id, payload) => (await api.post(`/medicines/${encodeURIComponent(id)}/recall`, payload)).data;
export const getMedicine = async (id) => (await api.get(`/medicines/${encodeURIComponent(id)}`)).data;

export default api;