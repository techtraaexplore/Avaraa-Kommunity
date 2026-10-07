import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api, clearToken, getToken, setToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [checking, setChecking] = useState(Boolean(getToken()));

  // If a token is stored, confirm the server still accepts it.
  useEffect(() => {
    if (!getToken()) return;
    api('/me', { auth: true })
      .then(() => setAuthed(true))
      .catch((err) => {
        if (err.status === 401) {
          clearToken();
          setAuthed(false);
        }
      })
      .finally(() => setChecking(false));
  }, []);

  const login = useCallback(async (password) => {
    const res = await api('/login', { method: 'POST', body: { password } });
    setToken(res);
    setAuthed(true);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setAuthed(false);
  }, []);

  const value = useMemo(() => ({ authed, checking, login, logout }), [authed, checking, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
