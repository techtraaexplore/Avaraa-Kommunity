import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import '../../styles/admin.css';
import { AdminContentProvider } from '../../context/AdminContentContext.jsx';
import { AuthProvider, useAuth } from '../../context/AuthContext.jsx';
import AdminLayout from './AdminLayout.jsx';
import Login from './Login.jsx';

function Guarded() {
  const { authed, checking } = useAuth();
  if (checking) return <div className="adm-boot">Checking your login…</div>;
  if (!authed) return <Navigate to="/admin/login" replace />;
  return (
    <AdminContentProvider>
      <AdminLayout />
    </AdminContentProvider>
  );
}

export default function AdminApp() {
  // Keep the admin out of search engines.
  useEffect(() => {
    document.title = 'Avaraa admin';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Guarded />} />
      </Routes>
    </AuthProvider>
  );
}
