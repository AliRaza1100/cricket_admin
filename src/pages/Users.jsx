import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Input, Select, Modal } from '../components/ui';
import { Search, Filter } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Babar Azam',        phone: '+923001234567', city: 'Lahore',     role: 'batsman',     experience: 'professional', rating: 4.9, status: 'active',  joined: '2024-01-15' },
  { id: 2, name: 'Shaheen Afridi',    phone: '+923012345678', city: 'Peshawar',   role: 'bowler',      experience: 'professional', rating: 4.8, status: 'active',  joined: '2024-01-20' },
  { id: 3, name: 'Mohammad Rizwan',   phone: '+923023456789', city: 'Karachi',    role: 'wicketkeeper',experience: 'professional', rating: 4.7, status: 'active',  joined: '2024-02-01' },
  { id: 4, name: 'Shadab Khan',       phone: '+923034567890', city: 'Rawalpindi', role: 'allrounder',  experience: 'advanced',     rating: 4.5, status: 'active',  joined: '2024-02-10' },
  { id: 5, name: 'Fake Account',      phone: '+923099999999', city: 'Lahore',     role: 'batsman',     experience: 'beginner',     rating: 2.1, status: 'blocked', joined: '2024-11-01' },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search);
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleBlock = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' } : u));
  };

  const rows = filtered.map(u => [
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13 }}>{u.name}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{u.phone}</div>
      </div>
    </div>,
    u.city,
    <Badge label={u.role} color="#64B5F6" />,
    <Badge label={u.experience} />,
    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>⭐ {u.rating}</span>,
    <Badge label={u.status} color={u.status === 'active' ? 'var(--primary)' : 'var(--error)'} />,
    u.joined,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="ghost" onClick={() => setSelectedUser(u)}>View</Btn>
      <Btn size="sm" variant={u.status === 'blocked' ? 'success' : 'danger'} onClick={() => toggleBlock(u.id)}>
        {u.status === 'blocked' ? 'Unblock' : 'Block'}
      </Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="USER MANAGEMENT" subtitle={`${users.length} total registered users`} />

      {/* Filters */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              placeholder="Search name or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 32px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none' }}
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '8px 12px', background: 'var(--surface-light)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13 }}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{filtered.length} results</div>
        </div>
      </Card>

      <Card>
        <Table
          headers={['User', 'City', 'Role', 'Experience', 'Rating', 'Status', 'Joined', 'Actions']}
          rows={rows}
          emptyMsg="No users found"
        />
      </Card>

      {/* User Detail Modal */}
      <Modal open={!!selectedUser} title={selectedUser?.name ?? ''} onClose={() => setSelectedUser(null)}>
        {selectedUser && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Phone', selectedUser.phone],
              ['City', selectedUser.city],
              ['Playing Role', selectedUser.role],
              ['Experience', selectedUser.experience],
              ['Rating', `⭐ ${selectedUser.rating}`],
              ['Status', selectedUser.status],
              ['Joined', selectedUser.joined],
            ].map(([k, v]) => (
              <div key={k} style={{ background: 'var(--surface-light)', padding: '10px 12px', borderRadius: 8 }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{k.toUpperCase()}</div>
                <div style={{ color: 'var(--text)', fontSize: 13, marginTop: 4, fontWeight: 600 }}>{v}</div>
              </div>
            ))}
            <div style={{ gridColumn: '1/-1', display: 'flex', gap: 8, marginTop: 8 }}>
              <Btn variant="danger" onClick={() => { toggleBlock(selectedUser.id); setSelectedUser(null); }}>
                {selectedUser.status === 'blocked' ? 'Unblock User' : 'Block User'}
              </Btn>
              <Btn variant="ghost" onClick={() => setSelectedUser(null)}>Close</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
