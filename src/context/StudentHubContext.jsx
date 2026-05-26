import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "student-survival-hub-data";

const seedProfile = {
  name: "Amina Patel",
  school: "Green Valley College",
  major: "Business & Information Systems",
  focus: "Finish the semester strong",
  theme: "sage",
};

const seedData = {
  assignments: [
    {
      id: "1",
      title: "React Dashboard Sprint",
      course: "Web Development",
      dueDate: "2026-05-29",
      priority: "High",
      status: "Pending",
      notes: "Complete the dashboard layout and local storage sync.",
    },
    {
      id: "2",
      title: "Economics Review Pack",
      course: "Microeconomics",
      dueDate: "2026-05-31",
      priority: "Medium",
      status: "In Progress",
      notes: "Summarize chapters 4-6 and make a one-page cheat sheet.",
    },
    {
      id: "3",
      title: "Lab reflection",
      course: "Biology Lab",
      dueDate: "2026-06-02",
      priority: "Low",
      status: "Done",
      notes: "Submit after feeding back from the mentor session.",
    },
  ],
  events: [
    {
      id: "e1",
      title: "Math tutorial",
      date: "2026-05-27",
      start: "09:00",
      end: "10:00",
      category: "Class",
    },
    {
      id: "e2",
      title: "Library focus block",
      date: "2026-05-27",
      start: "18:00",
      end: "19:30",
      category: "Study",
    },
    {
      id: "e3",
      title: "Budget check-in",
      date: "2026-05-28",
      start: "20:00",
      end: "20:20",
      category: "Life",
    },
  ],
  budgets: [
    { id: "b1", label: "Scholarship", type: "income", amount: 1200, date: "2026-05-01" },
    { id: "b2", label: "Groceries", type: "expense", amount: 82, date: "2026-05-12" },
    { id: "b3", label: "Transport", type: "expense", amount: 45, date: "2026-05-16" },
    { id: "b4", label: "Textbook deposit", type: "expense", amount: 64, date: "2026-05-19" },
  ],
  notes: [
    {
      id: "n1",
      title: "Exam checklist",
      content: "Review past papers, organize formulas, and sleep before the final.",
      tag: "study",
      updatedAt: "2026-05-18",
    },
    {
      id: "n2",
      title: "Resource gems",
      content: "Keep a short note on the best lecture recap videos and practice links.",
      tag: "resources",
      updatedAt: "2026-05-21",
    },
  ],
  resources: [
    { id: "r1", title: "Canva study templates", link: "https://www.canva.com", tag: "design" },
    { id: "r2", title: "Khan Academy", link: "https://www.khanacademy.org", tag: "learning" },
    { id: "r3", title: "Notion study planner", link: "https://www.notion.so", tag: "planning" },
  ],
  habits: [
    { id: "h1", name: "Focus sprint", goal: 2, progress: 1, unit: "sessions", streak: 3 },
    { id: "h2", name: "Hydration check", goal: 3, progress: 2, unit: "refills", streak: 5 },
    { id: "h3", name: "Walk break", goal: 1, progress: 1, unit: "walk", streak: 2 },
  ],
  wellness: [
    {
      id: "w1",
      date: "2026-05-24",
      mood: "Calm",
      energy: 4,
      sleep: 7,
      hydration: 2.5,
      notes: "Short walk and quiet evening planning session.",
    },
  ],
  profile: seedProfile,
};

const StudentHubContext = createContext(null);

export const StudentHubProvider = ({ children }) => {
  const [data, setData] = useState(seedData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved);

      setData({
        ...seedData,
        ...parsed,
        assignments: parsed.assignments ?? seedData.assignments,
        events: parsed.events ?? seedData.events,
        budgets: parsed.budgets ?? seedData.budgets,
        notes: parsed.notes ?? seedData.notes,
        resources: parsed.resources ?? seedData.resources,
        habits: parsed.habits ?? seedData.habits,
        wellness: parsed.wellness ?? seedData.wellness,
        profile: parsed.profile ?? seedData.profile,
      });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addAssignment = (assignment) => {
    setData((prev) => ({
      ...prev,
      assignments: [
        {
          id: crypto.randomUUID(),
          status: "Pending",
          ...assignment,
        },
        ...prev.assignments,
      ],
    }));
  };

  const updateAssignmentStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      assignments: prev.assignments.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    }));
  };

  const deleteAssignment = (id) => {
    setData((prev) => ({
      ...prev,
      assignments: prev.assignments.filter((item) => item.id !== id),
    }));
  };

  const addEvent = (event) => {
    setData((prev) => ({
      ...prev,
      events: [
        {
          id: crypto.randomUUID(),
          ...event,
        },
        ...prev.events,
      ],
    }));
  };

  const addBudgetEntry = (entry) => {
    setData((prev) => ({
      ...prev,
      budgets: [
        {
          id: crypto.randomUUID(),
          ...entry,
        },
        ...prev.budgets,
      ],
    }));
  };

  const addHabit = (habit) => {
    setData((prev) => ({
      ...prev,
      habits: [
        {
          id: crypto.randomUUID(),
          ...habit,
        },
        ...prev.habits,
      ],
    }));
  };

  const addNote = (note) => {
    setData((prev) => ({
      ...prev,
      notes: [
        {
          id: crypto.randomUUID(),
          updatedAt: new Date().toISOString().slice(0, 10),
          ...note,
        },
        ...prev.notes,
      ],
    }));
  };

  const addResource = (resource) => {
    setData((prev) => ({
      ...prev,
      resources: [
        {
          id: crypto.randomUUID(),
          ...resource,
        },
        ...prev.resources,
      ],
    }));
  };

  const updateHabit = (id, amount) => {
    setData((prev) => ({
      ...prev,
      habits: prev.habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              progress: Math.min(habit.goal, habit.progress + amount),
              streak: habit.progress + amount >= habit.goal ? habit.streak + 1 : habit.streak,
            }
          : habit
      ),
    }));
  };

  const addWellnessLog = (log) => {
    setData((prev) => ({
      ...prev,
      wellness: [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString().slice(0, 10),
          ...log,
        },
        ...prev.wellness,
      ],
    }));
  };

  const updateProfile = (profile) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profile },
    }));
  };

  const resetDemoData = () => {
    setData(seedData);
  };

  const stats = useMemo(() => {
    const totalIncome = data.budgets
      .filter((item) => item.type === "income")
      .reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExpenses = data.budgets
      .filter((item) => item.type === "expense")
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const pendingAssignments = data.assignments.filter(
      (item) => item.status !== "Done"
    ).length;

    const averageEnergy =
      data.wellness.length > 0
        ? Math.round(
            data.wellness.reduce((sum, item) => sum + Number(item.energy), 0) /
              data.wellness.length
          )
        : 0;

    return {
      pendingAssignments,
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      averageEnergy,
    };
  }, [data]);

  return (
    <StudentHubContext.Provider
      value={{
        ...data,
        stats,
        addAssignment,
        updateAssignmentStatus,
        deleteAssignment,
        addEvent,
        addBudgetEntry,
        addHabit,
        addNote,
        addResource,
        updateHabit,
        addWellnessLog,
        updateProfile,
        resetDemoData,
      }}
    >
      {children}
    </StudentHubContext.Provider>
  );
};

export const useStudentHub = () => {
  const context = useContext(StudentHubContext);

  if (!context) {
    throw new Error("useStudentHub must be used inside StudentHubProvider");
  }

  return context;
};
