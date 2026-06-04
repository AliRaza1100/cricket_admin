import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn } from '../components/ui';

const mockFlagged = [
  { id: 1, player: 'Shadab Khan', city: 'Rawalpindi', role: 'allrounder', ratingCount: 14, window: '24 hours', raters: ['User1','User2','User3','User4','User5','User6','User7','User8','User9','User10','User11','User12','User13','User14'], currentAvg: 4.5 },
  { id: 2, player: 'Naseem Shah', city: 'Multan', role: 'bowler', ratingCount: 11, window: '18 hours', raters: ['Fake1','Fake2','Fake3','Fake4','Fake5','Fake6','Fake7','Fake8','Fake9','Fake10','Fake11'], currentAvg: 2.1 },
];

export default function Ratings() {
  const [flagged, setFlagged] = useState(mockFlagged);

  const bulkRemove = (id) => setFlagged(flagged.filter(r => r.id !== id));
  const dismiss = (id) => setFlagged(flagged.filter(r => r.id !== id));

  const rows = flagged.map(r => [
    <div>
      <div style={{ fontWeight: 700 }}>{r.player}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{r.city} • {r.role}</div>
    </div>,
    <span style={{ color: 'var(--error)', fontWeight: 700 }}>{r.ratingCount} ratings</span>,
    r.window,
    <span style={{ color: 'var(--gold)' }}>⭐ {r.currentAvg}</span>,
    <Badge label="ABUSE FLAGGED" color="var(--error)" />,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="danger" onClick={() => bulkRemove(r.id)}>Remove All Suspicious</Btn>
      <Btn size="sm" variant="ghost" onClick={() => dismiss(r.id)}>Dismiss</Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="RATING MANAGEMENT"
        subtitle={`${flagged.length} flagged rating clusters (10+ ratings in 24 hours)`} />

      {flagged.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <p style={{ color: 'var(--text-sec)' }}>No flagged ratings. All clear!</p>
        </Card>
      ) : (
        <Card>
          <div style={{ background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 12, color: 'var(--error)' }}>
            ⚠️ These player profiles received unusually high number of ratings in a short window, indicating possible abuse.
          </div>
          <Table headers={['Player', 'Ratings Received', 'Time Window', 'Current Avg', 'Status', 'Actions']} rows={rows} />
        </Card>
      )}
    </div>
  );
}
