import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";
import { useStudentHub } from "../../context/StudentHubContext";

const titles = {
  "/": "Dashboard",
  "/assignments": "Assignments",
  "/calendar": "Calendar & Schedule",
  "/timetable": "Weekly Timetable",
  "/budget": "Budget Tracker",
  "/notes": "Notes & Resources",
  "/habits": "Habit Tracker",
  "/wellness": "Wellness",
  "/settings": "Settings & Profile",
};

const DashboardLayout = () => {
  const location = useLocation();
  const { themeMode } = useStudentHub();
  const currentTitle = titles[location.pathname] ?? "Student Survival Hub";

  const wrapperClasses = themeMode === "dark"
    ? "min-h-screen bg-[linear-gradient(180deg,#021622_0%,#193f4a_100%)] text-[#e3f6f9]"
    : "min-h-screen bg-[linear-gradient(180deg,#f5f1ed_0%,#e8efe8_100%)] text-[#1f241d]";

  return (
    <div className={wrapperClasses}>
      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        <Sidebar currentPath={location.pathname} />

        <main className="flex-1 px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <Navbar title={currentTitle} />

          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-6"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
