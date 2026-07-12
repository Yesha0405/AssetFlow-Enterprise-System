function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Enterprise Asset Management</h1>

        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="flex">

        {/* Sidebar */}
        <div className="w-64 bg-slate-800 text-white min-h-screen p-6">

          <h2 className="text-xl font-bold mb-8">
            Dashboard
          </h2>

          <ul className="space-y-5">

            <li className="cursor-pointer hover:text-blue-300">
              Dashboard
            </li>

            <li className="cursor-pointer hover:text-blue-300">
              Organization
            </li>

            <li className="cursor-pointer hover:text-blue-300">
              Departments
            </li>

            <li className="cursor-pointer hover:text-blue-300">
              Categories
            </li>

            <li className="cursor-pointer hover:text-blue-300">
              Employees
            </li>

          </ul>

        </div>

        {/* Main Content */}

        <div className="flex-1 p-8">

          <h2 className="text-3xl font-bold mb-8">
            Welcome Admin 👋
          </h2>

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Total Employees
              </h3>

              <p className="text-3xl font-bold mt-3">
                150
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Departments
              </h3>

              <p className="text-3xl font-bold mt-3">
                8
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Categories
              </h3>

              <p className="text-3xl font-bold mt-3">
                12
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-gray-500">
                Assets
              </h3>

              <p className="text-3xl font-bold mt-3">
                325
              </p>
            </div>

          </div>

          {/* Recent Activity */}

          <div className="bg-white rounded-xl shadow mt-10 p-6">

            <h3 className="text-xl font-bold mb-4">
              Recent Activity
            </h3>

            <ul className="space-y-3">

              <li>✔ Employee Rahul added.</li>

              <li>✔ New Department created.</li>

              <li>✔ Category "Laptop" added.</li>

              <li>✔ Organization details updated.</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;