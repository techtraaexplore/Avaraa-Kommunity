import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api/client.js';
import defaultContent from '../data/defaultContent.js';
import { clone, mergeDefaults } from '../utils/format.js';
import { useAuth } from './AuthContext.jsx';

const Ctx = createContext(null);

/**
 * Holds the content being edited. It lives above all admin pages, so switching pages never loses
 * unsaved edits. Nothing reaches the live site until you press "Save changes".
 */
export function AdminContentProvider({ children }) {
  const { logout } = useAuth();
  const [status, setStatus] = useState({ state: 'loading', error: '' });
  const [draft, setDraft] = useState(null);
  const [savedJson, setSavedJson] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const timer = useRef();

  const flash = useCallback((type, text) => {
    setMessage({ type, text });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 4500);
  }, []);

  const load = useCallback(async () => {
    setStatus({ state: 'loading', error: '' });
    try {
      let saved = {};
      try {
        saved = await api('/content');
      } catch (err) {
        if (err.status !== 404) throw err; // 404 = nothing saved yet, start from the defaults
      }
      const data = clone(mergeDefaults(defaultContent, saved));
      setDraft(data);
      setSavedJson(JSON.stringify(data));
      setStatus({ state: 'ready', error: '' });
    } catch (err) {
      setStatus({ state: 'error', error: err.message });
    }
  }, []);

  useEffect(() => {
    load();
    return () => clearTimeout(timer.current);
  }, [load]);

  const dirty = useMemo(() => draft !== null && JSON.stringify(draft) !== savedJson, [draft, savedJson]);

  const update = useCallback((key, value) => setDraft((d) => ({ ...d, [key]: value })), []);

  const save = useCallback(async () => {
    if (!draft || saving) return;
    setSaving(true);
    try {
      await api('/content', { method: 'PUT', auth: true, body: draft });
      setSavedJson(JSON.stringify(draft));
      flash('success', 'Saved. The live site is updated.');
    } catch (err) {
      if (err.status === 401) logout();
      else flash('error', err.message);
    } finally {
      setSaving(false);
    }
  }, [draft, saving, flash, logout]);

  const replaceDraft = useCallback((obj) => setDraft(clone(mergeDefaults(defaultContent, obj))), []);

  const resetToDefaults = useCallback(async () => {
    try {
      await api('/content', { method: 'DELETE', auth: true });
      await load();
      flash('success', 'Reset to the original content.');
    } catch (err) {
      if (err.status === 401) logout();
      else flash('error', err.message);
    }
  }, [load, flash, logout]);

  const value = useMemo(
    () => ({ status, draft, dirty, saving, message, update, save, load, replaceDraft, resetToDefaults, flash }),
    [status, draft, dirty, saving, message, update, save, load, replaceDraft, resetToDefaults, flash]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAdminContent = () => useContext(Ctx);
