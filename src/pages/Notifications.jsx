import { useState } from 'react';
import { PageHeader, Card, Btn, Input, Select } from '../components/ui';

const mockSent = [
  { id: 1, title: 'Premier League Registration Open!', body: 'Register your team now. Limited spots available.', recipients: 'All Users (1247)', sentAt: '2024-11-20 10:00' },
  { id: 2, title: 'Maintenance Tonight', body: 'Cricket Pro will be down for maintenance 12AM-2AM tonight.', recipients: 'All Users (1247)', sentAt: '2024-11-18 08:00' },
];

export default function Notifications() {
  const [form, setForm] = useState({ title: '', body: '', link: '', target: 'all', city: '', experience: '' });
  const [sent, setSent] = useState(mockSent);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const send = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent([{ id: Date.now(), title: form.title, body: form.body, recipients: form.target === 'all' ? 'All Users' : `Filtered: ${form.target}`, sentAt: new Date().toLocaleString() }, ...sent]);
    setForm({ title: '', body: '', link: '', target: 'all', city: '', experience: '' });
    setSending(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <PageHeader title="PUSH NOTIFICATIONS" subtitle="Send announcements to all users or filtered groups" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Compose */}
        <Card>
          <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 16, fontSize: 14 }}>COMPOSE NOTIFICATION</h3>

          {success && (
            <div style={{ background: 'var(--primary-dim)', border: '1px solid var(--primary)', borderRadius: 8, padding: '10px 14px', color: 'var(--primary)', fontSize: 13, marginBottom: 16 }}>
              ✅ Notification sent successfully!
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 6 }}>TITLE (max 60 chars)</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} maxLength={60}
              placeholder="Notification title..."
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }} />
            <div style={{ color: 'var(--text-muted)', fontSize: 10, textAlign: 'right', marginTop: 3 }}>{form.title.length}/60</div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 6 }}>BODY (max 200 chars)</label>
            <textarea value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} maxLength={200}
              placeholder="Notification message..."
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none', height: 80, resize: 'none' }} />
            <div style={{ color: 'var(--text-muted)', fontSize: 10, textAlign: 'right', marginTop: 3 }}>{form.body.length}/200</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1, display: 'block', marginBottom: 6 }}>RECIPIENTS</label>
            <select value={form.target} onChange={e => setForm({ ...form, target: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13 }}>
              <option value="all">All Users</option>
              <option value="city">Filter by City</option>
              <option value="experience">Filter by Experience</option>
            </select>
          </div>

          {form.target === 'city' && (
            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="City name..."
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, marginBottom: 12, outline: 'none' }} />
          )}
          {form.target === 'experience' && (
            <select value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, marginBottom: 12 }}>
              <option value="">Select level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="professional">Professional</option>
            </select>
          )}

          <Btn onClick={send} disabled={sending || !form.title || !form.body} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {sending ? 'Sending...' : '📣 Send Notification'}
          </Btn>
        </Card>

        {/* Preview */}
        <div>
          <Card style={{ marginBottom: 16 }}>
            <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 12, fontSize: 14 }}>PREVIEW</h3>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 20 }}>🏏</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>Cricket Pro</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10 }}>now</div>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{form.title || 'Notification Title'}</div>
              <div style={{ color: 'var(--text-sec)', fontSize: 12, lineHeight: 1.4 }}>{form.body || 'Notification message will appear here...'}</div>
            </div>
          </Card>

          <Card>
            <h3 style={{ color: 'var(--text)', fontWeight: 800, marginBottom: 12, fontSize: 14 }}>RECENTLY SENT</h3>
            {sent.map(n => (
              <div key={n.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
                <div style={{ color: 'var(--text-sec)', fontSize: 12, marginTop: 2 }}>{n.body}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 4 }}>📤 {n.recipients} • {n.sentAt}</div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
