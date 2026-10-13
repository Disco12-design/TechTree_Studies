"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Highlighter,
  Link2,
  Minus,
  Undo2,
  Redo2,
  Eraser,
  Save,
  Check,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Types & constants                                                         */
/* -------------------------------------------------------------------------- */

interface SavedNote {
  id: string;
  title: string;
  domain: string;
  module: string;
  html: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

const DRAFT_KEY = "note-draft";
const NOTES_KEY = "personal-notes";
const HIGHLIGHT = "#fde68a";

type SaveStatus = "idle" | "saving" | "draft" | "saved";

const BLOCK_OPTIONS = [
  { value: "p", label: "Normal text" },
  { value: "h1", label: "Big heading" },
  { value: "h2", label: "Medium heading" },
  { value: "h3", label: "Small heading" },
];

/* -------------------------------------------------------------------------- */
/*  Toolbar building blocks                                                   */
/* -------------------------------------------------------------------------- */

function ToolButton({
  label,
  active = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      // Keep the text selection inside the editor when the button is pressed
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "text-brand-700 hover:bg-white hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

/** A labelled group of tools, so each cluster of buttons says what it does */
function ToolGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 flex-col gap-1">
      <span className="px-1 text-[11px] font-medium uppercase tracking-wide text-brand-400">
        {label}
      </span>
      <div className="flex items-center gap-0.5 rounded-lg bg-brand-50 p-1">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CreateNote() {
  const editorRef = useRef<HTMLDivElement>(null);
  const noteIdRef = useRef<string | null>(null);
  const createdAtRef = useRef<string | null>(null);
  const hydratedRef = useRef(false);

  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState("");
  const [moduleName, setModuleName] = useState("");

  const [isEmpty, setIsEmpty] = useState(true);
  const [words, setWords] = useState(0);
  const [version, setVersion] = useState(0); // bumps on every edit
  const [status, setStatus] = useState<SaveStatus>("idle");

  const [active, setActive] = useState<Record<string, boolean>>({});
  const [block, setBlock] = useState("p");

  /* ------------------------------ helpers -------------------------------- */

  const exec = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    setVersion((v) => v + 1);
    refreshToolbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const readEditor = useCallback(() => {
    const el = editorRef.current;
    if (!el) return { html: "", text: "" };
    return { html: el.innerHTML, text: el.innerText.trim() };
  }, []);

  const refreshStats = useCallback(() => {
    const { text } = readEditor();
    const hasMedia = !!editorRef.current?.querySelector("hr");
    setIsEmpty(text === "" && !hasMedia);
    setWords(text ? text.split(/\s+/).filter(Boolean).length : 0);
  }, [readEditor]);

  function refreshToolbar() {
    const sel = window.getSelection();
    if (!sel || !sel.anchorNode || !editorRef.current?.contains(sel.anchorNode))
      return;

    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });

    const raw = (document.queryCommandValue("formatBlock") || "p")
      .toString()
      .toLowerCase()
      .replace(/[<>]/g, "");
    setBlock(["h1", "h2", "h3", "blockquote", "pre"].includes(raw) ? raw : "p");
  }

  const toggleBlock = (tag: "blockquote" | "pre") => {
    exec("formatBlock", block === tag ? "p" : tag);
  };

  const toggleHighlight = () => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    document.execCommand("styleWithCSS", false, "true");
    const current = document.queryCommandValue("hiliteColor");
    const isHighlighted = current === "rgb(253, 230, 138)";
    document.execCommand(
      "hiliteColor",
      false,
      isHighlighted ? "transparent" : HIGHLIGHT,
    );
    document.execCommand("styleWithCSS", false, "false");
    setVersion((v) => v + 1);
  };

