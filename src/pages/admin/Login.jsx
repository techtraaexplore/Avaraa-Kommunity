import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const { authed, login } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (authed) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login">
      <form className="login-card" onSubmit={submit}>
        <div className="login-logo">
          AVARAA<small>ADMIN</small>
        </div>
        <label className="f">
          <span className="f-label">Password</span>
          <input type="password" autoFocus autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && (
          <p className="alert err" role="alert">
            {error}
          </p>
        )}
        <button className="btn-primary" type="submit" disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
        <a className="btn-link center" href="/">
          Back to the website
        </a>
      </form>
    </main>
  );
}
