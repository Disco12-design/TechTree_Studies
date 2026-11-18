"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  Camera,
  Flame,
  Info,
  Loader2,
  Lock,
  MailCheck,
  Monitor,
  ShieldCheck,
  Undo2,
  User,
  X,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TABS = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
] as const;
type Tab = (typeof TABS)[number]["id"];

const NOTIFICATION_OPTIONS = [
  { key: "reviewReminders", title: "Daily review reminders", desc: "A nudge when you have cards due so your streak stays alive." },
  { key: "streakAlerts", title: "Streak alerts", desc: "Get warned before you lose your review streak." },
  { key: "cohortActivity", title: "Study group activity", desc: "Messages and shared notes from your cohort." },
  { key: "productUpdates", title: "Product updates", desc: "New features and improvements." },
  { key: "weeklySummary", title: "Weekly progress summary", desc: "An email every Monday with your study stats." },
] as const;

type NotifKey = (typeof NOTIFICATION_OPTIONS)[number]["key"];
type Notifs = Record<NotifKey, boolean>;
type Form = { name: string; surname: string; email: string };
type FormErrors = Partial<Record<keyof Form, string>>;

// Empty until you load the real user (from your auth session or API)
const INITIAL_FORM: Form = { name: "", surname: "", email: "" };

const INITIAL_NOTIFS: Notifs = {
  reviewReminders: true,
  streakAlerts: true,
  cohortActivity: false,
  productUpdates: false,
  weeklySummary: true,
};

/* ------------------------------------------------------------------ */
/* Local persistence (temporary, swap for your API later)              */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "profile-settings:v1";
const STREAK_STORAGE_KEY = "study-streak:v1";

/** Reads the current streak count from localStorage (read-only, does not update). */
function loadStreakCount(): number {
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      return typeof data.count === "number" ? data.count : 0;
    }
  } catch { /* ignore */ }
  return 0;
}

type Persisted = {
  form: Form;
  notifs: Notifs;
  twoFactor: boolean;
  avatarDataUrl: string | null;
};

function loadPersisted(): Persisted | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

/**
 * blob: URLs from createObjectURL die on refresh, so we store the avatar as a
 * data URL. Resize + center-crop to a square so it fits in localStorage.
 */
async function fileToAvatarDataUrl(file: File, size = 400): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.max(size / bitmap.width, size / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  canvas.getContext("2d")!.drawImage(bitmap, (size - w) / 2, (size - h) / 2, w, h);
  bitmap.close();
  return canvas.toDataURL("image/webp", 0.85);
}

/**
 * Local-only for now. Swap this body for your real API call later.
 * Throws if the localStorage quota is exceeded, which triggers the error toast.
 */
async function saveProfileRequest(payload: Persisted) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const ui = {
  input:
    "w-full rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-600/40",
  inputError: "ring-red-500/60 bg-red-50",
  primaryBtn:
    "flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50",
  outlineBtn:
    "rounded-md border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 transition hover:bg-brand-50",
  panel:
    "rounded-2xl border border-brand-100 bg-white shadow-[0_1px_3px_rgba(38,13,35,0.08)]",
  tinyLabel: "text-[10px] font-semibold tracking-wide text-slate-500",
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-xs text-red-700">
          {error}
        </span>
      )}
    </label>
  );
}

function TextInput({
  error,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className={`${ui.input} ${error ? ui.inputError : ""} ${className}`}
    />
  );
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        checked ? "bg-brand-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

/**
 * Lazy-loaded avatar: native lazy loading + async decoding, a pulsing
 * skeleton while the image loads, a fade-in once it's ready, and a fallback
 * icon if it fails. Render with key={src} so state resets when the image changes.
 */
function AvatarImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish before React attaches onLoad
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed) {
    return (
      <User
        aria-label="Default profile icon"
        className="h-1/2 w-1/2 text-white/80"
        strokeWidth={1.5}
      />
    );
  }

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-white/10 motion-reduce:animate-none"
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Change password dialog                                              */
/* ------------------------------------------------------------------ */

const PASSWORD_FIELDS = [
  { key: "current", label: "Current password", autoComplete: "current-password" },
  { key: "next", label: "New password", autoComplete: "new-password" },
  { key: "confirm", label: "Confirm new password", autoComplete: "new-password" },
] as const;

