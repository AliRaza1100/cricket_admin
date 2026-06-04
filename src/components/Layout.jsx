import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Shield, Trophy, ShoppingBag,
  Package, Image, Star, MessageSquare, Flag, Bell, LogOut
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',     icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users',         icon: Users,            label: 'Users' },
  { to: '/teams',         icon: Shield,           label: 'Teams' },
  { to: '/tournaments',   icon: Trophy,           label: 'Tournaments' },
  { to: '/products',      icon: Package,          label: 'eStore Products' },
  { to: '/orders',        icon: ShoppingBag,      label: 'Orders' },
  { to: '/banners',       icon: Image,            label: 'Banners' },
  { to: '/ratings',       icon: Star,             label: 'Ratings' },
  { to: '/support',       icon: MessageSquare,    label: 'Support' },
  { to: '/reports',       icon: Flag,             label: 'Reports' },
  { to: '/notifications', icon: Bell,             label: 'Notifications' },
];

export default function Layout() {
  const nav = useNavigate();
  const role = localStorage.getItem('admin_role') ?? 'admin';

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_role');
    nav('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: 'var(--sidebar-w)', background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🏏</span>
            <div>
              <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: 14, letterSpacing: 2 }}>CRICKET PRO</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 10, letterSpacing: 1 }}>ADMIN PANEL</div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: '6px 10px', background: 'var(--primary-dim)', borderRadius: 6, border: '1px solid rgba(0,255,135,0.2)' }}>
            <span style={{ color: 'var(--primary)', fontSize: 10, fontWeight: 700 }}>{role.toUpperCase().replace('_', ' ')}</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
              borderRadius: 8, marginBottom: 2, fontSize: 13, fontWeight: 500,
              color: isActive ? 'var(--primary)' : 'var(--text-sec)',
              background: isActive ? 'var(--primary-dim)' : 'transparent',
              border: isActive ? '1px solid rgba(0,255,135,0.15)' : '1px solid transparent',
              transition: 'all 0.15s',
            })}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
          <button onClick={logout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
            borderRadius: 8, color: 'var(--error)', fontSize: 13, fontWeight: 500,
          }}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 'var(--sidebar-w)', flex: 1, minHeight: '100vh', padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
