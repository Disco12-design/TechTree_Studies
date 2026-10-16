"use client";

import { useState } from "react";
import {
  Bell,
  Camera,
  ChevronRight,
  Check,
  CloudUpload,
  Info,
  Lock,
  Monitor,
  MailCheck,
  ShieldCheck,
  User,
  Zap,
  BadgeCheck,
} from "lucide-react";
import { profile } from "../types/assets";

type Tab = "profile" | "notifications";

const inputClass =
  "w-full rounded-lg bg-brand-50 px-3.5 py-2.5 text-sm text-slate-700 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-600/40";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-brand-100 bg-white p-6 shadow-[0_1px_3px_rgba(38,13,35,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}

export default function ProfileSettings() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <main className="min-h-screen bg-brand-50/50 px-4 py-6 font-sans text-slate-900 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-3 flex items-center gap-1 text-[11px] font-semibold text-brand-600">
          <ChevronRight size={12} className="text-slate-400" />
          Profile &amp; Account
        </nav>

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
              Manage your student profile, academic identity, and personal study
              preferences.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              className="h-9 w-12 rounded-lg bg-brand-100 transition hover:bg-brand-200"
              aria-label="Discard changes"
            />
            <button className="flex h-9 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              <Check size={14} />
              <kbd className="rounded bg-white/20 px-1.5 py-0.5 font-sans text-[11px]">
                ⌘S
              </kbd>
            </button>
          </div>
        </header>

        {/* Banner + identity */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-[0_1px_3px_rgba(38,13,35,0.08)]">
          <div className="relative h-28 bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500">
            <span className="absolute right-3 top-3 h-1.5 w-3 rounded-full bg-white/30" />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 px-5 pb-4">
            <div className="flex items-end gap-4">
              <div className="relative -mt-10 h-32 w-32 shrink-0">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-linear-to-br from-brand-10 to-brand-900 text-2xl font-bold text-white shadow-md">
                 <img src={profile.person} alt="Profile photo" />
                </div>
                <button
                  aria-label="Change photo"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-white ring-2 ring-white transition hover:bg-brand-700"
                >
                  <Camera size={12} />
                </button>
              </div>

              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-brand-950">
                    {profile.name}
                  </h2>
                  <BadgeCheck size={16} className="text-brand-600" />
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="h-1 w-1 rounded-full bg-brand-600" />
                  <span className="font-semibold text-brand-600">
                    Pro Student
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  Member since Sep 2024
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="rounded-xl bg-brand-50 px-4 py-2">
                <p className="text-[10px] font-semibold tracking-wide text-slate-500">
                  NOTES CRAFTED
                </p>
                <p className="text-lg font-bold text-brand-950">128</p>
              </div>
              <div className="rounded-xl bg-brand-50 px-4 py-2">
                <p className="text-[10px] font-semibold tracking-wide text-slate-500">
                  REVIEW STREAK
                </p>
                <p className="flex items-center gap-1 text-lg font-bold text-brand-600">
                  14 Days{" "}
                  <Zap size={14} className="fill-amber-400 text-amber-500" />
                </p>
              </div>
              <div className="w-10 rounded-xl bg-brand-50" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-100 bg-brand-50/60 px-5 py-2.5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Info size={13} />
              PNG, JPG or WEBP. Up to 5MB. 400×400 recommended.
            </span>
            <span className="flex items-center gap-3">
              <button className="rounded-md border border-brand-200 bg-white px-2.5 py-1 font-semibold text-slate-800 transition hover:bg-brand-50">
                Upload Custom
              </button>
              <button className="font-semibold text-red-700 hover:underline">
                Remove
              </button>
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div role="tablist" className="mt-5 flex items-center gap-2">
          <button
            role="tab"
            aria-selected={tab === "profile"}
            onClick={() => setTab("profile")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
              tab === "profile"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-white"
            }`}
          >
            <User size={13} /> Profile Info
          </button>
          <button
            role="tab"
            aria-selected={tab === "notifications"}
            onClick={() => setTab("notifications")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition ${
              tab === "notifications"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-white"
            }`}
          >
            <Bell size={13} /> Notifications
          </button>
        </div>

        {tab === "notifications" ? (
          <Card className="mt-5">
            <h3 className="text-base font-bold text-brand-950">
              Notifications
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Choose what you hear about. Nothing is configured yet.
            </p>
          </Card>
        ) : (
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
            {/* Academic identity */}
            <Card>
              <h3 className="flex items-center gap-2 text-base font-bold text-brand-950">
                <span className="h-4 w-1 rounded-full bg-brand-600" />
                Academic Identity
              </h3>
              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                This information powers collaborative study workspaces, lecture
                cohort matching, and institutional note indexing.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
                <Field label="Full Legal Name">
                  <input className={inputClass} defaultValue={profile.name} />
                </Field>
                <Field label="Surname">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                      @
                    </span>
                    <input
                      className={`${inputClass} pl-7`}
                      defaultValue={profile.handle}
                    />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Academic Email/ Gmail
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      className={`${inputClass} pr-10`}
                      defaultValue={profile.email}
                    />
                    <MailCheck
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-600"
                    />
                  </div>
                </div>
              </div>
              <button className="mt-4 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                Save Changes
              </button>
            </Card>

            {/* Right column */}
            <div className="space-y-5">
              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-brand-950">
                    <ShieldCheck size={15} className="text-brand-600" />{" "}
                    Security &amp; Auth
                  </h3>
                  <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                    OPTIMAL
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5">
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500">
                        PASSWORD
                      </p>
                      <p className="mt-0.5 text-sm tracking-widest text-slate-700">
                        ••••••••••••••
                      </p>
                    </div>
                    <button className="rounded-md border border-brand-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:bg-brand-50">
                      Change
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg bg-brand-50 px-3 py-2.5">
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-slate-500">
                        TWO-FACTOR AUTH
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-brand-600">
                        <Lock size={11} /> Authenticator App (TOTP)
                      </p>
                    </div>
                    <span
                      className="h-2 w-2 rounded-full bg-brand-600"
                      aria-label="Enabled"
                    />
                  </div>

                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold tracking-wide text-slate-500">
                      ACTIVE SESSION
                    </p>
                    <div className="flex items-start gap-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs text-slate-700">
                      <Monitor size={14} className="mt-0.5 shrink-0" />
                      <div>
                        <p>macOS • Chrome 124</p>
                        <p className="text-slate-500">
                          Chicago, US • Current active IP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-brand-950">
                  <CloudUpload size={15} className="text-brand-600" />{" "}
                  Integrations &amp; Cloud Sync
                </h3>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
