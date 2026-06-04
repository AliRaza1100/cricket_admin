import { useState, useEffect } from 'react';
import { StatCard, Card, Badge, PageHeader } from '../components/ui';

// Mock dashboard data (replace with API call when backend is running)
const mockStats = {
  total_users: 1247,
  active_teams: 89,
  active_tournaments: 4,
  pending_platform_fees: 2,
  open_orders: 23,
  open_support_tickets: 7,
  flagged_ratings: 3,
  reported_users: 5,
  products_out_of_stock: 2,
};

const mockActivity = [
  { type: 'user', text: 'New user registered: Ahmad Khan (Lahore)', time: '2 min ago', color: 'var(--primary)' },
  { type: 'order', text: 'New order placed: ORD-20241124 — Rs. 4,999', time: '15 min ago', color: '#64B5F6' },
  { type: 'tournament', text: 'New tournament submitted: Premier Cup 2024', time: '1 hour ago', color: 'var(--gold)' },
  { type: 'report', text: 'User reported: Fake Account flagged', time: '2 hours ago', color: 'var(--error)' },
  { type: 'rating', text: 'Rating abuse detected: 12 ratings in 1 hour', time: '3 hours ago', color: 'var(--warning)' },
  { type: 'order', text: 'Order delivered: ORD-20241120 marked complete', time: '5 hours ago', color: '#80CBC4' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(mockStats);
  const [loading, setLoading] = useState(false);

  // TODO: replace with real API call
  // useEffect(() => { api.get('/dashboard/summary').then(r => setStats(r.data)); }, []);

  return (
    <div>
      <PageHeader title="DASHBOARD" subtitle="Real-time overview of Cricket Pro platform" />

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard value={stats.total_users.toLocaleString()} label="Total Users" icon="👤" />
        <StatCard value={stats.active_teams} label="Active Teams" icon="🛡️" color="#64B5F6" />
        <StatCard value={stats.active_tournaments} label="Active Tournaments" icon="🏆" color="var(--gold)" />
        <StatCard value={stats.open_orders} label="Open Orders" icon="📦" color="#80CBC4" />
        <StatCard value={stats.pending_platform_fees} label="Pending Platform Fees" icon="💰" color="var(--warning)" />
        <StatCard value={stats.open_support_tickets} label="Support Tickets" icon="💬" color="#CE93D8" />
        <StatCard value={stats.flagged_ratings} label="Flagged Ratings" icon="⭐" color="var(--warning)" />
        <StatCard value={stats.reported_users} label="Reported Users" icon="🚩" color="var(--error)" />
        <StatCard value={stats.products_out_of_stock} label="Out of Stock" icon="🏪" color="var(--text-muted)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Recent Activity */}
        <Card>
          <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 16, fontSize: 14 }}>RECENT ACTIVITY</h3>
          <div>
            {mockActivity.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < mockActivity.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, marginTop: 6, flexShrink: 0, boxShadow: `0 0 6px ${a.color}` }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts & Actions */}
        <Card>
          <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 16, fontSize: 14 }}>NEEDS ATTENTION</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stats.pending_platform_fees > 0 && (
              <AlertRow icon="💰" text={`${stats.pending_platform_fees} tournaments pending platform fee`} color="var(--warning)" href="/tournaments" />
            )}
            {stats.flagged_ratings > 0 && (
              <AlertRow icon="⭐" text={`${stats.flagged_ratings} player rating abuse detected`} color="var(--warning)" href="/ratings" />
            )}
            {stats.reported_users > 0 && (
              <AlertRow icon="🚩" text={`${stats.reported_users} user reports pending review`} color="var(--error)" href="/reports" />
            )}
            {stats.open_support_tickets > 0 && (
              <AlertRow icon="💬" text={`${stats.open_support_tickets} support tickets unresolved`} color="#64B5F6" href="/support" />
            )}
            {stats.products_out_of_stock > 0 && (
              <AlertRow icon="🏪" text={`${stats.products_out_of_stock} products out of stock`} color="var(--text-sec)" href="/products" />
            )}
            {stats.open_orders > 0 && (
              <AlertRow icon="📦" text={`${stats.open_orders} orders awaiting processing`} color="#80CBC4" href="/orders" />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function AlertRow({ icon, text, color, href }) {
  return (
    <a href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: color + '11', border: `1px solid ${color}33`, borderRadius: 8, cursor: 'pointer', transition: 'opacity 0.2s' }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ fontSize: 12, color, fontWeight: 600 }}>{text}</span>
      <span style={{ marginLeft: 'auto', color, opacity: 0.6 }}>→</span>
    </a>
  );
}
