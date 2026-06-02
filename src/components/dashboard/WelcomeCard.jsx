const WelcomeCard = ({ profile }) => {
  const welcomeText = profile?.name ? `${profile.name}, you're crushing this week.` : "You're crushing this week.";
  const quote = profile?.name ? "A strong start today makes the rest of the week easier." : "A fresh start is waiting — add your details and make it yours.";
  const tags = [
    { label: profile?.school, fallback: "" },
    { label: profile?.major, fallback: "" },
    { label: profile?.focus ? `Focus: ${profile.focus}` : "" },
  ].filter((item) => item.label);

  return (
    <div className="rounded-[30px] bg-[linear-gradient(135deg,#021622_0%,#1d4e5c_100%)] px-6 py-8 text-white shadow-[0_25px_60px_-30px_rgba(0,0,0,0.45)] sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#79d2dd]">Welcome back</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{welcomeText}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#d8e4ea] sm:text-base">{quote}</p>
      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          {tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-white/15 px-4 py-2 text-[#d8e4ea]">
              {tag.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
