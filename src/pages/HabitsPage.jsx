import { useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const HabitsPage = () => {
  const { habits, updateHabit, addHabit } = useStudentHub();
  const [form, setForm] = useState({ name: "", goal: "2", unit: "sessions" });

  const submit = (event) => {
    event.preventDefault();

    if (!form.name) {
      return;
    }

    addHabit({
      name: form.name,
      goal: Number(form.goal) || 2,
      progress: 0,
      unit: form.unit,
      streak: 0,
    });

    setForm({ name: "", goal: "2", unit: "sessions" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Build</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Habit tracker</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">Create small daily rituals and celebrate progress.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Habit name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="number"
              min="1"
              className="input"
              value={form.goal}
              onChange={(event) => setForm((prev) => ({ ...prev, goal: event.target.value }))}
            />
            <input
              className="input"
              placeholder="Unit"
              value={form.unit}
              onChange={(event) => setForm((prev) => ({ ...prev, unit: event.target.value }))}
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Add habit
          </button>
        </form>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Your habits</p>
        <div className="mt-4 space-y-4">
          {habits.map((habit) => {
            const completion = Math.round((habit.progress / habit.goal) * 100);

            return (
              <div key={habit.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1f241d]">{habit.name}</p>
                    <p className="text-sm text-[#51614f]">Goal: {habit.goal} {habit.unit}</p>
                  </div>
                  <span className="chip chip-sage">{habit.streak} day streak</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-[#eef1e8]">
                  <div
                    className="h-3 rounded-full bg-[#7f957a]"
                    style={{ width: `${Math.min(100, completion)}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-[#51614f]">
                  <span>{habit.progress}/{habit.goal} complete</span>
                  <button type="button" className="btn-secondary" onClick={() => updateHabit(habit.id, 1)}>
                    Log progress
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default HabitsPage;
