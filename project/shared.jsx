// Shared design tokens, sidebar, and placeholder "brand" chips.
// Visual language: dark navy sidebar with orange bell accent,
// white cards on pale-blue canvas, rounded corners, status chips.

const TOKENS = {
  canvas: '#EAF3FB',
  navy: '#0E2235',
  navySoft: '#1A2F44',
  orange: '#F08A5D',
  text: '#0E2235',
  mute: '#6A7A8C',
  line: '#E4EBF2',
  card: '#FFFFFF',
  green: '#1FBF7A',
  greenSoft: '#DBF5E9',
  gray: '#E7EDF3',
  amber: '#F7B955',
  amberSoft: '#FDEBC7',
  teal: '#2F8C8F',
  tealSoft: '#CFE3E4',
  blue: '#3A7CC9',
  blueSoft: '#D7E5F5',
  red: '#D85A5A',
  redSoft: '#F7DADA',
};

// Simple icon set — thin stroke icons drawn with SVG primitives.
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  switch (name) {
    case 'bell':
      return <svg {...common}><path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>;
    case 'home':
      return <svg {...common}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>;
    case 'inbox':
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 13h5l2 2h4l2-2h5"/></svg>;
    case 'building':
      return <svg {...common}><rect x="4" y="3" width="16" height="18"/><path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2"/></svg>;
    case 'money':
      return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'key':
      return <svg {...common}><circle cx="8" cy="14" r="4"/><path d="M11 11 21 3"/><path d="M18 6l2 2"/></svg>;
    case 'users':
      return <svg {...common}><circle cx="9" cy="9" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="8" r="2.5"/><path d="M15 14c3 0 6 2 6 5"/></svg>;
    case 'doc':
      return <svg {...common}><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 13h6M9 17h4"/></svg>;
    case 'chart':
      return <svg {...common}><path d="M5 20V10M12 20V4M19 20v-7"/></svg>;
    case 'gear':
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>;
    case 'calendar':
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'edit':
      return <svg {...common}><path d="M4 20h4L20 8l-4-4L4 16z"/></svg>;
    case 'chevL': return <svg {...common}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'chevR': return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'dchevL': return <svg {...common}><path d="M17 6l-6 6 6 6M11 6l-6 6 6 6"/></svg>;
    case 'dchevR': return <svg {...common}><path d="M7 6l6 6-6 6M13 6l6 6-6 6"/></svg>;
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'filter': return <svg {...common}><path d="M3 5h18l-7 9v5l-4 2v-7z"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case 'check': return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case 'warn': return <svg {...common}><path d="M12 3 2 20h20z"/><path d="M12 10v5M12 18v.5"/></svg>;
    case 'link': return <svg {...common}><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>;
    case 'refresh': return <svg {...common}><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>;
    case 'dot': return <svg {...common}><circle cx="12" cy="12" r="3" fill={color} stroke="none"/></svg>;
    case 'more': return <svg {...common}><circle cx="5" cy="12" r="1" fill={color}/><circle cx="12" cy="12" r="1" fill={color}/><circle cx="19" cy="12" r="1" fill={color}/></svg>;
    default: return null;
  }
};

// Dark navy sidebar matching the screenshots' left rail.
const Sidebar = ({ active = 'gear', height = '100%' }) => {
  const items = [
    { id: 'home', icon: 'home' },
    { id: 'inbox', icon: 'inbox' },
    { id: 'building', icon: 'building' },
    { id: 'calendar', icon: 'calendar' },
    { id: 'money', icon: 'money' },
    { id: 'key', icon: 'key' },
    { id: 'users', icon: 'users' },
    { id: 'doc', icon: 'doc' },
    { id: 'chart', icon: 'chart' },
    { id: 'gear', icon: 'gear' },
  ];
  return (
    <div style={{
      width: 72, background: TOKENS.navy, display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '18px 0', gap: 4, height, flexShrink: 0
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 10, background: TOKENS.orange,
        display: 'grid', placeItems: 'center', color: 'white', marginBottom: 14
      }}>
        <Icon name="bell" size={22} color="white" strokeWidth={2} />
      </div>
      {items.map(it => (
        <div key={it.id} style={{
          width: 42, height: 42, borderRadius: 8,
          background: active === it.id ? 'white' : 'transparent',
          color: active === it.id ? TOKENS.navy : '#9DB0C3',
          display: 'grid', placeItems: 'center',
        }}>
          <Icon name={it.icon} size={20} strokeWidth={1.8} />
        </div>
      ))}
    </div>
  );
};

