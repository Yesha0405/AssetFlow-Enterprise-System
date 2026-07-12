import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { DepartmentsTable } from '../components/DepartmentsTable';
import { DEPARTMENT_OPTIONS } from '../constants';

const INITIAL_DEPARTMENTS = [
  {
    id: 1,
    name: 'IT',
    location: 'Bengaluru Office',
    assetsCount: 48,
    manager: 'Priya Rao',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Operations',
    location: 'HQ Floor 2',
    assetsCount: 32,
    manager: 'Rohan Mehta',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Facilities',
    location: 'Warehouse',
    assetsCount: 14,
    manager: 'Anita Singh',
    status: 'Inactive',
  },
];

export const DepartmentsPage = () => {
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);

  const handleEdit = (department) => {
    // placeholder for edit logic
    console.log('Edit department', department);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete this department?');
    if (!confirmed) return;
    setDepartments((current) => current.filter((dept) => dept.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_-20px_rgba(15,23,42,0.2)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Departments</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Department Inventory</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Review department asset ownership and status across your organization.</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <FiPlus size={16} />
              Add Department
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_-20px_rgba(15,23,42,0.2)]">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">Filter by status and location</div>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
              <option>All statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
              <option>All locations</option>
              {DEPARTMENT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <DepartmentsTable departments={departments} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};
