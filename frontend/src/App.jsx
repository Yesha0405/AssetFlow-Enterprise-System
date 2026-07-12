import { useEffect, useState } from 'react';
import Login from './features/auth-dashboard-org/pages/login';
import Signup from './features/auth-dashboard-org/pages/signup';
import Dashboard from './features/auth-dashboard-org/pages/Dashboard';
import { getCurrentUser } from './features/auth-dashboard-org/services/authService';

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
      {view === 'login' ? (
        <Login onSwitchToSignup={() => setView('signup')} onLoginSuccess={() => setView('dashboard')} />
      ) : view === 'signup' ? (
        <Signup onSwitchToLogin={() => setView('login')} onSignupSuccess={() => setView('dashboard')} />
      ) : (
        <Dashboard onLogout={() => setView('login')} />
      )}
    </div>
  );
}

export default App;
