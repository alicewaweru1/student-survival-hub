import { useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const WellnessPage = () => {
  const { wellness, addWellnessLog } = useStudentHub();
  const [form, setForm] = useState({ mood: "Calm", energy: "4", sleep: "7", hydration: "2.5", notes: "" });

  const submit = (event) => {
    event.preventDefault();

    addWellnessLog({
      mood: form.mood,
      energy: Number(form.energy),
      sleep: Number(form.sleep),
      hydration: Number(form.hydration),
      notes: form.notes,
    });

    setForm((prev) => ({ ...prev, notes: "" }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.3fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Care</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Wellness page</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">Check in on energy, sleep, hydration, and mood to avoid burnout.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <select
            className="input"
            value={form.mood}
            onChange={(event) => setForm((prev) => ({ ...prev, mood: event.target.value }))}
          >
            {"Calm Focused Tired Stressed".split(" ").map((mood) => (
              <option key={mood}>{mood}</option>
            ))}
          </select>
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              type="number"
              min="1"
              max="5"
              className="input"
              value={form.energy}
              onChange={(event) => setForm((prev) => ({ ...prev, energy: event.target.value }))}
            />
            <input
              type="number"
              min="1"
              max="12"
              className="input"
              placeholder="Sleep"
              value={form.sleep}
              onChange={(event) => setForm((prev) => ({ ...prev, sleep: event.target.value }))}
            />
            <input
              type="number"
              min="0"
              step="0.5"
              className="input"
              placeholder="Hydration"
              value={form.hydration}
              onChange={(event) => setForm((prev) => ({ ...prev, hydration: event.target.value }))}
            />
          </div>
          <textarea
            className="input min-h-32"
            placeholder="Short note about your day"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
          <button type="submit" className="btn-primary w-full">
            Save wellness check-in
          </button>
        </form>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">History</p>
        <div className="mt-4 space-y-3">
          {wellness.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-[#1f241d]">{entry.date}</p>
                <span className="chip chip-sage">{entry.mood}</span>
              </div>
              <p className="mt-2 text-sm text-[#51614f]">Energy {entry.energy}/5 • Sleep {entry.sleep}h • Hydration {entry.hydration}L</p>
              {entry.notes && <p className="mt-2 text-sm text-[#394334]">{entry.notes}</p>}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default WellnessPage;
