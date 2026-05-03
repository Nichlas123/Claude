// Channel Manager — 4 variations
// V1: Unified table of all channels (instead of per-channel cards)
// V2: Health dashboard with sync status + alerts
// V3: Sidebar list + detail pane (master/detail)
// V4: Grouped by status (Connected / Available / Issues)

// ---------- V1: Unified table ----------
const CMV1_Table = () => {
  const rows = [
    { id: 'A', hotels: 2, active: 2, rooms: 4, lastSync: '2 min ago', status: 'active', revenue: '€12,480' },
    { id: 'B', hotels: 1, active: 1, rooms: 4, lastSync: '5 min ago', status: 'active', revenue: '€8,210' },
    { id: 'C', hotels: 1, active: 0, rooms: 0, lastSync: '—', status: 'inactive', revenue: '—' },
    { id: 'D', hotels: 0, active: 0, rooms: 0, lastSync: '—', status: 'inactive', revenue: '—' },
    { id: 'F', hotels: 1, active: 1, rooms: 4, lastSync: '14 min ago', status: 'syncing', revenue: '€3,104' },
    { id: 'G', hotels: 0, active: 0, rooms: 0, lastSync: '—', status: 'inactive', revenue: '—' },
    { id: 'H', hotels: 1, active: 1, rooms: 2, lastSync: '1 hr ago', status: 'error', revenue: '—' },
  ];

  const Th = ({ children, w }) => (
    <th style={{
      textAlign: 'left', padding: '14px 16px', fontSize: 11,
      fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase',
      color: TOKENS.mute, borderBottom: `1px solid ${TOKENS.line}`, width: w,
    }}>{children}</th>
  );
  const Td = ({ children, align }) => (
    <td style={{ padding: '16px', fontSize: 14, color: TOKENS.text, textAlign: align || 'left', verticalAlign: 'middle' }}>{children}</td>
  );

  return (
    <Shell active="gear">
      <div style={{ padding: '28px 32px 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 600, letterSpacing: 0.4 }}>SETTINGS › CHANNEL MANAGER</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '4px 0 0', letterSpacing: -0.5 }}>Channels</h1>
          <div style={{ color: TOKENS.mute, marginTop: 4, fontSize: 14 }}>7 integrations · 5 connected · 1 needs attention</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: TOKENS.text }}>
            <Icon name="refresh" size={14} /> Sync all
          </button>
          <NavyButton>Add channel</NavyButton>
        </div>
      </div>

      <div style={{ padding: '0 32px', display: 'flex', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'white', borderRadius: 8, padding: '10px 14px', border: `1px solid ${TOKENS.line}` }}>
          <Icon name="search" size={16} color={TOKENS.mute} />
          <span style={{ color: TOKENS.mute, fontSize: 13 }}>Search channels…</span>
        </div>
        {['All', 'Active', 'Inactive', 'Errors'].map((t, i) => (
          <button key={t} style={{
            background: i === 0 ? TOKENS.navy : 'white', color: i === 0 ? 'white' : TOKENS.text,
            border: `1px solid ${i === 0 ? TOKENS.navy : TOKENS.line}`, padding: '10px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 32px 32px' }}>
        <Card pad={0}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th w={260}>Channel</Th>
                <Th>Status</Th>
                <Th>Hotels</Th>
                <Th>Rooms mapped</Th>
                <Th>Revenue (30d)</Th>
                <Th>Last sync</Th>
                <Th w={120}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${TOKENS.line}` : 'none' }}>
                  <Td><ChannelName id={r.id} /></Td>
                  <Td>
                    {r.status === 'active' && <Chip kind="active">Active</Chip>}
                    {r.status === 'inactive' && <Chip kind="inactive">Inactive</Chip>}
                    {r.status === 'syncing' && <Chip kind="syncing">Syncing…</Chip>}
                    {r.status === 'error' && <Chip kind="error">Error</Chip>}
                  </Td>
                  <Td><span style={{ fontWeight: 600 }}>{r.active}</span><span style={{ color: TOKENS.mute }}> / {r.hotels}</span></Td>
                  <Td>{r.rooms > 0 ? `${r.rooms} mapped` : <span style={{ color: TOKENS.mute }}>—</span>}</Td>
                  <Td><span style={{ fontWeight: 600 }}>{r.revenue}</span></Td>
                  <Td><span style={{ color: TOKENS.mute, fontSize: 13 }}>{r.lastSync}</span></Td>
                  <Td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: TOKENS.teal, padding: 4 }}><Icon name="edit" size={18} color={TOKENS.teal} /></button>
                      <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: TOKENS.mute, padding: 4 }}><Icon name="more" size={18} /></button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </Shell>
  );
};

// ---------- V2: Health dashboard ----------
const CMV2_Health = () => {
  const Metric = ({ label, value, delta, kind }) => (
    <Card style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -0.8 }}>{value}</div>
        {delta && <div style={{ fontSize: 13, color: kind === 'up' ? '#106A3E' : '#7A2626', fontWeight: 600 }}>{delta}</div>}
      </div>
    </Card>
  );

  const alerts = [
    { ch: 'H', kind: 'error', msg: 'Rate push failed — invalid room mapping', when: '2 min ago' },
    { ch: 'F', kind: 'syncing', msg: 'Syncing inventory for 4 rooms', when: '14 min ago' },
    { ch: 'C', kind: 'info', msg: 'Setup incomplete — 0 rooms mapped', when: '1 day ago' },
  ];

  const connected = [
    { id: 'A', last: '2m', rate: 99.8 },
    { id: 'B', last: '5m', rate: 99.2 },
    { id: 'F', last: '14m', rate: 96.4 },
    { id: 'H', last: '1h', rate: 72.1 },
  ];

  return (
    <Shell active="gear">
      <div style={{ padding: '28px 32px 16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 600, letterSpacing: 0.4 }}>SETTINGS › CHANNEL MANAGER</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '4px 0 0', letterSpacing: -0.5 }}>Channel health</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <Icon name="refresh" size={14} /> Sync all
          </button>
          <NavyButton>Add channel</NavyButton>
        </div>
      </div>

      <div style={{ padding: '0 32px', display: 'flex', gap: 14, marginBottom: 16 }}>
        <Metric label="Connected" value="5" />
        <Metric label="Sync success (24h)" value="94.6%" delta="▲ 1.2%" kind="up" />
        <Metric label="Bookings today" value="23" delta="▲ 4" kind="up" />
        <Metric label="Needs attention" value="1" delta="▼ 1" kind="up" />
      </div>

      <div style={{ padding: '0 32px 32px', display: 'flex', gap: 14, flex: 1 }}>
        <Card style={{ flex: 1.4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Connected channels</div>
            <div style={{ color: TOKENS.mute, fontSize: 12 }}>Sync rate · last 24h</div>
          </div>
          {connected.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${TOKENS.line}` }}>
              <ChannelName id={c.id} />
              <div style={{ flex: 1, height: 6, background: TOKENS.gray, borderRadius: 3, marginLeft: 24, overflow: 'hidden' }}>
                <div style={{ width: `${c.rate}%`, height: '100%', background: c.rate > 90 ? TOKENS.green : c.rate > 80 ? TOKENS.amber : TOKENS.red }} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 14, width: 54, textAlign: 'right' }}>{c.rate}%</div>
              <div style={{ color: TOKENS.mute, fontSize: 12, width: 70, textAlign: 'right' }}>{c.last} ago</div>
            </div>
          ))}
        </Card>

        <Card style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Activity</div>
            <span style={{ color: TOKENS.mute, fontSize: 12 }}>Last 24 hours</span>
          </div>
          {alerts.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${TOKENS.line}`, alignItems: 'flex-start' }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: a.kind === 'error' ? TOKENS.redSoft : a.kind === 'syncing' ? TOKENS.amberSoft : TOKENS.blueSoft,
                color: a.kind === 'error' ? '#7A2626' : a.kind === 'syncing' ? '#8A5A00' : '#1B4A86',
                display: 'grid', placeItems: 'center', flexShrink: 0
              }}>
                <Icon name={a.kind === 'error' ? 'warn' : a.kind === 'syncing' ? 'refresh' : 'link'} size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <ChannelMark id={a.ch} size={18} />
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{a.msg}</span>
                </div>
                <div style={{ color: TOKENS.mute, fontSize: 12, marginTop: 3 }}>{a.when}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
};

// ---------- V3: Master-detail ----------
const CMV3_Detail = () => {
  const channels = [
    { id: 'A', status: 'active', rooms: 4 },
    { id: 'B', status: 'active', rooms: 4 },
    { id: 'C', status: 'inactive', rooms: 0 },
    { id: 'F', status: 'syncing', rooms: 4 },
    { id: 'H', status: 'error', rooms: 2 },
    { id: 'D', status: 'inactive', rooms: 0 },
    { id: 'G', status: 'inactive', rooms: 0 },
  ];

  const Row = ({ label, value, mono }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${TOKENS.line}` }}>
      <span style={{ color: TOKENS.mute, fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: 600, fontSize: 13, fontFamily: mono ? 'ui-monospace, monospace' : 'inherit' }}>{value}</span>
    </div>
  );

  return (
    <Shell active="gear">
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Channel manager</h1>
        <NavyButton size="sm">Add channel</NavyButton>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: 24, gap: 16, overflow: 'hidden' }}>
        {/* Channel list */}
        <Card style={{ width: 300, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${TOKENS.line}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="search" size={14} color={TOKENS.mute} />
            <span style={{ color: TOKENS.mute, fontSize: 13 }}>Search…</span>
          </div>
          {channels.map((c, i) => {
            const active = i === 0;
            return (
              <div key={c.id} style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
                background: active ? '#F4F9FE' : 'transparent',
                borderLeft: `3px solid ${active ? TOKENS.orange : 'transparent'}`,
                borderBottom: `1px solid ${TOKENS.line}`,
              }}>
                <ChannelMark id={c.id} size={26} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{['Channel A','Skyfare','AirNest','SiteLink','Allocatr','MapStay','Hosteller'][i]}</div>
                  <div style={{ color: TOKENS.mute, fontSize: 12 }}>{c.rooms} rooms mapped</div>
                </div>
                {c.status === 'active' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: TOKENS.green }} />}
                {c.status === 'syncing' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: TOKENS.amber }} />}
                {c.status === 'error' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: TOKENS.red }} />}
                {c.status === 'inactive' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C9D2DC' }} />}
              </div>
            );
          })}
        </Card>

        {/* Detail pane */}
        <Card style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <ChannelName id="A" size="lg" />
            <div style={{ display: 'flex', gap: 8 }}>
              <Chip kind="active">Active</Chip>
              <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Pause</button>
              <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '8px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Disconnect</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: `1px solid ${TOKENS.line}` }}>
            {['Overview', 'Room mapping', 'Rates', 'Logs'].map((t, i) => (
              <div key={t} style={{
                padding: '10px 14px', fontSize: 13, fontWeight: 600,
                color: i === 0 ? TOKENS.navy : TOKENS.mute,
                borderBottom: `2px solid ${i === 0 ? TOKENS.orange : 'transparent'}`,
                marginBottom: -1,
              }}>{t}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
              <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Connection</div>
              <Row label="Hotel ID" value="HTL-8841-2A" mono />
              <Row label="Connected since" value="12 Aug 2025" />
              <Row label="Last sync" value="2 minutes ago" />
              <Row label="Sync frequency" value="Every 5 min" />
            </div>
            <div>
              <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4 }}>Performance (30d)</div>
              <Row label="Bookings" value="84" />
              <Row label="Revenue" value="€12,480" />
              <Row label="Cancellations" value="6" />
              <Row label="Avg. lead time" value="11 days" />
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 12, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 10 }}>Mapped rooms</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {['Single room', 'Double room', 'Queen room', 'King room'].map(r => (
                <div key={r} style={{ border: `1px solid ${TOKENS.line}`, borderRadius: 8, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r}</span>
                  <Chip kind="ok"><Icon name="check" size={12} color="#106A3E" /> Mapped</Chip>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Shell>
  );
};

// ---------- V4: Grouped by status ----------
const CMV4_Grouped = () => {
  const sections = [
    { title: 'Connected', count: 5, kind: 'active', channels: [
      { id: 'A', sub: '4 rooms · synced 2m ago' },
      { id: 'B', sub: '4 rooms · synced 5m ago' },
      { id: 'F', sub: '4 rooms · syncing now', state: 'syncing' },
      { id: 'I', sub: '2 rooms · synced 12m ago' },
    ]},
    { title: 'Needs attention', count: 1, kind: 'error', channels: [
      { id: 'H', sub: 'Invalid room mapping', state: 'error' },
    ]},
    { title: 'Available to connect', count: 3, kind: 'inactive', channels: [
      { id: 'C', sub: 'Vacation rentals' },
      { id: 'D', sub: 'Search metasearch' },
      { id: 'G', sub: 'Hostel & budget' },
    ]},
  ];

  return (
    <Shell active="gear">
      <div style={{ padding: '28px 32px 18px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Channels</h1>
      </div>

      <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: 22, overflow: 'auto' }}>
        {sections.map(sec => (
          <div key={sec.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%',
                background: sec.kind === 'active' ? TOKENS.green : sec.kind === 'error' ? TOKENS.red : '#C9D2DC' }} />
              <div style={{ fontWeight: 700, fontSize: 15 }}>{sec.title}</div>
              <div style={{ color: TOKENS.mute, fontSize: 13 }}>· {sec.count}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {sec.channels.map(c => (
                <Card key={c.id} pad={16} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <ChannelName id={c.id} />
                    {c.state === 'syncing' && <Chip kind="syncing">Syncing</Chip>}
                    {c.state === 'error' && <Chip kind="error">Error</Chip>}
                  </div>
                  <div style={{ color: TOKENS.mute, fontSize: 13 }}>{c.sub}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    {sec.kind === 'inactive' ? (
                      <NavyButton size="sm">Add new</NavyButton>
                    ) : (
                      <>
                        <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Configure</button>
                        {sec.kind === 'error' && <button style={{ background: TOKENS.red, color: 'white', border: 'none', padding: '7px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Fix now</button>}
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
};

Object.assign(window, { CMV1_Table, CMV2_Health, CMV3_Detail, CMV4_Grouped });
