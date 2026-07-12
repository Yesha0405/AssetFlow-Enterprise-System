import { useEffect, useMemo, useState } from 'react';
import { getCurrentUser, logoutUser } from '../services/authService';
import { AssetManagementPage } from '../../asset-management/pages/AssetManagementPage';

function Dashboard({ onLogout }) {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [selectedSection, setSelectedSection] = useState('dashboard');

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    try {
      const savedOrg = localStorage.getItem('assetflow-organization');
      setOrganization(savedOrg ? JSON.parse(savedOrg) : null);
    } catch (error) {
      console.error('Unable to load organization data:', error);
    }
  }, []);

  const stats = useMemo(() => ({
    employees: 150,
    departments: 8,
    categories: 12,
    assets: 325,
  }), []);

  const handleLogout = () => {
    logoutUser();
    if (onLogout) onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enterprise Asset Management</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-64 bg-slate-800 text-white min-h-screen p-6">
          <h2 className="text-xl font-bold mb-8">Dashboard</h2>
          <ul className="space-y-5">
            <li
              onClick={() => setSelectedSection('dashboard')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Dashboard
            </li>
            <li
              onClick={() => setSelectedSection('assets')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'assets' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Assets
            </li>
            <li
              onClick={() => setSelectedSection('organization')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'organization' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Organization
            </li>
            <li
              onClick={() => setSelectedSection('departments')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'departments' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Departments
            </li>
            <li
              onClick={() => setSelectedSection('categories')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'categories' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Categories
            </li>
            <li
              onClick={() => setSelectedSection('employees')}
              className={`cursor-pointer rounded-xl px-3 py-2 transition ${selectedSection === 'employees' ? 'bg-blue-600 text-white' : 'hover:text-blue-300'}`}
            >
              Employees
            </li>
          </ul>
        </div>

        <div className="flex-1 p-8">
          {selectedSection === 'assets' ? (
            <AssetManagementPage />
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2">Welcome {user?.name || 'Admin'} 👋</h2>
              <p className="text-gray-600 mb-8">
                {organization?.name ? `Managing ${organization.name}` : 'Set up your organization details to get started.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-gray-500">Total Employees</h3>
                  <p className="text-3xl font-bold mt-3">{stats.employees}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-gray-500">Departments</h3>
                  <p className="text-3xl font-bold mt-3">{stats.departments}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-gray-500">Categories</h3>
                  <p className="text-3xl font-bold mt-3">{stats.categories}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-gray-500">Assets</h3>
                  <p className="text-3xl font-bold mt-3">{stats.assets}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow mt-10 p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <ul className="space-y-3">
                  <li>✔ {user?.name || 'Admin'} signed in.</li>
                  <li>✔ Organization setup updated.</li>
                  <li>✔ Category "Laptop" added.</li>
                  <li>✔ New department created.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;