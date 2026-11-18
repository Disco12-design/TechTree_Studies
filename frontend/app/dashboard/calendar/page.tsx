"use client";

import Calendar from "../../components/Calendar";
import { ArrowLeft } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="w-full justify-between">
      {/* Header */}
      <header className="border-b border-brand-200 bg-white">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-brand-800">Calendar</h1>
          <p className="text-black mt-1">
            View your study schedule and events
          </p>
           <p className="text-black mt-1">
            Setting up date helps you manage your study schedule effectively. 
          </p>
        </div>

        <div className="px-8 py-2 flex items-end justify-end flex-row">
          <button
            onClick={() => window.history.back()}
            className="flex bg-brand-500 text-white justify-evenly py-2 px-4 rounded-lg hover:bg-brand-700 transition gap-3"
          >
            <ArrowLeft />
            Back
          </button>
        </div>
      </header>

      {/* Calendar Content */}
      <main className="p-8">
        <div className="calendar-wrapper">
          <Calendar />
        </div>
      </main>
    </div>
  );
}
