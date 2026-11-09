'use client';

import { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';

// Same palette as PbqSim so both simulations look alike
const C = {
  tableHead: '#6f8fd6',
  rowAlt: '#cfdcf5',
  panelBg: '#e8e8e8',
  tabIdle: '#c9c9c9',
  tabIdleText: '#f4f4f4',
  tabActiveText: '#2f5fb3',
  link: '#2f5fb3',
  gridHead: '#bcdcf2',
  btn: '#4a4a4a',
};

type Field = 'validate' | 'remediation';

interface ScanItem {
  title: string;
  description: string;
  asset: string;
  risk: string;
  reference: string;
}

interface ScanSection {
  severity: string;
  color: string;
  items: ScanItem[];
}

interface ScanReportTab {
  id: string;
  title: string;
  type: 'scanReport';
  heading: string;
  sections: ScanSection[];
  scenario?: string | string[];
  instructions?: string | string[];
}

interface MatrixTab {
  id: string;
  title: string;
  type: 'matrix';
  heading: string;
  text: string;
  scenario?: string | string[];
  instructions?: string | string[];
}

interface UnknownTab {
  id: string;
  title: string;
  type: string;
  scenario?: string | string[];
  instructions?: string | string[];
}

type Tab = ScanReportTab | MatrixTab | UnknownTab;

interface MatrixRow {
  id: string;
  system: string;
  correct: Record<Field, string>;
}

interface Matrix {
  points: Record<Field, number>;
  validateOptions: string[];
  remediationOptions: string[];
  rows: MatrixRow[];
}

interface ReviewServer {
  system: string;
  finding: string;
  meaning: string;
  answer: string;
  why: string;
}

interface Review {
  intro?: string;
  servers?: ReviewServer[];
  tips?: string[];
}

export interface PbqStep {
  id: string;
  kind?: string;
  title?: string;
  estimatedMinutes?: number;
  modules?: string[];
  tabs: Tab[];
  matrix: Matrix;
  scenario?: string | string[];
  instructions?: string | string[];
  review?: Review;
}

type Answers = Record<string, Partial<Record<Field, string>>>;

interface PbqStepSimProps {
  pbq: PbqStep;
  onScore?: (id: string, score: number, maxPoints: number) => void;
}

const toList = (v?: string | string[]): string[] =>
  Array.isArray(v) ? v : v ? [v] : [];

export default function PbqStepSim({ pbq, onScore }: PbqStepSimProps) {
  const [activeTab, setActiveTab] = useState(pbq.tabs[0].id);
  const [answers, setAnswers] = useState<Answers>({}); // { [rowId]: { validate, remediation } }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { matrix } = pbq;
  const perRow = matrix.points.validate + matrix.points.remediation;
  const maxPoints = matrix.rows.length * perRow;

  const setField = (rowId: string, field: Field, value: string) =>
    setAnswers(prev => ({ ...prev, [rowId]: { ...prev[rowId], [field]: value } }));

  const handleSubmit = () => {
    let total = 0;
    matrix.rows.forEach(r => {
      const a = answers[r.id] || {};
      if (a.validate === r.correct.validate) total += matrix.points.validate;
      if (a.remediation === r.correct.remediation) total += matrix.points.remediation;
    });
    setScore(total);
    onScore?.(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  /* ---------- Tabs ---------- */

  const renderScanReport = (tab: ScanReportTab) => (
    <div className="bg-white border" style={{ borderColor: C.tableHead }}>
      <div className="px-4 py-2 text-white font-medium" style={{ background: '#2f6fe0' }}>
        {tab.heading}
      </div>
      <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-sm">
        {tab.sections.map(section => (
          <div key={section.severity}>
            <p className="font-bold mb-2" style={{ color: section.color }}>{section.severity}</p>
            {section.items.map((item, i) => (
              <div key={i} className="space-y-1.5">
                {[
                  ['Title:', item.title],
                  ['Description:', item.description],
                  ['Affected Asset:', item.asset],
                  ['Risk:', item.risk],
                  ['Reference:', item.reference],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[120px_1fr] gap-x-3">
                    <span className="font-bold text-gray-900">{label}</span>
                    <span className="font-mono text-xs text-gray-700 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const rowResult = (row: MatrixRow, field: Field): boolean | null => {
    if (!submitted) return null;
    return (answers[row.id] || {})[field] === row.correct[field];
  };

  const selectClass = (ok: boolean | null, value?: string) => {
    if (submitted) return ok ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
    return value ? 'border-amber-600 bg-amber-300' : 'border-gray-300 bg-white';
  };

  const columns: [Field, string[], string][] = [
    ['validate', matrix.validateOptions, 'w-44'],
    ['remediation', matrix.remediationOptions, 'w-full'],
  ];

  const renderMatrix = (tab: MatrixTab) => (
    <div className="bg-white p-4">
      <p className="font-bold tracking-wide text-gray-900 text-sm">{tab.heading}</p>
      <p className="italic text-sm text-gray-700 mb-4">{tab.text}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr>
              {['System', 'Validate Result', 'Remediation Action'].map(h => (
                <th key={h} className="px-3 py-3 text-center font-bold text-gray-900" style={{ background: C.gridHead }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.rows.map(row => {
              const a = answers[row.id] || {};
              return (
                <tr key={row.id}>
                  <td className="px-3 py-2 text-gray-800 whitespace-nowrap align-top pt-4">{row.system}</td>

                  {columns.map(([field, options, width]) => (
                    <td key={field} className="px-2 py-1 align-top">
                      <select
                        value={a[field] || ''}
                        onChange={(e) => setField(row.id, field, e.target.value)}
                        disabled={submitted}
                        className={`${width} rounded border p-2 text-gray-900 shadow-sm ${selectClass(rowResult(row, field), a[field])}`}
                      >
                        <option value="">Select</option>
                        {options.map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      {submitted && !rowResult(row, field) && (
                        <p className="text-xs text-red-700 mt-1">Correct: {row.correct[field]}</p>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTab = (tab: Tab) => {
    if (tab.type === 'scanReport') return renderScanReport(tab as ScanReportTab);
    if (tab.type === 'matrix') return renderMatrix(tab as MatrixTab);
    return <div className="text-red-600">Unknown tab type: {tab.type}</div>;
  };

  const currentTab = pbq.tabs.find(t => t.id === activeTab);

  /* ---------- Layout ---------- */

  const sideScenario = toList(currentTab?.scenario ?? pbq.scenario);
  const sideInstructions = toList(currentTab?.instructions ?? pbq.instructions);

  return (
    <div className="space-y-6 w-full">
      <div className="border border-gray-500 bg-white">
        <div className="grid md:grid-cols-[260px_1fr] gap-4 p-4">
          {/* Left sidebar */}
          <aside className="text-sm text-gray-800 space-y-2">
            <p className="font-bold">SIMULATION</p>
            {sideScenario.map((p, i) => <p key={i}>{p}</p>)}
            <p className="font-bold pt-2">INSTRUCTIONS</p>
            {sideInstructions.map((p, i) => <p key={i}>{p}</p>)}
          </aside>

          {/* Right: simulation panel */}
          <section className="rounded" style={{ background: C.panelBg }}>
            <div className="flex items-end justify-between gap-2 px-3 pt-3 flex-wrap">
              <div className="flex">
                {pbq.tabs.map(tab => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="px-3 py-1.5 text-xs font-medium rounded-t transition-colors"
                      style={active ? { background: '#ffffff', color: C.tabActiveText } : { background: C.tabIdle, color: C.tabIdleText }}
                    >
                      {tab.title}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white mb-1"
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
          className="px-6 py-3 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2 hover:opacity-90"
          style={{ background: C.tableHead }}
        >
          <span>Submit</span>
          <ChevronRight size={18} />
        </button>
        {submitted && (
          <div
            className={`px-6 py-3 rounded-lg font-semibold border ${
              score === maxPoints
                ? 'bg-green-50 border-green-300 text-green-900'
                : 'bg-yellow-50 border-yellow-300 text-yellow-900'
            }`}
          >
            Score: {score} / {maxPoints} points
          </div>
        )}
      </div>

      {/* Review */}
      {submitted && pbq.review && (
        <div className="border border-gray-500 bg-white p-5 space-y-5 text-sm">
          <h3 className="font-bold text-gray-900 text-base">Explanation &amp; Review</h3>

          {pbq.review.intro && <p className="text-gray-700">{pbq.review.intro}</p>}

          {pbq.review.servers?.map(s => (
            <div key={s.system} className="border-l-4 pl-3 space-y-1" style={{ borderColor: C.tableHead }}>
              <p className="font-bold text-gray-900">{s.system}</p>
              <p className="text-gray-700"><strong>Finding:</strong> {s.finding}</p>
              <p className="text-gray-700"><strong>What it means:</strong> {s.meaning}</p>
              <p className="text-gray-700"><strong>Answer:</strong> {s.answer}</p>
              <p className="text-gray-700"><strong>Why:</strong> {s.why}</p>
            </div>
          ))}

          <div className="overflow-x-auto">
            <p className="font-bold text-gray-900 mb-2">Answer summary</p>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['Server', 'Validation Result', 'Remediation Action'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.tableHead }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((r, i) => (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? '#ffffff' : C.rowAlt }}>
                    <td className="px-3 py-2 border-b border-gray-300">{r.system}</td>
                    <td className="px-3 py-2 border-b border-gray-300">{r.correct.validate}</td>
                    <td className="px-3 py-2 border-b border-gray-300">{r.correct.remediation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pbq.review.tips && (
            <div className="rounded-lg border bg-white p-3" style={{ borderColor: C.tableHead }}>
              <p className="font-bold text-gray-900 mb-1">Exam tips</p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {pbq.review.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
