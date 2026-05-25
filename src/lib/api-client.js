export const API_BASE = '/integrador';

export async function apiClient(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    let msg = 'Erro desconhecido';
    try {
      const data = await res.json();
      msg = data.erro || data.error || data.message || msg;
    } catch (e) {
      msg = await res.text();
    }
    throw new Error(`Erro: ${res.status} - ${msg}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

export function saveToken(token) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('token', token);
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('token');
  }
  return null;
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('token');
  }
}
