import { Fragment, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronRight, RotateCcw, HelpCircle, GripVertical, X } from 'lucide-react';
import type { Listing, PbqListings, SimProps } from '../data/pbqTypes';

type Server = PbqListings['servers'][number];

interface Answer {
  scan: string;
  fp: string[];
  server: string | null;
}

interface SummaryRow {
  label: string;
  mine: string;
  correct: string;
  ok: boolean;
}

// Same palette as PbqSim / PbqStepSim
const C = {
  tableHead: '#6f8fd6',
  panelBg: '#e8e8e8',
  tabIdle: '#c9c9c9',
  tabIdleText: '#f4f4f4',
  tabActiveText: '#2f5fb3',
  btn: '#4a4a4a',
  yellow: '#e3c43a',
};
const GREEN = '#22a24b';
const RED = '#d33';
const GREEN_BG = '#e3f6e8';
const RED_BG = '#fde4e4';

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);
const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));

// Border + background for a correct / wrong answer
const resultStyle = (ok: boolean) => ({
  borderColor: ok ? GREEN : RED,
  background: ok ? GREEN_BG : RED_BG,
});

/* ---------------------------------------------------------------------------
   Network diagram (inline SVG). Positions live in the arrays below so the
   component itself stays short.
--------------------------------------------------------------------------- */

const ZONES: [number, number, number, number, string, string][] = [ // x, y, w, h, fill, stroke
  [300, 52, 300, 170, '#c9e4fb', '#4a9ee0'],
  [735, 52, 250, 170, '#e8f3c9', '#a5c93b'],
  [745, 330, 245, 165, '#d3f0fa', '#5bc0de'],
];
const BOXES: [number, number, number, number, string][] = [ // white boxes around single servers: x, y, w, h, stroke
  [468, 68, 122, 142, '#4a9ee0'],
  [760, 76, 88, 124, '#a5c93b'],
  [862, 76, 112, 124, '#a5c93b'],
];
const PATHS = [
  'M54 395 V128 H66', 'M150 128 H196', 'M54 428 H236', 'M312 428 H460',
  'M385 128 H440 V262', 'M445 128 H478', 'M440 304 V335 H500 V372',
  'M556 400 H620 V304', 'M680 283 H718', 'M718 128 V428', 'M680 128 H718',
  'M718 128 H760', 'M844 128 H862', 'M680 428 H718 M718 428 H770',
];
const SERVERS: [number, number][] = [[66, 96], [196, 96], [310, 96], [486, 118], [762, 100], [874, 100]];
const SWITCHES: [number, number][] = [[642, 106], [402, 262], [602, 262], [642, 406]];
const LABELS: [number, number, string, number?][] = [ // x, y, text, fontSize (default 15)
  [450, 45, 'DMZ'], [108, 68, 'Anonymizing'], [108, 85, 'Proxy'],
  [238, 68, 'External'], [238, 85, 'Host'], [352, 82, 'Mail Proxy'],
  [529, 88, 'Linux'], [529, 105, 'Web Server'], [680, 92, 'Server VLAN'],
  [620, 132, 'Switch', 14], [804, 92, 'Directory'], [804, 184, 'Server'],
  [918, 92, 'File/Print'], [918, 184, 'Server'], [372, 290, 'Switch', 14],
  [572, 290, 'Switch', 14], [620, 432, 'Switch', 14], [680, 470, 'User VLAN'],
  [508, 506, 'Firewall'], [48, 456, 'Internet'], [274, 456, 'Router'],
];

function ServerIcon({
  x,
  y,
  w = 84,
  h = 62,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#2d4f6e" />
      <circle cx={x + 10} cy={y + h * 0.3} r="3" fill="#b9e36b" />
      <circle cx={x + 10} cy={y + h * 0.7} r="3" fill="#b9e36b" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={x + w * 0.5 + i * (w * 0.15)} y={y + 8} width={w * 0.11} height={h - 16} fill="#2fb39a" />
      ))}
      <line x1={x} y1={y + h / 2} x2={x + w * 0.42} y2={y + h / 2} stroke="#1c364d" strokeWidth="1" />
    </g>
  );
}

function SwitchIcon({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="76" height="14" rx="2" fill="#4a4f57" />
      <rect x={x} y={y + 15} width="76" height="14" rx="2" fill="#3a3e45" />
      <rect x={x} y={y + 30} width="76" height="12" rx="2" fill="#4a4f57" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={x + 8 + i * 11} y={y + 4} width="8" height="6" fill="#9aa0a8" />
      ))}
    </g>
  );
}

