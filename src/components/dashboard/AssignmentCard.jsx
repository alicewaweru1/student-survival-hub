const AssignmentCard = ({ assignments = [] }) => {
  return (
    <div className="panel p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#6d7b66]">Upcoming</p>
      <h2 className="mt-3 text-2xl font-bold text-[#1f241d]">Assignments</h2>
      <div className="mt-5 space-y-3">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="rounded-2xl border border-[#dbe2d5] bg-white/90 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-[#1f241d]">{assignment.title}</p>
                <p className="text-sm text-[#51614f]">{assignment.course}</p>
              </div>
              <span className={`chip ${assignment.priority === "High" ? "chip-danger" : "chip-neutral"}`}>
                {assignment.priority}
              </span>
            </div>
            <p className="mt-2 text-sm text-[#51614f]">Due {assignment.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentCard;
