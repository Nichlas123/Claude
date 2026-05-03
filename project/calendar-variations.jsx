// Calendar / Front Desk — 4 variations
// V1: Inspector panel (timeline + right-side booking details)
// V2: Occupancy heatmap (month overview, density by day)
// V3: Kanban by status (Arriving / In-house / Departing)
// V4: Flipped axis — days vertical, rooms horizontal (good for many rooms in single day planning)

const ROOM_TYPES = ['Single', 'Double', 'Queen', 'King', 'Deluxe', 'Twin'];
const DAYS = ['MON 11', 'TUE 12', 'WED 13', 'THU 14', 'FRI 15', 'SAT 16', 'SUN 17', 'MON 18', 'TUE 19'];

// Bar colors match screenshot palette
const BAR = {
  teal: { bg: TOKENS.teal, fg: 'white' },
  tealSoft: { bg: TOKENS.tealSoft, fg: TOKENS.navy },
  amber: { bg: TOKENS.amber, fg: TOKENS.navy },
  sand: { bg: '#E9DCB8', fg: TOKENS.navy },
};

// ---------- V1: Timeline + inspector ----------
const CalV1_Inspector = () => {
  // Reservations: {row, start (0-based day), length, name, color}
  const rez = [
    { row: 0, s: 1, l: 1, name: 'Emma Collins', c: 'tealSoft' },
    { row: 0, s: 3, l: 1, name: 'Noah Adams', c: 'teal', selected: true },
    { row: 0, s: 5, l: 1, name: 'Sophia Turner', c: 'amber' },
    { row: 1, s: 1, l: 1, name: 'James Campbell', c: 'tealSoft' },
    { row: 1, s: 3, l: 2, name: 'Mason Brooks', c: 'teal' },
    { row: 2, s: 2, l: 1, name: 'Mason Brooks', c: 'tealSoft' },
    { row: 2, s: 5, l: 2, name: 'Ethan Cooper', c: 'amber' },
    { row: 3, s: 3, l: 1, name: 'Jason B.', c: 'teal' },
    { row: 3, s: 4, l: 1, name: 'Ava Mitchell', c: 'teal' },
    { row: 3, s: 7, l: 1, name: 'Michelle T.', c: 'amber' },
    { row: 4, s: 1, l: 2, name: 'James Brook', c: 'tealSoft' },
    { row: 5, s: 1, l: 1, name: 'Paul Wild', c: 'tealSoft' },
    { row: 5, s: 3, l: 3, name: 'Anna Paul', c: 'teal' },
  ];

  const dayW = 92;
  const rowH = 70;
  const labelW = 150;

  return (
    <Shell active="calendar">
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 0 24px 28px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 18px' }}>Calendar</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            {['dchevL','chevL'].map((n, i) => (
              <button key={i} style={{ width: 34, height: 34, background: 'white', border: `1px solid ${TOKENS.line}`, borderRadius: 6, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name={n} size={14} /></button>
            ))}
            <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '8px 12px', borderRadius: 6, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bookmark" size={13} /> Today
            </button>
            {['chevR','dchevR'].map((n, i) => (
              <button key={i} style={{ width: 34, height: 34, background: 'white', border: `1px solid ${TOKENS.line}`, borderRadius: 6, display: 'grid', placeItems: 'center' }}><Icon name={n} size={14} /></button>
            ))}
            <div style={{ marginLeft: 8, background: 'white', border: `1px solid ${TOKENS.line}`, borderRadius: 6, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 32, fontSize: 13, color: TOKENS.mute, minWidth: 180 }}>
              Select <Icon name="calendar" size={14} />
            </div>
            <div style={{ marginLeft: 'auto', marginRight: 24, display: 'flex', gap: 6 }}>
              {['Day','Week','Month'].map((t, i) => (
                <button key={t} style={{ background: i === 1 ? TOKENS.navy : 'white', color: i === 1 ? 'white' : TOKENS.text, border: `1px solid ${i === 1 ? TOKENS.navy : TOKENS.line}`, padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingRight: 8 }}>
            <div style={{ display: 'flex', borderBottom: `1px solid ${TOKENS.line}`, paddingBottom: 10 }}>
              <div style={{ width: labelW, fontSize: 11, fontWeight: 700, color: TOKENS.mute, letterSpacing: 0.6, textTransform: 'uppercase' }}>All room types</div>
              {DAYS.slice(0, 8).map((d, i) => {
                const [dow, num] = d.split(' ');
                const isToday = i === 3;
                const isWeekend = i === 5 || i === 6;
                return (
                  <div key={d} style={{ width: dayW, textAlign: 'center', background: isToday ? '#EAF3EE' : isWeekend ? '#F5F9FD' : 'transparent', padding: '4px 0' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: TOKENS.mute, letterSpacing: 0.6 }}>{dow}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, color: isToday ? TOKENS.green : TOKENS.text }}>{num} OCT</div>
                  </div>
                );
              })}
            </div>

            {ROOM_TYPES.map((r, ri) => (
              <div key={r} style={{ display: 'flex', height: rowH, borderBottom: `1px solid ${TOKENS.line}`, position: 'relative' }}>
                <div style={{ width: labelW, display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: 14 }}>{r} room</div>
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} style={{
                    width: dayW, borderLeft: `1px solid ${TOKENS.line}`,
                    background: i === 3 ? 'rgba(31,191,122,0.06)' : i >= 5 && i <= 6 ? '#F5F9FD' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: TOKENS.mute, fontSize: 13,
                  }}>
                    {/* Count shown when no bar overlaps entire cell — keep simple */}
                    {i === 0 ? '1' : ''}
                  </div>
                ))}
                {rez.filter(x => x.row === ri).map((x, i) => {
                  const bar = BAR[x.c];
                  return (
                    <div key={i} style={{
                      position: 'absolute', left: labelW + x.s * dayW + 6, top: 16,
                      width: x.l * dayW - 12, height: rowH - 32,
                      background: bar.bg, color: bar.fg, borderRadius: 6,
                      display: 'flex', alignItems: 'center', padding: '0 10px',
                      fontWeight: 600, fontSize: 13, boxShadow: x.selected ? `0 0 0 3px ${TOKENS.orange}` : 'none',
                      overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>{x.name}</div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Inspector */}
        <div style={{ width: 340, background: 'white', borderLeft: `1px solid ${TOKENS.line}`, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>Booking · #BR-4481</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>Noah Adams</div>
            </div>
            <Chip kind="ok">Confirmed</Chip>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: TOKENS.mute, fontWeight: 600, marginBottom: 2 }}>CHECK-IN</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Thu 14 Oct</div>
              <div style={{ color: TOKENS.mute, fontSize: 12 }}>15:00</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: TOKENS.mute, fontWeight: 600, marginBottom: 2 }}>CHECK-OUT</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Fri 15 Oct</div>
              <div style={{ color: TOKENS.mute, fontSize: 12 }}>11:00</div>
            </div>
          </div>

          <div style={{ border: `1px solid ${TOKENS.line}`, borderRadius: 10, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}><span style={{ color: TOKENS.mute }}>Room</span><span style={{ fontWeight: 600 }}>Single · 1 night</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}><span style={{ color: TOKENS.mute }}>Guests</span><span style={{ fontWeight: 600 }}>1 adult</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}><span style={{ color: TOKENS.mute }}>Channel</span><span style={{ fontWeight: 600 }}>Skyfare</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0', borderTop: `1px solid ${TOKENS.line}`, marginTop: 8, paddingTop: 10 }}><span style={{ color: TOKENS.mute }}>Total</span><span style={{ fontWeight: 800 }}>€148.00</span></div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <NavyButton icon="check" style={{ flex: 1, justifyContent: 'center' }}>Check in</NavyButton>
            <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>Message</button>
          </div>

          <div style={{ borderTop: `1px solid ${TOKENS.line}`, paddingTop: 14 }}>
            <div style={{ fontSize: 11, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Activity</div>
            {[
              { when: '2m ago', msg: 'Booking received from Skyfare', dot: TOKENS.blue },
              { when: '1h ago', msg: 'Payment captured · €148.00', dot: TOKENS.green },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 0', alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{a.msg}</div>
                  <div style={{ fontSize: 11, color: TOKENS.mute }}>{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ---------- V2: Occupancy heatmap (month) ----------
const CalV2_Heatmap = () => {
  // 35-day grid (5 weeks × 7)
  const rng = (seed) => { let s = seed; return () => (s = (s*9301+49297)%233280) / 233280; };
  const r = rng(7);
  const days = Array.from({ length: 35 }, (_, i) => {
    const v = r();
    return { dayNum: ((i + 2) % 31) + 1, occ: Math.floor(v * 100), weekend: i % 7 >= 5 };
  });
  const occColor = (n) => {
    if (n < 25) return '#EAF6F0';
    if (n < 50) return '#C8E8D4';
    if (n < 75) return TOKENS.tealSoft;
    if (n < 90) return TOKENS.teal;
    return TOKENS.orange;
  };
  const occFg = (n) => n >= 75 ? 'white' : TOKENS.text;

  return (
    <Shell active="calendar">
      <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>October 2025</h1>
            <div style={{ color: TOKENS.mute, fontSize: 14, marginTop: 4 }}>Monthly occupancy · all room types</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: TOKENS.mute }}>
              <span>Low</span>
              {[0, 30, 55, 80, 95].map(v => (
                <div key={v} style={{ width: 22, height: 14, background: occColor(v), borderRadius: 3 }} />
              ))}
              <span>Full</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
              {['Day','Week','Month'].map((t, i) => (
                <button key={t} style={{ background: i === 2 ? TOKENS.navy : 'white', color: i === 2 ? 'white' : TOKENS.text, border: `1px solid ${i === 2 ? TOKENS.navy : TOKENS.line}`, padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <Card style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
            {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
              <div key={d} style={{ fontSize: 11, fontWeight: 700, color: TOKENS.mute, letterSpacing: 0.6, textAlign: 'center' }}>{d}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', gap: 6 }}>
            {days.map((d, i) => (
              <div key={i} style={{
                background: occColor(d.occ), borderRadius: 8, padding: 10,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                color: occFg(d.occ), position: 'relative',
                border: i === 12 ? `2px solid ${TOKENS.orange}` : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{d.dayNum}</span>
                  {d.weekend && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.4, opacity: 0.65 }}>WKND</span>}
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 }}>{d.occ}%</div>
                  <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.75, marginTop: 2 }}>{Math.floor(d.occ * 0.24)} / 24 rooms</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
};

// ---------- V3: Kanban by status ----------
const CalV3_Kanban = () => {
  const cols = [
    { title: 'Arriving today', count: 5, kind: 'info', items: [
      { name: 'Noah Adams', room: 'Single', time: '15:00', chan: 'B', price: '€148' },
      { name: 'Ethan Cooper', room: 'Queen', time: '16:30', chan: 'A', price: '€612' },
      { name: 'Michelle Tan', room: 'King', time: '17:00', chan: 'C', price: '€198' },
      { name: 'Sophia Turner', room: 'Single', time: '21:30', chan: 'B', price: '€148' },
      { name: 'Walk-in TBD', room: '—', time: '—', chan: null, price: '—', ghost: true },
    ]},
    { title: 'In-house', count: 8, kind: 'active', items: [
      { name: 'Emma Collins', room: 'Single', nights: '2 of 3', chan: 'A', price: '€444' },
      { name: 'James Campbell', room: 'Double', nights: '1 of 2', chan: 'A', price: '€320' },
      { name: 'Mason Brooks', room: 'Queen', nights: '3 of 4', chan: 'F', price: '€724' },
      { name: 'Paul Wild', room: 'Twin', nights: '2 of 3', chan: 'B', price: '€380' },
    ]},
    { title: 'Departing today', count: 3, kind: 'warn', items: [
      { name: 'Ava Mitchell', room: 'King', time: '11:00', chan: 'A', price: '€396' },
      { name: 'James Brook', room: 'Deluxe', time: '12:00', chan: 'F', price: '€512' },
      { name: 'Anna Paul', room: 'Twin', time: '10:00', chan: 'B', price: '€380' },
    ]},
  ];

  const Dot = ({ kind }) => (
    <span style={{ width: 8, height: 8, borderRadius: '50%',
      background: kind === 'info' ? TOKENS.blue : kind === 'active' ? TOKENS.green : TOKENS.amber,
      display: 'inline-block' }} />
  );

  return (
    <Shell active="calendar">
      <div style={{ padding: '24px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Today · Thu 14 Oct</h1>
          <div style={{ color: TOKENS.mute, fontSize: 13, marginTop: 4 }}>16 bookings · 71% occupancy</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Timeline','Kanban','List'].map((t, i) => (
            <button key={t} style={{ background: i === 1 ? TOKENS.navy : 'white', color: i === 1 ? 'white' : TOKENS.text, border: `1px solid ${i === 1 ? TOKENS.navy : TOKENS.line}`, padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600 }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 28px 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, flex: 1, overflow: 'hidden' }}>
        {cols.map(col => (
          <div key={col.title} style={{ background: '#F6FAFD', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Dot kind={col.kind} />
                <span style={{ fontWeight: 700, fontSize: 14 }}>{col.title}</span>
                <span style={{ color: TOKENS.mute, fontSize: 13 }}>· {col.count}</span>
              </div>
              <Icon name="plus" size={16} color={TOKENS.mute} />
            </div>
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map((x, i) => x.ghost ? (
                <div key={i} style={{ border: `1.5px dashed ${TOKENS.line}`, borderRadius: 10, padding: '16px 14px', color: TOKENS.mute, fontSize: 13, textAlign: 'center', fontWeight: 600 }}>
                  + Add walk-in
                </div>
              ) : (
                <Card key={i} pad={14} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{x.name}</div>
                    {x.chan && <ChannelMark id={x.chan} size={18} />}
                  </div>
                  <div style={{ color: TOKENS.mute, fontSize: 12 }}>{x.room} room{x.time ? ` · arrival ${x.time}` : ''}{x.nights ? ` · night ${x.nights}` : ''}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{x.price}</span>
                    <span style={{ fontSize: 11, color: col.kind === 'info' ? TOKENS.blue : col.kind === 'active' ? TOKENS.green : '#8A5A00', fontWeight: 600 }}>
                      {col.kind === 'info' ? 'Check in →' : col.kind === 'active' ? 'View' : 'Check out →'}
                    </span>
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

// ---------- V4: Flipped axis (days as rows, rooms as columns) ----------
const CalV4_Flipped = () => {
  // Individual rooms (not types) — useful for single-property day planning.
  const rooms = ['101','102','201','202','203','301','302','401','402'];
  const days = [
    { dow: 'MON', n: 11 },
    { dow: 'TUE', n: 12 },
    { dow: 'WED', n: 13 },
    { dow: 'THU', n: 14, today: true },
    { dow: 'FRI', n: 15 },
    { dow: 'SAT', n: 16, wknd: true },
    { dow: 'SUN', n: 17, wknd: true },
  ];
  // Cell contents: 'teal' | 'amber' | 'tealSoft' | null
  const grid = [
    ['teal','teal','tealSoft',null,'amber','amber','amber'],
    [null,'tealSoft','tealSoft','tealSoft',null,'teal','teal'],
    ['teal',null,null,'amber','amber',null,null],
    ['tealSoft','tealSoft',null,'teal','teal','teal',null],
    [null,null,'amber','amber',null,'tealSoft','tealSoft'],
    ['teal','teal',null,null,'tealSoft',null,'amber'],
    [null,'tealSoft','tealSoft',null,'teal','teal',null],
    ['amber',null,null,'tealSoft','tealSoft',null,null],
    [null,null,'teal','teal','teal',null,'amber'],
  ];
  const guests = {
    '0,0': 'Emma', '0,1': 'Emma', '0,2': 'Emma', '0,4': 'Noah', '0,5':'Noah','0,6':'Noah',
    '1,1': 'James','1,2':'James','1,3':'James','1,5':'Mason','1,6':'Mason',
    '2,0': 'Sara','2,3':'Jason','2,4':'Jason',
    '3,0':'Paul','3,1':'Paul','3,3':'Ava','3,4':'Ava','3,5':'Ava',
    '4,2':'Lena','4,3':'Lena','4,5':'Owen','4,6':'Owen',
    '5,0':'Ivy','5,1':'Ivy','5,4':'Rafa','5,6':'Beth',
    '6,1':'Max','6,2':'Max','6,4':'Liam','6,5':'Liam',
    '7,0':'Nina','7,3':'Zoe','7,4':'Zoe',
    '8,2':'Kai','8,3':'Kai','8,4':'Kai','8,6':'Jude',
  };

  const cellH = 74;

  return (
    <Shell active="calendar">
      <div style={{ padding: '24px 28px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0 }}>Rooms · 9 units</h1>
          <div style={{ color: TOKENS.mute, fontSize: 13, marginTop: 4 }}>Week of 11 Oct — flipped layout</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ background: 'white', border: `1px solid ${TOKENS.line}`, padding: '8px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Icon name="filter" size={13} /> All types
          </button>
          <NavyButton size="sm">New booking</NavyButton>
        </div>
      </div>

      <div style={{ padding: '0 28px 28px', flex: 1, overflow: 'hidden' }}>
        <Card pad={0} style={{ height: '100%', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `100px repeat(${rooms.length}, 1fr)`, borderBottom: `1px solid ${TOKENS.line}` }}>
            <div style={{ padding: 14, fontSize: 11, fontWeight: 700, color: TOKENS.mute, letterSpacing: 0.6 }}>DAY</div>
            {rooms.map(r => (
              <div key={r} style={{ padding: '14px 8px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: TOKENS.text, borderLeft: `1px solid ${TOKENS.line}` }}>
                <div style={{ fontSize: 10, color: TOKENS.mute, fontWeight: 700, letterSpacing: 0.4 }}>ROOM</div>
                {r}
              </div>
            ))}
          </div>

          {days.map((d, di) => (
            <div key={d.n} style={{
              display: 'grid', gridTemplateColumns: `100px repeat(${rooms.length}, 1fr)`,
              borderBottom: di < days.length - 1 ? `1px solid ${TOKENS.line}` : 'none',
              height: cellH,
              background: d.today ? 'rgba(31,191,122,0.05)' : d.wknd ? '#F5F9FD' : 'white',
            }}>
              <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: `1px solid ${TOKENS.line}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: d.today ? TOKENS.green : TOKENS.mute, letterSpacing: 0.6 }}>{d.dow}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: d.today ? TOKENS.green : TOKENS.text }}>{d.n} OCT</div>
              </div>
              {rooms.map((_, ri) => {
                const c = grid[ri][di];
                const name = guests[`${ri},${di}`];
                const bar = c ? BAR[c] : null;
                return (
                  <div key={ri} style={{ borderLeft: `1px solid ${TOKENS.line}`, padding: 6, position: 'relative' }}>
                    {bar && (
                      <div style={{
                        position: 'absolute', inset: 6, borderRadius: 6,
                        background: bar.bg, color: bar.fg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 600, fontSize: 12, padding: '0 6px',
                        overflow: 'hidden', whiteSpace: 'nowrap',
                      }}>{name || ''}</div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
};

Object.assign(window, { CalV1_Inspector, CalV2_Heatmap, CalV3_Kanban, CalV4_Flipped });
