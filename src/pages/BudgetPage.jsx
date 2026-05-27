import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const BudgetPage = () => {
  const { budgets, addBudgetEntry, stats } = useStudentHub();
  const [form, setForm] = useState({ label: "", type: "expense", amount: "", date: new Date().toISOString().slice(0, 10) });

  const recentEntries = useMemo(() => budgets.slice(0, 8), [budgets]);

  const submit = (event) => {
    event.preventDefault();

    if (!form.label || !form.amount) {
      return;
    }

    addBudgetEntry({
      label: form.label,
      type: form.type,
      amount: Number(form.amount),
      date: form.date,
    });

    setForm((prev) => ({ ...prev, label: "", amount: "" }));
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Finance</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Budget tracker</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">
          Track income, spending, and your savings runway in real time.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            className="input"
            placeholder="Item name"
            value={form.label}
            onChange={(event) => setForm((prev) => ({ ...prev, label: event.target.value }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              className="input"
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="number"
              min="0"
              className="input"
              placeholder="Amount"
              value={form.amount}
              onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
            />
          </div>
          <input
            type="date"
            className="input"
            value={form.date}
            onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
          />
          <button type="submit" className="btn-primary w-full">
            Add entry
          </button>
        </form>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#eff3e9] p-4">
            <p className="text-sm text-[#51614f]">Balance</p>
            <p className="mt-2 text-2xl font-bold text-[#1f241d]">Ksh {stats.balance.toFixed(0)}</p>
          </div>
          <div className="rounded-2xl bg-[#f8eee8] p-4">
            <p className="text-sm text-[#6c544a]">Expenses</p>
            <p className="mt-2 text-2xl font-bold text-[#4a2e25]">Ksh {stats.totalExpenses.toFixed(0)}</p>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Recent activity</p>
        <div className="mt-6 space-y-3">
          {recentEntries.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-[#dbe2d5] bg-white/90 px-4 py-3">
              <div>
                <p className="font-semibold text-[#1f241d]">{entry.label}</p>
                <p className="text-sm text-[#51614f]">{entry.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${entry.type === "income" ? "bg-[#e8f1e3] text-[#314230]" : "bg-[#f9e8db] text-[#6f4434]"}`}>
                {entry.type === "income" ? "+" : "-"}Ksh {entry.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default BudgetPage;
