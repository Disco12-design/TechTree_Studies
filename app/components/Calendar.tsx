"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Calendar component for selecting exam dates
interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();


// Builds the 6-week grid (42 days) for the month of the given date
const buildCalendarDays = (month: Date): CalendarDay[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const today = new Date();

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, monthIndex, 1 - firstWeekday + i);
    return {
      date,
      isCurrentMonth: date.getMonth() === monthIndex,
      isToday: isSameDay(date, today),
    };
  });
};

// Calendar component implementation
export default function Calendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const changeMonth = (offset: number) => {
    if (!currentDate) return;
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset),
    );
  };

  const handleSetExamDate = () => {
    if (!selectedDate) return;

    // "en-CA" formats as YYYY-MM-DD in local time (no timezone shift)
    localStorage.setItem("examDate", selectedDate.toLocaleDateString(" "));

    toast.success(
      `Exam date set to ${selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}`,
    );

    // Short delay so the toast is visible before navigating
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  // Determines the CSS classes for each day cell based on its state
  const getDayClasses = (day: CalendarDay) => {
    if (selectedDate && isSameDay(day.date, selectedDate)) {
      return "bg-brand-800 font-bold text-white shadow-md cursor-pointer";
    }
    if (day.isToday) {
      return "bg-brand-200 font-bold text-brand-900 ring-2 ring-brand-600 cursor-pointer";
    }
    if (day.isCurrentMonth) {
      return "font-medium text-brand-900 hover:bg-brand-100 cursor-pointer";
    }
    return "text-brand-300 cursor-default";
  };

  if (!currentDate) {
    return (
      <div className="p-6 text-center text-brand-600">Loading calendar...</div>
    );
  }

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-brand-200 shadow-sm p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-lg text-brand-600 transition hover:bg-brand-100 hover:text-brand-800"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg md:text-2xl font-bold text-brand-900">
          {monthYear}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-lg text-brand-600 transition hover:bg-brand-100 hover:text-brand-800"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 border-b border-brand-200 pb-2">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-semibold uppercase tracking-wide text-brand-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {buildCalendarDays(currentDate).map((day) => (
          <div
            key={day.date.toISOString()}
            onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
            className={`flex aspect-square items-center justify-center rounded-lg text-sm md:text-base transition ${getDayClasses(day)}`}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>

      <button
        onClick={handleSetExamDate}
        disabled={!selectedDate}
        className="mt-12 w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-600"
      >
        Set Exam Date
      </button>
    </div>
  );
}
