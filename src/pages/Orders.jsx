import { useState } from 'react';
import { PageHeader, Card, Table, Badge, Btn, Modal } from '../components/ui';

const STATUS_COLORS = { placed: '#64B5F6', processing: 'var(--warning)', shipped: '#CE93D8', delivered: 'var(--primary)', cancelled: 'var(--error)' };

const mockOrders = [
  { id: 'ORD20241124001', buyer: 'Ahmad Khan', phone: '+923001234567', items: 2, total: 6929, payment: 'jazzcash', payStatus: 'paid',    status: 'processing', date: '2024-11-24' },
  { id: 'ORD20241123002', buyer: 'Sara Malik',  phone: '+923012345678', items: 1, total: 2100, payment: 'easypaisa',payStatus: 'paid',    status: 'shipped',    date: '2024-11-23' },
  { id: 'ORD20241122003', buyer: 'Ali Raza',    phone: '+923023456789', items: 3, total: 3050, payment: 'cod',      payStatus: 'pending', status: 'placed',     date: '2024-11-22' },
  { id: 'ORD20241120004', buyer: 'Usman Khan',  phone: '+923034567890', items: 1, total: 650,  payment: 'jazzcash', payStatus: 'paid',    status: 'delivered',  date: '2024-11-20' },
  { id: 'ORD20241118005', buyer: 'Zara Ahmed',  phone: '+923045678901', items: 2, total: 4850, payment: 'cod',      payStatus: 'pending', status: 'cancelled',  date: '2024-11-18' },
];

const NEXT_STATUS = { placed: 'processing', processing: 'shipped', shipped: 'delivered' };

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = orders.filter(o => statusFilter === 'all' || o.status === statusFilter);

  const updateStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    setSelectedOrder(null);
  };

  const rows = filtered.map(o => [
    <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--primary)' }}>{o.id}</span>,
    <div>
      <div style={{ fontWeight: 600 }}>{o.buyer}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>{o.phone}</div>
    </div>,
    `${o.items} item${o.items > 1 ? 's' : ''}`,
    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Rs. {o.total.toLocaleString()}</span>,
    <Badge label={o.payment.toUpperCase()} color="#80CBC4" />,
    <Badge label={o.payStatus} color={o.payStatus === 'paid' ? 'var(--primary)' : 'var(--warning)'} />,
    <Badge label={o.status} color={STATUS_COLORS[o.status]} />,
    o.date,
    <div style={{ display: 'flex', gap: 6 }}>
      <Btn size="sm" variant="ghost" onClick={() => setSelectedOrder(o)}>Manage</Btn>
    </div>,
  ]);

  return (
    <div>
      <PageHeader title="ORDER MANAGEMENT" subtitle={`${orders.length} total orders`} />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['all','placed','processing','shipped','delivered','cancelled'].map(s => (
            <Btn key={s} size="sm" variant={statusFilter === s ? 'primary' : 'ghost'} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All Orders' : s.charAt(0).toUpperCase() + s.slice(1)}
            </Btn>
          ))}
        </div>
      </Card>

      <Card>
        <Table headers={['Order ID', 'Buyer', 'Items', 'Total', 'Payment', 'Pay Status', 'Order Status', 'Date', 'Action']}
          rows={rows} emptyMsg="No orders found" />
      </Card>

      <Modal open={!!selectedOrder} title={`Order ${selectedOrder?.id ?? ''}`} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                ['Buyer', selectedOrder.buyer],
                ['Phone', selectedOrder.phone],
                ['Items', selectedOrder.items],
                ['Total', `Rs. ${selectedOrder.total.toLocaleString()}`],
                ['Payment', selectedOrder.payment.toUpperCase()],
                ['Current Status', <Badge label={selectedOrder.status} color={STATUS_COLORS[selectedOrder.status]} />],
              ].map(([k, v]) => (
                <div key={k} style={{ background: 'var(--surface-light)', padding: '10px 12px', borderRadius: 8 }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 700 }}>{k.toUpperCase()}</div>
                  <div style={{ color: 'var(--text)', fontSize: 13, marginTop: 4, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Status progression */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ color: 'var(--text-sec)', fontSize: 12, marginBottom: 10 }}>Update Order Status:</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['processing','shipped','delivered'].map(s => (
                  <Btn key={s} size="sm"
                    variant={selectedOrder.status === s ? 'primary' : 'ghost'}
                    onClick={() => updateStatus(selectedOrder.id, s)}
                    disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled'}>
                    Mark {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Btn>
                ))}
                {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                  <Btn size="sm" variant="danger" onClick={() => updateStatus(selectedOrder.id, 'cancelled')}>
                    Cancel Order
                  </Btn>
                )}
              </div>
            </div>

            <Btn variant="ghost" onClick={() => setSelectedOrder(null)}>Close</Btn>
          </div>
        )}
      </Modal>
    </div>
  );
}
