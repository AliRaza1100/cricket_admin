import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Modal } from '../components/ui';

const mockTeams = [
  { id: 1, name: 'Lahore Lions',    captain: 'Babar Azam',    city: 'Lahore',     members: 11, wins: 42, losses: 12, visibility: 'public',  active: true },
  { id: 2, name: 'Karachi Kings',  captain: 'Mohammad Rizwan',city: 'Karachi',    members: 13, wins: 35, losses: 18, visibility: 'public',  active: true },
  { id: 3, name: 'Islamabad Utd',  captain: 'Fakhar Zaman',   city: 'Islamabad',  members: 14, wins: 28, losses: 14, visibility: 'public',  active: true },
  { id: 4, name: 'Peshawar Zalmi', captain: 'Shadab Khan',    city: 'Peshawar',   members: 12, wins: 31, losses: 20, visibility: 'private', active: true },
  { id: 5, name: 'Multan Sultans', captain: 'Naseem Shah',    city: 'Multan',     members: 10, wins: 25, losses: 16, visibility: 'public',  active: true },
];

export default function Teams() {
  const [teams, setTeams] = useState(mockTeams);
  const [selected, setSelected] = useState(null);

  const deleteTeam = (id) => { if (window.confirm('Delete this team? This cannot be undone.')) setTeams(teams.filter(t => t.id !== id)); };

  const rows = teams.map(t => [
    <div>
      <div style={{ fontWeight: 700 }}>{t.name}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{t.city}</div>
    </div>,
    t.captain,
    t.members,
    <div style={{ display: 'flex', gap: 4 }}>
      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{t.wins}W</span>
      <span style={{ color: 'var(--error)' }}>{t.losses}L</span>
    </div>,
    <Badge label={t.visibility} color={t.visibility === 'public' ? 'var(--primary)' : 'var(--text-muted)'} />,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="ghost" onClick={() => setSelected(t)}>View</Btn>
      <Btn size="sm" variant="danger" onClick={() => deleteTeam(t.id)}>Delete</Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="TEAM MANAGEMENT" subtitle={`${teams.length} registered teams`} />
      <Card>
        <Table headers={['Team', 'Captain', 'Members', 'W/L', 'Visibility', 'Actions']} rows={rows} />
      </Card>
      <Modal open={!!selected} title={selected?.name ?? ''} onClose={() => setSelected(null)}>
        {selected && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['Captain', selected.captain],['City', selected.city],['Members', selected.members],['Wins', selected.wins],['Losses', selected.losses],['Visibility', selected.visibility]].map(([k,v]) => (
              <div key={k} style={{ background: 'var(--surface-light)', padding: '10px 12px', borderRadius: 8 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}>{k.toUpperCase()}</div>
                <div style={{ color: 'var(--text)', fontSize: 13, marginTop: 4 }}>{v}</div>
              </div>
            ))}
            <div style={{ gridColumn: '1/-1' }}>
              <Btn variant="ghost" onClick={() => setSelected(null)}>Close</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
