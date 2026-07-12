import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export const DepartmentsTable = ({ departments = [], onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="sticky top-0 px-4 py-3 font-semibold">Department</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Location</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Assets</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Manager</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Status</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="border-t border-slate-100 transition hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-800">{department.name}</td>
              <td className="px-4 py-3 text-slate-600">{department.location}</td>
              <td className="px-4 py-3 text-slate-600">{department.assetsCount}</td>
              <td className="px-4 py-3 text-slate-600">{department.manager}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${department.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : department.status === 'Inactive' ? 'bg-slate-100 text-slate-700' : 'bg-amber-50 text-amber-700'}`}>
                  {department.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => onEdit(department)} className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600" title="Edit">
                    <FiEdit2 size={15} />
                  </button>
                  <button onClick={() => onDelete(department.id)} className="rounded-full p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" title="Delete">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
