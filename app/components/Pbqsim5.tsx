import { useState } from "react";
import type { ReactNode } from "react";
import {
  ChevronRight,
  RotateCcw,
  X,
  Flame,
  Folders,
  Skull,
  Hand,
  Mail,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Artifact, PbqArtifacts, SimProps } from '../data/pbqTypes';

interface AnswerRow {
  id: string;
  correct: string;
  alsoAccept?: string[];
}

// Larger-text version: all small text sizes raised for readability.
const C = {
  tableHead: "#1e3a8a",
  rowAlt: "#eaf0fb",
  panelBg: "#e2e8f0",
  btn: "#334155",
  blue: "#1e3a8a",
  orange: "#f0a428",
  tabActiveText: "#1e3a8a",
};

const ICONS: Record<string, LucideIcon> = {
  firewall: Flame,
  fim: Folders,
  domains: Skull,
  vuln: Hand,
  email: Mail,
};
const toList = (v?: string | string[] | null): string[] => (Array.isArray(v) ? v : v ? [v] : []);

function ArtifactBody({ a }: { a: Artifact }) {
  if (a.type === "log") {
    return (
      <div className="space-y-5 text-lg text-gray-800">
        {a.sections.map((s) => (
          <div key={s.heading}>
            <p className="mb-2 text-xl font-semibold">{s.heading}</p>
            <div className="space-y-2">
              {s.lines.map((l, i) => (
                <p
                  key={i}
                  className="break-words font-mono text-base leading-relaxed"
                >
                  {l}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (a.type === "fim") {
    return (
      <div className="text-lg">
        <p className="mb-3 text-gray-700">{a.intro}</p>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                {a.columns.map((c) => (
                  <th
                    key={c}
                    className="px-3 py-2 text-left text-base font-bold text-white"
                    style={{ background: "#1e3a8a" }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {a.rows.map((r, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? "#ffffff" : "#eaf0fb" }}
                >
                  {r.map((cell, j) => (
                    <td
                      key={j}
                      className="whitespace-pre-wrap break-words px-3 py-2 align-top text-base text-gray-800"
                    >
                      {j === 0 ? (
                        <>
                          <strong className="text-lg">
                            {cell.split("\n")[0]}
                          </strong>
                          {"\n" + cell.split("\n").slice(1).join("\n")}
                        </>
                      ) : (
                        cell
                      )}
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

  if (a.type === "domains") {
    return (
      <div className="text-lg text-gray-800">
        {a.header.map((h) => (
          <p key={h} className="text-gray-600">
            # {h} #
          </p>
        ))}
        <p className="mt-2 text-gray-600"># IP #</p>
        <ul className="mt-3 space-y-1.5">
          {a.ips.map((ip) => (
            <li key={ip} className="font-mono text-lg">
              {ip}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (a.type === "vuln") {
    const Row = ({ label, children }: { label: string; children: ReactNode }) => (
      <div className="grid grid-cols-[170px_1fr] gap-x-3 py-1">
        <span className="font-bold text-gray-900">{label}</span>
        <span className="text-gray-700">{children}</span>
      </div>
    );
    return (
      <div className="space-y-6 text-lg">
        {a.sections.map((s, i) => (
          <div key={i}>
            <p className="mb-1 text-xl font-bold" style={{ color: s.color }}>
              {s.severity}
            </p>
            <Row label="Title:">{s.title}</Row>
            <Row label="Description:">{s.description}</Row>
            <Row label="Affected asset:">{s.asset}</Row>
            <Row label="Risk:">{s.risk}</Row>
            <Row label="Reference:">{s.reference}</Row>
          </div>
        ))}
      </div>
    );
  }

  if (a.type === "email") {
    return (
      <div className="text-lg text-gray-800">
        <div className="mb-4 space-y-1">
          {a.headers.map(([k, v]) => (
            <p key={k}>
              <span>{k}: </span>
              {v}
            </p>
          ))}
        </div>
        <div className="space-y-4">
          {a.body.map((p, i) =>
            typeof p === "string" ? (
              <p key={i}>{p}</p>
            ) : (
              <p key={i}>
                {p.text}
                <span className="cursor-default text-blue-700 underline">
                  {p.link}
                </span>
                {p.after}
              </p>
            ),
          )}
        </div>
      </div>
    );
  }

  return <p className="text-red-600">Unknown artifact type: {(a as { type: string }).type}</p>;
}

export default function PbqKillChainSim({ pbq, onScore }: SimProps<PbqArtifacts>) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [viewed, setViewed] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { killChain, identify } = pbq;
  const maxPoints =
    killChain.rows.length * killChain.points +
    identify.rows.length * identify.points;
  const openArtifact = pbq.artifacts.find((a) => a.id === openId);

  const openIt = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    setViewed((v) => (v.includes(id) ? v : [...v, id]));
  };

  const setAnswer = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const isCorrect = (row: AnswerRow) => {
    const v = answers[row.id];
    if (!v) return false;
    return v === row.correct || (row.alsoAccept || []).includes(v);
  };

  const handleSubmit = () => {
    let total = 0;
    killChain.rows.forEach((r) => {
      if (isCorrect(r)) total += killChain.points;
    });
    identify.rows.forEach((r) => {
      if (isCorrect(r)) total += identify.points;
    });
    setScore(total);
    onScore && onScore(pbq.id, total, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setOpenId(null);
    setViewed([]);
  };

  const usedElsewhere = (rowId: string, option: string) =>
    killChain.rows.some((r) => r.id !== rowId && answers[r.id] === option);

  const selectStyle = (row: AnswerRow) => {
    if (submitted)
      return isCorrect(row)
        ? "border-green-500 bg-green-50"
        : "border-red-500 bg-red-50";
    return answers[row.id]
      ? "border-blue-600 bg-blue-100"
      : "border-gray-300 bg-white";
  };

  const KillChainCard = (
    <div
      className="overflow-hidden rounded-lg border-2 bg-white"
      style={{ borderColor: C.blue }}
    >
      <div
        className="px-4 py-3 text-2xl font-medium text-white"
        style={{ background: C.blue }}
      >
        {killChain.title}
      </div>
      <div className="grid gap-x-6 gap-y-4 p-4 xl:grid-cols-2">
        {killChain.rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[130px_1fr] items-start gap-2 text-lg"
          >
            <label htmlFor={r.id} className="pt-2 text-gray-800">
              {r.label}
            </label>
            <div>
              <select
                id={r.id}
                value={answers[r.id] || ""}
                onChange={(e) => setAnswer(r.id, e.target.value)}
                disabled={submitted}
                className={`w-full rounded border p-2.5 text-lg text-gray-900 shadow-sm ${selectStyle(r)}`}
              >
                <option value="">Select control</option>
                {killChain.controls.map((c) => (
                  <option key={c} value={c} disabled={usedElsewhere(r.id, c)}>
                    {c}
                  </option>
                ))}
              </select>
              {submitted && !isCorrect(r) && (
                <p className="mt-1 text-base text-red-700">
                  Correct: {r.correct}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const IdentifyCard = (
    <div
      className="overflow-hidden rounded-lg border-2 bg-white"
      style={{ borderColor: C.blue }}
    >
      <div
        className="px-4 py-3 text-2xl font-medium text-white"
        style={{ background: C.blue }}
      >
        {identify.title}
      </div>
      <div className="space-y-4 p-4">
        {identify.rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[130px_1fr] items-start gap-2 text-lg"
          >
            <label htmlFor={r.id} className="pt-2 text-gray-800">
              {r.label}
            </label>
            <div>
              <select
                id={r.id}
                value={answers[r.id] || ""}
                onChange={(e) => setAnswer(r.id, e.target.value)}
                disabled={submitted}
                className={`w-full rounded border p-2.5 text-lg text-gray-900 shadow-sm ${selectStyle(r)}`}
              >
                <option value="">Select option</option>
                {r.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {submitted && !isCorrect(r) && (
                <p className="mt-1 text-base text-red-700">
                  Correct: {r.correct}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
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

          <section className="rounded" style={{ background: C.panelBg }}>
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <span
                className="rounded-t px-3 py-1.5 text-xs font-medium"
                style={{ background: "#ffffff", color: C.tabActiveText }}
              >
                Incident artifacts
              </span>
              <button
                onClick={handleReset}
                className="mb-1 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white"
                style={{ background: C.btn }}
              >
                <RotateCcw size={13} /> Reset All Answers
              </button>
            </div>

            <div className="space-y-3 p-3">
              <div className="rounded-lg p-4" style={{ background: C.blue }}>
                <div className="flex flex-wrap justify-around gap-4">
                  {pbq.artifacts.map((a) => {
                    const Icon = ICONS[a.icon] || Mail;
                    const active = openId === a.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => openIt(a.id)}
                        className="group flex w-36 flex-col items-center gap-2 text-center text-base font-bold text-white"
                        aria-pressed={active}
                      >
                        <span
                          className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 bg-white transition group-hover:scale-105"
                          style={{
                            borderColor: C.orange,
                            boxShadow: active ? "0 0 0 3px #fff" : "none",
                          }}
                        >
                          <Icon size={38} color={C.orange} strokeWidth={1.8} />
                          {viewed.includes(a.id) && (
                            <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                              <Check size={15} strokeWidth={3} />
                            </span>
                          )}
                        </span>
                        <span className="leading-tight">{a.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {openArtifact ? (
                <div
                  className="overflow-hidden bg-white"
                  style={{ border: `2px solid ${C.blue}` }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 text-xl font-medium text-white"
                    style={{ background: C.blue }}
                  >
                    <span>{openArtifact.label}</span>
                    <button
                      onClick={() => setOpenId(null)}
                      className="rounded border border-white p-1 hover:bg-white/20"
                      aria-label="Close artifact"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="max-h-128 overflow-y-auto p-4">
                    <ArtifactBody a={openArtifact} />
                  </div>
                </div>
              ) : (
                <p className="rounded bg-white/70 p-4 text-center text-base italic text-gray-700">
                  Select an artifact above to review it. A green check marks the
                  ones you have opened.
                </p>
              )}

              <div className="grid gap-3">
                {KillChainCard}
                {IdentifyCard}
              </div>
            </div>
          </section>
        </div>
      </div>

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
              score === maxPoints
                ? "border-green-300 bg-green-50 text-green-900"
                : "border-yellow-300 bg-yellow-50 text-yellow-900"
            }`}
          >
            Score: {score} / {maxPoints} points
          </div>
        )}
      </div>

      {submitted && (
        <div className="space-y-5 border border-gray-500 bg-white p-5 text-sm">
          <h3 className="text-base font-bold text-gray-900">
            Explanation &amp; Review
          </h3>

          <div>
            <p className="mb-2 font-bold text-gray-900">
              Part 1: Identify the incident artifacts
            </p>
            <div className="space-y-3">
              {identify.rows.map((r) => (
                <div
                  key={r.id}
                  className="border-l-4 pl-3"
                  style={{ borderColor: C.tableHead }}
                >
                  <p className="text-gray-900">
                    <strong>{r.label}:</strong> {r.correct}
                  </p>
                  <p className="text-gray-700">{r.why}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <p className="mb-2 font-bold text-gray-900">
              Part 2: Kill chain control mapping
            </p>
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {["Kill chain item", "Control", "Why"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-bold text-white"
                      style={{ background: C.tableHead }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {killChain.rows.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{ background: i % 2 === 0 ? "#ffffff" : C.rowAlt }}
                  >
                    <td className="whitespace-nowrap border-b border-gray-300 px-3 py-2 align-top font-medium">
                      {r.label}
                    </td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top">
                      {r.correct}
                      {r.alsoAccept && r.alsoAccept.length > 0 && (
                        <span className="block text-base text-gray-600">
                          Also accepted: {r.alsoAccept.join(", ")}
                        </span>
                      )}
                    </td>
                    <td className="border-b border-gray-300 px-3 py-2 align-top text-gray-700">
                      {r.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="rounded-lg border bg-white p-4"
            style={{ borderColor: C.tableHead }}
          >
            <p className="mb-1 font-bold text-gray-900">Exam tips</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-700">
              {pbq.review.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
