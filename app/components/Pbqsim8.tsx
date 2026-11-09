import { useMemo, useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import type { PbqLogAnalysis, SimProps } from '../data/pbqTypes';

/**
 * <PbqLogSim pbq={pbq02} onScore={(id, score, max) => ...} />
 *
 * Renders a log-analysis PBQ (kind: 'logAnalysis'): three read-only tabs (logs / netstat),
 * two dropdowns and a checkbox list. Data shape is defined in pbq_08.js.
 */

const C = {
  tableHead: '#6f8fd6',
  rowAlt: '#cfdcf5',
  panelBg: '#e8e8e8',
  tabIdle: '#c9c9c9',
  tabIdleText: '#f4f4f4',
  tabActiveText: '#2f5fb3',
  btn: '#4a4a4a',
};

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Match a whole IP address, so 192.168.10.3 does not match inside 192.168.10.32
const ipRegex = (ip: string) => new RegExp(`(^|[^0-9.])${escapeRe(ip)}(?![0-9])`);

interface Result {
  ipOk: boolean;
  indicatorOk: boolean;
  actionsRight: string[];
  actionsWrong: string[];
  earned: number;
  possible: number;
}

export default function PbqLogSim({ pbq, onScore }: SimProps<PbqLogAnalysis>) {
  const [tab, setTab] = useState(pbq.tabs[0].id);
  const [ip, setIp] = useState('');
  const [indicator, setIndicator] = useState('');
  const [actions, setActions] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const q = pbq.questions;
  const locked = result !== null;
  const activeTab = pbq.tabs.find((t) => t.id === tab) ?? pbq.tabs[0];
  const hitRe = useMemo(() => (ip ? ipRegex(ip) : null), [ip]);
  const isHit = (text: string) => (hitRe ? hitRe.test(text) : false);
  const ready = ip && indicator && actions.length === q.actions.required;

  function toggleAction(option: string) {
    if (locked) return;
    setActions((prev) => {
      if (prev.includes(option)) return prev.filter((a) => a !== option);
      if (prev.length >= q.actions.required) return prev; // cap at the required number
      return [...prev, option];
    });
  }

  function reset() {
    setIp('');
    setIndicator('');
    setActions([]);
    setResult(null);
    setTab(pbq.tabs[0].id);
  }

  function submit() {
    const ipOk = ip === q.ip.correct;
    const indicatorOk = indicator === q.indicator.correct;
    const perAction = pbq.points.actions / q.actions.required;
    const right = actions.filter((a) => q.actions.correct.includes(a));
    const wrong = actions.filter((a) => !q.actions.correct.includes(a));
    const actionPoints = Math.max(0, (right.length - wrong.length) * perAction);

    const earned = (ipOk ? pbq.points.ip : 0) + (indicatorOk ? pbq.points.indicator : 0) + actionPoints;
    const possible = pbq.points.ip + pbq.points.indicator + pbq.points.actions;
    const next: Result = { ipOk, indicatorOk, actionsRight: right, actionsWrong: wrong, earned, possible };

    setResult(next);
    onScore?.(pbq.id, earned, possible);
  }

  const mark = (ok: boolean, correctText: string, why: string) => (
    <p className={`mt-2 text-sm ${ok ? 'text-green-700' : 'text-red-700'}`} role="status">
      {ok ? 'Correct.' : `Not quite. Correct answer: ${correctText}`} {why}
    </p>
  );

  const selectCls = (ok?: boolean) =>
    `w-full rounded border p-2 text-gray-900 shadow-sm ${
      locked ? (ok ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-300 bg-white'
    }`;

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

          <section className="min-w-0 rounded" style={{ background: C.panelBg }}>
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <div className="flex" role="tablist" aria-label="Evidence">
                {pbq.tabs.map((t) => {
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(t.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={active
                        ? { background: '#ffffff', color: C.tabActiveText }
                        : { background: C.tabIdle, color: C.tabIdleText }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={reset}
                className="mb-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white"
                style={{ background: C.btn }}
              >
                <RotateCcw size={13} /> Reset All Answers
              </button>
            </div>

            <div className="space-y-3 p-3">
              <div
                role="tabpanel"
                tabIndex={0}
                className="max-h-96 min-h-72 overflow-auto bg-gray-800 p-4 font-mono text-xs leading-relaxed text-gray-200"
              >
                {activeTab.type === 'log' &&
                  activeTab.lines.map((line) => (
                    <div
                      key={line}
                      className={`whitespace-pre px-1 ${isHit(line) ? 'bg-yellow-900 text-yellow-100' : ''}`}
                    >
                      {line}
                    </div>
                  ))}

                {activeTab.type === 'netstat' && (
                  <>
                    <div className="mb-2 text-gray-400">&gt; {activeTab.netstat.command}</div>
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          {activeTab.netstat.columns.map((c) => (
                            <th key={c} className="border-b border-gray-600 py-1 pl-1 pr-4 text-left font-normal text-gray-400">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeTab.netstat.rows.map((row, i) => (
                          <tr key={i} className={isHit(row.join(' ')) ? 'bg-yellow-900 text-yellow-100' : ''}>
                            {row.map((cell, j) => (
                              <td key={j} className="whitespace-nowrap py-0.5 pl-1 pr-4">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="rounded border border-gray-300 bg-white p-3">
                    <label className="mb-2 block text-sm font-semibold text-gray-800" htmlFor="pls-ip">{q.ip.prompt}</label>
                    <select id="pls-ip" className={selectCls(result?.ipOk)} value={ip} disabled={locked} onChange={(e) => setIp(e.target.value)}>
                      <option value="">Select</option>
                      {q.ip.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {!locked && ip && <p className="mt-2 text-xs text-gray-600">Lines that mention {ip} are highlighted in every tab.</p>}
                    {locked && mark(result.ipOk, q.ip.correct, q.ip.why)}
                    {locked && !result.ipOk && pbq.distractors?.ip?.[ip] && (
                      <p className="mt-2 text-sm text-red-700">{ip}: {pbq.distractors.ip[ip]}</p>
                    )}
                  </div>

                  <div className="rounded border border-gray-300 bg-white p-3">
                    <label className="mb-2 block text-sm font-semibold text-gray-800" htmlFor="pls-ind">{q.indicator.prompt}</label>
                    <select id="pls-ind" className={selectCls(result?.indicatorOk)} value={indicator} disabled={locked} onChange={(e) => setIndicator(e.target.value)}>
                      <option value="">Select</option>
                      {q.indicator.options.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {locked && mark(result.indicatorOk, q.indicator.correct, q.indicator.why)}
                    {locked && !result.indicatorOk && pbq.distractors?.indicator?.[indicator] && (
                      <p className="mt-2 text-sm text-red-700">{indicator}: {pbq.distractors.indicator[indicator]}</p>
                    )}
                  </div>
                </div>

                <div className="rounded border border-gray-300 bg-white p-3">
                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold text-gray-800">{q.actions.prompt}</legend>
                    <div className="space-y-2">
                      {q.actions.options.map((o) => {
                        const on = actions.includes(o);
                        return (
                          <label key={o} className="flex cursor-pointer items-start gap-2 text-sm text-gray-800">
                            <input
                              type="checkbox"
                              className="mt-1 accent-blue-600"
                              checked={on}
                              disabled={locked || (!on && actions.length >= q.actions.required)}
                              onChange={() => toggleAction(o)}
                            />
                            <span className={on ? 'font-semibold' : ''}>{o}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                  <p className="mt-2 text-xs text-gray-600">Select {q.actions.required}. You have chosen {actions.length}.</p>
                  {locked && mark(
                    result.actionsWrong.length === 0 && result.actionsRight.length === q.actions.required,
                    q.actions.correct.join(' and '),
                    q.actions.why
                  )}
                  {locked && result.actionsWrong.map((a) => (
                    <p className="mt-2 text-sm text-red-700" key={a}>{a} {pbq.distractors?.actions?.[a] || ''}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Submit + score */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={submit}
          disabled={locked || !ready}
          className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
          style={{ background: C.tableHead }}
        >
          <span>Submit</span>
          <ChevronRight size={18} />
        </button>
        {!locked && !ready && (
          <span className="text-sm text-gray-600">
            Choose an IP, an indicator and {q.actions.required} actions to continue.
          </span>
        )}
        {locked && (
          <div
            className={`rounded-lg border px-6 py-3 font-semibold ${
              result.earned === result.possible
                ? 'border-green-300 bg-green-50 text-green-900'
                : 'border-yellow-300 bg-yellow-50 text-yellow-900'
            }`}
          >
            Score: {result.earned} / {result.possible} points
          </div>
        )}
      </div>

      {/* Review */}
      {locked && pbq.review?.tips && (
        <div className="space-y-3 border border-gray-500 bg-white p-5 text-sm">
          <h3 className="text-base font-bold text-gray-900">Explanation &amp; Review</h3>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {pbq.review.tips.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}