  const insertLink = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      window.alert("Select the text you want to turn into a link first.");
      return;
    }
    const url = window.prompt("Paste the link address");
    if (!url) return;
    exec("createLink", /^https?:\/\//i.test(url) ? url : `https://${url}`);
  };

  /* ------------------------------ lifecycle ------------------------------ */

  // Load any unsaved draft once, and set editor defaults
  useEffect(() => {
    document.execCommand("defaultParagraphSeparator", false, "p");
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        setTitle(draft.title ?? "");
        setDomain(draft.domain ?? "");
        setModuleName(draft.module ?? "");
        if (editorRef.current) editorRef.current.innerHTML = draft.html ?? "";
        refreshStats();
        setStatus("draft");
      }
    } catch {
      /* ignore corrupted drafts */
    }
    hydratedRef.current = true;
  }, [refreshStats]);

  // Keep toolbar state in sync with the cursor
  useEffect(() => {
    document.addEventListener("selectionchange", refreshToolbar);
    return () =>
      document.removeEventListener("selectionchange", refreshToolbar);
  }, []);

  // Autosave draft shortly after the person stops typing
  useEffect(() => {
    if (!hydratedRef.current) return;
    const { html } = readEditor();
    if (!title && !domain && !moduleName && isEmpty) return;

    setStatus("saving");
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ title, domain, module: moduleName, html }),
        );
        setStatus("draft");
      } catch {
        setStatus("idle");
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [title, domain, moduleName, version, isEmpty, readEditor]);

  /* ------------------------------ saving --------------------------------- */

  const saveNote = useCallback(() => {
    const { html, text } = readEditor();
    const now = new Date().toISOString();

    if (!noteIdRef.current) {
      noteIdRef.current = `note-${Date.now()}`;
      createdAtRef.current = now;
    }

    const note: SavedNote = {
      id: noteIdRef.current,
      title: title.trim() || "Untitled note",
      domain: domain.trim(),
      module: moduleName.trim(),
      html,
      text,
      createdAt: createdAtRef.current ?? now,
      updatedAt: now,
    };

    try {
      // TODO: replace localStorage with your API / database call
      const existing: SavedNote[] = JSON.parse(
        localStorage.getItem(NOTES_KEY) || "[]",
      );
      const next = [note, ...existing.filter((n) => n.id !== note.id)];
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      localStorage.removeItem(DRAFT_KEY);
      setStatus("saved");
    } catch {
      window.alert(
        "We could not save this note. Your browser storage may be full.",
      );
    }
  }, [domain, moduleName, readEditor, title]);

  // Ctrl/Cmd + S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveNote();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveNote]);

  /* ------------------------------ editor events -------------------------- */

  const handleInput = () => {
    refreshStats();
    setVersion((v) => v + 1);
  };

  // Paste as clean text so Word / web styles don't leak into the note
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  // Tab / Shift+Tab indents lists instead of leaving the editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    if (active.insertUnorderedList || active.insertOrderedList) {
      e.preventDefault();
      exec(e.shiftKey ? "outdent" : "indent");
    }
  };

  const statusText: Record<SaveStatus, string> = {
    idle: "Not saved yet",
    saving: "Saving draft…",
    draft: "Draft saved",
    saved: "Note saved",
  };

  const statusDot: Record<SaveStatus, string> = {
    idle: "bg-brand-300",
    saving: "bg-amber-400",
    draft: "bg-sky-500",
    saved: "bg-green-500",
  };

  const readMinutes = Math.max(1, Math.round(words / 200));

  /* ------------------------------ render --------------------------------- */

  return (
    <div className="min-h-screen w-full bg-brand-50">
      <style>{`
        .note-editor { position: relative; outline: none; min-height: 50vh; font-size: 1.0625rem; line-height: 1.75; overflow-wrap: anywhere; }
        .note-editor[data-empty="true"]::before { content: attr(data-placeholder); position: absolute; inset: 0 auto auto 0; opacity: .4; pointer-events: none; }
        .note-editor p, .note-editor div { margin: 0 0 .75em; }
        .note-editor h1 { font-size: 1.875rem; line-height: 1.25; font-weight: 700; margin: 1.25em 0 .5em; }
        .note-editor h2 { font-size: 1.5rem; line-height: 1.3; font-weight: 700; margin: 1.1em 0 .45em; }
        .note-editor h3 { font-size: 1.2rem; line-height: 1.35; font-weight: 600; margin: 1em 0 .4em; }
        .note-editor ul { list-style: disc; padding-left: 1.5rem; margin: 0 0 .75em; }
        .note-editor ol { list-style: decimal; padding-left: 1.5rem; margin: 0 0 .75em; }
        .note-editor li { margin: .15em 0; }
        .note-editor blockquote { margin: 0 0 .9em; padding: .1em 0 .1em 1rem; border-left: 3px solid color-mix(in srgb, currentColor 35%, transparent); font-style: italic; }
        .note-editor pre { margin: 0 0 .9em; padding: .75rem 1rem; border-radius: .5rem; background: color-mix(in srgb, currentColor 8%, transparent); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .9rem; white-space: pre-wrap; }
        .note-editor hr { border: 0; border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent); margin: 1.5em 0; }
        .note-editor a { text-decoration: underline; }
        .note-editor ::selection { background: ${HIGHLIGHT}; }
      `}</style>

      {/* ---------------- Sticky header: navigation, status, save ---------------- */}
      <header className="sticky top-0 z-20 border-b border-brand-200 bg-white">
        {/* Row 1: where you are + what you can do */}
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/study-notes"
            className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-brand-600 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <ArrowLeft size={18} />
            <span>
              Back<span className="hidden sm:inline"> to Study Notes</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center gap-2 text-sm text-brand-600"
              aria-live="polite"
            >
              <span
                className={`h-2 w-2 rounded-full ${statusDot[status]}`}
                aria-hidden="true"
              />
              {statusText[status]}
            </span>

            <button
              type="button"
              onClick={saveNote}
              title="Save note (Ctrl+S)"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
            >
              {status === "saved" ? <Check size={16} /> : <Save size={16} />}
              {status === "saved" ? "Saved" : "Save note"}
            </button>
          </div>
        </div>

        {/* Row 2: formatting tools, grouped and labelled */}
        <div className="border-t border-brand-100">
          <div
            role="toolbar"
            aria-label="Text formatting"
            className="mx-auto flex max-w-5xl items-end gap-4 overflow-x-auto px-4 py-2 sm:px-8"
          >
            <ToolGroup label="Undo">
              <ToolButton label="Undo (Ctrl+Z)" onClick={() => exec("undo")}>
                <Undo2 size={17} />
              </ToolButton>
              <ToolButton label="Redo (Ctrl+Y)" onClick={() => exec("redo")}>
                <Redo2 size={17} />
              </ToolButton>
            </ToolGroup>

            <ToolGroup label="Style">
              <select
                aria-label="Text style"
                value={["h1", "h2", "h3"].includes(block) ? block : "p"}
                onChange={(e) => exec("formatBlock", e.target.value)}
                className="h-9 min-w-36 shrink-0 rounded-md border border-brand-200 bg-white px-2 text-sm text-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                {BLOCK_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </ToolGroup>

            <ToolGroup label="Text">
              <ToolButton
                label="Bold (Ctrl+B)"
                active={active.bold}
                onClick={() => exec("bold")}
              >
                <Bold size={17} />
              </ToolButton>
              <ToolButton
                label="Italic (Ctrl+I)"
                active={active.italic}
                onClick={() => exec("italic")}
              >
                <Italic size={17} />
              </ToolButton>
              <ToolButton
                label="Underline (Ctrl+U)"
                active={active.underline}
                onClick={() => exec("underline")}
              >
                <Underline size={17} />
              </ToolButton>
              <ToolButton
                label="Strikethrough"
                active={active.strikeThrough}
                onClick={() => exec("strikeThrough")}
              >
                <Strikethrough size={17} />
              </ToolButton>
              <ToolButton label="Highlight" onClick={toggleHighlight}>
                <Highlighter size={17} />
              </ToolButton>
            </ToolGroup>

            <ToolGroup label="Lists & blocks">
              <ToolButton
                label="Bulleted list"
                active={active.insertUnorderedList}
                onClick={() => exec("insertUnorderedList")}
              >
                <List size={17} />
              </ToolButton>
              <ToolButton
                label="Numbered list"
                active={active.insertOrderedList}
                onClick={() => exec("insertOrderedList")}
              >
                <ListOrdered size={17} />
              </ToolButton>
              <ToolButton
                label="Quote"
                active={block === "blockquote"}
                onClick={() => toggleBlock("blockquote")}
              >
                <Quote size={17} />
              </ToolButton>
              <ToolButton
                label="Code block"
                active={block === "pre"}
                onClick={() => toggleBlock("pre")}
              >
                <Code size={17} />
              </ToolButton>
            </ToolGroup>

            <ToolGroup label="Insert">
              <ToolButton label="Add link to selected text" onClick={insertLink}>
                <Link2 size={17} />
              </ToolButton>
              <ToolButton
                label="Divider line"
                onClick={() => exec("insertHorizontalRule")}
              >
                <Minus size={17} />
              </ToolButton>
              <ToolButton
                label="Clear formatting"
                onClick={() => exec("removeFormat")}
              >
                <Eraser size={17} />
              </ToolButton>
            </ToolGroup>
          </div>
        </div>
      </header>

      {/* ---------------- The page ---------------- */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-10">
        <article className="rounded-xl border border-brand-200 bg-white px-6 py-8 shadow-sm sm:px-12 sm:py-10">
          {/* 1. Title */}
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
              Title
            </span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a title"
              className="mt-1 w-full border-0 bg-transparent p-0 text-3xl font-bold text-brand-900 placeholder:text-brand-300 focus:outline-none focus:ring-0 sm:text-4xl"
            />
          </label>

     
          {/* 3. Note content */}
          <div className="mt-8">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
              Your notes
            </span>
            <div className="mt-2 border-t border-brand-100 pt-4">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                role="textbox"
                aria-multiline="true"
                aria-label="Note content"
                data-placeholder="Click here and start typing. Use the toolbar above to add headings, lists, and highlights."
                data-empty={isEmpty}
                onInput={handleInput}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onKeyUp={refreshToolbar}
                onMouseUp={refreshToolbar}
                spellCheck
                className="note-editor text-brand-900"
              />
            </div>
          </div>
        </article>

        <p className="mt-4 text-center text-sm text-brand-500">
          {words} {words === 1 ? "word" : "words"}
          {words > 0 && <> · about {readMinutes} min read</>}
          <span className="hidden sm:inline"> · Press Ctrl+S to save</span>
        </p>
      </main>
    </div>
  );
}