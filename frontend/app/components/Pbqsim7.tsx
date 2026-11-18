import { useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronRight, RotateCcw, X, FileText } from 'lucide-react';
import type { PbqRiskPlan, RiskCategory, RiskFinding, SimProps } from '../data/pbqTypes';

// Same palette as the other simulations
const C = {
  tableHead: '#1e3a8a',
  rowAlt: '#eaf0fb',
  panelBg: '#e2e8f0',
  tabIdle: '#cbd5e1',
  tabIdleText: '#1e293b',
  tabActiveText: '#1e3a8a',
  btn: '#334155',
  blue: '#1e3a8a',
  head2: '#1e40af',
};

// Row colors for the chosen category (matches the exam-style screen)
const CAT_STYLE: Record<string, CSSProperties> = {
  'Low (0-4)': { background: '#19d664', color: '#0b2a17' },
  'Medium (5-9)': { background: '#fff200', color: '#3a3500' },
  'High (10-25)': { background: '#f20c0c', color: '#ffffff' },
};

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

/* ---------------------------------------------------------------------------
   Reference documents
--------------------------------------------------------------------------- */

function DocumentBody({
  doc,
  pbq,
}: {
  doc: { id: string; label: string; type: string };
  pbq: PbqRiskPlan;
}) {
  if (doc.type === 'audit') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {['Risk', 'Description', 'Risk Rating Score'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.head2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pbq.findings.map((f, i) => (
              <tr key={f.id} style={{ background: i % 2 === 0 ? '#eaf0fb' : '#ffffff' }}>
                <td className="border-b border-white px-3 py-2 align-top text-gray-800">{f.finding}</td>
                <td className="border-b border-white px-3 py-2 align-top text-gray-700">{f.description}</td>
                <td className="whitespace-nowrap border-b border-white px-3 py-2 align-top text-xs text-gray-700">
                  <p>Likelihood of occurrence: {f.likelihood}</p>
                  <p>Severity of impact: {f.severity}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (doc.type === 'matrix') {
    const cat = (s: number): RiskCategory => (s <= 4 ? 'Low (0-4)' : s <= 9 ? 'Medium (5-9)' : 'High (10-25)');
    const levels = [5, 4, 3, 2, 1];
    return (
      <div className="text-sm text-gray-800">
        <p className="mb-3">Risk rating score = likelihood of occurrence x severity of impact (each rated 1 to 5).</p>
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1 text-center">
            <thead>
              <tr>
                <th className="px-2 py-1 text-xs text-gray-600">Likelihood \ Severity</th>
                {[1, 2, 3, 4, 5].map(s => <th key={s} className="px-3 py-1 text-xs font-bold">{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {levels.map(l => (
                <tr key={l}>
                  <th className="px-2 py-1 text-xs font-bold">{l}</th>
                  {[1, 2, 3, 4, 5].map(s => (
                    <td key={s} className="h-9 w-12 rounded font-semibold" style={CAT_STYLE[cat(l * s)]}>{l * s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs">
          {pbq.categories.map(c => (
            <span key={c} className="rounded px-2 py-1 font-semibold" style={CAT_STYLE[c]}>{c}</span>
          ))}
        </div>
      </div>
    );
  }

  if (doc.type === 'sla') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              {['Risk category', 'Remediation timeframe', 'Expectation'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.head2 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pbq.sla.map((r, i) => (
              <tr key={r.category} style={{ background: i % 2 === 0 ? '#eaf0fb' : '#ffffff' }}>
                <td className="border-b border-white px-3 py-2 align-top">
                  <span className="rounded px-2 py-0.5 text-xs font-semibold" style={CAT_STYLE[r.category]}>{r.category}</span>
                </td>
                <td className="whitespace-nowrap border-b border-white px-3 py-2 align-top text-gray-800">{r.timeframe}</td>
                <td className="border-b border-white px-3 py-2 align-top text-gray-700">{r.expectation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <p className="text-red-600">Unknown document type: {doc.type}</p>;
}

/* ---------------------------------------------------------------------------
   Main component
--------------------------------------------------------------------------- */

export default function PbqRiskSim({ pbq, onScore }: SimProps<PbqRiskPlan>) {
  const [activeTab, setActiveTab] = useState('risk');
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const [priority, setPriority] = useState<Record<string, string>>({}); // { [findingId]: priority }
  const [category, setCategory] = useState<Record<string, string>>({}); // { [findingId]: string }
  const [controls, setControls] = useState<Record<string, string[]>>({}); // { [findingId]: [c1, c2, c3] }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { findings, points } = pbq;
  const perFinding = points.priority + points.category + points.controls;
  const maxPoints = findings.length * perFinding;
  const doc = pbq.documents.find(d => d.id === openDoc);

  const priorityOk = (f: RiskFinding) => Number(priority[f.id]) === f.correctPriority;
  const categoryOk = (f: RiskFinding) => category[f.id] === f.correctCategory;
  const selectedControls = (f: RiskFinding) => [...new Set((controls[f.id] || []).filter(Boolean))];
  const controlsOk = (f: RiskFinding) => {
    const required = f.required || [];
    const optional = f.optional || [];
    const sel = selectedControls(f);
    const allowed = [...required, ...optional];
    return required.every(r => sel.includes(r)) && sel.every(s => allowed.includes(s));
  };

  const setControl = (fid: string, slot: number, value: string) =>
    setControls(prev => {
      const row = [...(prev[fid] || ['', '', ''])];
      row[slot] = value;
      return { ...prev, [fid]: row };
    });

  const handleSubmit = () => {
    let total = 0;
    findings.forEach(f => {
      if (priorityOk(f)) total += points.priority;
      if (categoryOk(f)) total += points.category;
      if (controlsOk(f)) total += points.controls;
    });
    setScore(total);
    onScore && onScore(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setPriority({});
    setCategory({});
    setControls({});
    setSubmitted(false);
    setScore(0);
    setOpenDoc(null);
  };

  const fieldStyle = (ok: boolean, value?: string) => {
    if (submitted) return ok ? 'border-green-600 bg-green-50 text-gray-900' : 'border-red-600 bg-red-50 text-gray-900';
    return value ? 'border-blue-600 bg-blue-100 text-gray-900' : 'border-gray-300 bg-white text-gray-900';
  };

  /* ---------- Tabs ---------- */

  const renderRiskTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-1 text-sm">
        <thead>
          <tr>
            <th className="w-28 px-2 py-2 text-left text-xs font-bold text-white" style={{ background: C.head2 }}>Risk prioritization</th>
            <th className="px-3 py-2 text-left font-bold text-white" style={{ background: C.head2 }}>Risk finding</th>
            <th className="w-44 px-2 py-2 text-left text-xs font-bold text-white" style={{ background: C.head2 }}>Risk categorization</th>
          </tr>
        </thead>
        <tbody>
          {findings.map(f => {
            const rowStyle = CAT_STYLE[category[f.id]] || { background: '#eaf0fb', color: '#1f2937' };
            return (
              <tr key={f.id} style={rowStyle}>
                <td className="px-2 py-2 align-top">
                  <select
                    value={priority[f.id] || ''}
                    onChange={(e) => setPriority(p => ({ ...p, [f.id]: e.target.value }))}
                    disabled={submitted}
                    aria-label={`Priority for: ${f.finding}`}
                    className={`w-full rounded border p-1.5 ${fieldStyle(priorityOk(f), priority[f.id])}`}
                  >
                    <option value="">Select</option>
                    {pbq.priorities.map(n => (
                      <option key={n} value={n} disabled={Object.entries(priority).some(([k, v]) => k !== f.id && Number(v) === n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {submitted && !priorityOk(f) && (
                    <p className="mt-1 rounded bg-white/90 px-1 text-xs text-red-700">Correct: {f.correctPriority}</p>
                  )}
                </td>
                <td className="px-3 py-2 align-top">{f.finding}</td>
                <td className="px-2 py-2 align-top">
                  <select
                    value={category[f.id] || ''}
                    onChange={(e) => setCategory(c => ({ ...c, [f.id]: e.target.value }))}
                    disabled={submitted}
                    aria-label={`Categorization for: ${f.finding}`}
                    className={`w-full rounded border p-1.5 ${fieldStyle(categoryOk(f), category[f.id])}`}
                  >
                    <option value="">Select</option>
                    {pbq.categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {submitted && !categoryOk(f) && (
                    <p className="mt-1 rounded bg-white/90 px-1 text-xs text-red-700">Correct: {f.correctCategory}</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderControlsTab = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-1 text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left font-bold text-white" style={{ background: C.head2 }}>Risk finding</th>
            <th colSpan={3} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.head2 }}>
              Control(s) to implement
            </th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f, i) => {
            const row = controls[f.id] || ['', '', ''];
            const ok = controlsOk(f);
            const optional = f.optional || [];
            return (
              <tr key={f.id} style={{ background: i % 2 === 0 ? '#eaf0fb' : '#ffffff' }}>
                <td className="w-2/5 px-3 py-2 align-top text-gray-800">
                  {f.finding}
                  {submitted && (
                    <span className={`mt-1 block text-xs font-semibold ${ok ? 'text-green-700' : 'text-red-700'}`}>
                      {ok ? 'Correct' : `Expected: ${[...(f.required || []), ...optional.map(o => o + ' (optional)')].join('; ')}`}
                    </span>
                  )}
                </td>
                {[0, 1, 2].map(slot => (
                  <td key={slot} className="px-1 py-2 align-top">
                    <select
                      value={row[slot] || ''}
                      onChange={(e) => setControl(f.id, slot, e.target.value)}
                      disabled={submitted}
                      aria-label={`Control ${slot + 1} for: ${f.finding}`}
                      className={`w-full rounded border p-1.5 ${fieldStyle(ok, row[slot])}`}
                    >
                      <option value="">Select control</option>
                      {pbq.controls.map(c => (
                        <option key={c} value={c} disabled={row.some((r, j) => j !== slot && r === c)}>{c}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  /* ---------- Layout ---------- */

  const tabs = [
    { id: 'risk', title: 'Risk categorization' },
    { id: 'controls', title: 'Controls' },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-500 bg-white">
        <div className="grid gap-4 p-4 md:grid-cols-[270px_1fr]">
          <aside className="space-y-2 text-sm text-gray-800">
            <p className="font-bold">SIMULATION</p>
            {toList(pbq.scenario).map((p, i) => <p key={i}>{p}</p>)}
            <p className="pt-2 font-bold">INSTRUCTIONS</p>
            {toList(pbq.instructions).map((p, i) => <p key={i}>{p}</p>)}
          </aside>

          <section className="rounded" style={{ background: C.panelBg }}>
            {/* Tabs + reset */}
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <div className="flex">
                {tabs.map(t => {
                  const active = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={active ? { background: '#ffffff', color: C.tabActiveText } : { background: C.tabIdle, color: C.tabIdleText }}
                    >
                      {t.title}
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

            <div className="space-y-3 p-3">
              {/* Reference documents */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-600">Documents:</span>
                {pbq.documents.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setOpenDoc(openDoc === d.id ? null : d.id)}
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                      openDoc === d.id ? 'text-white' : 'bg-white text-gray-800 hover:bg-gray-50'
                    }`}
                    style={openDoc === d.id ? { background: C.blue, borderColor: C.blue } : { borderColor: '#9ca3af' }}
                  >
                    <FileText size={13} /> {d.label}
                  </button>
                ))}
              </div>

              {doc && (
                <div className="overflow-hidden bg-white" style={{ border: `2px solid ${C.blue}` }}>
                  <div className="flex items-center justify-between px-4 py-2 font-medium text-white" style={{ background: C.blue }}>
                    <span>{doc.label}</span>
                    <button
                      onClick={() => setOpenDoc(null)}
                      className="rounded border border-white p-0.5 hover:bg-white/20"
                      aria-label="Close document"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-4">
                    <DocumentBody doc={doc} pbq={pbq} />
                  </div>
                </div>
              )}

              <div className="bg-white p-3">
                {activeTab === 'risk' ? renderRiskTab() : renderControlsTab()}
              </div>
            </div>
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
      {submitted && (
        <div className="space-y-5 border border-gray-500 bg-white p-5 text-sm">
          <h3 className="text-base font-bold text-gray-900">Explanation &amp; Review</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['Risk finding', 'Score', 'Category', 'Priority', 'Control(s)', 'Why'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.tableHead }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {findings.map((f, i) => (
                  <tr key={f.id} style={{ background: i % 2 === 0 ? '#ffffff' : C.rowAlt }}>
                    <td className="border-b border-gray-300 px-3 py-2 align-top text-gray-800">{f.finding}</td>
                    <td className="whitespace-nowrap border-b border-gray-300 px-3 py-2 align-top">
                      {f.likelihood} x {f.severity} = <strong>{f.score}</strong>
                    </td>
                    <td className="whitespace-nowrap border-b border-gray-300 px-3 py-2 align-top">
                      <span className="rounded px-2 py-0.5 text-xs font-semibold" style={CAT_STYLE[f.correctCategory]}>{f.correctCategory}</span>
                    </td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top font-semibold">{f.correctPriority}</td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top">
                      {(f.required || []).join(', ')}
                      {(f.optional || []).length > 0 && (
                        <span className="block text-xs text-gray-500">Also accepted: {f.optional.join(', ')}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top text-gray-700">{f.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border bg-white p-3" style={{ borderColor: C.tableHead }}>
            <p className="mb-1 font-bold text-gray-900">Exam tips</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-700">
              {pbq.review.tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}