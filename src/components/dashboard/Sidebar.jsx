import { NavLink } from "react-router-dom";
import { FiBookOpen, FiCalendar, FiClipboard, FiDollarSign, FiHeart, FiHome, FiSettings, FiUser } from "react-icons/fi";

const links = [
  { to: "/", label: "Dashboard", icon: FiHome },
  { to: "/assignments", label: "Assignments", icon: FiClipboard },
  { to: "/calendar", label: "Calendar", icon: FiCalendar },
  { to: "/budget", label: "Budget", icon: FiDollarSign },
  { to: "/notes", label: "Notes", icon: FiBookOpen },
  { to: "/habits", label: "Habits", icon: FiUser },
  { to: "/wellness", label: "Wellness", icon: FiHeart },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

const Sidebar = ({ currentPath }) => {
  return (
    <aside className="border-b border-[#d8e1d4] bg-[#f5f1ed]/90 p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Student Survival Hub</p>
        <h1 className="mt-3 text-2xl font-bold text-[#1f241d]">Life operating system</h1>
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
                  ? "bg-[#7f957a] text-white"
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
