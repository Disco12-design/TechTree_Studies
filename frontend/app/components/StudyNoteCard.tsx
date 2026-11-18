'use client';

import Link from 'next/link';
import { Eye, Lock } from 'lucide-react';
import type { StudyNote } from '../types/assets';

interface StudyNoteCardProps {
  note: StudyNote;
}

export default function StudyNoteCard({ note }: StudyNoteCardProps) {
  const Icon = note.icon;

  return (
    <div className="bg-white rounded-lg border border-brand-200 hover:border-brand-400 hover:shadow-lg transition-all p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-100 rounded-lg">
            <Icon size={24} className="text-brand-600" />
          </div>
          <div>
            <h3 className="font-bold text-brand-900 text-lg">{note.title}</h3>
            <p className="text-sm text-brand-500">{note.module} • {note.domainName}</p>
          </div>
        </div>
        {note.access === 'Premium' && (
          <div className="px-2 py-1 bg-brand-100 rounded text-xs font-semibold text-brand-700">
            <Lock size={14} className="inline mr-1" />
            Premium
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-brand-700 mb-4 line-clamp-2">{note.description}</p>

      {/* Stats Row */}
      <div className="flex items-center justify-between py-3 border-t border-brand-100 mb-4">
        <div className="text-center flex-1">
          <p className="text-xs text-brand-500">Est. Time</p>
          <p className="font-bold text-brand-900">{note.estimatedTime}</p>
        </div>
        <div className="text-center flex-1">
          <p className="text-xs text-brand-500">Last Updated</p>
          <p className="font-bold text-brand-900 text-sm">{note.lastUpdated}</p>
        </div>
      </div>

      {/* Action Button */}
      <Link
        href={`/study-notes/${note.id}`}
        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
      >
        <Eye size={16} />
        Review & Study
      </Link>
    </div>
  );
}
