import { useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Cloud,
  Database,
  Globe,
  Laptop,
  RotateCcw,
  Server,
  ShieldCheck,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Host, HostOutput, PbqInvestigation, SimProps } from '../data/pbqTypes';


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

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2";

const ICONS: Record<string, LucideIcon> = {
  laptop: Laptop,
  dns: Globe,
  proxy: ShieldCheck,
  app: Server,
  db: Database,
};

function HostButton({
  host,
  selected,
  onClick,
}: {
  host: Host;
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = ICONS[host.icon] || Server;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded border px-3 py-2.5 text-left transition ${focus} ${
        selected
          ? "border-[#1e3a8a] bg-[#1e3a8a] text-white"
          : "border-gray-300 bg-white text-gray-900 hover:bg-[#eaf0fb]"
      }`}
    >
      <Icon
        size={22}
        strokeWidth={1.8}
        className={selected ? "text-white" : "text-[#1e3a8a]"}
        aria-hidden="true"
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5">{host.label}</span>
        <span
          className={`block font-mono text-xs ${selected ? "text-blue-100" : "text-gray-600"}`}
        >
          {host.ip}
        </span>
      </span>
    </button>
  );
}

function Node({
  icon: Icon,
  label,
  sub,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center text-gray-900">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full border-4 bg-white ${
          accent ? "border-red-500 text-red-600" : "border-[#1e3a8a] text-[#1e3a8a]"
        }`}
      >
        <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="text-sm font-semibold">{label}</span>
      {sub && <span className="font-mono text-xs text-gray-600">{sub}</span>}
    </div>
  );
}

