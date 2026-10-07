import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';
import defaultContent from '../data/defaultContent.js';
import { mergeDefaults } from '../utils/format.js';

const ContentContext = createContext(defaultContent);

/**
 * Loads the saved content from the API. If the API isn't reachable (or nothing is saved yet)
 * the built-in defaults are used, so the public site never shows an error.
 */
export function ContentProvider({ children }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    api('/content', { signal: controller.signal })
      .then((saved) => !cancelled && setContent(mergeDefaults(defaultContent, saved)))
      .catch(() => !cancelled && setContent(defaultContent))
      .finally(() => clearTimeout(timer));
    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  if (!content) return <div className="boot" aria-busy="true" />;
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
