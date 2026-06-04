import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Input, Select, Modal } from '../components/ui';

const initProducts = [
  { id: 1, name: 'Elite Willow Pro Bat V2', category: 'Equipment', brand: 'SS',            price: 4999, stock: 15, rating: 4.7, orders: 234, active: true },
  { id: 2, name: 'Aero-Speed Bowling Spikes', category: 'Footwear', brand: 'Adidas',       price: 1850, stock: 8,  rating: 4.5, orders: 189, active: true },
  { id: 3, name: 'Titan Shield Batting Gloves', category: 'Equipment', brand: 'SG',        price: 890,  stock: 25, rating: 4.6, orders: 312, active: true },
  { id: 4, name: 'Vanguard Carbon Helmet', category: 'Equipment', brand: 'MRF',           price: 2100, stock: 0,  rating: 4.8, orders: 156, active: true },
  { id: 5, name: 'Pro Cricket Jersey (Custom)', category: 'Apparel', brand: 'Nike',        price: 650,  stock: 50, rating: 4.3, orders: 445, active: true },
  { id: 6, name: 'Kookaburra Match Ball', category: 'Equipment', brand: 'Kookaburra',      price: 350,  stock: 100,rating: 4.4, orders: 678, active: true },
  { id: 7, name: 'Pro Batting Pads', category: 'Equipment', brand: 'Gray-Nicolls',         price: 1200, stock: 18, rating: 4.5, orders: 123, active: true },
  { id: 8, name: 'Cricket Kit Bag (Wheelie)', category: 'Accessories', brand: 'Dukes',     price: 3500, stock: 7,  rating: 4.6, orders: 89,  active: true },
  { id: 9, name: 'Batting Helmet Grille', category: 'Equipment', brand: 'Masuri',          price: 450,  stock: 30, rating: 4.2, orders: 67,  active: true },
  { id:10, name: 'Cricket Batting Tee', category: 'Accessories', brand: 'Slazenger',       price: 250,  stock: 40, rating: 4.0, orders: 145, active: true },
  { id:11, name: 'Wicket Keeping Gloves', category: 'Equipment', brand: 'SS',              price: 1500, stock: 12, rating: 4.7, orders: 78,  active: true },
  { id:12, name: 'Cricket Whites Set', category: 'Apparel', brand: 'Gunn & Moore',         price: 1800, stock: 20, rating: 4.4, orders: 234, active: true },
];

const emptyForm = { name: '', category: 'Equipment', brand: '', price: '', shippingFee: '', stock: '', description: '', imageUrl: '' };

export default function Products() {
  const [products, setProducts] = useState(initProducts);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState('all');

  const filtered = products.filter(p => filter === 'all' || (filter === 'out' ? p.stock === 0 : p.category === filter));

  const openAdd = () => { setForm(emptyForm); setEditProduct(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ name: p.name, category: p.category, brand: p.brand, price: p.price, shippingFee: p.shippingFee ?? 0, stock: p.stock, description: p.description ?? '', imageUrl: p.imageUrl ?? '' }); setEditProduct(p); setShowModal(true); };

  const save = () => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...p, ...form, price: +form.price, shippingFee: +form.shippingFee, stock: +form.stock } : p));
    } else {
      setProducts([...products, { id: Date.now(), ...form, price: +form.price, shippingFee: +form.shippingFee, stock: +form.stock, rating: 0, orders: 0, active: true }]);
    }
    setShowModal(false);
  };

  const toggleActive = (id) => setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));

  const rows = filtered.map(p => [
    <span style={{ fontWeight: 600 }}>{p.name}</span>,
    <Badge label={p.category} color="#64B5F6" />,
    p.brand,
    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Rs. {p.price.toLocaleString()}</span>,
    <span style={{ color: p.shippingFee ? 'var(--text-muted)' : 'var(--primary)', fontSize: 12 }}>{p.shippingFee ? `Rs. ${p.shippingFee}` : 'Free'}</span>,
    <span style={{ color: p.stock === 0 ? 'var(--error)' : p.stock < 10 ? 'var(--warning)' : 'var(--primary)', fontWeight: 700 }}>
      {p.stock === 0 ? 'OUT OF STOCK' : p.stock}
    </span>,
    <span style={{ color: 'var(--gold)' }}>⭐ {p.rating}</span>,
    p.orders,
    <Badge label={p.active ? 'Active' : 'Inactive'} color={p.active ? 'var(--primary)' : 'var(--text-muted)'} />,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="ghost" onClick={() => openEdit(p)}>Edit</Btn>
      <Btn size="sm" variant={p.active ? 'danger' : 'success'} onClick={() => toggleActive(p.id)}>
        {p.active ? 'Deactivate' : 'Activate'}
      </Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="ESTORE PRODUCTS" subtitle={`${products.length} products`}
        action={<Btn onClick={openAdd}>+ Add Product</Btn>} />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['all','Equipment','Footwear','Apparel','Accessories','out'].map(f => (
            <Btn key={f} size="sm" variant={filter === f ? 'primary' : 'ghost'} onClick={() => setFilter(f)}>
              {f === 'out' ? 'Out of Stock' : f === 'all' ? 'All' : f}
            </Btn>
          ))}
        </div>
      </Card>

      <Card>
        <Table headers={['Product', 'Category', 'Brand', 'Price', 'Shipping', 'Stock', 'Rating', 'Orders', 'Status', 'Actions']} rows={rows} />
      </Card>

      <Modal open={showModal} title={editProduct ? 'Edit Product' : 'Add Product'} onClose={() => setShowModal(false)}>
        <Input label="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <Select label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
          options={['Equipment','Footwear','Apparel','Accessories']} />
        <Input label="Brand" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
        <Input label="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <Input label="Price (PKR)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <Input label="Shipping Fee (PKR)" type="number" value={form.shippingFee} onChange={e => setForm({ ...form, shippingFee: e.target.value })} placeholder="0 = Free" />
          <Input label="Stock Qty" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        </div>
        <Input label="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." />
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Btn onClick={save}>Save Product</Btn>
          <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
}
