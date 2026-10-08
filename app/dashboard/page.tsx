"use client";

import { profile, metrics, examAttempts } from "../types/assets";
import {
  Search,
  Calendar,
  Lock,
  Award,
  Clock,
  Plus,
  Download,
  Eye,
} from "lucide-react";

export default function Dashboard() {
  const ProfileIcon = profile.icon;

  return (
    <div className="w-full">
      {/* Header */}
      <header className="border-b border-brand-200 bg-white">
        <div className="px-8 py-4 flex items-center justify-between">
          {/* Pro Plan Badge */}

          {/* Search Bar */}
          <div className="flex-1 max-w-sm mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search practice sets, topics..."
                className="w-full pl-10 pr-4 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-brand-900">{profile.name}</p>
              <p className="text-xs text-brand-600">
                Candidate {profile.candidateId}
              </p>
            </div>
            <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold">
              <ProfileIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-brand-900">
              Welcome back, {profile.name}
            </h1>
            <div className="flex items-center gap-1 bg-brand-800 text-white text-xs font-semibold px-3 py-1 rounded-full">
              <Award size={14} />
              <span>PRO MEMBER</span>
            </div>
          </div>
          <p className="text-brand-600">
            CompTIA Security+ & AWS SAA-C03 Candidate
          </p>
        </div>

        {/* Target Exam Section */}
        <div className="bg-white rounded-lg border border-brand-200 p-6 mb-8">
          <div className="flex items-center gap-2 text-brand-600 mb-2">
            <Calendar size={18} />
            <span className="font-semibold">Target Exam Date</span>
          </div>
          <p className="text-2xl font-bold text-brand-900">June 14, 2025</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Set Date */}
          <div className="flex items-center justify-between gap-6 rounded-lg border border-brand-200 bg-white p-6 transition hover:shadow-lg">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-brand-600">
                Set date for exam
              </h3>
              <p className="text-sm text-brand-950">
                Setting the date for your upcoming exam will help you better
                prepare for upcoming exam
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-6 py-2 font-semibold text-white transition hover:bg-brand-700">
              Set Date
              <Plus size={14} />
            </button>
          </div>

          {/* Start New Test */}
          <div className="flex items-center justify-between gap-6 rounded-lg border border-brand-200 bg-white p-6 transition hover:shadow-lg">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-brand-600">
                Begin your preparation
              </h3>
              <p className="text-sm text-brand-950">
                Start a new practice test now
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-6 py-2 font-semibold text-white transition hover:bg-brand-700">
              Start test
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-6">
            Your Performance
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {/* Exams Taken */}
            <div className="bg-white rounded-lg border border-brand-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {/* <p className="text-xs font-semibold text-brand-600 mb-1 uppercase tracking-wide">{metrics.examsTaken.label}</p> */}
                  <p className="text-3xl font-bold text-brand-900">
                    {metrics.examsTaken.value}
                  </p>
                </div>
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                  {(() => {
                    const Icon = metrics.examsTaken.icon;
                    return <Icon size={20} />;
                  })()}
                </div>
              </div>
              <p className="text-xs text-brand-600">
                <span className="font-semibold text-brand-600">
                  {metrics.examsTaken.change}
                </span>{" "}
                {metrics.examsTaken.changeLabel}
              </p>
            </div>

            {/* Average Score */}
            <div className="bg-white rounded-lg border border-brand-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-brand-600 mb-1 uppercase tracking-wide">
                    {metrics.averageScore.label}
                  </p>
                  <p className="text-3xl font-bold text-brand-900">
                    {metrics.averageScore.value}
                  </p>
                  <p className="text-xs text-brand-600">
                    / {metrics.averageScore.maxValue}
                  </p>
                </div>
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                  {(() => {
                    const Icon = metrics.averageScore.icon;
                    return <Icon size={20} />;
                  })()}
                </div>
              </div>
              <p className="text-xs text-brand-600">
                <span className="font-semibold text-brand-600">
                  {metrics.averageScore.change}
                </span>{" "}
                {metrics.averageScore.changeLabel}
              </p>
            </div>

            {/* Best Score */}
            <div className="bg-white rounded-lg border border-brand-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-brand-600 mb-1 uppercase tracking-wide">
                    {metrics.bestScore.label}
                  </p>
                  <p className="text-3xl font-bold text-brand-900">
                    {metrics.bestScore.value}
                  </p>
                  <p className="text-xs text-brand-600">
                    / {metrics.bestScore.maxValue}
                  </p>
                </div>
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                  {(() => {
                    const Icon = metrics.bestScore.icon;
                    return <Icon size={20} />;
                  })()}
                </div>
              </div>
            </div>

            {/* Pass Rate */}
            <div className="bg-white rounded-lg border border-brand-200 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-brand-600 mb-1 uppercase tracking-wide">
                    {metrics.passRate.label}
                  </p>
                  <p className="text-3xl font-bold text-brand-900">
                    {metrics.passRate.value}
                  </p>
                </div>
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                  {(() => {
                    const Icon = metrics.passRate.icon;
                    return <Icon size={20} />;
                  })()}
                </div>
              </div>
              <p className="text-xs text-brand-600">
                <span className="font-semibold">{metrics.passRate.detail}</span>
              </p>
              <p className="text-xs text-brand-500 mt-1">
                ({metrics.passRate.cutScore})
              </p>
            </div>
          </div>
        </div>

        {/* Recent Practice Exam Attempts */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-900">
              Recent Practice Exam Attempts
            </h2>
            <button className="text-white text-sm font-semibold bg-brand-800 py-2 px-4 rounded-full">
              View all 14 Attempts
            </button>
          </div>

          <div className="bg-white rounded-lg border border-black overflow-hidden">
            <table className="w-full">
              <thead className="bg-brand-50 border-b border-black">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide">
                    Exam Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide">
                    Exam Completed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide">
                    Result
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide">
                    Duration
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-semibold text-brand-600 uppercase tracking-wide"
                    colSpan={2}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {examAttempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-brand-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-brand-900">
                        {attempt.date}
                      </div>
                      <div className="text-xs text-brand-600">
                        {attempt.time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-brand-900">
                        {attempt.examName}
                      </div>
                      <div className="text-xs text-brand-600">
                        {attempt.examNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-brand-900">
                        {attempt.score}
                      </div>
                      <div className="text-xs text-brand-600">
                        / {attempt.maxScore}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          attempt.status === "pass"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {attempt.result}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-brand-900">
                        {attempt.duration}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand-600 px-6 py-2 font-semibold text-white transition hover:bg-brand-700">
                        Set Date
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
