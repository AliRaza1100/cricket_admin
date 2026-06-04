import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Modal, Input, Select } from '../components/ui';

const STATUS_COLORS = {
  draft: 'var(--text-muted)', pending_fee: 'var(--warning)', open: 'var(--primary)',
  active: '#64B5F6', completed: '#CE93D8',
};

const mockTournaments = [
  { id: 1, name: 'Premier League 2024', organiser: 'Ali Sports Events', city: 'Lahore', teams: '8/16', fee: 2500, entryFee: 2500, status: 'open', feePaid: true, start: '2024-12-01' },
  { id: 2, name: 'City Cup T20', organiser: 'Karachi Cricket Club', city: 'Karachi', teams: '4/8', fee: 1000, entryFee: 1000, status: 'pending_fee', feePaid: false, start: '2024-12-10' },
  { id: 3, name: 'Elite Invitational', organiser: 'Pakistan Sports Board', city: 'Islamabad', teams: '4/4', fee: 5000, entryFee: 5000, status: 'completed', feePaid: true, start: '2024-09-01' },
  { id: 4, name: 'Ramadan Cup 2025', organiser: 'Youth Cricket Pakistan', city: 'Lahore', teams: '0/12', fee: 1500, entryFee: 1500, status: 'draft', feePaid: false, start: '2025-03-15' },
];

export default function Tournaments() {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = tournaments.filter(t => statusFilter === 'all' || t.status === statusFilter);

  const approve = (id) => setTournaments(tournaments.map(t => t.id === id ? { ...t, status: 'open', feePaid: true } : t));
  const reject  = (id) => setTournaments(tournaments.map(t => t.id === id ? { ...t, status: 'draft' } : t));
  const confirmFee = (id) => setTournaments(tournaments.map(t => t.id === id ? { ...t, feePaid: true } : t));

  const rows = filtered.map(t => [
    <span style={{ fontWeight: 700 }}>{t.name}</span>,
    t.organiser,
    t.city,
    t.teams,
    <span style={{ color: 'var(--gold)' }}>Rs. {t.entryFee.toLocaleString()}</span>,
    <Badge label={t.status.replace('_', ' ')} color={STATUS_COLORS[t.status]} />,
    <Badge label={t.feePaid ? 'Paid' : 'Pending'} color={t.feePaid ? 'var(--primary)' : 'var(--warning)'} />,
    t.start,
    <div style={{ display: 'flex', gap: 4 }}>
      <Btn size="sm" variant="ghost" onClick={() => setSelected(t)}>Manage</Btn>
      {!t.feePaid && <Btn size="sm" variant="success" onClick={() => confirmFee(t.id)}>Confirm Fee</Btn>}
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="TOURNAMENT MANAGEMENT" subtitle={`${tournaments.length} tournaments`} />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all','draft','pending_fee','open','active','completed'].map(s => (
            <Btn key={s} size="sm" variant={statusFilter === s ? 'primary' : 'ghost'} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All' : s === 'pending_fee' ? 'Pending Fee' : s.charAt(0).toUpperCase() + s.slice(1)}
            </Btn>
          ))}
        </div>
      </Card>

      <Card>
        <Table
          headers={['Name', 'Organiser', 'City', 'Teams', 'Entry Fee', 'Status', 'Platform Fee', 'Start', 'Actions']}
          rows={rows}
        />
      </Card>

      <Modal open={!!selected} title={selected?.name ?? ''} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[['Organiser', selected.organiser], ['City', selected.city], ['Entry Fee', `Rs. ${selected.entryFee}`], ['Teams', selected.teams], ['Start Date', selected.start], ['Status', selected.status]].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--surface-light)', padding: '10px 12px', borderRadius: 8 }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}>{k.toUpperCase()}</div>
                  <div style={{ color: 'var(--text)', fontSize: 13, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(selected.status === 'pending_fee' || selected.status === 'draft') && (
                <Btn variant="success" onClick={() => { approve(selected.id); setSelected(null); }}>✓ Approve & Publish</Btn>
              )}
              {selected.status !== 'completed' && (
                <Btn variant="danger" onClick={() => { reject(selected.id); setSelected(null); }}>✗ Reject</Btn>
              )}
              {!selected.feePaid && (
                <Btn onClick={() => { confirmFee(selected.id); setSelected({ ...selected, feePaid: true }); }}>Confirm Platform Fee Paid</Btn>
              )}
              <Btn variant="ghost" onClick={() => setSelected(null)}>Close</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
