import { useState } from "react";
import type { ReactNode } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";
import type { Environment, PbqRemediation, ScanFinding, SimProps, Sla } from '../data/pbqTypes';

/**
 * <PbqRemediationSim pbq={pbq07} onScore={savePbqScore} />
 *
 * Renders a vulnerability remediation PBQ (kind: 'remediation'): three read-only tabs
 * (SLA table, environment table, scan output), a server checkbox list and a technique dropdown.
 * Data shape is defined in pbq_09.js. Uses the same layout as the other simulations.
 */

const C = {
  tableHead: "#1e3a8a",
  rowAlt: "#eaf0fb",
  panelBg: "#e2e8f0",
  tabIdle: "#cbd5e1",
  tabIdleText: "#1e293b",
  tabActiveText: "#1e3a8a",
  btn: "#334155",
};

const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

const th = "px-3 py-2.5 text-left font-semibold align-bottom";
const td = "px-3 py-2.5 align-top";

function Mark({ applies }: { applies: boolean }) {
  return applies ? (
    <span className="text-lg font-bold text-slate-900">
      <span aria-hidden="true">✓</span>
      <span className="sr-only">Applies</span>
    </span>
  ) : (
    <span className="text-lg font-bold text-red-600">
      <span aria-hidden="true">✗</span>
      <span className="sr-only">Does not apply</span>
    </span>
  );
}

