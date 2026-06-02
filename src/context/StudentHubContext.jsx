import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "student-survival-hub-data";

const seedProfile = {
  name: "",
  school: "",
  major: "",
  focus: "",
  theme: "sage",
};

const seedData = {
  auth: {
    isAuthenticated: false,
    username: "",
  },
  themeMode: "light",
  timetable: [],
  assignments: [],
  events: [],
  budgets: [],
  notes: [],
  resources: [],
  habits: [],
  wellness: [],
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
        auth: parsed.auth ?? seedData.auth,
        themeMode: parsed.themeMode ?? seedData.themeMode,
        timetable: parsed.timetable ?? seedData.timetable,
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

  useEffect(() => {
    document.documentElement.dataset.theme = data.themeMode;
  }, [data.themeMode]);

  const login = (username, password) => {
    if (!username || password.length < 4) {
      return false;
    }

    setData((prev) => {
      const isNewUser = prev.auth.username !== username;

      return {
        ...prev,
        auth: {
          isAuthenticated: true,
          username,
        },
        profile: isNewUser
          ? { ...seedProfile, name: username }
          : { ...prev.profile, name: username },
        timetable: isNewUser ? [] : prev.timetable,
        assignments: isNewUser ? [] : prev.assignments,
        events: isNewUser ? [] : prev.events,
        budgets: isNewUser ? [] : prev.budgets,
        notes: isNewUser ? [] : prev.notes,
        resources: isNewUser ? [] : prev.resources,
        habits: isNewUser ? [] : prev.habits,
        wellness: isNewUser ? [] : prev.wellness,
      };
    });

    return true;
  };

  const logout = () => {
    setData((prev) => ({
      ...prev,
      auth: {
        isAuthenticated: false,
        username: "",
      },
      profile: {
        ...prev.profile,
        name: "",
      },
    }));
  };

  const toggleTheme = () => {
    setData((prev) => ({
      ...prev,
      themeMode: prev.themeMode === "dark" ? "light" : "dark",
    }));
  };

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
        isLoggedIn: data.auth?.isAuthenticated,
        darkMode: data.themeMode === "dark",
        login,
        logout,
        toggleTheme,
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
