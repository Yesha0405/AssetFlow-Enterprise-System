import { useState } from "react";
import DepartmentTable from "../components/DepartmentTable";
import DepartmentForm from "../components/DepartmentForm";

function Departments() {
  const [showForm, setShowForm] = useState(false);
  const [departments, setDepartments] = useState([]);

  const handleAddDepartment = (newDepartment) => {
    setDepartments((prev) => [newDepartment, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="p-8">

      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Departments
            </h1>

            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Department
            </button>

          </div>

          <DepartmentTable departments={departments} />

        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Add Department
            </h1>

            <button
              onClick={() => setShowForm(false)}
              className="border px-5 py-2 rounded-lg"
            >
              Back
            </button>

          </div>

          <DepartmentForm onSubmit={handleAddDepartment} />

        </>
      )}

    </div>
  );
}

export default Departments;