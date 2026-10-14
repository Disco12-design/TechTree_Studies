"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function Calendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    if (!currentDate) return [];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: CalendarDay[] = [];

    // Previous month's days
    const previousMonthDays = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: previousMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month's days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  };

  const previousMonth = () => {
    if (currentDate) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
      );
    }
  };

  const nextMonth = () => {
    if (currentDate) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
      );
    }
  };

  const handleSetExamDate = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }

    // Save as YYYY-MM-DD (avoids timezone shifts from toISOString)
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    
    localStorage.setItem("examDate", formattedDate);

    // Show success toast with the selected date
    const displayDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    
    toast.success(`Exam date set to ${displayDate}`);

    // Navigate after a short delay to let the toast show
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  if (!currentDate) {
    return <div className="p-6 text-center text-brand-600">Loading calendar...</div>;
  }

  const isSelected = (day: CalendarDay) =>
    !!selectedDate &&
    day.isCurrentMonth &&
    day.date === selectedDate.getDate() &&
    currentDate.getMonth() === selectedDate.getMonth() &&
    currentDate.getFullYear() === selectedDate.getFullYear();

  const calendarDays = generateCalendarDays();
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl border border-brand-200 shadow-sm p-4 md:p-6">
      {/* Header with Month/Year and Navigation */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button
          onClick={previousMonth}
          className="p-2 rounded-lg text-brand-600 transition hover:bg-brand-100 hover:text-brand-800"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg md:text-2xl font-bold text-brand-900">
          {monthYear}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg text-brand-600 transition hover:bg-brand-100 hover:text-brand-800"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 border-b border-brand-200 pb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-semibold uppercase tracking-wide text-brand-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => {
              if (!day.isCurrentMonth) return;
              setSelectedDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day.date
                )
              );
            }}
            className={`flex aspect-square items-center justify-center rounded-lg text-sm md:text-base transition ${
              isSelected(day)
                ? "bg-brand-800 font-bold text-white shadow-md cursor-pointer"
                : day.isToday
                ? "bg-brand-200 font-bold text-brand-900 ring-2 ring-brand-600 cursor-pointer"
                : day.isCurrentMonth
                ? "font-medium text-brand-900 hover:bg-brand-100 cursor-pointer"
                : "text-brand-300 cursor-default"
            }`}
            data-date={day.date}
            data-current-month={day.isCurrentMonth}
            data-today={day.isToday}
          >
            {day.date}
          </div>
        ))}
      </div>

      <button
        onClick={handleSetExamDate}
        disabled={!selectedDate}
        className="mt-12 w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-600"
      >
        <p>Set Exam Date</p>
      </button>
    </div>
  );
}