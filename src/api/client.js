// Thin fetch wrapper for the Node API. The admin token lives in localStorage.
const TOKEN_KEY = 'avaraa.admin.token';

export const getToken = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(TOKEN_KEY) || 'null');
    if (raw && raw.expiresAt > Date.now()) return raw.token;
  } catch {
    /* ignore */
  }
  return '';
};
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, JSON.stringify(t));
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function api(path, { method = 'GET', body, auth = false, signal, formData } = {}) {
  const headers = {};
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  let payload;
  if (formData) payload = formData;
  else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }
  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: payload, signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError('Could not reach the server. Is it running?', 0);
  }
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }
  if (!res.ok) throw new ApiError(data?.error || `Request failed (${res.status})`, res.status);
  return data;
}