function Tower({
  x,
  w,
  top,
  bottom,
}: {
  x: number;
  w: number;
  top: string;
  bottom: string;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect x={x} y="372" width={w} height="88" rx="3" fill="#3a3f46" />
      <rect x={x + 6} y="380" width={w - 12} height="10" fill="#6a7078" />
      <rect x={x + 6} y="396" width={w - 12} height="10" fill="#6a7078" />
      <circle cx={cx} cy="440" r="4" fill="#9ad65a" />
      <text x={cx} y="360" style={labelStyle(13)}>{top}</text>
      <text x={cx} y="478" style={labelStyle(13)}>{bottom}</text>
    </g>
  );
}

const labelStyle = (size = 15): CSSProperties => ({
  fontSize: size, fontWeight: 700, fill: '#222', textAnchor: 'middle',
  fontFamily: 'Arial, Helvetica, sans-serif',
});

function NetworkDiagram() {
  return (
    <div className="bg-white border border-gray-400 p-2 overflow-x-auto">
      <svg viewBox="0 0 1030 520" className="w-full min-w-160" role="img" aria-label="Network diagram">
        <text x="12" y="24" style={{ ...labelStyle(17), textAnchor: 'start' }}>Network Diagram</text>

        {ZONES.map(([x, y, w, h, fill, stroke]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth="2" />
        ))}
        {PATHS.map((d) => <path key={d} d={d} stroke="#2a9fc9" strokeWidth="2" fill="none" />)}
        {BOXES.map(([x, y, w, h, stroke]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="#fff" stroke={stroke} strokeWidth="1.5" />
        ))}

        {SERVERS.map(([x, y]) => <ServerIcon key={`${x}-${y}`} x={x} y={y} />)}
        {SWITCHES.map(([x, y]) => <SwitchIcon key={`${x}-${y}`} x={x} y={y} />)}

        {/* Firewall */}
        <rect x="460" y="372" width="96" height="112" fill="#c0392b" stroke="#8e2a1f" />
        {[0, 1, 2, 3, 4].map((r) => (
          <line key={r} x1="460" y1={372 + r * 24} x2="556" y2={372 + r * 24} stroke="#f3c9c3" strokeWidth="2" />
        ))}
        <path d="M508 398 C528 420 536 436 524 456 C520 466 496 466 492 452 C488 440 496 434 500 420 C504 428 512 424 508 398 Z" fill="#ffb02e" stroke="#e67e22" />

        {/* Router + Internet */}
        <path d="M30 420 C18 420 14 404 26 400 C26 386 46 382 54 392 C66 384 84 394 80 408 C94 410 92 428 78 428 H34 C26 428 24 424 30 420 Z" fill="#fff" stroke="#222" strokeWidth="2" />
        <rect x="236" y="418" width="76" height="18" rx="2" fill="#2a3a4d" />
        <line x1="298" y1="418" x2="298" y2="380" stroke="#333" strokeWidth="2" />

        {/* User VLAN devices */}
        <Tower x={772} w={52} top="Windows" bottom="Workstation" />
        <Tower x={944} w={44} top="Linux" bottom="Workstation" />
        <rect x="856" y="392" width="68" height="46" rx="2" fill="#fff" stroke="#222" strokeWidth="3" />
        <rect x="882" y="440" width="16" height="8" fill="#222" />
        <rect x="868" y="448" width="44" height="5" rx="2" fill="#222" />
        <text x="890" y="378" style={labelStyle(13)}>Thin Client</text>

        {LABELS.map(([x, y, text, size]) => (
          <text key={`${x}-${y}`} x={x} y={y} style={labelStyle(size)}>{text}</text>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Small pieces
--------------------------------------------------------------------------- */

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
      ok ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
    }`}>
      {ok ? '✓' : '✗'}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Main component
--------------------------------------------------------------------------- */

export default function PbqDragSim({ pbq, onScore }: SimProps<PbqListings>) {
  const [activeTab, setActiveTab] = useState(pbq.tabs[0].id);
  // answers: { [listingId]: { scan: '', fp: [findingIds], server: serverId|null } }
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null); // click-to-place fallback
  const [dragOver, setDragOver] = useState<string | null>(null);

  const { points, listings, servers } = pbq;
  const maxPoints = listings.length * (points.scan + points.falsePositive + points.server);
  const serverById = (id: string) => servers.find((s) => s.id === id)!;
  const get = (lid: string): Answer => answers[lid] || { scan: '', fp: [], server: null };
  const patch = (lid: string, p: Partial<Answer>) => setAnswers((prev) => ({ ...prev, [lid]: { ...get(lid), ...p } }));
  const placedIds = listings.map((l) => get(l.id).server).filter((s): s is string => Boolean(s));

  // A server can sit in only one listing, so clear it from the others first
  const placeServer = (lid: string, serverId: string | null) => {
    if (submitted || !serverId) return;
    setAnswers((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (next[k]?.server === serverId) next[k] = { ...next[k], server: null };
      });
      next[lid] = { ...(next[lid] || { scan: '', fp: [] }), server: serverId };
      return next;
    });
    setPicked(null);
  };

  // False positives are not evaluated for compliance scans
  const setScan = (lid: string, value: string) =>
    patch(lid, { scan: value, fp: value === 'Compliance' ? [] : get(lid).fp });

  const toggleFp = (lid: string, fid: string) => {
    const cur = get(lid).fp;
    patch(lid, { fp: cur.includes(fid) ? cur.filter((x) => x !== fid) : [...cur, fid] });
  };

  const evaluate = (l: Listing) => {
    const a = get(l.id);
    return {
      scanOk: a.scan === l.correct.scan,
      fpOk: l.correct.scan === 'Compliance'
        ? a.scan === 'Compliance'
        : sameSet(a.fp, l.correct.falsePositives),
      serverOk: a.server === l.correct.server,
    };
  };

  const handleSubmit = () => {
    let total = 0;
    listings.forEach((l) => {
      const r = evaluate(l);
      if (r.scanOk) total += points.scan;
      if (r.fpOk) total += points.falsePositive;
      if (r.serverOk) total += points.server;
    });
    setScore(total);
    onScore && onScore(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setPicked(null);
    setDragOver(null);
  };

  /* ---------- Server chip (a function, not a component, so dragging
     isn't cancelled by re-renders) ---------- */

  const renderServerChip = (server: Server, onRemove?: () => void) => (
    <div
      key={server.id}
      draggable={!submitted}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', server.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragEnd={() => setDragOver(null)}
      onClick={(e) => {
        e.stopPropagation();
        if (onRemove) return;
        if (!submitted) setPicked(picked === server.id ? null : server.id);
      }}
      className={`flex items-center gap-1.5 rounded border px-2 py-1.5 text-sm font-medium select-none ${
        submitted ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
      } ${picked === server.id ? 'ring-2 ring-amber-500' : ''}`}
      style={{ background: '#2d4f6e', color: '#fff', borderColor: '#1c364d' }}
    >
      <GripVertical size={14} className="opacity-70" />
      <span>{server.label}</span>
      {onRemove && !submitted && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-1 opacity-80 hover:opacity-100"
          aria-label={`Remove ${server.label}`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );

  /* ---------- Listing row ---------- */

  const findingStyle = (checked: boolean, isCorrect: boolean): CSSProperties => {
    if (!submitted) return {};
    if (checked) return { ...resultStyle(isCorrect), outline: `2px solid ${isCorrect ? GREEN : RED}` };
    if (isCorrect) return { outline: `2px dashed ${GREEN}` }; // missed false positive
    return {};
  };

  const renderListing = (l: Listing) => {
    const a = get(l.id);
    const r = evaluate(l); // only read when `submitted` is true
    const complianceSelected = a.scan === 'Compliance';
    const server = a.server ? serverById(a.server) : null;
    const correctFpTexts = l.findings.filter((f) => l.correct.falsePositives.includes(f.id)).map((f) => f.text);

    const zoneStyle = submitted
      ? resultStyle(r.serverOk)
      : { borderColor: C.yellow, background: dragOver === l.id ? '#fff8d6' : '#fff' };
    const selectStyle = submitted ? resultStyle(r.scanOk) : { borderColor: C.yellow, background: '#fff' };

    return (
      <div key={l.id} className="grid gap-3 border-b border-gray-300 py-3 last:border-b-0 md:grid-cols-[120px_1fr_190px]">
        {/* Drop zone */}
        <div>
          <div
            onDragOver={(e) => {
              if (submitted) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              if (dragOver !== l.id) setDragOver(l.id);
            }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(null);
              placeServer(l.id, e.dataTransfer.getData('text/plain'));
            }}
            onClick={() => picked && placeServer(l.id, picked)}
            className="flex h-28 items-center justify-center rounded-sm border-2 bg-white p-1.5 transition"
            style={{ ...zoneStyle, cursor: picked ? 'copy' : 'default' }}
          >
            {server
              ? renderServerChip(server, () => patch(l.id, { server: null }))
              : <HelpCircle size={30} style={{ color: C.yellow }} />}
          </div>
          {submitted && !r.serverOk && (
            <p className="mt-1 text-xs text-red-700">Correct: {serverById(l.correct.server).label}</p>
          )}
        </div>

        {/* False positives + findings */}
        <div className="text-sm">
          <div className="mb-1 flex items-center gap-2 text-xs font-bold text-gray-900">
            <span className="w-16">False Positive</span>
            <span>{l.title}</span>
          </div>
          <div className="space-y-1">
            {l.findings.map((f) => {
              const checked = a.fp.includes(f.id);
              const isCorrectFp = l.correct.falsePositives.includes(f.id);
              return (
                <label
                  key={f.id}
                  className={`flex items-start gap-2 rounded px-1 py-0.5 text-gray-800 ${
                    complianceSelected ? 'opacity-70' : submitted ? 'cursor-default' : 'cursor-pointer hover:bg-gray-50'
                  }`}
                  style={findingStyle(checked, isCorrectFp)}
                >
                  <span className="w-16 flex-none">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={complianceSelected || submitted}
                      onChange={() => toggleFp(l.id, f.id)}
                      className="mt-0.5 h-4 w-4 rounded border-gray-400"
                      style={submitted && checked ? { accentColor: isCorrectFp ? GREEN : RED } : undefined}
                    />
                  </span>
                  <span className="leading-snug">{f.text}</span>
                </label>
              );
            })}
          </div>
          {complianceSelected && (
            <p className="mt-1 text-xs italic text-gray-500">False positives are not evaluated for compliance scans.</p>
          )}
          {submitted && !r.fpOk && (
            <p className="mt-1 text-xs text-red-700">
              {correctFpTexts.length
                ? `Correct false positive: ${correctFpTexts.join('; ')}`
                : 'Correct: no false positives for this listing.'}
            </p>
          )}
        </div>

        {/* Results generated */}
        <div>
          <p className="mb-1 text-sm font-bold text-gray-900">Results Generated</p>
          <select
            value={a.scan}
            onChange={(e) => setScan(l.id, e.target.value)}
            disabled={submitted}
            className="w-full rounded-sm border-2 bg-white p-2 text-sm text-gray-900"
            style={selectStyle}
          >
            <option value=""></option>
            {pbq.scanOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          {submitted && !r.scanOk && <p className="mt-1 text-xs text-red-700">Correct: {l.correct.scan}</p>}
        </div>
      </div>
    );
  };

  /* ---------- Tabs ---------- */

  const renderTab = (tab: PbqListings['tabs'][number]) => {
    if (tab.type === 'diagram') return <NetworkDiagram />;
    if (tab.type !== 'listings') return <div className="text-red-600">Unknown tab type: {tab.type}</div>;

    return (
      <div className="bg-white p-3">
        {/* Server tray */}
        <div className="mb-3 rounded border border-dashed border-gray-400 bg-gray-50 p-2">
          <p className="mb-1.5 text-xs font-bold text-gray-700">
            Servers {picked ? '(now click the box beside a listing)' : '(drag onto a listing, or click then click a box)'}
          </p>
          <div className="flex min-h-9 flex-wrap gap-2">
            {servers.filter((s) => !placedIds.includes(s.id)).map((s) => renderServerChip(s))}
            {servers.every((s) => placedIds.includes(s.id)) && (
              <span className="text-xs italic text-gray-500">All servers placed.</span>
            )}
          </div>
        </div>
        {listings.map(renderListing)}
      </div>
    );
  };

  /* ---------- Review: your answers vs correct answers ---------- */

  const summaryRows = (l: Listing): SummaryRow[] => {
    const a = get(l.id);
    const r = evaluate(l);
    const fpText = (ids: string[]) =>
      ids.length ? l.findings.filter((f) => ids.includes(f.id)).map((f) => f.text).join('; ') : 'None';

    return [
      { label: 'Scan Type', mine: a.scan || '(not answered)', correct: l.correct.scan, ok: r.scanOk },
      a.scan !== 'Compliance' && {
        label: 'False Positives', mine: fpText(a.fp), correct: fpText(l.correct.falsePositives), ok: r.fpOk,
      },
      {
        label: 'Server Type',
        mine: a.server ? serverById(a.server).label : '(not answered)',
        correct: serverById(l.correct.server).label,
        ok: r.serverOk,
      },
    ].filter((row): row is SummaryRow => Boolean(row));
  };

 

  const currentTab = pbq.tabs.find((t) => t.id === activeTab);
  const sideScenario = toList(currentTab?.scenario ?? pbq.scenario);
  const sideInstructions = toList(currentTab?.instructions ?? pbq.instructions);
  const cell = 'border-b border-gray-200 px-3 py-2';

  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-500 bg-white">
        <div className="grid gap-4 p-4 md:grid-cols-[270px_1fr]">
          <aside className="space-y-2 text-sm text-gray-800">
            <p className="font-bold">SIMULATION</p>
            {sideScenario.map((p, i) => <p key={i}>{p}</p>)}
            <p className="pt-2 font-bold">INSTRUCTIONS</p>
            {sideInstructions.map((p, i) => <p key={i}>{p}</p>)}
          </aside>

          <section className="rounded" style={{ background: C.panelBg }}>
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <div className="flex">
                {pbq.tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={active
                        ? { background: '#ffffff', color: C.tabActiveText }
                        : { background: C.tabIdle, color: C.tabIdleText }}
                    >
                      {tab.title}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleReset}
                className="mb-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white"
                style={{ background: C.btn }}
              >
                <RotateCcw size={13} /> Reset All Answers
              </button>
            </div>
            <div className="p-3">{currentTab && renderTab(currentTab)}</div>
          </section>
        </div>
      </div>

      {/* Submit + score */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
          style={{ background: C.tableHead }}
        >
          <span>Submit</span>
          <ChevronRight size={18} />
        </button>
        {submitted && (
          <div
            className={`rounded-lg border px-6 py-3 font-semibold ${
              score === maxPoints ? 'border-green-300 bg-green-50 text-green-900' : 'border-yellow-300 bg-yellow-50 text-yellow-900'
            }`}
          >
            Score: {score} / {maxPoints} points
          </div>
        )}
      </div>

      {/* Review */}
      {submitted && pbq.review && (
        <div className="space-y-5 border border-gray-500 bg-white p-5 text-sm">
          <h3 className="text-base font-bold text-gray-900">Explanation &amp; Review</h3>

          {pbq.review.listings.map((l) => (
            <div key={l.title} className="space-y-1 border-l-4 pl-3" style={{ borderColor: C.tableHead }}>
              <p className="font-bold text-gray-900">{l.title}</p>
              <p className="text-gray-700"><strong>Answer:</strong> {l.answer}</p>
              <ul className="list-disc space-y-0.5 pl-5 text-gray-700">
                {l.why.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          ))}

          <div className="overflow-x-auto">
            <p className="mb-3 font-bold text-gray-900">Answer summary - Your answers vs. Correct answers</p>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['Listing', 'Question', 'Your Answer', 'Correct Answer', 'Status'].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.tableHead }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((l) => (
                  <Fragment key={l.id}>
                    {summaryRows(l).map((row, i) => (
                      <tr key={row.label} style={{ background: row.ok ? GREEN_BG : RED_BG }}>
                        <td className={`${cell} font-semibold`}>{i === 0 ? l.title : ''}</td>
                        <td className={`${cell} text-xs font-medium text-gray-600`}>{row.label}</td>
                        <td className={cell}>{row.mine}</td>
                        <td className={`${cell} font-semibold text-gray-900`}>{row.correct}</td>
                        <td className={cell}><StatusBadge ok={row.ok} /></td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border bg-white p-3" style={{ borderColor: C.tableHead }}>
            <p className="mb-2 font-bold text-gray-900">Exam logic</p>
            {pbq.review.logic.map((g) => (
              <div key={g.heading} className="mb-2 last:mb-0">
                <p className="font-semibold text-gray-900">{g.heading}</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {g.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}