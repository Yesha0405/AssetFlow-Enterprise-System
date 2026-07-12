import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ReportsDashboard from './features/maintenance-audit-reports/components/ReportsDashboard';
import Login from "./features/auth-dashboard-org/pages/login";
import Signup from "./features/auth-dashboard-org/pages/signup";
import Dashboard from "./features/auth-dashboard-org/pages/Dashboard";
import Departments from "./features/auth-dashboard-org/pages/Departments";
import Categories from "./features/auth-dashboard-org/pages/Categories";
import Employees from "./features/auth-dashboard-org/pages/Employees";
import { getCurrentUser, logoutUser } from "./features/auth-dashboard-org/services/authService";

function App() {
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>

        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                onSwitchToSignup={() => navigate("/signup")}
                onLoginSuccess={() => navigate("/dashboard")}
              />
            )
          }
        />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route
          path="/signup"
          element={
            <Signup
              onSwitchToLogin={() => navigate("/")}
              onSignupSuccess={() => navigate("/dashboard")}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              onLogout={() => {
                logoutUser();
                navigate("/");
              }}
            />
          }
        />

        <Route path="/departments" element={<Departments />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/employees" element={<Employees />} />

      </Routes>
    </div>
  );
}

export default App;