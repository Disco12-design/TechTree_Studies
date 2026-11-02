'use client';

import { useState } from 'react';
import { pbqs } from '../data/pbq';
import PbqSim from '../components/PbqSim';

export default function PBQPage() {
  const [selectedPBQ, setSelectedPBQ] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, { score: number; maxPoints: number }>>({});

  const currentPBQ = selectedPBQ ? pbqs.find((p) => p.id === selectedPBQ) : null;

  const handleScore = (id: string, score: number, maxPoints: number) => {
    setScores((prev) => ({ ...prev, [id]: { score, maxPoints } }));
  };

  if (currentPBQ) {
    return (
      <div className="min-h-dvh bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => setSelectedPBQ(null)}
            className="mb-6 rounded-lg bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          >
            ← Back to PBQ List
          </button>

          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{currentPBQ.title}</h1>
            <p className="mt-2 text-gray-600">
              Estimated time: {currentPBQ.estimatedMinutes} minutes
            </p>
          </div>

          <PbqSim pbq={currentPBQ} onScore={handleScore} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Performance-Based Questions</h1>
          <p className="mt-2 text-lg text-gray-600">
            Practice with interactive simulations to build your cybersecurity skills
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pbqs.map((pbq) => {
            const pbqScore = scores[pbq.id];
            const percentage = pbqScore
              ? Math.round((pbqScore.score / pbqScore.maxPoints) * 100)
              : 0;

            return (
              <div
                key={pbq.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {pbq.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {pbq.estimatedMinutes} minutes
                    </p>
                  </div>
                </div>

                {pbqScore && (
                  <div className="mb-4 rounded-lg bg-green-50 p-3">
                    <p className="text-sm font-semibold text-green-900">
                      Score: {pbqScore.score} / {pbqScore.maxPoints} ({percentage}%)
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setSelectedPBQ(pbq.id)}
                  className="w-full rounded-lg bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  {pbqScore ? 'Retake' : 'Start'} PBQ
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
