const WelcomeCard = ({ profile }) => {
  return (
    <div className="rounded-[30px] bg-[linear-gradient(135deg,#6f8b6b_0%,#4a2e25_100%)] px-6 py-8 text-white shadow-[0_25px_60px_-30px_rgba(74,46,37,0.5)] sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#eef3e6]">Welcome back</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{profile?.name || "Alice"}, you&apos;re crushing this week.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f7f2ee] sm:text-base">
        Your campus operating system is now centralized: assignments, schedules, budgeting, habits, notes, resources, and wellness all live in one calm dashboard.
      </p>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-white/15 px-4 py-2">{profile?.school || "Zindua School"}</span>
        <span className="rounded-full bg-white/15 px-4 py-2">{profile?.major || "Software Engineering"}</span>
        <span className="rounded-full bg-white/15 px-4 py-2">Focus: {profile?.focus || "Finish strong"}</span>
      </div>
    </div>
  );
};

export default WelcomeCard;
