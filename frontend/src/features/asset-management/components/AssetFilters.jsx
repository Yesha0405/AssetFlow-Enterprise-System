export const AssetFilters = ({ filters, onChange, options }) => (
  <div className="grid gap-3 md:grid-cols-3">
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
      <span>Category</span>
      <select
        value={filters.category}
        onChange={(event) => onChange('category', event.target.value)}
        className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
      >
        <option value="">All categories</option>
        {options.categories.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>

    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
      <span>Status</span>
      <select
        value={filters.status}
        onChange={(event) => onChange('status', event.target.value)}
        className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
      >
        <option value="">All statuses</option>
        {options.statuses.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>

    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
      <span>Department</span>
      <select
        value={filters.department}
        onChange={(event) => onChange('department', event.target.value)}
        className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm shadow-sm outline-none focus:border-blue-500"
      >
        <option value="">All departments</option>
        {options.departments.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  </div>
);
