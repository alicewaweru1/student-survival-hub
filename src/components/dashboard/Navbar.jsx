import { FiBell, FiUser } from "react-icons/fi";
import { useStudentHub } from "../../context/StudentHubContext";

const Navbar = ({ title }) => {
  const { themeMode } = useStudentHub();

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 rounded-[28px] px-5 py-4 shadow-[0_20px_60px_-30px_rgba(74,46,37,0.3)] backdrop-blur ${
      themeMode === "dark" ? "bg-[#161d22]/90" : "bg-white/80"
    }`}>
      <div>
        <p className={`text-sm font-semibold uppercase tracking-[0.3em] ${
          themeMode === "dark" ? "text-[#79d2dd]" : "text-[#6d7b66]"
        }`}>Overview</p>
        <h2 className={`mt-2 text-2xl font-bold ${
          themeMode === "dark" ? "text-[#e3f6f9]" : "text-[#1f241d]"
        }`}>{title}</h2>
      </div>
    </div>
  );
};

export default Navbar;