// Generic, non-branded channel "logo" placeholders.
// Each uses a distinct shape+color so they read as different channels without copying real brands.
const ChannelMark = ({ id, size = 28 }) => {
  const marks = {
    A: { color: '#2D4EC8', glyph: 'A', shape: 'square' },
    B: { color: '#111827', glyph: '✈', shape: 'square' },
    C: { color: '#E25555', glyph: '◎', shape: 'circle' },
    D: { color: '#3BA06A', glyph: 'G', shape: 'square' },
    E: { color: '#1F1F1F', glyph: '▦', shape: 'square' },
    F: { color: '#2F8C8F', glyph: 'S', shape: 'square' },
    G: { color: '#D14D3B', glyph: 'H', shape: 'square' },
    H: { color: '#5A6B7D', glyph: 'M', shape: 'square' },
    I: { color: '#2E8FB8', glyph: 'b', shape: 'square' },
  };
  const m = marks[id] || marks.A;
  return (
    <div style={{
      width: size, height: size,
      borderRadius: m.shape === 'circle' ? '50%' : 6,
      background: m.color, color: 'white',
      display: 'grid', placeItems: 'center',
      fontWeight: 700, fontSize: size * 0.55,
      fontFamily: 'Inter, system-ui, sans-serif',
      flexShrink: 0,
    }}>{m.glyph}</div>
  );
};

// Full channel pill: mark + made-up name so nothing reads as a real brand.
const ChannelName = ({ id, size = 'md' }) => {
  const names = {
    A: 'Channel A',
    B: 'Skyfare',
    C: 'AirNest',
    D: 'MapStay',
    E: 'iCal Feed',
    F: 'SiteLink',
    G: 'Hosteller',
    H: 'Allocatr',
    I: 'BookView',
  };
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 13 : 16;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <ChannelMark id={id} size={size === 'lg' ? 34 : size === 'sm' ? 22 : 28} />
      <span style={{ fontWeight: 700, fontSize, color: TOKENS.navy, letterSpacing: -0.2 }}>{names[id]}</span>
    </div>
  );
};

// Button matching the dark navy "Add new" style in the screenshots.
const NavyButton = ({ children, icon = 'plus', size = 'md', onClick, style }) => {
  const pad = size === 'sm' ? '8px 12px' : '10px 16px';
  const fs = size === 'sm' ? 13 : 14;
  return (
    <button onClick={onClick} style={{
      background: TOKENS.navy, color: 'white', border: 'none',
      padding: pad, borderRadius: 8, fontSize: fs, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'inherit', cursor: 'pointer', ...style
    }}>
      {icon && <Icon name={icon} size={14} color="white" strokeWidth={2.4} />}
      {children}
    </button>
  );
};

// Status chip (Active / Inactive / Syncing / Error / etc.)
const Chip = ({ kind = 'active', children }) => {
  const m = {
    active:   { bg: TOKENS.green, fg: 'white' },
    inactive: { bg: TOKENS.gray, fg: TOKENS.navy },
    syncing:  { bg: TOKENS.amberSoft, fg: '#8A5A00' },
    error:    { bg: TOKENS.redSoft, fg: '#7A2626' },
    info:     { bg: TOKENS.blueSoft, fg: '#1B4A86' },
    ok:       { bg: TOKENS.greenSoft, fg: '#106A3E' },
  }[kind];
  return (
    <span style={{
      background: m.bg, color: m.fg, padding: '4px 10px',
      borderRadius: 6, fontSize: 12, fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>{children}</span>
  );
};

// Card surface — white on canvas with subtle shadow.
const Card = ({ children, style, pad = 20 }) => (
  <div style={{
    background: TOKENS.card, borderRadius: 14, padding: pad,
    boxShadow: '0 1px 2px rgba(14,34,53,0.04), 0 4px 12px rgba(14,34,53,0.04)',
    ...style
  }}>{children}</div>
);

// A "Shell" wraps the sidebar + main area into a fixed-width artboard.
const Shell = ({ active, children, width = 1280, height = 820, bg = TOKENS.canvas }) => (
  <div style={{
    width, height, background: bg, display: 'flex',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    color: TOKENS.text, overflow: 'hidden',
  }}>
    <Sidebar active={active} />
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

Object.assign(window, { TOKENS, Icon, Sidebar, ChannelMark, ChannelName, NavyButton, Chip, Card, Shell });
