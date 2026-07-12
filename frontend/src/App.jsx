import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./features/auth-dashboard-org/pages/login";
import Signup from "./features/auth-dashboard-org/pages/signup";
import Dashboard from "./features/auth-dashboard-org/pages/Dashboard";
import Departments from "./features/auth-dashboard-org/pages/Departments";
import { getCurrentUser } from "./features/auth-dashboard-org/services/authService";

function App() {
  const [view, setView] = useState(() => (getCurrentUser() ? "dashboard" : "login"));

  useEffect(() => {
    if (getCurrentUser()) {
      setView("dashboard");
    }
  }, []);

  const renderHomePage = () => {
    if (view === "signup") {
      return (
        <Signup
          onSwitchToLogin={() => setView("login")}
          onSignupSuccess={() => setView("dashboard")}
        />
      );
    }

    if (view === "dashboard") {
      return <Dashboard onLogout={() => setView("login")} />;
    }

    return (
      <Login
        onSwitchToSignup={() => setView("signup")}
        onLoginSuccess={() => setView("dashboard")}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={renderHomePage()} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </div>
  );
}

export default App;
