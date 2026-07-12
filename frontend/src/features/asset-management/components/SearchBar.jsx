import { FiSearch } from 'react-icons/fi';

export const SearchBar = ({ value, onChange, placeholder }) => (
  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
    <FiSearch className="text-slate-400" size={18} />
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border-none bg-transparent text-sm outline-none"
    />
  </label>
);
