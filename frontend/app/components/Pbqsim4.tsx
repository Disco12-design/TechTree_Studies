import { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import type { HardeningDevice, PbqHardening, SimProps } from '../data/pbqTypes';

interface DeviceAnswer {
  role: string;
  ip: string;
  service: string;
}

// Same palette as PbqDragSim / PbqSim / PbqStepSim
const C = {
  tableHead: '#1e3a8a',
  rowAlt: '#eaf0fb',
  panelBg: '#e2e8f0',
  tabIdle: '#cbd5e1',
  tabIdleText: '#1e293b',
  tabActiveText: '#1e3a8a',
  btn: '#334155',
  select: '#2563eb',
};
const GREEN = '#22a24b';
const RED = '#d33';
const GREEN_BG = '#e3f6e8';
const RED_BG = '#fde4e4';

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

/* ---------------------------------------------------------------------------
   Network diagram (inline SVG)
--------------------------------------------------------------------------- */

function NetworkDiagram({ devices }: { devices: HardeningDevice[] }) {
  const line = { stroke: '#2a9fc9', strokeWidth: 2, fill: 'none' };
  const name = { fontSize: 14, fontWeight: 700, fill: '#222', fontFamily: 'Arial, Helvetica, sans-serif' };
  const small = { fontSize: 12, fill: '#555', fontFamily: 'Arial, Helvetica, sans-serif' };
  const center = { textAnchor: 'middle' as const };
  const byId = Object.fromEntries(devices.map(d => [d.id, d.name]));

  const Box = ({
    x,
    y,
    w = 270,
    h = 64,
    id,
  }: {
    x: number;
    y: number;
    w?: number;
    h?: number;
    id: string;
  }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill="#fff" stroke="#9db6e0" strokeWidth="2" />
      <text x={x + 14} y={y + 26} style={name}>Name: {byId[id]}</text>
      <text x={x + 14} y={y + 48} style={small}>Role: ?    Non-Compliant Service: ?</text>
    </g>
  );

  return (
    <div className="overflow-x-auto border border-gray-400 bg-white p-2">
      <svg viewBox="0 0 960 470" className="w-full min-w-[640px]" role="img" aria-label="Network diagram">
        <text x="12" y="22" style={{ ...name, fontSize: 15 }}>The protocols that should be disabled based on the hardening guidelines</text>

        {/* Connections */}
        <path d="M155 104 V150 H805 V104" {...line} />
        <path d="M480 104 V150" {...line} />
        <path d="M480 150 V300" {...line} />
        <path d="M615 322 H632 V215 H775" {...line} />
        <path d="M835 215 H880" {...line} />
        <path d="M805 240 V290" {...line} />
        <path d="M260 332 H345" {...line} />

        {/* DMZ */}
        <rect x="655" y="285" width="290" height="160" fill="#d9ecfb" stroke="#4a9ee0" strokeWidth="2" strokeDasharray="5 4" />
        <text x="670" y="308" style={name}>DMZ</text>

        {/* Devices */}
        <Box x={20} y={40} id="carl" />
        <Box x={345} y={40} id="laura" />
        <Box x={670} y={40} id="sara" />
        <Box x={345} y={300} id="ted" />
        <Box x={668} y={345} w={264} id="mike" />

        {/* Firewall */}
        <rect x="775" y="190" width="60" height="50" fill="#e8891d" stroke="#b86a12" />
        {[0, 1, 2].map(r => (
          <line key={r} x1="775" y1={206 + r * 16} x2="835" y2={206 + r * 16} stroke="#fbe3c2" strokeWidth="2" />
        ))}
        <text x="805" y="256" style={{ ...small, ...center }}>Firewall</text>

        {/* Internet */}
        <path d="M890 225 C878 225 874 209 886 205 C886 191 906 187 914 197 C926 189 944 199 940 213 C954 215 952 233 938 233 H894 C886 233 884 229 890 225 Z" fill="#fff" stroke="#222" strokeWidth="2" />
        <text x="915" y="255" style={{ ...small, ...center }}>Internet</text>

        {/* Console */}
        <rect x="20" y="290" width="240" height="84" fill="#eef5d9" stroke="#c9d8a0" />
        <text x="36" y="316" style={name}>You Are Here</text>
        <rect x="84" y="330" width="110" height="30" rx="3" fill="#2f6fe0" />
        <text x="139" y="350" style={{ ...small, ...center, fill: '#fff', fontWeight: 700 }}>Console</text>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Main component
--------------------------------------------------------------------------- */

export default function PbqHardenSim({ pbq, onScore }: SimProps<PbqHardening>) {
  const [activeTab, setActiveTab] = useState(pbq.tabs[0].id);
  // answers: { [deviceId]: { role: '', ip: '', service: '' } }
  const [answers, setAnswers] = useState<Record<string, DeviceAnswer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { points, devices } = pbq;
  const perDevice = points.role + points.service;
  const maxPoints = devices.length * perDevice;

  const get = (id: string): DeviceAnswer => answers[id] || { role: '', ip: '', service: '' };
  const patch = (id: string, p: Partial<DeviceAnswer>) => setAnswers(prev => ({ ...prev, [id]: { ...get(id), ...p } }));

  const evaluate = (d: HardeningDevice) => {
    const a = get(d.id);
    return { roleOk: a.role === d.correct.role, serviceOk: a.service === d.correct.service };
  };

  const handleSubmit = () => {
    let total = 0;
    devices.forEach(d => {
      const r = evaluate(d);
      if (r.roleOk) total += points.role;
      if (r.serviceOk) total += points.service;
    });
    setScore(total);
    onScore && onScore(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  /* ---------- Device card ---------- */

  const selectStyle = (ok?: boolean) => ({
    borderColor: submitted ? (ok ? GREEN : RED) : C.select,
    background: submitted ? (ok ? GREEN_BG : RED_BG) : '#fff',
  });

  const renderDevice = (d: HardeningDevice) => {
    const a = get(d.id);
    const r = evaluate(d); // only read when `submitted` is true
    return (
      <div key={d.id} className="rounded border-2 bg-white p-3 text-sm" style={{ borderColor: '#9db6e0' }}>
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="font-bold text-gray-900">Name: {d.name}</p>
          {d.zone === 'DMZ' && (
            <span className="rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">DMZ</span>
          )}
        </div>

        <label className="mb-1 block text-xs font-semibold text-gray-700">Role:</label>
        <select
          value={a.role}
          disabled={submitted}
          onChange={(e) => patch(d.id, { role: e.target.value })}
          className="mb-1 w-full rounded-sm border-2 p-2 text-sm text-gray-900"
          style={selectStyle(r?.roleOk)}
        >
          <option value=""></option>
          {pbq.roleOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {submitted && !r.roleOk && <p className="mb-1 text-xs text-red-700">Correct: {d.correct.role}</p>}

        <label className="mb-1 mt-2 block text-xs font-semibold text-gray-700">IP Address (not scored):</label>
        <input
          type="text"
          value={a.ip}
          disabled={submitted}
          onChange={(e) => patch(d.id, { ip: e.target.value })}
          className="mb-1 w-full rounded-sm border border-gray-400 bg-white p-2 text-sm text-gray-900"
        />
        {submitted && <p className="mb-1 text-xs text-gray-600">Reference: {d.correct.ip}</p>}

        <label className="mb-1 mt-2 block text-xs font-semibold text-gray-700">Non-Compliant Service:</label>
        <select
          value={a.service}
          disabled={submitted}
          onChange={(e) => patch(d.id, { service: e.target.value })}
          className="w-full rounded-sm border-2 p-2 text-sm text-gray-900"
          style={selectStyle(r?.serviceOk)}
        >
          <option value=""></option>
          {pbq.serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {submitted && !r.serviceOk && <p className="mt-1 text-xs text-red-700">Correct: {d.correct.service}</p>}
      </div>
    );
  };

  const renderTab = (tab: PbqHardening['tabs'][number]) => {
    if (tab.type === 'diagram') return <NetworkDiagram devices={devices} />;
    if (tab.type === 'form') {
      return <div className="grid gap-3 bg-white p-3 md:grid-cols-2 xl:grid-cols-3">{devices.map(renderDevice)}</div>;
    }
    return <div className="text-red-600">Unknown tab type: {tab.type}</div>;
  };

  const currentTab = pbq.tabs.find(t => t.id === activeTab);

  /* ---------- Layout ---------- */

  const sideScenario = toList(currentTab?.scenario ?? pbq.scenario);
  const sideInstructions = toList(currentTab?.instructions ?? pbq.instructions);

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
                {pbq.tabs.map(tab => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={active ? { background: '#ffffff', color: C.tabActiveText } : { background: C.tabIdle, color: C.tabIdleText }}
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

          {pbq.review.devices.map(rv => {
            const d = devices.find(x => x.id === rv.id)!;
            return (
              <div key={rv.id} className="space-y-1 border-l-4 pl-3" style={{ borderColor: C.tableHead }}>
                <p className="font-bold text-gray-900">{d.name}</p>
                <p className="text-gray-700"><strong>Answer:</strong> {rv.answer}</p>
                <ul className="list-disc space-y-0.5 pl-5 text-gray-700">
                  {rv.why.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            );
          })}

          <div className="overflow-x-auto">
            <p className="mb-2 font-bold text-gray-900">Answer summary</p>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['System', 'Role', 'Non-Compliant Service', 'Your answer'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.tableHead }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devices.map((d, i) => {
                  const a = get(d.id);
                  return (
                    <tr key={d.id} style={{ background: i % 2 === 0 ? '#ffffff' : C.rowAlt }}>
                      <td className="border-b border-gray-300 px-3 py-2">{d.name}</td>
                      <td className="border-b border-gray-300 px-3 py-2">{d.correct.role}</td>
                      <td className="border-b border-gray-300 px-3 py-2">{d.correct.service}</td>
                      <td className="border-b border-gray-300 px-3 py-2">
                        {a.role || '(no role)'} / {a.service || '(no service)'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border bg-white p-3" style={{ borderColor: C.tableHead }}>
            <p className="mb-2 font-bold text-gray-900">Exam logic</p>
            {pbq.review.logic.map(g => (
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