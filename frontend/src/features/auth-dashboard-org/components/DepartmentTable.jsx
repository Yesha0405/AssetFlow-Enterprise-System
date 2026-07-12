function DepartmentTable({ departments = [] }) {
  return (
    <div className="overflow-x-auto">
      {departments.length === 0 ? (
        <p className="text-gray-500">No departments yet.</p>
      ) : (
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} className="border-t">
                <td className="px-4 py-2">{dept.name}</td>
                <td className="px-4 py-2">{dept.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DepartmentTable;