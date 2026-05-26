const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="panel p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#6d7b66]">{title}</p>
      <p className="mt-3 text-3xl font-bold text-[#1f241d]">{value}</p>
      {subtitle && <p className="mt-2 text-sm text-[#51614f]">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;

