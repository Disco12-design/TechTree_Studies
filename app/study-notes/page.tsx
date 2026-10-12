'use client';

import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { studyNotes } from '../types/assets';
import StudyNoteCard from '../components/StudyNoteCard';
import StudyNotesFilter from '../components/StudyNotesFilter';

export default function StudyNotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // Filter and search study notes
  const filteredNotes = useMemo(() => {
    return studyNotes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesDomain = !selectedDomain || note.domain === selectedDomain;
      const matchesModule = !selectedModule || note.module === selectedModule;

      return matchesSearch && matchesDomain && matchesModule;
    });
  }, [searchTerm, selectedDomain, selectedModule]);

  return (
    <div className="w-full">
      {/* Header */}
      <header className="border-b border-brand-200 bg-white sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-brand-900">Study Notes</h1>
              <p className="text-brand-600 m  t-1">Comprehensive cybersecurity learning materials</p>
            </div>
            <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition">
              <Plus size={20} />
              New Note
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search topics, keywords, certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-8 py-8">
        {/* Filter Section */}
        <StudyNotesFilter
          selectedDomain={selectedDomain}
          selectedModule={selectedModule}
          onDomainChange={setSelectedDomain}
          onModuleChange={setSelectedModule}
        />

        {/* Results Summary */}
        {filteredNotes.length === 0 && searchTerm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain(null);
                setSelectedModule(null);
              }}
              className="text-sm text-brand-600 hover:text-brand-900 underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Study Notes Grid */}
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <StudyNoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search size={48} className="mx-auto text-brand-300" />
            </div>
            <h3 className="text-xl font-bold text-brand-900 mb-2">No study notes found</h3>
            <p className="text-brand-600 mb-6">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDomain(null);
                setSelectedModule(null);
              }}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <Plus size={18} />
              View All Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
