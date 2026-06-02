import { motion } from "framer-motion";
import { useStudentHub } from "../context/StudentHubContext";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]; 
const times = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];

const TimetablePage = () => {
  const { timetable } = useStudentHub();

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="panel p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Weekly plan</p>
        <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Timetable</h2>
        <p className="mt-2 text-sm text-[#4b5a46]">View your structured week by class, study session, and break.</p>

        <div className="mt-6 overflow-x-auto rounded-[28px] border border-[#dbe2d5] bg-white/90">
          <div className="grid min-w-[700px] grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-px bg-[#e7efe1] text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#51614f]">
            <div className="py-3" />
            {days.map((day) => (
              <div key={day} className="py-3">{day}</div>
            ))}
          </div>

          {times.map((time) => (
            <div key={time} className="grid min-w-[700px] grid-cols-[120px_repeat(5,minmax(0,1fr))] gap-px text-sm">
              <div className="flex items-center justify-center bg-[#f4f8f1] py-4 font-semibold text-[#51614f]">{time}</div>
              {days.map((day) => {
                const entry = timetable.find((item) => item.day === day && item.time === time);
                return (
                  <div key={`${day}-${time}`} className="min-h-[96px] bg-white p-4 text-left">
                    {entry ? (
                      <>
                        <p className="font-semibold text-[#1f241d]">{entry.title}</p>
                        <p className="mt-1 text-xs text-[#51614f]">{entry.location}</p>
                      </>
                    ) : (
                      <p className="text-xs text-[#8a9480]">Free slot</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default TimetablePage;
