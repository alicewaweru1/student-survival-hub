import { FiBell, FiUser } from "react-icons/fi";

const Navbar = ({ title }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] bg-white/80 px-5 py-4 shadow-[0_20px_60px_-30px_rgba(74,46,37,0.3)] backdrop-blur">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Overview</p>
        <h2 className="mt-2 text-2xl font-bold text-[#1f241d]">{title}</h2>
      </div>
    </div>
  );
};

export default Navbar;
