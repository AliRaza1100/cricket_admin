import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Modal, Input, Select } from '../components/ui';
import { GripVertical } from 'lucide-react';

const initBanners = [
  { id: 1, image: '🏏 Premier League 2024 Banner', linkType: 'tournament', linkRef: '1', active: true, order: 1 },
  { id: 2, image: '🛒 New Cricket Gear Arrivals',   linkType: 'none',        linkRef: '',  active: true, order: 2 },
  { id: 3, image: '👥 Join a Team Near You',        linkType: 'none',        linkRef: '',  active: false,order: 3 },
];

const emptyForm = { image: '', linkType: 'none', linkRef: '', active: true };

export default function Banners() {
  const [banners, setBanners] = useState(initBanners);
  const [showModal, setShowModal] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd  = () => { setForm(emptyForm); setEditBanner(null); setShowModal(true); };
  const openEdit = (b) => { setForm({ image: b.image, linkType: b.linkType, linkRef: b.linkRef, active: b.active }); setEditBanner(b); setShowModal(true); };

  const save = () => {
    if (editBanner) {
      setBanners(banners.map(b => b.id === editBanner.id ? { ...b, ...form } : b));
    } else {
      if (banners.filter(b => b.active).length >= 8 && form.active) {
        alert('Maximum 8 active banners allowed'); return;
      }
      setBanners([...banners, { id: Date.now(), ...form, order: banners.length + 1 }]);
    }
    setShowModal(false);
  };

  const toggle = (id) => setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
  const remove = (id) => setBanners(banners.filter(b => b.id !== id));

  const rows = banners.map(b => [
    <GripVertical size={14} color="var(--text-muted)" style={{ cursor: 'grab' }} />,
    b.order,
    <span style={{ fontSize: 13 }}>{b.image}</span>,
    <Badge label={b.linkType.replace('_', ' ')} color="#64B5F6" />,
    b.linkRef || '—',
    <Badge label={b.active ? 'Active' : 'Inactive'} color={b.active ? 'var(--primary)' : 'var(--text-muted)'} />,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="ghost" onClick={() => openEdit(b)}>Edit</Btn>
      <Btn size="sm" variant={b.active ? 'danger' : 'success'} onClick={() => toggle(b.id)}>
        {b.active ? 'Hide' : 'Show'}
      </Btn>
      <Btn size="sm" variant="danger" onClick={() => remove(b.id)}>Delete</Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="BANNER MANAGEMENT"
        subtitle={`${banners.filter(b => b.active).length}/8 active banners`}
        action={<Btn onClick={openAdd}>+ Add Banner</Btn>} />

      <Card style={{ marginBottom: 12, fontSize: 12, color: 'var(--text-sec)', padding: '10px 14px' }}>
        Maximum 8 active banners allowed. Drag to reorder. Banners auto-scroll on home screen every 4 seconds.
      </Card>

      <Card>
        <Table headers={['', 'Order', 'Preview', 'Link Type', 'Link Ref', 'Status', 'Actions']} rows={rows} />
      </Card>

      <Modal open={showModal} title={editBanner ? 'Edit Banner' : 'Add Banner'} onClose={() => setShowModal(false)}>
        <Input label="Banner Title / Description" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="e.g. Premier League 2024" />
        <div style={{ marginBottom: 16, padding: 40, background: 'var(--surface-light)', borderRadius: 8, border: '2px dashed var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
          📷 Image Upload — Click to browse (1200×400px recommended)
        </div>
        <Select label="Link Type" value={form.linkType} onChange={e => setForm({ ...form, linkType: e.target.value })}
          options={['none','external_url','tournament','product','player']} />
        {form.linkType !== 'none' && (
          <Input label={form.linkType === 'external_url' ? 'URL' : 'ID'} value={form.linkRef} onChange={e => setForm({ ...form, linkRef: e.target.value })}
            placeholder={form.linkType === 'external_url' ? 'https://...' : 'Tournament / Product / Player ID'} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} id="active" />
          <label htmlFor="active" style={{ color: 'var(--text-sec)', fontSize: 13 }}>Show this banner</label>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn onClick={save}>Save Banner</Btn>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
}
