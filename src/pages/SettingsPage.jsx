import { useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const SettingsPage = () => {
  const { profile, updateProfile, resetDemoData } = useStudentHub();
  const [form, setForm] = useState({
    name: profile.name,
    school: profile.school,
    major: profile.major,
    focus: profile.focus,
  });

  const submit = (event) => {
    event.preventDefault();
    updateProfile(form);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Profile</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Settings & profile</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">Adapt the hub to your semester and learning rhythm.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="input"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="input"
            value={form.school}
            onChange={(event) => setForm((prev) => ({ ...prev, school: event.target.value }))}
          />
          <input
            className="input"
            value={form.major}
            onChange={(event) => setForm((prev) => ({ ...prev, major: event.target.value }))}
          />
          <textarea
            className="input min-h-32"
            value={form.focus}
            onChange={(event) => setForm((prev) => ({ ...prev, focus: event.target.value }))}
          />
          <button type="submit" className="btn-primary w-full">
            Update profile
          </button>
        </form>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">System</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Workspace controls</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">Reset the demo content or keep your personalized data in local storage.</p>

        <div className="mt-6 rounded-2xl bg-[#f1f5ea] p-5">
          <p className="font-semibold text-[#1f241d]">Local storage</p>
          <p className="mt-2 text-sm text-[#51614f]">All dashboard data is saved securely in your browser.</p>
        </div>

        <button type="button" className="btn-ghost mt-4 w-full" onClick={resetDemoData}>
          Reset demo data
        </button>
      </motion.section>
    </div>
  );
};

export default SettingsPage;
