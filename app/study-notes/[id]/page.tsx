
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import {
  ChevronLeft,
  Highlighter,
  Copy,
  Check,
  Lock,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type {
  StudyNote,
  NoteSection,
  GlossaryItem,
  HighlightedText,
} from "../../types/assets";

type TabName = "sections" | "quick-review" | "glossary";

function StudyNoteReaderContent() {
  const params = useParams();
  const noteId = params.id as string;

  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabName>("sections");
  const [selectedSection, setSelectedSection] =
    useState<NoteSection | null>(null);
  const [highlights, setHighlights] = useState<HighlightedText[]>([]);
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchNote = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/study-notes/${noteId}`);

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "Access denied. This content requires a Premium subscription."
            );
          }

          if (response.status === 404) {
            throw new Error("Study note not found.");
          }

          throw new Error("Failed to load study note.");
        }

        const note: StudyNote = await response.json();

        if (cancelled) return;

        setSelectedNote(note);
        setSelectedSection(note.sections?.[0] ?? null);
        setHighlights([]);
        setActiveTab("sections");
        setHighlightColor("yellow");
        setCopied(false);
        setSidebarOpen(false);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load study note."
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (noteId) fetchNote();

    return () => {
      cancelled = true;
    };
  }, [noteId]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidebarOpen]);

  const scrollContentToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleSelectSection = (section: NoteSection) => {
    setSelectedSection(section);
    setSidebarOpen(false);
    scrollContentToTop();
  };

  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
    scrollContentToTop();

    if (tab !== "sections") {
      setSidebarOpen(false);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (!text) return;

    const newHighlight: HighlightedText = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      text,
      color: highlightColor,
    };

    setHighlights((previous) => [...previous, newHighlight]);
    selection?.removeAllRanges();
  };

  const removeHighlight = (id: string) => {
    setHighlights((previous) =>
      previous.filter((highlight) => highlight.id !== id)
    );
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy content:", err);
    }
  };

  const highlightColors = [
    { name: "yellow", bg: "bg-yellow-200" },
    { name: "green", bg: "bg-green-200" },
    { name: "blue", bg: "bg-blue-200" },
    { name: "pink", bg: "bg-pink-200" },
    { name: "purple", bg: "bg-purple-200" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
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
    const accessDenied = error.startsWith("Access denied");

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Lock size={48} className="mx-auto text-red-600 mb-4" />

          <h2 className="text-xl sm:text-2xl font-bold text-red-900 mb-2">
            {accessDenied ? "Access Denied" : "Unable to Load Study Note"}
          </h2>

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-brand-600 mb-4">Study note unavailable.</p>
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

  const hasSections = !!selectedNote.sections?.length;
  const hasQuickReview = !!selectedNote.quickReview?.length;
  const hasGlossary = !!selectedNote.glossary?.length;

  const currentSectionIndex =
    selectedNote.sections?.findIndex(
      (section) => section === selectedSection
    ) ?? -1;

  const readingProgress =
    hasSections && currentSectionIndex >= 0
      ? ((currentSectionIndex + 1) / selectedNote.sections!.length) * 100
      : 0;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Navigation sidebar */}
      <aside
        id="study-note-sidebar"
        className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] bg-white border-r border-brand-200 overflow-y-auto transition-transform duration-200 ease-out md:static md:z-auto md:w-64 md:max-w-none md:shrink-0 md:translate-x-0 xl:w-72 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="sticky top-0 z-10 bg-white border-b border-brand-200 p-3 sm:p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            {/* Arrow-only back navigation */}
            <Link
              href="/study-notes"
              title="Back to Study Notes"
              aria-label="Back to Study Notes"
              className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-brand-50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <ChevronLeft size={25} />
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-brand-600 hover:bg-brand-50"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          <h2 className="font-bold text-brand-900 text-sm leading-relaxed break-word">
            {selectedNote.title}
          </h2>

          <p className="text-xs text-brand-600 mt-2 leading-relaxed break-word">
            {selectedNote.module}: {selectedNote.moduleName}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-brand-200">
          <button
            onClick={() => handleTabChange("sections")}
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
              onClick={() => handleTabChange("quick-review")}
              className={`w-full px-4 py-3 text-sm font-semibold text-left border-t border-brand-200 transition ${
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
              onClick={() => handleTabChange("glossary")}
              className={`w-full px-4 py-3 text-sm font-semibold text-left border-t border-brand-200 transition ${
                activeTab === "glossary"
                  ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                  : "text-brand-700 hover:bg-brand-50"
              }`}
            >
              Glossary
            </button>
          )}
        </div>

        {/* Section list */}
        {activeTab === "sections" && hasSections && (
          <nav className="p-3 sm:p-4 space-y-2">
            {selectedNote.sections!.map(
              (section: NoteSection, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSelectSection(section)}
                  aria-current={
                    selectedSection === section ? "page" : undefined
                  }
                  className={`w-full min-w-0 text-left px-3 sm:px-4 py-3 rounded-lg transition text-sm leading-6 font-medium break-word whitespace-normal ${
                    selectedSection === section
                      ? "bg-brand-100 text-brand-900 border-l-4 border-brand-600"
                      : "text-brand-700 hover:bg-brand-50"
                  }`}
                >
                  {section.heading}
                </button>
              )
            )}
          </nav>
        )}

        {/* Quick review preview */}
        {activeTab === "quick-review" && hasQuickReview && (
          <div className="hidden lg:block p-4 space-y-2">
            {selectedNote.quickReview!.map((item: string, index: number) => (
              <div
                key={index}
                className="text-xs leading-relaxed text-brand-700 p-3 bg-brand-50 rounded-lg break-word"
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Glossary preview */}
        {activeTab === "glossary" && hasGlossary && (
          <div className="hidden lg:block p-4 space-y-3">
            {selectedNote.glossary!.map(
              (item: GlossaryItem, index: number) => (
                <div
                  key={index}
                  className="border-l-2 border-brand-600 pl-3"
                >
                  <p className="text-xs font-bold text-brand-900 break-word">
                    {item.term}
                  </p>
                  <p className="text-xs leading-relaxed text-brand-700 mt-1 break-word">
                    {item.meaning}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Toolbar */}
        <header className="bg-white border-b border-brand-200 p-3 sm:p-4 shrink-0 z-20">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden shrink-0 p-2 -ml-1 rounded-lg text-brand-700 hover:bg-brand-50"
                aria-label="Open navigation"
                aria-expanded={sidebarOpen}
                aria-controls="study-note-sidebar"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-brand-900 leading-snug break-word">
                  {selectedNote.title}
                </h1>

                <p className="text-xs sm:text-sm text-brand-600 mt-2 leading-relaxed break-word">
                  {selectedNote.domain} • {selectedNote.module} • Est.{" "}
                  {selectedNote.estimatedTime}
                </p>
              </div>
            </div>

            {/* Highlight toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 xl:justify-end shrink-0">
              <div
                className="flex flex-wrap items-center gap-2"
                aria-label="Highlight colour"
              >
                {highlightColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setHighlightColor(color.name)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border-2 transition ${
                      color.bg
                    } ${
                      highlightColor === color.name
                        ? "border-brand-600 ring-2 ring-brand-100"
                        : "border-transparent hover:border-brand-400"
                    }`}
                    title={`Highlight in ${color.name}`}
                    aria-label={`Highlight in ${color.name}`}
                    aria-pressed={highlightColor === color.name}
                  />
                ))}
              </div>

              <button
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleTextSelection}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm"
              >
                <Highlighter size={18} />
                Highlight
              </button>
            </div>
          </div>
        </header>

        {/* Reading area */}
        <main
          ref={contentRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain"
        >
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-6 p-4 sm:p-5 lg:p-6 xl:p-8 max-w-7xl mx-auto w-full">
            {/* Main study content */}
            <div className="xl:col-span-2 min-w-0">
              {/* Overview */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-5 sm:mb-6">
                <h3 className="font-bold text-blue-900 mb-2">
                  Overview
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed break-word">
                  {selectedNote.description}
                </p>
              </div>

              {/* Sections */}
              {activeTab === "sections" &&
                hasSections &&
                selectedSection && (
                  <article>
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6 leading-snug break-word">
                      {selectedSection.heading}
                    </h2>

                    <div className="space-y-6">
                      <p className="text-brand-700 leading-7 text-left sm:text-justify whitespace-pre-wrap break-word">
                        {selectedSection.explain}
                      </p>

                      {!!selectedSection.points?.length && (
                        <div>
                          <h3 className="text-lg font-bold text-brand-800 mb-3">
                            Key Points
                          </h3>

                          <ul className="space-y-3">
                            {selectedSection.points.map(
                              (point: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <span className="text-brand-600 font-bold shrink-0">
                                    •
                                  </span>
                                  <span className="text-brand-700 min-w-0 leading-7 break-word">
                                    {point}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {selectedSection.remember && (
                        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                          <h4 className="font-bold text-purple-900 mb-2">
                            Remember
                          </h4>
                          <p className="text-purple-800 text-sm leading-7 break-word">
                            {selectedSection.remember}
                          </p>
                        </div>
                      )}

                      {selectedSection.examTip && (
                        <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                          <h4 className="font-bold text-orange-900 mb-2">
                            Exam Tip
                          </h4>
                          <p className="text-orange-800 text-sm leading-7 break-word">
                            {selectedSection.examTip}
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          const parts: string[] = [];

                          if (selectedSection.explain) {
                            parts.push(selectedSection.explain);
                          }

                          if (selectedSection.points?.length) {
                            parts.push(selectedSection.points.join("\n"));
                          }

                          if (selectedSection.remember) {
                            parts.push(
                              `Remember:\n${selectedSection.remember}`
                            );
                          }

                          if (selectedSection.examTip) {
                            parts.push(
                              `Exam Tip:\n${selectedSection.examTip}`
                            );
                          }

                          void copyToClipboard(parts.join("\n\n"));
                        }}
                        className="flex items-center gap-2 mt-4 py-2 text-sm text-brand-600 hover:text-brand-900 transition"
                      >
                        {copied ? (
                          <>
                            <Check size={16} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copy Content
                          </>
                        )}
                      </button>

                      <hr className="my-6 sm:my-8 border-brand-200" />
                    </div>
                  </article>
                )}

              {/* Quick review */}
              {activeTab === "quick-review" && hasQuickReview && (
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6">
                    Quick Review
                  </h2>

                  <p className="text-brand-600 mb-4 sm:mb-6">
                    Essential points for quick revision:
                  </p>

                  <ol className="space-y-3 sm:space-y-4">
                    {selectedNote.quickReview!.map(
                      (item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-brand-50 rounded-lg"
                        >
                          <span className="text-brand-600 font-bold text-lg shrink-0">
                            {index + 1}.
                          </span>
                          <span className="text-brand-700 min-w-0 leading-7 break-word">
                            {item}
                          </span>
                        </li>
                      )
                    )}
                  </ol>
                </section>
              )}

              {/* Glossary */}
              {activeTab === "glossary" && hasGlossary && (
                <section>
                  <h2 className="text-2xl sm:text-3xl font-bold text-brand-900 mb-4 sm:mb-6">
                    Glossary
                  </h2>

                  <div className="space-y-4">
                    {selectedNote.glossary!.map(
                      (item: GlossaryItem, index: number) => (
                        <div
                          key={index}
                          className="border-l-4 border-brand-600 pl-3 sm:pl-4 py-2"
                        >
                          <p className="text-lg font-bold text-brand-900 break-word">
                            {item.term}
                          </p>
                          <p className="text-brand-700 mt-1 leading-7 break-word">
                            {item.meaning}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Highlights and progress */}
            <aside className="xl:col-span-1 min-w-0">
              <div className="bg-white rounded-lg border border-brand-200 p-4 sm:p-5 xl:p-6 xl:sticky xl:top-4">
                <h3 className="font-bold text-brand-900 mb-4 flex items-center gap-2">
                  <Highlighter size={18} />
                  My Highlights ({highlights.length})
                </h3>

                {highlights.length === 0 ? (
                  <p className="text-sm text-brand-600 italic leading-relaxed">
                    Select text and click "Highlight" to save highlights here.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-64 xl:max-h-96 overflow-y-auto">
                    {highlights.map((highlight) => {
                      const color = highlightColors.find(
                        (item) => item.name === highlight.color
                      );

                      return (
                        <div
                          key={highlight.id}
                          className={`p-3 rounded-lg border-l-4 ${
                            color?.bg ?? "bg-yellow-200"
                          }`}
                        >
                          <p className="text-sm text-brand-800 mb-2 leading-relaxed break-word">
                            {highlight.text}
                          </p>

                          <button
                            onClick={() => removeHighlight(highlight.id)}
                            className="text-xs text-brand-600 hover:text-brand-900 underline py-1"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Progress */}
                {hasSections && selectedSection && (
                  <div className="mt-6 pt-6 border-t border-brand-200">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <p className="text-xs text-brand-600">
                        Reading Progress
                      </p>
                      <p className="text-xs font-semibold text-brand-700">
                        {Math.round(readingProgress)}%
                      </p>
                    </div>

                    <div
                      className="w-full bg-brand-100 rounded-full h-2 overflow-hidden"
                      role="progressbar"
                      aria-label="Reading progress"
                      aria-valuenow={Math.round(readingProgress)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${readingProgress}%` }}
                      />
                    </div>

                    <p className="text-xs text-brand-600 mt-2">
                      Section {currentSectionIndex + 1} of{" "}
                      {selectedNote.sections!.length}
                    </p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudyNoteReader() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <p className="text-brand-600">Loading study note...</p>
        </div>
      }
    >
      <StudyNoteReaderContent />
    </Suspense>
  );
}
