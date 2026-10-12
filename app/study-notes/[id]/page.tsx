"use client";

import { useState, useEffect, Suspense } from "react";
import { ChevronLeft, Highlighter, Copy, Check, BookOpen, Lock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type {
  StudyNote,
  NoteSection,
  GlossaryItem,
  HighlightedText,
} from "../../types/assets";

function StudyNoteReaderContent() {
  const params = useParams();
  const noteId = params.id as string;

  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sections" | "quick-review" | "glossary">("sections");
  const [selectedSection, setSelectedSection] = useState<NoteSection | null>(null);
  const [highlights, setHighlights] = useState<HighlightedText[]>([]);
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/study-notes/${noteId}`);
        
        if (!response.ok) {
          if (response.status === 403) {
            setError("Access denied. This content requires a Premium subscription.");
          } else if (response.status === 404) {
            setError("Study note not found.");
          } else {
            setError("Failed to load study note.");
          }
          return;
        }
        
        const note: StudyNote = await response.json();
        setSelectedNote(note);
        if (note.sections && note.sections.length > 0) {
          setSelectedSection(note.sections[0]);
        }
        // Reset all state when switching notes
        setHighlights([]);
        setActiveTab("sections");
        setHighlightColor("yellow");
        setCopied(false);
      } catch (err) {
        setError("Failed to load study note.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const newHighlight: HighlightedText = {
        id: Date.now().toString(),
        text: selection.toString(),
        color: highlightColor,
      };
      setHighlights([...highlights, newHighlight]);
      selection.removeAllRanges();
    }
  };

  const removeHighlight = (id: string) => {
    setHighlights(highlights.filter((h) => h.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightColors = [
    { name: "yellow", bg: "bg-yellow-200", text: "text-yellow-700" },
    { name: "green", bg: "bg-green-200", text: "text-green-700" },
    { name: "blue", bg: "bg-blue-200", text: "text-blue-700" },
    { name: "pink", bg: "bg-pink-200", text: "text-pink-700" },
    { name: "purple", bg: "bg-purple-200", text: "text-purple-700" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-600 mb-4">Loading study note...</p>
          <Link
            href="/study-notes"
            className="text-brand-600 hover:text-brand-900 underline"
          >
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Lock size={48} className="mx-auto text-red-600 mb-4" />
          <h2 className="text-2xl font-bold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <Link
            href="/study-notes"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Study Notes
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedNote) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-600 mb-4">Loading study note...</p>
          <Link
            href="/study-notes"
            className="text-brand-600 hover:text-brand-900 underline"
          >
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  const hasSections = selectedNote.sections && selectedNote.sections.length > 0;
  const hasQuickReview = selectedNote.quickReview && selectedNote.quickReview.length > 0;
  const hasGlossary = selectedNote.glossary && selectedNote.glossary.length > 0;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-white border-r border-brand-200 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-brand-200 p-4">
          <Link
            href="/study-notes"
            className="flex items-center gap-2 text-brand-600 hover:text-brand-900 mb-4"
          >
            <ChevronLeft size={20} />
            Back to Notes
          </Link>
          <h2 className="font-bold text-brand-900 truncate text-sm">
            {selectedNote.title}
          </h2>
          <p className="text-xs text-brand-600 mt-1">{selectedNote.module}: {selectedNote.moduleName}</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-brand-200">
          <button
            onClick={() => setActiveTab("sections")}
            className={`w-full px-4 py-3 text-sm font-semibold text-left transition ${
              activeTab === "sections"
                ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                : "text-brand-700 hover:bg-brand-50"
            }`}
          >
            Sections {hasSections && `(${selectedNote.sections!.length})`}
          </button>
          {hasQuickReview && (
            <button
              onClick={() => setActiveTab("quick-review")}
              className={`w-full px-4 py-3 text-sm font-semibold text-left transition border-t border-brand-200 ${
                activeTab === "quick-review"
                  ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                  : "text-brand-700 hover:bg-brand-50"
              }`}
            >
              Quick Review
            </button>
          )}
          {hasGlossary && (
            <button
              onClick={() => setActiveTab("glossary")}
              className={`w-full px-4 py-3 text-sm font-semibold text-left transition border-t border-brand-200 ${
                activeTab === "glossary"
                  ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                  : "text-brand-700 hover:bg-brand-50"
              }`}
            >
              Glossary
            </button>
          )}
        </div>

        {/* Section List */}
        {activeTab === "sections" && hasSections && (
          <nav className="p-4">
            {selectedNote.sections!.map((section: NoteSection, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedSection(section)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition text-sm font-semibold ${
                  selectedSection === section
                    ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                    : "text-brand-700 hover:bg-brand-50"
                }`}
              >
                {section.heading}
              </button>
            ))}
          </nav>
        )}

        {/* Quick Review List */}
        {activeTab === "quick-review" && hasQuickReview && (
          <div className="p-4 space-y-2">
            {selectedNote.quickReview!.map((item: string, idx: number) => (
              <div key={idx} className="text-xs text-brand-700 p-3 bg-brand-50 rounded-lg line-clamp-3">
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Glossary List */}
        {activeTab === "glossary" && hasGlossary && (
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {selectedNote.glossary!.map((item: GlossaryItem, idx: number) => (
              <div key={idx} className="border-l-2 border-brand-600 pl-3">
                <p className="text-xs font-bold text-brand-900">{item.term}</p>
                <p className="text-xs text-brand-700 mt-1">{item.meaning}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-brand-200 p-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-900">
                {selectedNote.title}
              </h1>
              <p className="text-sm text-brand-600 mt-1">
                {selectedNote.domain} • {selectedNote.module} • Est. {selectedNote.estimatedTime}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {highlightColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setHighlightColor(color.name)}
                    className={`w-8 h-8 rounded-lg transition border-2 ${
                      highlightColor === color.name
                        ? `${color.bg} border-brand-600`
                        : `${color.bg} border-transparent hover:border-brand-400`
                    }`}
                    title={`Highlight in ${color.name}`}
                  />
                ))}
              </div>
              <button
                onMouseUp={handleTextSelection}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition"
              >
                <Highlighter size={18} />
                Highlight
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 p-8 max-w-7xl">
            {/* Reading Content */}
            <div className="col-span-2">
              {/* Description Summary */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
                <h3 className="font-bold text-blue-900 mb-2">Overview</h3>
                <p className="text-blue-800 text-sm">{selectedNote.description}</p>
              </div>

              {/* Sections Content */}
              {activeTab === "sections" && hasSections && selectedSection && (
                <div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-6">
                    {selectedSection.heading}
                  </h2>

                  <div className="space-y-6">
                    {/* Explanation */}
                    <div>
                      <p className="text-brand-700 leading-relaxed text-justify whitespace-pre-wrap">
                        {selectedSection.explain}
                      </p>
                    </div>

                    {/* Key Points */}
                    {selectedSection.points && selectedSection.points.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-brand-800 mb-3">Key Points</h3>
                        <ul className="space-y-3">
                          {selectedSection.points.map((point: string, idx: number) => (
                            <li key={idx} className="flex gap-3">
                              <span className="text-brand-600 font-bold">•</span>
                              <span className="text-brand-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Remember Box */}
                    {selectedSection.remember && (
                      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                        <h4 className="font-bold text-purple-900 mb-2">Remember</h4>
                        <p className="text-purple-800 text-sm">{selectedSection.remember}</p>
                      </div>
                    )}

                    {/* Exam Tip */}
                    {selectedSection.examTip && (
                      <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                        <h4 className="font-bold text-orange-900 mb-2">Exam Tip</h4>
                        <p className="text-orange-800 text-sm">{selectedSection.examTip}</p>
                      </div>
                    )}

                    {/* Copy Button */}
                    <button
                      onClick={() => {
                        const parts = [];
                        if (selectedSection.explain) {
                          parts.push(selectedSection.explain);
                        }
                        if (selectedSection.points) {
                          parts.push(selectedSection.points.join("\n"));
                        }
                        copyToClipboard(parts.join("\n\n"));
                      }}
                      className="flex items-center gap-1 mt-4 text-sm text-brand-600 hover:text-brand-900 transition"
                    >
                      {copied ? (
                        <>
                          <Check size={16} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} /> Copy Content
                        </>
                      )}
                    </button>

                    <hr className="my-8 border-brand-200" />
                  </div>
                </div>
              )}

              {/* Quick Review Tab */}
              {activeTab === "quick-review" && hasQuickReview && (
                <div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-6">Quick Review</h2>
                  <p className="text-brand-600 mb-6">Essential points for quick cramming:</p>
                  <ul className="space-y-4">
                    {selectedNote.quickReview!.map((item: string, idx: number) => (
                      <li key={idx} className="flex gap-4 p-4 bg-brand-50 rounded-lg">
                        <span className="text-brand-600 font-bold text-lg">{idx + 1}.</span>
                        <span className="text-brand-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Glossary Tab */}
              {activeTab === "glossary" && hasGlossary && (
                <div>
                  <h2 className="text-3xl font-bold text-brand-900 mb-6">Glossary</h2>
                  <div className="space-y-4">
                    {selectedNote.glossary!.map((item: GlossaryItem, idx: number) => (
                      <div key={idx} className="border-l-4 border-brand-600 pl-4 py-2">
                        <p className="text-lg font-bold text-brand-900">{item.term}</p>
                        <p className="text-brand-700 mt-1">{item.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar - Highlights & Progress */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg border border-brand-200 p-6 sticky top-24">
                <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
                  <Highlighter size={18} />
                  My Highlights ({highlights.length})
                </h3>

                {highlights.length === 0 ? (
                  <p className="text-sm text-brand-600 italic">
                    Select text and click "Highlight" to save highlights here.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {highlights.map((highlight) => (
                      <div
                        key={highlight.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          highlightColors.find(
                            (c) => c.name === highlight.color,
                          )?.bg
                        }`}
                      >
                        <p className="text-sm text-brand-800 line-clamp-3 mb-2">
                          {highlight.text}
                        </p>
                        <button
                          onClick={() => removeHighlight(highlight.id)}
                          className="text-xs text-brand-600 hover:text-brand-900 underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Progress */}
                {hasSections && (
                  <div className="mt-8 pt-6 border-t border-brand-200">
                    <p className="text-xs text-brand-600 mb-2">Reading Progress</p>
                    <div className="w-full bg-brand-100 rounded-full h-2">
                      <div
                        className="bg-brand-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((selectedNote.sections!.indexOf(selectedSection!) + 1) / selectedNote.sections!.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-brand-600 mt-2">
                      Section {selectedNote.sections!.indexOf(selectedSection!) + 1} of{" "}
                      {selectedNote.sections!.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudyNoteReader() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-600 mb-4">Loading study note...</p>
        </div>
      </div>
    }>
      <StudyNoteReaderContent />
    </Suspense>
  );
}
