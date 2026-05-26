import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const priorities = ["Low", "Medium", "High"];

const AssignmentsPage = () => {
  const { assignments, addAssignment, updateAssignmentStatus, deleteAssignment } = useStudentHub();
  const [form, setForm] = useState({ title: "", course: "", dueDate: "", priority: "Medium", notes: "" });
  const [filter, setFilter] = useState("All");

  const visibleAssignments = useMemo(() => {
    if (filter === "All") {
      return assignments;
    }

    return assignments.filter((item) => item.status === filter);
  }, [assignments, filter]);

  const submit = (event) => {
    event.preventDefault();

    if (!form.title || !form.course || !form.dueDate) {
      return;
    }

    addAssignment(form);
    setForm({ title: "", course: "", dueDate: "", priority: "Medium", notes: "" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_1.3fr]">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel p-6"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Create</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Assignment manager</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">
          Capture every submission, set priorities, and keep your week moving.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Assignment title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Course"
            value={form.course}
            onChange={(event) => setForm((prev) => ({ ...prev, course: event.target.value }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="date"
              className="input"
              value={form.dueDate}
              onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
            />
            <select
              className="input"
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
            >
              {priorities.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </div>
          <textarea
            className="input min-h-32"
            placeholder="Notes or checklist"
            value={form.notes}
            onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
          />
          <button type="submit" className="btn-primary w-full">
            Save assignment
          </button>
        </form>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="panel p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Overview</p>
            <h2 className="mt-2 text-2xl font-bold text-[#1f241d]">Your queue</h2>
          </div>
          <select
            className="input max-w-[180px]"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            {"All Pending In Progress Done".split(" ").map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 space-y-3">
          {visibleAssignments.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-[#1f241d]">{item.title}</p>
                  <p className="text-sm text-[#51614f]">{item.course}</p>
                  <p className="mt-2 text-sm text-[#6a7b65]">Due {item.dueDate}</p>
                  {item.notes && <p className="mt-2 text-sm text-[#394334]">{item.notes}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`chip ${item.priority === "High" ? "chip-danger" : "chip-neutral"}`}>
                    {item.priority}
                  </span>
                  <span className="chip chip-sage">{item.status}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    updateAssignmentStatus(
                      item.id,
                      item.status === "Done" ? "Pending" : "Done"
                    )
                  }
                >
                  Mark {item.status === "Done" ? "pending" : "done"}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => deleteAssignment(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default AssignmentsPage;
