import axios from 'axios';

const baseURL = 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const put = (url, data, config = {}) => api.put(url, data, config).then(res => res.data);
const API_BASE = 'http://localhost:5001/api';

export async function get(url) {
  const token = localStorage.getItem('token');
  const res = await fetch(API_BASE + url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export async function post(url, data, isFormData = false) {
  const token = localStorage.getItem('token');
  const headers = isFormData
    ? { Authorization: `Bearer ${token}` }
    : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  const res = await fetch(API_BASE + url, {
    method: 'POST',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function patch(url, data, isFormData = false) {
  const token = localStorage.getItem('token');
  const headers = isFormData
    ? { Authorization: `Bearer ${token}` }
    : {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  const res = await fetch(API_BASE + url, {
    method: 'PATCH',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function del(url) {
  const token = localStorage.getItem('token');
  const res = await fetch(API_BASE + url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete');
  return res.json();
}