function Terminal({ output }: { output: HostOutput }) {
  const isLog = output.type === "proxyLog";
  return (
    <div className="overflow-hidden bg-gray-800 text-gray-200">
      <div className="border-b border-gray-600 px-4 py-2 text-center text-xs text-gray-300">
        {output.title}
      </div>
      <div className="max-h-96 overflow-auto p-4 font-mono text-xs leading-relaxed">
        {!isLog && <p className="mb-1 text-gray-400">Active Connections</p>}
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="text-left text-gray-400">
              {output.columns.map((c) => (
                <th className="whitespace-nowrap border-b border-gray-600 py-1 pr-6 font-normal" key={c}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {output.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td className="whitespace-nowrap py-0.5 pr-6" key={j}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

type QKey = "host" | "executable" | "remediation";

interface Result {
  hostOk: boolean;
  executableOk: boolean;
  remediationOk: boolean;
  earned: number;
  possible: number;
}

export default function PbqInvestigationSim({ pbq, onScore, onSubmit }: SimProps<PbqInvestigation>) {
  const [hostId, setHostId] = useState<string | null>(null);
  const [outputId, setOutputId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<QKey, string>>({
    host: "",
    executable: "",
    remediation: "",
  });
  const [result, setResult] = useState<Result | null>(null);

  const q = pbq.questions;
  const locked = result !== null;
  const hostsById = Object.fromEntries(pbq.hosts.map((h) => [h.id, h]));
  const selectedHost = hostId ? hostsById[hostId] : null;
  const activeOutput =
    selectedHost?.outputs.find((o) => o.id === outputId) ?? selectedHost?.outputs[0];
  const ready = Object.values(answers).every(Boolean);

  function openHost(id: string) {
    setHostId(id);
    setOutputId(null);
  }

  const setAnswer = (key: QKey) => (e: ChangeEvent<HTMLSelectElement>) =>
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }));

  function reset() {
    setHostId(null);
    setOutputId(null);
    setAnswers({ host: "", executable: "", remediation: "" });
    setResult(null);
  }

  function submit() {
    const hostOk = answers.host === q.host.correct;
    const executableOk = answers.executable === q.executable.correct;
    const remediationOk = answers.remediation === q.remediation.correct;
    const earned =
      (hostOk ? pbq.points.host : 0) +
      (executableOk ? pbq.points.executable : 0) +
      (remediationOk ? pbq.points.remediation : 0);
    const possible =
      pbq.points.host + pbq.points.executable + pbq.points.remediation;
    const next: Result = { hostOk, executableOk, remediationOk, earned, possible };

    setResult(next);
    if (onScore) onScore(pbq.id, earned, possible);
    if (onSubmit) onSubmit({ ...next, answers });
  }

  const gateway = hostsById[pbq.diagram.gatewayHostId];

  const selectCls = (ok?: boolean) =>
    `w-full rounded border p-2 text-gray-900 shadow-sm ${
      locked
        ? ok
          ? "border-green-500 bg-green-50"
          : "border-red-500 bg-red-50"
        : "border-gray-300 bg-white"
    }`;

  const questionRows: { key: QKey; ok?: boolean }[] = [
    { key: "host", ok: result?.hostOk },
    { key: "executable", ok: result?.executableOk },
    { key: "remediation", ok: result?.remediationOk },
  ];

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
              <div className="flex">
                <span
                  className="rounded-t px-3 py-1.5 text-xs font-medium"
                  style={{ background: "#ffffff", color: C.tabActiveText }}
                >
                  Network
                </span>
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
      {/* Network diagram */}
      <section
        aria-label="Network diagram"
        className="border border-gray-300 bg-white p-3"
      >
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="grid gap-3 sm:grid-cols-2">
            {pbq.diagram.domains.map((d) => (
              <div
                key={d.id}
                className="border border-gray-300 bg-[#e8eefb] p-3"
              >
                <p className="text-sm font-bold text-gray-900">{d.name}</p>
                <p className="mb-3 font-mono text-xs text-gray-600">{d.network}</p>
                <div className="flex flex-col gap-2">
                  {d.hostIds.map((id) => (
                    <HostButton
                      key={id}
                      host={hostsById[id]}
                      selected={hostId === id}
                      onClick={() => openHost(id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 bg-gray-50 p-4">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
              Outbound path
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Node icon={ShieldCheck} label={gateway.label} sub={gateway.ip} />
              <ArrowRight className="hidden text-[#1e3a8a] sm:block lg:hidden xl:block" aria-hidden="true" />
              <ArrowDown className="text-[#1e3a8a] sm:hidden lg:block xl:hidden" aria-hidden="true" />
              <Node icon={Cloud} label={pbq.diagram.internet.label} />
              <ArrowRight className="hidden text-[#1e3a8a] sm:block lg:hidden xl:block" aria-hidden="true" />
              <ArrowDown className="text-[#1e3a8a] sm:hidden lg:block xl:hidden" aria-hidden="true" />
              <Node
                icon={Target}
                label={pbq.diagram.target.label}
                sub={pbq.diagram.target.ip}
                accent
              />
            </div>
          </div>
        </div>
      </section>

      {/* Output terminal */}
      <section aria-label="Host output">
        {!selectedHost && (
          <p className="border border-dashed border-gray-400 bg-white px-5 py-8 text-center text-sm text-gray-600">
            Click a workstation or server above to review its output and logs.
          </p>
        )}

        {selectedHost && selectedHost.outputs.length === 0 && (
          <p className="border border-gray-300 bg-white px-5 py-8 text-center text-sm text-gray-600">
            No output is available for {selectedHost.label} ({selectedHost.ip}).
          </p>
        )}

        {selectedHost && activeOutput && (
          <>
            {selectedHost.outputs.length > 1 && (
              <div className="flex" role="tablist" aria-label={`${selectedHost.label} outputs`}>
                {selectedHost.outputs.map((o) => {
                  const on = o.id === activeOutput.id;
                  return (
                    <button
                      key={o.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setOutputId(o.id)}
                      className="rounded-t px-3 py-1.5 text-xs font-medium transition-colors"
                      style={
                        on
                          ? { background: "#ffffff", color: C.tabActiveText }
                          : { background: C.tabIdle, color: C.tabIdleText }
                      }
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            )}
            <Terminal output={activeOutput} />
          </>
        )}
      </section>

      {/* Answers */}
      <section
        aria-label="Answer area"
        className="border border-gray-300 bg-white p-3"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {questionRows.map(({ key, ok }) => {
            const question = q[key];
            const picked = answers[key];
            return (
              <div key={key}>
                <label
                  htmlFor={`pi-${key}`}
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  {question.prompt}
                </label>
                <select
                  id={`pi-${key}`}
                  value={picked}
                  disabled={locked}
                  onChange={setAnswer(key)}
                  className={selectCls(ok)}
                >
                  <option value="">Select</option>
                  {question.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>

                {locked && (
                  <Feedback ok={ok}>
                    {ok ? "Correct." : `Not quite. Correct answer: ${question.correct}`}{" "}
                    {question.why}
                  </Feedback>
                )}
                {locked && !ok && pbq.distractors?.[key]?.[picked] && (
                  <Feedback ok={false}>
                    {picked}: {pbq.distractors[key][picked]}
                  </Feedback>
                )}
              </div>
            );
          })}
        </div>
      </section>
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
            Answer all three questions to continue.
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