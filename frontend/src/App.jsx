import { useEffect, useState } from 'react';
import Login from './features/auth-dashboard-org/pages/login';
import Signup from './features/auth-dashboard-org/pages/signup';
import Dashboard from './features/auth-dashboard-org/pages/Dashboard';
import { getCurrentUser } from './features/auth-dashboard-org/services/authService';
import { Routes, Route } from "react-router-dom";
import Departments from "./features/auth-dashboard-org/pages/Departments";

function App() {
  const [view, setView] = useState('login');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setView('dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        {view === 'login' ? (
          <Route path="/" element={<Login onSwitchToSignup={() => setView('signup')} onLoginSuccess={() => setView('dashboard')} />}
        ) : view === 'signup' ? (
          <Route path="/" element={<Signup onSwitchToLogin={() => setView('login')} onSignupSuccess={() => setView('dashboard')} />}
        ) : (
          <Route path="/" element={<Dashboard onLogout={() => setView('login')} />}
        )}
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </div>
  );
}

export default App;
