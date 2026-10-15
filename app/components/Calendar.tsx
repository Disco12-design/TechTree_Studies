"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EXAM_DATE_STORAGE_KEY = "examDate";
const REDIRECT_DELAY_MS = 1000;
const TOTAL_GRID_CELLS = 42;

const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
  return firstDate.toDateString() === secondDate.toDateString();
};

const padWithZero = (value: number): string => {
  return String(value).padStart(2, "0");
};

// Formats a Date object as "YYYY-MM-DD" for storage in localStorage
const formatDateForStorage = (date: Date): string => {
  const year = date.getFullYear();
  const month = padWithZero(date.getMonth() + 1); // getMonth() is 0-based
  const day = padWithZero(date.getDate());

  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const buildCalendarDays = (month: Date): CalendarDay[] => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const today = new Date();

  return Array.from({ length: TOTAL_GRID_CELLS }, (_, index) => {
    const date = new Date(year, monthIndex, 1 - firstWeekday + index);

    return {
      date: date,
      isCurrentMonth: date.getMonth() === monthIndex,
      isToday: isSameDay(date, today),
    };
  });
};

export default function Calendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const changeMonth = (offset: number) => {
    if (!currentDate) return;

    const newMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
    );

    setCurrentDate(newMonth);
  };

  const handleDayClick = (day: CalendarDay) => {
    // Ignore clicks on days from the previous / next month
    if (!day.isCurrentMonth) return;

    setSelectedDate(day.date);
  };

  // Saves the chosen exam date and sends the user to the dashboard
  const handleSetExamDate = () => {
    if (!selectedDate) return;

    // Save as "YYYY-MM-DD" so it is easy to parse later
    const dateToStore = formatDateForStorage(selectedDate);
    localStorage.setItem(EXAM_DATE_STORAGE_KEY, dateToStore);
    toast.success(`Exam date set to ${formatDateForDisplay(selectedDate)}`);
    setTimeout(() => {
      router.push("/dashboard");
    }, REDIRECT_DELAY_MS);
  };

  const getDayClasses = (day: CalendarDay): string => {
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

  const calendarDays = buildCalendarDays(currentDate);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-brand-200 shadow-sm p-4 md:p-6">
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

      {/* ---------- Week day labels (Sun, Mon, Tue, ...) ---------- */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 border-b border-brand-200 pb-2">
        {WEEK_DAYS.map((weekDay) => (
          <div
            key={weekDay}
            className="text-center text-xs md:text-sm font-semibold uppercase tracking-wide text-brand-600"
          >
            {weekDay}
          </div>
        ))}
      </div>

      {/* ---------- Days grid ---------- */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {calendarDays.map((day) => (
          <div
            key={day.date.toISOString()}
            onClick={() => handleDayClick(day)}
            className={`flex aspect-square items-center justify-center rounded-lg text-sm md:text-base transition ${getDayClasses(day)}`}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>

     {/* ---------- Confirm button (disabled until a day is selected) ---------- */}
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
