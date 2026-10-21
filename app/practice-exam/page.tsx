'use client';

import { useEffect, useState } from 'react';
import { Check, Clock, Lock, X } from 'lucide-react';
import { practiceExams, type PracticeExam } from '../types/assets';

const LEVELS = ['All', 'Foundational', 'Associate', 'Professional'];
const ACCESS = ['All', 'Free', 'Pro'];

type Mode = 'practice' | 'real';

type SegmentedProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function Segmented({ label, options, value, onChange }: SegmentedProps) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-3">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="flex rounded-md border border-gray-300 p-0.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
            className={`rounded px-3 py-1 text-sm focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-brand-600 ${
              value === option
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

type Question = NonNullable<PracticeExam['questions']>[number];

function isCorrect(question: Question, selected: string[]) {
  return (
    selected.length === question.answer.length &&
    question.answer.every((a) => selected.includes(a))
  );
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Shows every option with correct / incorrect markers. Used for feedback and end review. */
function OptionsReview({
  question,
  selected,
}: {
  question: Question;
  selected: string[];
}) {
  return (
    <ul className="space-y-2">
      {Object.entries(question.options).map(([option, text]) => {
        const isAnswer = question.answer.includes(option);
        const isPicked = selected.includes(option);

        let style = 'border-gray-200 text-gray-700';
        if (isAnswer) style = 'border-green-600 bg-green-50 text-gray-900';
        else if (isPicked) style = 'border-red-600 bg-red-50 text-gray-900';

        return (
          <li
            key={option}
            className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${style}`}
          >
            <span className="font-medium">{option}.</span>
            <span className="flex-1">{text}</span>
            {isAnswer && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                <Check className="h-4 w-4" aria-hidden />
                Correct answer{isPicked ? ' (your pick)' : ''}
              </span>
            )}
            {!isAnswer && isPicked && (
              <span className="flex items-center gap-1 text-xs font-semibold text-red-700">
                <X className="h-4 w-4" aria-hidden />
                Your answer
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function PracticeExam() {
  const [level, setLevel] = useState('All');
  const [access, setAccess] = useState('All');
  const [pendingExam, setPendingExam] = useState<PracticeExam | null>(null);
  const [activeExam, setActiveExam] = useState<PracticeExam | null>(null);
  const [mode, setMode] = useState<Mode>('practice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  // Countdown timer – real exam mode only
  useEffect(() => {
    if (!activeExam || mode !== 'real' || submitted || secondsLeft === null) return;

    if (secondsLeft <= 0) {
      setTimedOut(true);
      setSubmitted(true);
      return;
    }

    const id = setTimeout(() => setSecondsLeft((s) => (s === null ? s : s - 1)), 1000);
    return () => clearTimeout(id);
  }, [activeExam, mode, submitted, secondsLeft]);

  const filtered = practiceExams.filter(
    (e) =>
      (level === 'All' || e.level === level) &&
      (access === 'All' || e.access === access)
  );

  const isFiltered = level !== 'All' || access !== 'All';

  const reset = () => {
    setLevel('All');
    setAccess('All');
  };

  const startExam = (exam: PracticeExam, chosenMode: Mode) => {
    setPendingExam(null);
    setActiveExam(exam);
    setMode(chosenMode);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setChecked({});
    setSubmitted(false);
    setTimedOut(false);
    setSecondsLeft(chosenMode === 'real' ? Number(exam.timeCap) * 60 : null);
  };

  const exitExam = () => {
    setActiveExam(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setChecked({});
    setSubmitted(false);
    setTimedOut(false);
    setSecondsLeft(null);
  };

  if (activeExam?.questions?.length) {
    const questions = activeExam.questions;
    const question = questions[currentQuestionIndex];
    const selectedAnswers = answers[question.id] ?? [];
    const isChecked = mode === 'practice' && !!checked[question.id];
    const explanation = (question as { explanation?: string }).explanation;

    const correctCount = questions.filter((item) =>
      isCorrect(item, answers[item.id] ?? [])
    ).length;
    const unansweredCount = questions.filter(
      (item) => (answers[item.id] ?? []).length === 0
    ).length;

    const toggleAnswer = (option: string) => {
      if (isChecked) return;
      setAnswers((current) => {
        const selected = current[question.id] ?? [];
        const next =
          question.type === 'single_choice'
            ? [option]
            : selected.includes(option)
              ? selected.filter((answer) => answer !== option)
              : [...selected, option];

        return { ...current, [question.id]: next };
      });
    };

    const handleExit = () => {
      if (!submitted && !window.confirm('Exit this exam? Your progress will be lost.')) return;
      exitExam();
    };

    const handleSubmit = () => {
      if (
        mode === 'real' &&
        unansweredCount > 0 &&
        !window.confirm(
          `You have ${unansweredCount} unanswered ${unansweredCount === 1 ? 'question' : 'questions'}. Submit anyway?`
        )
      ) {
        return;
      }
      setSubmitted(true);
    };

    const progressValue = submitted ? questions.length : currentQuestionIndex + 1;

    return (
      <main className="mx-auto w-full max-w-4xl px-5 py-8">
        <button
          type="button"
          onClick={handleExit}
          className="mb-6 text-sm font-medium text-brand-700 underline underline-offset-4"
        >
          Exit exam
        </button>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-brand-700">{activeExam.code}</p>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                mode === 'practice'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-900 text-white'
              }`}
            >
              {mode === 'practice' ? 'Practice mode' : 'Real exam'}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold text-gray-900">{activeExam.title}</h1>
          <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
            <span>
              {submitted
                ? 'Exam complete'
                : `Question ${currentQuestionIndex + 1} of ${questions.length}`}
            </span>
            {!submitted && mode === 'real' && secondsLeft !== null && (
              <span
                className={`flex items-center gap-1.5 font-medium tabular-nums ${
                  secondsLeft <= 300 ? 'text-red-700' : 'text-gray-900'
                }`}
              >
                <Clock className="h-4 w-4" aria-hidden />
                {formatTime(secondsLeft)} left
              </span>
            )}
            {!submitted && mode === 'practice' && (
              <span>{isChecked ? 'Answer checked' : selectedAnswers.length ? 'Ready to check' : 'Not answered'}</span>
            )}
          </div>
          <div
            className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
            aria-label="Exam progress"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={progressValue}
          >
            <div
              className="h-full bg-brand-600 transition-all"
              style={{ width: `${(progressValue / questions.length) * 100}%` }}
            />
          </div>
        </header>

        {submitted ? (
          <>
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              {timedOut && (
                <p
                  role="alert"
                  className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                >
                  Time&apos;s up — your exam was submitted automatically.
                </p>
              )}
              <h2 className="text-xl font-semibold text-gray-900">Your results</h2>
              <p className="mt-2 text-gray-600">
                You answered {correctCount} of {questions.length} questions correctly (
                {Math.round((correctCount / questions.length) * 100)}%).
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => startExam(activeExam, mode)}
                  className="rounded-md border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Retake
                </button>
                <button
                  type="button"
                  onClick={exitExam}
                  className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Back to exams
                </button>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">Review your answers</h2>
              <ol className="mt-4 space-y-6">
                {questions.map((item, index) => {
                  const selected = answers[item.id] ?? [];
                  const correct = isCorrect(item, selected);
                  const itemExplanation = (item as { explanation?: string }).explanation;

                  return (
                    <li
                      key={item.id}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-medium leading-relaxed text-gray-900">
                          {index + 1}. {item.question}
                        </p>
                        <span
                          className={`flex shrink-0 items-center gap-1 text-sm font-semibold ${
                            correct ? 'text-green-700' : 'text-red-700'
                          }`}
                        >
                          {correct ? (
                            <Check className="h-4 w-4" aria-hidden />
                          ) : (
                            <X className="h-4 w-4" aria-hidden />
                          )}
                          {correct ? 'Correct' : selected.length ? 'Incorrect' : 'Unanswered'}
                        </span>
                      </div>
                      <div className="mt-4">
                        <OptionsReview question={item} selected={selected} />
                      </div>
                      {itemExplanation && (
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">
                          <span className="font-medium text-gray-900">Explanation: </span>
                          {itemExplanation}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          </>
        ) : (
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold leading-relaxed text-gray-900">
              {question.question}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {question.type === 'multiple_choice'
                ? 'Select all that apply.'
                : 'Select one answer.'}
            </p>

            {isChecked ? (
              <div className="mt-6">
                <OptionsReview question={question} selected={selectedAnswers} />
              </div>
            ) : (
              <fieldset className="mt-6 space-y-3">
                <legend className="sr-only">Answer options</legend>
                {Object.entries(question.options).map(([option, text]) => {
                  const inputId = `question-${question.id}-option-${option}`;
                  const selected = selectedAnswers.includes(option);

                  return (
                    <label
                      key={option}
                      htmlFor={inputId}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        selected
                          ? 'border-brand-600 bg-brand-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <input
                        id={inputId}
                        type={question.type === 'multiple_choice' ? 'checkbox' : 'radio'}
                        name={`question-${question.id}`}
                        value={option}
                        checked={selected}
                        onChange={() => toggleAnswer(option)}
                        className="mt-1 accent-brand-600"
                      />
                      <span className="font-medium text-gray-900">{option}.</span>
                      <span className="text-gray-700">{text}</span>
                    </label>
                  );
                })}
              </fieldset>
            )}

            {/* Practice-mode instant feedback */}
            {isChecked && (
              <div
                role="status"
                className={`mt-5 rounded-lg px-4 py-3 text-sm ${
                  isCorrect(question, selectedAnswers)
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                <p className="font-semibold">
                  {isCorrect(question, selectedAnswers)
                    ? 'Correct!'
                    : `Not quite. The correct answer${question.answer.length > 1 ? 's are' : ' is'} ${question.answer.join(', ')}.`}
                </p>
                {explanation && <p className="mt-1">{explanation}</p>}
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((index) => index - 1)}
                disabled={currentQuestionIndex === 0}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex items-center gap-3">
                {mode === 'practice' && !isChecked && (
                  <button
                    type="button"
                    onClick={() => setChecked((c) => ({ ...c, [question.id]: true }))}
                    disabled={selectedAnswers.length === 0}
                    className="rounded-md border border-brand-600 px-5 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Check answer
                  </button>
                )}

                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((index) => index + 1)}
                    className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    {mode === 'practice' ? 'Finish' : 'Submit exam'}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }

  return (
    <div className="w-full px-5 py-8">
      {/* Header */}
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Practice exams
          </h1>
          <p className="mt-2 max-w-xl text-base text-gray-600">
            Timed, full-length simulations written to match the real exam
            format, so test day isn&apos;t the first time you see it.
          </p>
        </div>

        <dl className="flex gap-10">
          <div>
            <dd className="text-2xl font-semibold tabular-nums text-gray-900">
              {practiceExams.length}
            </dd>
            <dt className="text-sm text-gray-500">exams available</dt>
          </div>
          <div>
            <dd className="text-2xl font-semibold tabular-nums text-gray-900">
              84%
            </dd>
            <dt className="text-sm text-gray-500">average pass rate</dt>
          </div>
        </dl>
      </header>

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-gray-200 py-3">
        <Segmented label="Level" options={LEVELS} value={level} onChange={setLevel} />
        <Segmented label="Access" options={ACCESS} value={access} onChange={setAccess} />

        <div className="ml-auto flex items-center gap-4 text-sm text-gray-500">
          <span aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'exam' : 'exams'}
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="text-gray-900 underline underline-offset-4 hover:text-brand-700"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Exam list */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-medium text-gray-900">No exams match these filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 text-sm text-brand-700 underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filtered.map((exam) => (
            <li
              key={exam.id}
              className="grid gap-5 py-8 md:grid-cols-[10rem_1fr_11rem] md:gap-10"
            >
              {/* Identity */}
              <div>
                <p className="text-2xl font-semibold tracking-tight text-gray-900">
                  {exam.code}
                </p>
                <p className="text-sm text-gray-500">{exam.level}</p>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-600">
                  {exam.description}
                </p>

                <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
                  {[
                    { label: 'questions', value: exam.items },
                    { label: 'minutes', value: exam.timeCap },
                    { label: 'to pass', value: exam.targetPass },
                    { label: 'max score', value: exam.maxScore },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse">
                      <dt className="text-xs text-gray-500">{stat.label}</dt>
                      <dd className="text-lg font-semibold tabular-nums text-gray-900">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {exam.domains.length > 0 && (
                  <p className="mt-5 max-w-2xl text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Covers </span>
                    {exam.domains.join(', ')}
                  </p>
                )}
              </div>

              {/* Action */}
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-start">
                <p
                  className={`flex items-center gap-1.5 text-sm font-medium ${
                    exam.access === 'Free' ? 'text-green-700' : 'text-gray-700'
                  }`}
                >
                  {exam.access === 'Pro' && <Lock className="h-3.5 w-3.5" aria-hidden />}
                  {exam.access === 'Free' ? 'Free' : 'Pro plan'}
                </p>
                <button
                  type="button"
                  onClick={() => setPendingExam(exam)}
                  disabled={!exam.questions?.length}
                  className="rounded-md bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {exam.questions?.length ? 'Start exam' : 'Coming soon'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Mode picker */}
      {pendingExam && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5"
          onClick={() => setPendingExam(null)}
          onKeyDown={(e) => e.key === 'Escape' && setPendingExam(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mode-title"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="mode-title" className="text-xl font-semibold text-gray-900">
              How do you want to take {pendingExam.code}?
            </h2>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                autoFocus
                onClick={() => startExam(pendingExam, 'practice')}
                className="rounded-lg border border-gray-300 p-4 text-left hover:border-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <p className="font-semibold text-gray-900">Practice mode</p>
                <p className="mt-1 text-sm text-gray-600">
                  No timer. Check each answer as you go and see right away what
                  you got wrong, with the correct answer shown.
                </p>
              </button>

              <button
                type="button"
                onClick={() => startExam(pendingExam, 'real')}
                className="rounded-lg border border-gray-300 p-4 text-left hover:border-brand-600 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600"
              >
                <p className="font-semibold text-gray-900">Real exam</p>
                <p className="mt-1 text-sm text-gray-600">
                  {pendingExam.timeCap}-minute countdown. No feedback during the
                  exam. Your score and a full answer review appear at the end.
                </p>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPendingExam(null)}
              className="mt-5 text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}