import { NavLink } from "react-router-dom";
import { FiBookOpen, FiCalendar, FiClipboard, FiClock, FiDollarSign, FiHeart, FiHome, FiSettings, FiUser } from "react-icons/fi";
import { useStudentHub } from "../../context/StudentHubContext";

const links = [
  { to: "/", label: "Dashboard", icon: FiHome },
  { to: "/assignments", label: "Assignments", icon: FiClipboard },
  { to: "/calendar", label: "Calendar", icon: FiCalendar },
  { to: "/timetable", label: "Timetable", icon: FiClock },
  { to: "/budget", label: "Budget", icon: FiDollarSign },
  { to: "/notes", label: "Notes", icon: FiBookOpen },
  { to: "/habits", label: "Habits", icon: FiUser },
  { to: "/wellness", label: "Wellness", icon: FiHeart },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

const Sidebar = ({ currentPath }) => {
  const { themeMode } = useStudentHub();

  return (
    <aside className={`border-b p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6 ${
      themeMode === "dark"
        ? "border-[#1b2f38] bg-[#021622]/90 text-[#e3f6f9]"
        : "border-[#d8e1d4] bg-[#f5f1ed]/90 text-[#1f241d]"
    }`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${
          themeMode === "dark" ? "text-[#79d2dd]" : "text-[#6d7b66]"
        }`}>Student Survival Hub</p>
        <h1 className={`mt-3 text-2xl font-bold ${
          themeMode === "dark" ? "text-[#eef8fb]" : "text-[#1f241d]"
        }`}>Life operating system</h1>
      </div>

      <nav className="mt-6 space-y-2">
        {links.map(({ to, label, icon: Icon }) => {
          const isActive = currentPath === to;

          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? themeMode === "dark"
                    ? "bg-[#19515f] text-white"
                    : "bg-[#7f957a] text-white"
                  : themeMode === "dark"
                    ? "text-[#b8dfe5] hover:bg-[#0c2b33]"
                    : "text-[#3f4b3d] hover:bg-[#e9efe2]"
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
