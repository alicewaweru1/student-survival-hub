import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import AssignmentsPage from "./pages/AssignmentsPage";
import BudgetPage from "./pages/BudgetPage";
import CalendarPage from "./pages/CalendarPage";
import Dashboard from "./pages/Dashboard";
import HabitsPage from "./pages/HabitsPage";
import NotesResourcesPage from "./pages/NotesResourcesPage";
import SettingsPage from "./pages/SettingsPage";
import WellnessPage from "./pages/WellnessPage";
import { StudentHubProvider } from "./context/StudentHubContext";

function App() {
  return (
    <StudentHubProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/notes" element={<NotesResourcesPage />} />
            <Route path="/habits" element={<HabitsPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StudentHubProvider>
  );
}

export default App;