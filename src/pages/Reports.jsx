import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn } from '../components/ui';

const mockReports = [
  { id: 1, reporter: 'Ahmad Khan', reported: 'Fake Account 01', reason: 'Impersonating a real cricketer', status: 'pending', date: '2024-11-24' },
  { id: 2, reporter: 'Sara Malik',  reported: 'Bot User 99',     reason: 'Sending spam messages', status: 'pending', date: '2024-11-23' },
  { id: 3, reporter: 'Ali Raza',   reported: 'Troll Account',   reason: 'Abusive language in chat', status: 'actioned', date: '2024-11-20' },
  { id: 4, reporter: 'Usman Khan', reported: 'Temp Account',    reason: 'Fake player profile', status: 'dismissed', date: '2024-11-18' },
];

const STATUS_COLORS = { pending: 'var(--warning)', actioned: 'var(--error)', dismissed: 'var(--text-muted)' };

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [statusFilter, setStatusFilter] = useState('all');

  const action = (id, status) => setReports(reports.map(r => r.id === id ? { ...r, status } : r));

  const filtered = reports.filter(r => statusFilter === 'all' || r.status === statusFilter);

  const rows = filtered.map(r => [
    <div>
      <div style={{ fontWeight: 600 }}>{r.reporter}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Reporter</div>
    </div>,
    <div>
      <div style={{ fontWeight: 600, color: 'var(--error)' }}>{r.reported}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Reported User</div>
    </div>,
    <span style={{ fontSize: 12 }}>{r.reason}</span>,
    <Badge label={r.status} color={STATUS_COLORS[r.status]} />,
    r.date,
    r.status === 'pending' ? (
      <div style={{ display: 'flex', gap: 4 }}>
        <Btn size="sm" variant="danger" onClick={() => action(r.id, 'actioned')}>Block User</Btn>
        <Btn size="sm" variant="ghost" onClick={() => action(r.id, 'dismissed')}>Dismiss</Btn>
      </div>
    ) : <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Closed</span>,
  ]);

  return (
    <div>
      <PageHeader title="REPORTS & MODERATION" subtitle={`${reports.filter(r => r.status === 'pending').length} pending reports`} />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all','pending','actioned','dismissed'].map(s => (
            <Btn key={s} size="sm" variant={statusFilter === s ? 'primary' : 'ghost'} onClick={() => setStatusFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Btn>
          ))}
        </div>
      </Card>

      <Card>
        <Table headers={['Reporter', 'Reported User', 'Reason', 'Status', 'Date', 'Action']} rows={rows} />
      </Card>
    </div>
  );
}