function PasswordDialog({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const { current, next, confirm } = values;
    const errs: Record<string, string> = {};
    if (!current) errs.current = "Enter your current password.";
    if (next.length < 8) errs.next = "Use at least 8 characters.";
    else if (next === current) errs.next = "Choose a password you haven't used here.";
    if (confirm !== next) errs.confirm = "Passwords don't match.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      // TODO: call your change-password endpoint here
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Password updated");
      onClose();
    } catch {
      toast.error("Couldn't update your password. Try again.");
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="pw-title"
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 id="pw-title" className="text-base font-bold text-brand-950">
            Change password
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-slate-500 hover:bg-brand-50"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {PASSWORD_FIELDS.map((f, i) => (
            <Field key={f.key} label={f.label} error={errors[f.key]}>
              <TextInput
                type="password"
                autoFocus={i === 0}
                autoComplete={f.autoComplete}
                value={values[f.key]}
                error={errors[f.key]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.key]: e.target.value }))
                }
              />
            </Field>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className={`${ui.outlineBtn} px-3 py-2 text-sm`}>
            Cancel
          </button>
          <button type="submit" disabled={busy} className={ui.primaryBtn}>
            {busy && <Loader2 size={14} className="animate-spin" />}
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Notifications tab                                                   */
/* ------------------------------------------------------------------ */

