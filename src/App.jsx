import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import AssignmentsPage from "./pages/AssignmentsPage";
import BudgetPage from "./pages/BudgetPage";
import CalendarPage from "./pages/CalendarPage";
import Dashboard from "./pages/Dashboard";
import HabitsPage from "./pages/HabitsPage";
import LoginPage from "./pages/LoginPage";
import NotesResourcesPage from "./pages/NotesResourcesPage";
import SettingsPage from "./pages/SettingsPage";
import TimetablePage from "./pages/TimetablePage";
import WellnessPage from "./pages/WellnessPage";
import { StudentHubProvider, useStudentHub } from "./context/StudentHubContext";

const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useStudentHub();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <StudentHubProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/notes" element={<NotesResourcesPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </StudentHubProvider>
  );
}

export default App;