function SlaTab({ sla }: { sla: Sla }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-160 border-collapse bg-white text-sm text-gray-900">
          <thead className="text-white" style={{ background: C.tableHead }}>
            <tr>
              <th className={th} rowSpan={2}>
                {sla.columns[0]}
              </th>
              <th className={th} rowSpan={2}>
                {sla.columns[1]}
              </th>
              <th
                className="px-3 py-2.5 text-center font-semibold"
                colSpan={sla.environments.length}
              >
                Applies to
              </th>
            </tr>
            <tr>
              {sla.environments.map((e) => (
                <th className="px-3 pb-2.5 text-center font-semibold" key={e}>
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sla.rows.map((row) => (
              <tr className="odd:bg-white even:bg-[#eaf0fb]" key={row.level}>
                <td className={td}>{row.level}</td>
                <td className={td}>
                  {sla.standard(row.days).replace(`${row.days} calendar days`, "")}
                  <strong>{row.days} calendar days</strong>
                </td>
                {sla.environments.map((e) => (
                  <td className={`${td} text-center`} key={e}>
                    <Mark applies={row.applies[e]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border border-gray-300 bg-white px-5 py-4 text-sm leading-6 text-gray-800">
        <p className="mb-2 font-bold">{sla.headline}</p>
        <ul className="list-disc space-y-1 pl-5">
          {sla.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function EnvironmentTab({ environment }: { environment: Environment }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-190 border-collapse bg-white text-sm text-gray-900">
        <thead className="text-white" style={{ background: C.tableHead }}>
          <tr>
            {environment.columns.map((c) => (
              <th className={th} key={c}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {environment.rows.map((row) => (
            <tr className="odd:bg-white even:bg-[#eaf0fb]" key={String(row[0])}>
              {row.map((cell, i) => (
                <td className={td} key={i}>
                  {Array.isArray(cell)
                    ? cell.map((s) => <div key={s}>{s}</div>)
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FindingsTab({ findings }: { findings: ScanFinding[] }) {
  return (
    <div className="border border-gray-300 bg-white px-4 text-sm text-gray-900">
      {findings.map((f, i) => (
        <dl
          className="grid grid-cols-1 gap-x-3 gap-y-0.5 border-gray-200 py-3 not-first:border-t sm:grid-cols-[130px_1fr]"
          key={i}
        >
          <dt className="mt-1 font-bold text-[#1e3a8a] sm:mt-0">Title:</dt>
          <dd className="leading-6">{f.title}</dd>
          <dt className="mt-1 font-bold text-[#1e3a8a] sm:mt-0">Description:</dt>
          <dd className="leading-6">{f.description}</dd>
          <dt className="mt-1 font-bold text-[#1e3a8a] sm:mt-0">Affected asset:</dt>
          <dd className="leading-6">{f.asset}</dd>
          <dt className="mt-1 font-bold text-[#1e3a8a] sm:mt-0">Risk:</dt>
          <dd className="leading-6">{f.risk}</dd>
          <dt className="mt-1 font-bold text-[#1e3a8a] sm:mt-0">Reference:</dt>
          <dd className="leading-6">{f.reference}</dd>
        </dl>
      ))}
    </div>
  );
}

function Feedback({ ok, children }: { ok?: boolean; children: ReactNode }) {
  return (
    <p
      role="status"
      className={`mt-2 text-sm leading-6 ${ok ? "text-green-700" : "text-red-700"}`}
    >
      {children}
    </p>
  );
}

interface Result {
  serverOk: boolean;
  techniqueOk: boolean;
  earned: number;
  possible: number;
}

export default function PbqRemediationSim({ pbq, onScore, onSubmit }: SimProps<PbqRemediation>) {
  const [tab, setTab] = useState(pbq.tabs[0].id);
  const [servers, setServers] = useState<string[]>([]);
  const [technique, setTechnique] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const q = pbq.questions;
  const locked = result !== null;
  const activeTab = pbq.tabs.find((t) => t.id === tab) ?? pbq.tabs[0];
  const ready = servers.length === q.server.required && technique !== "";

  function toggleServer(option: string) {
    if (locked) return;
    setServers((prev) => {
      if (prev.includes(option)) return prev.filter((s) => s !== option);
      // With a single answer, picking another server replaces the current choice
      if (q.server.required === 1) return [option];
      if (prev.length >= q.server.required) return prev;
      return [...prev, option];
    });
  }

  function reset() {
    setServers([]);
    setTechnique("");
    setResult(null);
    setTab(pbq.tabs[0].id);
  }

  function submit() {
    const serverOk = servers.length === 1 && servers[0] === q.server.correct;
    const techniqueOk = technique === q.technique.correct;
    const earned =
      (serverOk ? pbq.points.server : 0) +
      (techniqueOk ? pbq.points.technique : 0);
    const possible = pbq.points.server + pbq.points.technique;
    const next: Result = { serverOk, techniqueOk, earned, possible };

    setResult(next);
    if (onScore) onScore(pbq.id, earned, possible);
    if (onSubmit) onSubmit({ ...next, answers: { servers, technique } });
  }

  const selectCls = (ok?: boolean) =>
    `w-full rounded border p-2 text-gray-900 shadow-sm ${
      locked
        ? ok
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
        : "border-gray-300 bg-white"
    }`;

  const verdict = (ok: boolean, correctText: string, why: string) => (
    <Feedback ok={ok}>
      {ok ? "Correct." : `Not quite. Correct answer: ${correctText}`} {why}
    </Feedback>
  );

  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-500 bg-white">
        <div className="grid gap-4 p-4 md:grid-cols-[270px_1fr]">
          <aside className="space-y-2 text-sm text-gray-800">
            <p className="font-bold">SIMULATION</p>
            {toList(pbq.scenario).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="pt-2 font-bold">INSTRUCTIONS</p>
            {toList(pbq.instructions).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
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
                      id={`pvr-tab-${t.id}`}
                      aria-selected={active}
                      aria-controls="pvr-screen"
                      onClick={() => setTab(t.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={
                        active
                          ? { background: "#ffffff", color: C.tabActiveText }
                          : { background: C.tabIdle, color: C.tabIdleText }
                      }
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
                id="pvr-screen"
                role="tabpanel"
                aria-labelledby={`pvr-tab-${tab}`}
                tabIndex={0}
                className="min-h-72 max-h-[32rem] overflow-auto"
              >
                {activeTab.type === "sla" && <SlaTab sla={activeTab.sla} />}
                {activeTab.type === "environment" && (
                  <EnvironmentTab environment={activeTab.environment} />
                )}
                {activeTab.type === "findings" && (
                  <FindingsTab findings={activeTab.findings} />
                )}
              </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1.6fr]">
        <div className="rounded border border-gray-300 bg-white p-3">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold text-gray-800">
              {q.server.prompt}
            </legend>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {q.server.options.map((o) => {
                const on = servers.includes(o);
                return (
                  <label
                    key={o}
                    className={`flex cursor-pointer items-center gap-2 text-sm text-gray-800 ${
                      on ? "font-semibold" : ""
                    } ${locked ? "cursor-default" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      disabled={locked}
                      onChange={() => toggleServer(o)}
                      className="accent-blue-600"
                    />
                    <span>{o}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          {locked && verdict(result.serverOk, q.server.correct, q.server.why)}
          {locked && !result.serverOk && pbq.distractors?.server?.[servers[0]] && (
            <Feedback ok={false}>
              {servers[0]}: {pbq.distractors.server[servers[0]]}
            </Feedback>
          )}
        </div>

        <div className="rounded border border-gray-300 bg-white p-3">
          <label
            htmlFor="pvr-technique"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            {q.technique.prompt}
          </label>
          <select
            id="pvr-technique"
            value={technique}
            disabled={locked}
            onChange={(e) => setTechnique(e.target.value)}
            className={selectCls(result?.techniqueOk)}
          >
            <option value="">Select</option>
            {q.technique.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {locked &&
            verdict(result.techniqueOk, q.technique.correct, q.technique.why)}
          {locked &&
            !result.techniqueOk &&
            pbq.distractors?.technique?.[technique] && (
              <Feedback ok={false}>
                {technique}: {pbq.distractors.technique[technique]}
              </Feedback>
            )}
        </div>
      </div>
            </div>
          </section>
        </div>
      </div>

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
            Choose a server and a technique to continue.
          </span>
        )}
        {locked && (
          <div
            className={`rounded-lg border px-6 py-3 font-semibold ${
              result.earned === result.possible
                ? "border-green-300 bg-green-50 text-green-900"
                : "border-yellow-300 bg-yellow-50 text-yellow-900"
            }`}
          >
            Score: {result.earned} / {result.possible} points
          </div>
        )}
      </div>

      {locked && pbq.review?.tips && (
        <div className="space-y-3 border border-gray-500 bg-white p-5 text-sm">
          <h3 className="text-base font-bold text-gray-900">
            Explanation &amp; Review
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-gray-700">
            {pbq.review.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}