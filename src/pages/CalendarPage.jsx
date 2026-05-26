import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarPage = () => {
  const { events, addEvent } = useStudentHub();
  const today = new Date("2026-05-26");
  const [form, setForm] = useState({ title: "", date: "2026-05-27", start: "09:00", end: "10:00", category: "Study" });

  const monthDays = useMemo(() => {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    return Array.from({ length: 35 }, (_, index) => {
      const day = index - startOffset + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  }, []);

  const upcomingEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  const submit = (event) => {
    event.preventDefault();

    if (!form.title || !form.date) {
      return;
    }

    addEvent(form);
    setForm((prev) => ({ ...prev, title: "" }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Planner</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Calendar & schedule</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">
          Keep classes, study sessions, and wellness breaks in one view.
        </p>

        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm font-semibold text-[#51614f]">
          {dayNames.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-7 gap-2">
          {monthDays.map((day, index) => {
            const dayLabel = day ?? "";
            const marker = events.find((event) => event.date.endsWith(`-0${dayLabel}`) || event.date.endsWith(`-${dayLabel}`));

            return (
              <div
                key={index}
                className={`min-h-24 rounded-2xl p-2 ${dayLabel ? "bg-white/85" : "bg-transparent"}`}
              >
                <p className="text-sm font-semibold text-[#1f241d]">{dayLabel}</p>
                {marker && (
                  <p className="mt-2 rounded-full bg-[#dbe2d5] px-2 py-1 text-[11px] text-[#314230]">
                    {marker.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="space-y-6">
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Add event</p>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input
              className="input"
              placeholder="Event title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="date"
                className="input"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
              <select
                className="input"
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              >
                {"Class Study Life".split(" ").map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="time"
                className="input"
                value={form.start}
                onChange={(event) => setForm((prev) => ({ ...prev, start: event.target.value }))}
              />
              <input
                type="time"
                className="input"
                value={form.end}
                onChange={(event) => setForm((prev) => ({ ...prev, end: event.target.value }))}
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Add to schedule
            </button>
          </form>
        </div>

        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Upcoming</p>
          <div className="mt-4 space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
                <p className="font-semibold text-[#1f241d]">{event.title}</p>
                <p className="text-sm text-[#51614f]">
                  {event.date} • {event.start} - {event.end}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-[#f1f5ea] px-3 py-1 text-xs font-semibold text-[#314230]">
                  {event.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CalendarPage;
