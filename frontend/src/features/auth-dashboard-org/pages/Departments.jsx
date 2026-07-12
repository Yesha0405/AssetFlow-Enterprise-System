import React, { useMemo, useState } from 'react'

// Sample data
const SAMPLE_DEPARTMENTS = [
  {
    id: 1,
    name: 'Information Technology',
    code: 'IT-001',
    manager: 'Aisha Khan',
    employees: 42,
    status: 'Active',
    createdAt: '2024-01-12',
  },
  {
    id: 2,
    name: 'Human Resources',
    code: 'HR-002',
    manager: 'Miguel Santos',
    employees: 18,
    status: 'Active',
    createdAt: '2023-11-03',
  },
  {
    id: 3,
    name: 'Facilities',
    code: 'FAC-003',
    manager: 'Lina Park',
    employees: 6,
    status: 'Inactive',
    createdAt: '2022-05-21',
  },
]

const Icon = ({ children }) => (
  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
    {children}
  </div>
)

const StatCard = ({ icon, title, value, desc }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
    <div>{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold text-gray-800">{value}</div>
      <div className="text-xs text-gray-400 mt-1">{desc}</div>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    Active: 'bg-green-100 text-green-700',
    Inactive: 'bg-red-100 text-red-700',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )                                                                                                                                                                                                         
}

export default function Departments() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(false)
  const [data] = useState(SAMPLE_DEPARTMENTS)

  // Pagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const filtered = useMemo(() => {
    let items = data.filter((d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) || d.code.toLowerCase().includes(query.toLowerCase())
    )
    if (statusFilter !== 'All') items = items.filter((d) => d.status === statusFilter)
    items = items.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt)
      return a.id - b.id
    })
    return items
  }, [data, query, statusFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const visible = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage)

  const stats = {
    total: data.length,
    active: data.filter((d) => d.status === 'Active').length,
    employees: data.reduce((s, d) => s + d.employees, 0),
    managers: new Set(data.map((d) => d.manager)).size,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Departments</h1>
            <p className="text-sm text-gray-500">Manage organization departments</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:shadow transition text-sm">
              Refresh
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-lg transition text-sm">
              + Add Department
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7 7 0 1010.65 6.65a7 7 0 005.99 9.99z"></path></svg>
                <input aria-label="search" value={query} onChange={(e) => { setQuery(e.target.value); setPage(1) }} className="bg-transparent ml-3 outline-none w-full text-sm" placeholder="Search departments or codes" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select className="rounded-lg border px-3 py-2 text-sm" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}>
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="rounded-lg border px-3 py-2 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Sort: Name</option>
                <option value="created">Sort: Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Icon>🏢</Icon>} title="Total Departments" value={stats.total} desc="All departments in the organization" />
          <StatCard icon={<Icon>✅</Icon>} title="Active Departments" value={stats.active} desc="Departments currently active" />
          <StatCard icon={<Icon>👥</Icon>} title="Employees Assigned" value={stats.employees} desc="Total assigned employees" />
          <StatCard icon={<Icon>🧑‍💼</Icon>} title="Department Managers" value={stats.managers} desc="Unique department managers" />
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-md p-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4">
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-40 h-40 bg-blue-50 rounded-lg flex items-center justify-center mb-6">📁</div>
              <h3 className="text-lg font-semibold text-gray-800">No Departments Found</h3>
              <p className="text-sm text-gray-500 mb-4">Get started by creating your first department.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Create First Department</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="py-3 px-4">Department Name</th>
                    <th className="py-3 px-4">Department Code</th>
                    <th className="py-3 px-4">Manager</th>
                    <th className="py-3 px-4">Employees</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Created</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visible.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{d.name}</div>
                        <div className="text-xs text-gray-400">{d.id}</div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{d.code}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{d.manager}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{d.employees}</td>
                      <td className="py-3 px-4"><StatusBadge status={d.status} /></td>
                      <td className="py-3 px-4 text-sm text-gray-500">{d.createdAt}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:underline">View</button>
                          <button className="text-yellow-600 hover:underline">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Rows per page:</span>
                <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border bg-white disabled:opacity-40">Previous</button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white border'}`}>{i + 1}</button>
                  ))}
                </div>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border bg-white disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
