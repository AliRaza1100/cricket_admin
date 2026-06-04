import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Modal } from '../components/ui';

const STATUS_COLORS = { open: 'var(--error)', in_progress: 'var(--warning)', resolved: 'var(--primary)' };

const mockTickets = [
  { id: 1, user: 'Ahmad Khan', phone: '+923001234567', subject: 'My order not delivered after 10 days', status: 'open', date: '2024-11-24 10:30', messages: [
    { sender: 'user', text: 'My order #ORD20241114 was placed 10 days ago but not delivered.', time: '10:30 AM' }
  ]},
  { id: 2, user: 'Sara Malik', phone: '+923012345678', subject: 'Cannot join tournament — payment issue', status: 'in_progress', date: '2024-11-23 15:00', messages: [
    { sender: 'user', text: 'I tried to pay tournament entry fee via JazzCash but got error.', time: '3:00 PM' },
    { sender: 'admin', text: 'Hi Sara! We are looking into the payment issue. Please try again after 1 hour.', time: '3:30 PM' },
  ]},
  { id: 3, user: 'Ali Raza', phone: '+923023456789', subject: 'Request to delete fake team', status: 'resolved', date: '2024-11-20 09:00', messages: [
    { sender: 'user', text: 'There is a fake team using my name. Please delete it.', time: '9:00 AM' },
    { sender: 'admin', text: 'The team has been removed. Sorry for the inconvenience.', time: '10:00 AM' },
  ]},
];

export default function Support() {
  const [tickets, setTickets] = useState(mockTickets);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = tickets.filter(t => statusFilter === 'all' || t.status === statusFilter);

  const sendReply = () => {
    if (!reply.trim()) return;
    setTickets(tickets.map(t => t.id === selected.id
      ? { ...t, status: 'in_progress', messages: [...t.messages, { sender: 'admin', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }
      : t
    ));
    setSelected(prev => ({ ...prev, messages: [...prev.messages, { sender: 'admin', text: reply, time: 'Now' }], status: 'in_progress' }));
    setReply('');
  };

  const resolve = (id) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
    setSelected(null);
  };

  const rows = filtered.map(t => [
    <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>#{t.id}</span>,
    <div><div style={{ fontWeight: 600 }}>{t.user}</div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{t.phone}</div></div>,
    t.subject,
    <Badge label={t.status.replace('_', ' ')} color={STATUS_COLORS[t.status]} />,
    t.date,
    <Btn size="sm" variant="ghost" onClick={() => setSelected(t)}>Reply</Btn>,
  ]);

  return (
    <div>
      <PageHeader title="CUSTOMER SUPPORT" subtitle={`${tickets.filter(t => t.status !== 'resolved').length} open tickets`} />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all','open','in_progress','resolved'].map(s => (
            <Btn key={s} size="sm" variant={statusFilter === s ? 'primary' : 'ghost'} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All' : s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
            </Btn>
          ))}
        </div>
      </Card>

      <Card>
        <Table headers={['#', 'User', 'Subject', 'Status', 'Date', 'Action']} rows={rows} />
      </Card>

      <Modal open={!!selected} title={`Ticket #${selected?.id} — ${selected?.user}`} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <div style={{ maxHeight: 250, overflowY: 'auto', marginBottom: 16 }}>
              {selected.messages.map((m, i) => (
                <div key={i} style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', alignItems: m.sender === 'admin' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%', padding: '10px 14px', borderRadius: 10,
                    background: m.sender === 'admin' ? 'var(--primary)' : 'var(--surface-light)',
                    color: m.sender === 'admin' ? '#0A0E1A' : 'var(--text)',
                    fontSize: 12,
                  }}>
                    {m.text}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10, marginTop: 3 }}>{m.sender === 'admin' ? 'Admin' : selected.user} • {m.time}</div>
                </div>
              ))}
            </div>
            <textarea value={reply} onChange={e => setReply(e.target.value)} placeholder="Type your reply..."
              style={{ width: '100%', padding: '10px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, height: 80, resize: 'none', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <Btn onClick={sendReply}>Send Reply</Btn>
              {selected.status !== 'resolved' && <Btn variant="success" onClick={() => resolve(selected.id)}>Mark Resolved</Btn>}
              <Btn variant="ghost" onClick={() => setSelected(null)}>Close</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
