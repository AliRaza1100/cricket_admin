import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [email, setEmail]     = useState('aliraza@gmail.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const nav = useNavigate();

  const MOCK_ADMINS = [
    { email: 'aliraza@gmail.com',    password: 'password', role: 'super_admin', token: 'mock_super_token' },
    { email: 'admin@cricketpro.com', password: 'Admin@123', role: 'admin',      token: 'mock_admin_token' },
  ];

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('admin_token', res.data.token);
      localStorage.setItem('admin_role', res.data.role ?? 'admin');
      nav('/dashboard');
    } catch (err) {
      // Backend not running — fall back to mock credentials
      const isNetworkError = !err.response;
      if (isNetworkError) {
        const match = MOCK_ADMINS.find(a => a.email === email && a.password === password);
        if (match) {
          localStorage.setItem('admin_token', match.token);
          localStorage.setItem('admin_role', match.role);
          nav('/dashboard');
          return;
        }
        setError('Invalid credentials. Use: aliraza@gmail.com / password');
      } else {
        setError(err.response?.data?.message ?? 'Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: 420, padding: 40, background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏏</div>
          <h1 style={{ color: 'var(--primary)', fontSize: 22, fontWeight: 900, letterSpacing: 3, marginTop: 8, textShadow: '0 0 20px var(--primary-glow)' }}>
            CRICKET PRO
          </h1>
          <p style={{ color: 'var(--text-sec)', fontSize: 13, marginTop: 4 }}>Admin Panel</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,71,87,0.1)', border: '1px solid rgba(255,71,87,0.3)', borderRadius: 8, padding: '10px 14px', color: 'var(--error)', fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <label style={labelStyle}>EMAIL ADDRESS</label>
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} required />

          <label style={{ ...labelStyle, marginTop: 16 }}>PASSWORD</label>
          <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} required />

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 11, marginTop: 24 }}>
          Super Admin: aliraza@gmail.com / password
        </p>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6 };
const inputStyle = {
  width: '100%', padding: '12px 14px', background: 'var(--surface-light)',
  border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14,
  outline: 'none', transition: 'border 0.2s',
};
const btnStyle = {
  width: '100%', marginTop: 24, padding: '13px', background: 'var(--primary)',
  color: '#0A0E1A', borderRadius: 8, fontSize: 14, fontWeight: 900, letterSpacing: 1.5,
  border: 'none', cursor: 'pointer', boxShadow: '0 0 20px var(--primary-glow)',
};
