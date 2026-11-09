import { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import type { PbqActionPlan, SimProps } from '../data/pbqTypes';

type ActionRow = PbqActionPlan['actionPlan']['rows'][number];

// Same palette as the other simulations
const C = {
  tableHead: '#6f8fd6',
  rowAlt: '#cfdcf5',
  panelBg: '#e8e8e8',
  tabActiveText: '#2f5fb3',
  btn: '#4a4a4a',
};

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

// Fisher-Yates shuffle (the control options can appear in random order)
const shuffle = (arr: string[]): string[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function PbqActionPlanSim({ pbq, onScore }: SimProps<PbqActionPlan>) {
  const plan = pbq.actionPlan;
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { [rowId]: control }
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState(() => shuffle(plan.controls));

  const maxPoints = plan.rows.length * plan.points;

  const setAnswer = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));

  // A control may be used only once: disable it in every other row
  const usedElsewhere = (rowId: string, control: string) =>
    plan.rows.some(r => r.id !== rowId && answers[r.id] === control);

  const isCorrect = (row: ActionRow) => answers[row.id] === row.correct;

  const handleSubmit = () => {
    const total = plan.rows.reduce((sum, r) => sum + (isCorrect(r) ? plan.points : 0), 0);
    setScore(total);
    onScore && onScore(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setOptions(shuffle(plan.controls));
  };

  const selectStyle = (row: ActionRow) => {
    if (submitted) return isCorrect(row) ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50';
    return answers[row.id] ? 'border-amber-600 bg-amber-300' : 'border-gray-300 bg-white';
  };

  /* ---------- Layout ---------- */

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
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <span className="rounded-t px-3 py-1.5 text-xs font-medium" style={{ background: '#ffffff', color: C.tabActiveText }}>
                {plan.title}
              </span>
              <button
                onClick={handleReset}
                className="mb-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white"
                style={{ background: C.btn }}
              >
                <RotateCcw size={13} /> Reset All Answers
              </button>
            </div>

            <div className="p-3">
              <div className="overflow-x-auto bg-white">
                <table className="w-full border-separate border-spacing-0 text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left font-bold text-white" style={{ background: C.tableHead }}>Risk Finding</th>
                      <th className="w-80 px-3 py-2 text-left font-bold text-white" style={{ background: C.tableHead }}>
                        Control to implement
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.rows.map((r, i) => (
                      <tr key={r.id} style={{ background: i % 2 === 0 ? '#ffffff' : C.rowAlt }}>
                        <td className="border-b border-gray-300 px-3 py-3 align-top text-gray-800">{r.finding}</td>
                        <td className="border-b border-gray-300 px-3 py-2 align-top">
                          <select
                            value={answers[r.id] || ''}
                            onChange={(e) => setAnswer(r.id, e.target.value)}
                            disabled={submitted}
                            aria-label={`Control for: ${r.finding}`}
                            className={`w-full rounded border p-2 text-gray-900 shadow-sm ${selectStyle(r)}`}
                          >
                            <option value="">Select control</option>
                            {options.map(c => (
                              <option key={c} value={c} disabled={usedElsewhere(r.id, c)}>{c}</option>
                            ))}
                          </select>
                          {submitted && !isCorrect(r) && (
                            <p className="mt-1 text-xs text-red-700">Correct: {r.correct}</p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <p className="mb-2 font-bold text-gray-900">Step-by-step risk remediation</p>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {['Risk Finding', 'Control to implement', 'Why'].map(h => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-bold text-white" style={{ background: C.tableHead }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plan.rows.map((r, i) => (
                  <tr key={r.id} style={{ background: i % 2 === 0 ? '#ffffff' : C.rowAlt }}>
                    <td className="border-b border-gray-300 px-3 py-2 align-top text-gray-800">{r.finding}</td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top font-medium">{r.correct}</td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top text-gray-700">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {plan.unused?.length > 0 && (
            <div>
              <p className="mb-1 font-bold text-gray-900">Controls that were not needed</p>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {plan.unused.map(u => (
                  <li key={u.control}><strong>{u.control}:</strong> {u.note}</li>
                ))}
              </ul>
            </div>
          )}

          {pbq.review?.tips && (
            <div className="rounded-lg border bg-white p-3" style={{ borderColor: C.tableHead }}>
              <p className="mb-1 font-bold text-gray-900">Exam tips</p>
              <ul className="list-disc space-y-1 pl-5 text-gray-700">
                {pbq.review.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}