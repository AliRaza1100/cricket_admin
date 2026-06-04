// Shared UI components

export const Card = ({ children, style }) => (
  <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 20, ...style }}>
    {children}
  </div>
);

export const Badge = ({ label, color = 'var(--primary)' }) => (
  <span style={{
    background: color + '22', color, border: `1px solid ${color}44`,
    borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 700, letterSpacing: 0.5
  }}>{label.toUpperCase()}</span>
);

export const Table = ({ headers, rows, emptyMsg = 'No data' }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
          {headers.map(h => (
            <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text-sec)', fontWeight: 700, fontSize: 11, letterSpacing: 1 }}>
              {h.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0
          ? <tr><td colSpan={headers.length} style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>{emptyMsg}</td></tr>
          : rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '12px 12px', color: 'var(--text)' }}>{cell}</td>
              ))}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{label.toUpperCase()}</label>}
    <input style={{
      width: '100%', padding: '10px 12px', background: 'var(--surface-light)',
      border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13, outline: 'none'
    }} {...props} />
  </div>
);

export const Select = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', color: 'var(--text-sec)', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>{label.toUpperCase()}</label>}
    <select style={{
      width: '100%', padding: '10px 12px', background: 'var(--surface-light)',
      border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 13
    }} {...props}>
      {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  </div>
);

export const Btn = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const colors = {
    primary: { bg: 'var(--primary)', color: '#0A0E1A', border: 'var(--primary)' },
    danger:  { bg: 'rgba(255,71,87,0.15)', color: '#FF4757', border: '#FF4757' },
    ghost:   { bg: 'transparent', color: 'var(--text-sec)', border: 'var(--border)' },
    success: { bg: 'rgba(0,255,135,0.15)', color: 'var(--primary)', border: 'var(--primary)' },
  };
  const sizes = { sm: '6px 10px', md: '9px 16px', lg: '12px 24px' };
  const c = colors[variant];
  return (
    <button style={{
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      borderRadius: 8, padding: sizes[size], fontSize: size === 'sm' ? 11 : 13,
      fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s',
    }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'} {...props}>
      {children}
    </button>
  );
};

export const PageHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
    <div>
      <h1 style={{ color: 'var(--primary)', fontSize: 20, fontWeight: 900, letterSpacing: 2 }}>{title}</h1>
      {subtitle && <p style={{ color: 'var(--text-sec)', fontSize: 13, marginTop: 4 }}>{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const StatCard = ({ value, label, icon, color = 'var(--primary)' }) => (
  <Card>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: color + '22', border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
        {icon}
      </div>
      <div>
        <div style={{ color, fontSize: 28, fontWeight: 900 }}>{value}</div>
        <div style={{ color: 'var(--text-sec)', fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>{label.toUpperCase()}</div>
      </div>
    </div>
  </Card>
);

export const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, width: 480, maxHeight: '80vh', overflow: 'auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 800, fontSize: 16 }}>{title}</h3>
          <button onClick={onClose} style={{ color: 'var(--text-muted)', fontSize: 20, lineHeight: 1 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};
