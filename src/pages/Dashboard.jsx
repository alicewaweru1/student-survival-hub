import { motion } from "framer-motion";
import AssignmentCard from "../components/dashboard/AssignmentCard";
import StatsCard from "../components/dashboard/StatsCard";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import { useStudentHub } from "../context/StudentHubContext";

const Dashboard = () => {
  const { assignments, events, habits, profile, stats, wellness, budgets, notes, resources } = useStudentHub();
  const hasContent = assignments.length > 0 || events.length > 0 || habits.length > 0 || wellness.length > 0 || budgets.length > 0 || notes.length > 0 || resources.length > 0;

  return (
    <div className="space-y-6">
      <WelcomeCard profile={profile} />

      {!hasContent ? (
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Ready when you are</p>
          <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Your dashboard is waiting</h2>
          <p className="mt-4 text-sm leading-6 text-[#4b5a46]">
            Start by adding your school, major, and focus in Settings. Your assignments, timetable, wellness checks and habit tracker will appear here once you add them.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Pending assignments" value={stats.pendingAssignments.toString()} subtitle="Keep your queue light" />
            <StatsCard title="Balance" value={`Ksh ${stats.balance.toFixed(0)}`} subtitle="Savings vs spending" />
            <StatsCard title="Energy" value={` ${stats.averageEnergy}/5`} subtitle="Wellness average" />
            <StatsCard title="Habits" value={habits.length.toString()} subtitle="Daily rituals tracked" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <AssignmentCard assignments={assignments.slice(0, 4)} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="panel p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Today</p>
              <h2 className="mt-3 text-xl font-bold text-[#1f241d]">Quick glance</h2>
              <div className="mt-5 space-y-3">
                {events.slice(0, 3).map((event) => (
                  <div key={event.id} className="rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    <p className="font-semibold text-[#1f241d]">{event.title}</p>
                    <p className="text-sm text-[#51614f]">{event.date} • {event.start}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