function NotificationsTab({
  notifs,
  onChange,
}: {
  notifs: Notifs;
  onChange: (key: NotifKey, value: boolean) => void;
}) {
  return (
    <section className={`${ui.panel} p-6`}>
      <h3 className="text-base font-bold text-brand-950">Notifications</h3>
      <p className="mt-1 text-sm text-slate-500">Choose what you hear about.</p>

      <ul className="mt-4 divide-y divide-brand-100">
        {NOTIFICATION_OPTIONS.map((opt) => (
          <li key={opt.key} className="flex items-center justify-between gap-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-slate-800">{opt.title}</p>
              <p className="text-xs text-slate-500">{opt.desc}</p>
            </div>
            <Switch
              label={opt.title}
              checked={notifs[opt.key]}
              onChange={(v) => onChange(opt.key, v)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Security card                                                       */
/* ------------------------------------------------------------------ */

function SecurityCard({
  twoFactor,
  onToggleTwoFactor,
  onChangePassword,
}: {
  twoFactor: boolean;
  onToggleTwoFactor: (next: boolean) => void;
  onChangePassword: () => void;
}) {
  const row = "flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5";

  return (
    <section className={`${ui.panel} p-5`}>
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-brand-950">
          <ShieldCheck size={15} className="text-brand-600" /> Security &amp; Auth
        </h3>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            twoFactor ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"
          }`}
        >
          {twoFactor ? "OPTIMAL" : "AT RISK"}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className={row}>
          <div>
            <p className={ui.tinyLabel}>PASSWORD</p>
            <p className="mt-0.5 text-sm tracking-widest text-slate-700">••••••••••••••</p>
          </div>
          <button type="button" onClick={onChangePassword} className={ui.outlineBtn}>
            Change
          </button>
        </div>

      
      

        <div>
          <p className={`mb-1.5 ${ui.tinyLabel}`}>ACTIVE SESSION</p>
          <div className="flex items-start gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs text-slate-700">
            <Monitor size={14} className="mt-0.5 shrink-0" />
            <div>
              <p>macOS • Chrome 124</p>
              <p className="text-slate-500">Chicago, US • Current active IP</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProfileSettings() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");

  // Working values + last saved values
  const [form, setForm] = useState(INITIAL_FORM);
  const [savedForm, setSavedForm] = useState(INITIAL_FORM);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [savedNotifs, setSavedNotifs] = useState(INITIAL_NOTIFS);
  const [errors, setErrors] = useState<FormErrors>({});

  // Avatar
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savedAvatarUrl, setSavedAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createdUrls = useRef<Set<string>>(new Set());

  // Other UI state
  const [saving, setSaving] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [streak, setStreak] = useState(0);

  // Free every preview URL we created when the component unmounts
  useEffect(() => {
    const urls = createdUrls.current;
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

 
  useEffect(() => {
    setStreak(loadStreakCount());
    const saved = loadPersisted();
    if (!saved) return;
    setForm(saved.form);
    setSavedForm(saved.form);
    setNotifs(saved.notifs);
    setSavedNotifs(saved.notifs);
    setTwoFactor(saved.twoFactor);
    setAvatarUrl(saved.avatarDataUrl);
    setSavedAvatarUrl(saved.avatarDataUrl);
  }, []);

  const dirty =
    form.name !== savedForm.name ||
    form.surname !== savedForm.surname ||
    form.email !== savedForm.email ||
    avatarUrl !== savedAvatarUrl ||
    NOTIFICATION_OPTIONS.some((o) => notifs[o.key] !== savedNotifs[o.key]);

  /** Free the current preview if it hasn't been saved yet. */
  const releaseUnsavedAvatar = () => {
    if (avatarUrl && avatarUrl !== savedAvatarUrl) {
      URL.revokeObjectURL(avatarUrl);
      createdUrls.current.delete(avatarUrl);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // so picking the same file again still fires onChange
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setAvatarError("Use a PNG, JPG or WEBP image.");
      return toast.error("Unsupported image type");
    }
    if (file.size > MAX_SIZE) {
      setAvatarError("That image is over 5MB. Choose a smaller one.");
      return toast.error("Image is too large");
    }

    releaseUnsavedAvatar();
    const url = URL.createObjectURL(file);
    createdUrls.current.add(url);
    setAvatarError(null);
    setAvatarUrl(url);
    setAvatarFile(file);
  };

  const removeAvatar = () => {
    releaseUnsavedAvatar();
    setAvatarUrl(null);
    setAvatarFile(null);
    setAvatarError(null);
  };

  const setField = (key: keyof Form) => (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Enter your full legal name.";
    if (!form.surname.trim()) next.surname = "Enter your surname.";
    if (!form.email.trim()) next.email = "Enter your email.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (!validate()) {
      setTab("profile");
      return toast.error("Fix the highlighted fields and try again.");
    }

    setSaving(true);
    try {
      const cleaned: Form = {
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email.trim(),
      };

      const avatarDataUrl = avatarFile
        ? await fileToAvatarDataUrl(avatarFile)
        : avatarUrl;

      await saveProfileRequest({ form: cleaned, notifs, twoFactor, avatarDataUrl });

      releaseUnsavedAvatar(); // free the blob preview before swapping it out
      setForm(cleaned);
      setSavedForm(cleaned);
      setSavedNotifs(notifs);
      setAvatarUrl(avatarDataUrl);
      setSavedAvatarUrl(avatarDataUrl);
      setAvatarFile(null);
      toast.success("Changes saved", { description: "Your profile has been updated." });
    } catch {
      toast.error("Couldn't save your changes. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    releaseUnsavedAvatar();
    setForm(savedForm);
    setNotifs(savedNotifs);
    setErrors({});
    setAvatarUrl(savedAvatarUrl);
    setAvatarFile(null);
    setAvatarError(null);
    toast("Changes discarded");
  };

  // Applies immediately (not via Save), so persist it right away
  const toggleTwoFactor = (next: boolean) => {
    setTwoFactor(next);
    try {
      const current = loadPersisted();
      const payload: Persisted = {
        form: current?.form ?? savedForm,
        notifs: current?.notifs ?? savedNotifs,
        avatarDataUrl: current?.avatarDataUrl ?? savedAvatarUrl,
        twoFactor: next,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable, ignore */
    }
    toast.success(next ? "Two-factor authentication on" : "Two-factor authentication off");
  };

  return (
    <main className="min-h-screen bg-brand-50/50 px-4 py-6 font-sans text-slate-900 sm:px-8">
      {/* Move <Toaster /> to your root layout if you want it app-wide */}
      <Toaster richColors closeButton position="top-right" />
      {passwordOpen && <PasswordDialog onClose={() => setPasswordOpen(false)} />}

      <form onSubmit={handleSave} noValidate className="mx-auto max-w-5xl">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-1.5 rounded-md py-1 pr-2 text-sm font-semibold text-brand-600 transition hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <ArrowLeft size={26} /> <p className="text-[16px]">Go back</p>
        </button>

        {/* Header */}
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-brand-950">
              Profile Settings
              <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                PRO
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your student profile, academic identity, and personal study preferences.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDiscard}
            disabled={!dirty || saving}
            aria-label="Discard changes"
            title="Discard changes"
            className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 transition hover:bg-brand-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Undo2 size={16} />
          </button>
        </header>

        {/* Banner + identity */}
        <div className={`mt-5 overflow-hidden ${ui.panel}`}>
          <div className="h-28 bg-linear-to-br from-brand-800 via-brand-600 to-brand-500" />

          <div className="flex flex-wrap items-end justify-between gap-4 px-5 pb-4">
            <div className="flex items-end gap-4">
              <div className="relative -mt-10 h-32 w-32 shrink-0">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-black/80">
                  {avatarUrl ? (
                    <AvatarImage key={avatarUrl} src={avatarUrl} alt="Your profile photo" />
                  ) : (
                    <User aria-label="Default profile icon" className="h-1/2 w-1/2 text-white/80" strokeWidth={1.5} />
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Change photo"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-white ring-2 ring-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <Camera size={12} />
                </button>
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-brand-950">
                    {savedForm.name || "Your name"}
                  </h2>
                  <BadgeCheck size={16} className="text-brand-600" />
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  <span className="font-semibold text-brand-600">Pro Student</span> • Member since Sep 2024
                </p>
              </div>
            </div>

            <div className={`rounded-xl px-4 py-2 ${streak >= 3 ? "bg-orange-50" : "bg-brand-50"}`}>
              <p className={ui.tinyLabel}>REVIEW STREAK</p>
              <p className={`flex items-center gap-1 text-lg font-bold ${streak >= 3 ? "text-orange-600" : "text-brand-600"}`}>
                {streak} {streak === 1 ? "Day" : "Days"}{" "}
                <Flame size={14} className={streak >= 3 ? "fill-orange-400 text-orange-500" : "fill-amber-400 text-amber-500"} />
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-100 bg-brand-50/60 px-5 py-2.5 text-xs text-slate-500">
            <span
              role={avatarError ? "alert" : undefined}
              className={`flex items-center gap-1.5 ${avatarError ? "font-semibold text-red-700" : ""}`}
            >
              <Info size={13} />
              {avatarError ?? "PNG, JPG or WEBP. Up to 5MB. 400×400 recommended."}
            </span>
            <span className="flex items-center gap-3">
              <button type="button" onClick={() => fileInputRef.current?.click()} className={ui.outlineBtn}>
                Upload Custom
              </button>
              <button
                type="button"
                onClick={removeAvatar}
                disabled={!avatarUrl}
                className="font-semibold text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
              >
                Remove
              </button>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="mt-5 flex items-center gap-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
                tab === id ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-white"
              }`}
            >
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-5">
          {tab === "notifications" ? (
            <NotificationsTab
              notifs={notifs}
              onChange={(key, value) => setNotifs((n) => ({ ...n, [key]: value }))}
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <section className={`${ui.panel} p-6`}>
                <h3 className="flex items-center gap-2 text-base font-bold text-brand-950">
                  <span className="h-4 w-1 rounded-full bg-brand-600" />
                  Academic Identity
                </h3>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                  This information powers collaborative study workspaces, lecture cohort
                  matching, and institutional note indexing.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
                  <Field label="Full Legal Name" error={errors.name}>
                    <TextInput
                      value={form.name}
                      onChange={setField("name")}
                      error={errors.name}
                      placeholder="Enter your full legal name"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Surname" error={errors.surname}>
                    <TextInput
                      value={form.surname}
                      onChange={setField("surname")}
                      error={errors.surname}
                      placeholder="Enter your surname"
                      autoComplete="family-name"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Academic Email / Gmail" error={errors.email}>
                      <div className="relative">
                        <TextInput
                          type="email"
                          className="pr-10"
                          value={form.email}
                          onChange={setField("email")}
                          error={errors.email}
                          placeholder="you@university.edu"
                          autoComplete="email"
                        />
                        <MailCheck
                          size={16}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                            EMAIL_RE.test(form.email.trim()) ? "text-brand-600" : "text-slate-300"
                          }`}
                        />
                      </div>
                    </Field>
                  </div>
                </div>
              </section>

              <SecurityCard
                twoFactor={twoFactor}
                onToggleTwoFactor={toggleTwoFactor}
                onChangePassword={() => setPasswordOpen(true)}
              />
            </div>
          )}
        </div>

        {/* One save button for both tabs */}
        <button type="submit" disabled={saving || !dirty} className={`mt-5 ${ui.primaryBtn}`}>
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}