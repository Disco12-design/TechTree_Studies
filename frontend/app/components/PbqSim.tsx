'use client';

import { useState } from 'react';
import { ChevronRight, RotateCcw, FileText } from 'lucide-react';

const C = {
  tableHead: '#1e3a8a',
  rowAlt: '#eaf0fb',
  panelBg: '#e2e8f0',
  tabIdle: '#cbd5e1',
  tabIdleText: '#1e293b',
  tabActiveText: '#1e3a8a',
  link: '#1d4ed8',
  gold: '#fcd34d',
  btn: '#334155',
};

const toList = (v: any): string[] => (Array.isArray(v) ? v : v ? [v] : []);

const tableBase =
  'w-full min-w-[850px] border-separate border-spacing-0 text-sm lg:text-base';

const thClass =
  'px-4 py-4 text-left font-semibold text-white border-b border-white/20';

const tdClass =
  'px-4 py-4 text-slate-900 border-b border-slate-300 align-middle';

interface PBQSimProps {
  pbq: any;
  onScore?: (id: string, score: number, maxPoints: number) => void;
}

export default function PbqSim({ pbq, onScore }: PBQSimProps) {
  const [activeTab, setActiveTab] = useState(pbq.tabs[0].id);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const maxPoints = pbq.questions.reduce(
    (sum: number, q: any) => sum + q.points,
    0
  );

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isAnswered = (question: any, answer: any) =>
    Array.isArray(answer) ? answer.length > 0 : Boolean(answer);

  const isCorrect = (question: any, answer: any) => {
    if (question.type === 'checkbox') {
      const expected = question.correctAnswer;

      return (
        Array.isArray(answer) &&
        Array.isArray(expected) &&
        answer.length === expected.length &&
        answer.every((value: any) => expected.includes(value))
      );
    }

    return answer === question.correctAnswer;
  };

  const unansweredCount = pbq.questions.filter(
    (question: any) => !isAnswered(question, answers[question.id])
  ).length;

  const handleSubmit = () => {
    setSubmitAttempted(true);

    if (unansweredCount > 0) {
      return;
    }

    let totalPoints = 0;

    pbq.questions.forEach((q: any) => {
      if (isCorrect(q, answers[q.id])) {
        totalPoints += q.points;
      }
    });

    setScore(totalPoints);
    onScore?.(pbq.id, totalPoints, maxPoints);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowQuestion(false);
    setSubmitAttempted(false);
  };

  const formatAnswer = (answer: any) =>
    Array.isArray(answer) ? answer.join(', ') : answer;

  const Mark = ({ ok }: { ok: boolean }) => (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
        ok
          ? 'bg-emerald-600 text-white'
          : 'bg-rose-600 text-white'
      }`}
      aria-label={ok ? 'Applies' : 'Does not apply'}
    >
      {ok ? '✓' : '✕'}
    </span>
  );

  const renderTab = (tab: any) => {
    if (tab.type === 'standards') {
      return (
        <div className="space-y-5">
          <div className="overflow-x-auto  border border-slate-200 bg-white shadow-sm">
            <table className={`${tableBase} `}>
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className={`${thClass} w-[20%] align-middle`}
                    style={{ background: C.tableHead }}
                  >
                    CVSS risk level
                  </th>

                  <th
                    rowSpan={2}
                    className={`${thClass} w-[48%] align-middle`}
                    style={{ background: C.tableHead }}
                  >
                    Remediation standard
                  </th>

                  <th
                    colSpan={3}
                    className={`${thClass} text-center`}
                    style={{ background: C.tableHead }}
                  >
                    Applies to environment
                  </th>
                </tr>

                <tr>
                  {['PROD', 'UAT', 'DEV'].map((env) => (
                    <th
                      key={env}
                      className="w-[10%] border-b border-amber-500 px-4 py-3 text-center text-xs font-bold tracking-wider text-slate-900"
                      style={{ background: C.gold }}
                    >
                      {env}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tab.rows.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className="transition-colors hover:bg-blue-50"
                    style={{
                      background:
                        idx % 2 === 0 ? '#FFFFFF' : C.rowAlt,
                    }}
                  >
                    <td className={`${tdClass} font-semibold`}>
                      {row.level}
                    </td>

                    <td className={`${tdClass} leading-7`}>
                      Must be patched or remediated and verified by a
                      subsequent vulnerability scan within{' '}
                      <span className="inline-block rounded-md bg-blue-900 px-2 py-0.5 font-bold text-white">
                        {row.days} calendar days
                      </span>
                    </td>

                    {row.applies.map((ok: boolean, i: number) => (
                      <td
                        key={i}
                        className={`${tdClass} text-center`}
                      >
                        <Mark ok={ok} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tab.note && (
            <div className="rounded-xl border border-blue-400 bg-blue-100 p-5 text-sm leading-7 text-blue-950">
              {tab.note.map((note: string, idx: number) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (tab.type === 'table') {
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-400 bg-white shadow-sm">
          <table className={tableBase}>
            <thead>
              <tr>
                {tab.columns.map((col: string, idx: number) => (
                  <th
                    key={idx}
                    className={`${thClass} whitespace-nowrap`}
                    style={{ background: C.tableHead }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {tab.rows.map((row: any[], ridx: number) => (
                <tr
                  key={ridx}
                  className="transition-colors hover:bg-blue-50"
                  style={{
                    background:
                      ridx % 2 === 0 ? '#FFFFFF' : C.rowAlt,
                  }}
                >
                  {row.map((cell: any, cidx: number) => (
                    <td
                      key={cidx}
                      className={`${tdClass} min-w-30 whitespace-pre-wrap break-word leading-6`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (tab.type === 'findings') {
      const Row = ({ label, children }: { label: string; children: any }) => (
        <div className="grid grid-cols-1 gap-1 border-b border-slate-300 py-3 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-5">
          <span className="font-semibold text-blue-900">
            {label}
          </span>
          <span className="min-w-0 break-word leading-7 text-slate-900">
            {children}
          </span>
        </div>
      );

      return (
        <div className="max-h-[65vh] space-y-4 overflow-y-auto rounded-xl border border-slate-400 bg-white p-4 shadow-sm sm:p-6">
          {tab.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-300 bg-slate-50 p-4 sm:p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <h3 className="font-semibold text-slate-900">
                  Finding {idx + 1}
                </h3>
              </div>

              <Row label="Title:">{item.title}</Row>
              <Row label="Description:">{item.description}</Row>
              <Row label="Affected asset:">{item.asset}</Row>
              <Row label="Risk:">{item.risk}</Row>
              <Row label="Reference:">{item.reference}</Row>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="rounded-lg bg-rose-50 p-4 text-rose-700">
        Unknown tab type: {tab.type}
      </div>
    );
  };

  const currentTab = pbq.tabs.find((t: any) => t.id === activeTab);

  const renderQuestion = (question: any) => (
    <div
      key={question.id}
      className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <p className="mb-4 font-semibold leading-6 text-slate-900">
        {question.label}
      </p>

      {question.type === 'checkbox' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {question.options.map((option: string) => (
            <label
              key={option}
              className={`flex min-w-0 items-start gap-3 rounded-lg border p-3 transition-colors ${
                answers[question.id]?.includes(option)
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-slate-200 hover:bg-slate-50'
              } ${
                submitted
                  ? 'cursor-not-allowed opacity-70'
                  : 'cursor-pointer'
              }`}
            >
              <input
                type="checkbox"
                checked={
                  answers[question.id]?.includes(option) || false
                }
                onChange={(e) => {
                  const current = answers[question.id] || [];

                  handleAnswer(
                    question.id,
                    e.target.checked
                      ? [...current, option]
                      : current.filter((x: string) => x !== option)
                  );
                }}
                disabled={submitted}
                className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
              />

              <span className="break-word text-sm leading-6 text-slate-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'select' && (
        <select
          value={answers[question.id] || ''}
          onChange={(e) =>
            handleAnswer(question.id, e.target.value)
          }
          disabled={submitted}
          className={`w-full rounded-lg border p-3 text-sm outline-none transition focus:ring-2 focus:ring-blue-200 ${
            answers[question.id]
              ? 'border-blue-300 bg-blue-50 text-blue-900'
              : 'border-slate-300 bg-white text-slate-700'
          }`}
        >
          <option value="">Select an answer</option>

          {question.options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {submitted && (
        <div
          className={`mt-4 rounded-lg border p-3 text-sm ${
            isCorrect(question, answers[question.id])
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
          }`}
          role="status"
        >
          <p className="font-semibold">
            {isCorrect(question, answers[question.id])
              ? `Correct — ${question.points} points`
              : 'Not quite — 0 points'}
          </p>
          {!isCorrect(question, answers[question.id]) && (
            <p className="mt-1">
              <span className="font-semibold">Expected answer: </span>
              {formatAnswer(question.correctAnswer)}
            </p>
          )}
          {question.explanation && (
            <p className="mt-2 leading-6">{question.explanation}</p>
          )}
        </div>
      )}
    </div>
  );

  const pct = maxPoints
    ? Math.round((score / maxPoints) * 100)
    : 0;

  return (
    <div className="w-full space-y-6">
      <div className="border border-gray-500 bg-white">
        <div className="grid gap-4 p-4 md:grid-cols-[270px_1fr]">
          <aside className="space-y-2 text-sm text-gray-800">
            <p className="font-bold">SIMULATION</p>
            {toList(currentTab?.scenario ?? pbq.scenario).map((p: string, i: number) => <p key={i}>{p}</p>)}
            <p className="pt-2 font-bold">INSTRUCTIONS</p>
            {toList(currentTab?.instructions ?? pbq.instructions).map((p: string, i: number) => <p key={i}>{p}</p>)}
          </aside>

          <section className="min-w-0 rounded" style={{ background: C.panelBg }}>
            <div className="flex flex-wrap items-end justify-between gap-2 px-3 pt-3">
              <div className="flex">
                {pbq.tabs.map((tab: any) => {
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

            {/* Tab content */}
            <div className="min-w-0 space-y-4 p-3">
              {currentTab && renderTab(currentTab)}

              {/* Question information toggle */}
              {showQuestion && (
                <div className="rounded-xl border border-blue-600 bg-white p-4 shadow-sm sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText
                      size={18}
                      className="text-blue-700"
                    />
                    <h3 className="font-bold text-slate-900">
                      Simulation Question
                    </h3>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {pbq.question ??
                      pbq.prompt ??
                      pbq.scenario ??
                      'Review the simulation information and complete the required tasks.'}
                  </p>
                </div>
              )}

              {/* Answer area */}
              <div className="border-t border-slate-200 pt-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Your Answers
                  </h3>

                  <span className="text-xs text-slate-500">
                    {submitted
                      ? 'Submission complete'
                      : 'Answer every question before submitting'}
                  </span>
                </div>

                {submitAttempted &&
                  unansweredCount > 0 && (
                  <p
                    className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
                    role="alert"
                  >
                    Answer {unansweredCount === 1 ? 'the remaining question' : `all ${unansweredCount} remaining questions`} before submitting.
                  </p>
                )}

                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {pbq.questions.map(renderQuestion)}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Submission and review */}
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitted}
            aria-describedby={submitAttempted && unansweredCount > 0 ? 'submission-help' : undefined}
            className="flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
            style={{ background: C.tableHead }}
          >
            <span>Submit</span>
            <ChevronRight size={18} />
          </button>

          {submitAttempted && unansweredCount > 0 && (
            <span id="submission-help" className="sr-only">
              {unansweredCount} unanswered question{unansweredCount === 1 ? '' : 's'}.
            </span>
          )}

          {submitted && (
            <div
            className={`rounded-lg border px-6 py-3 font-semibold ${
              score === maxPoints
                ? 'border-green-300 bg-green-50 text-green-900'
                : 'border-yellow-300 bg-yellow-50 text-yellow-900'
            }`}
            >
              Score: {score} / {maxPoints} points
              {maxPoints > 0 && ` (${pct}%)`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
