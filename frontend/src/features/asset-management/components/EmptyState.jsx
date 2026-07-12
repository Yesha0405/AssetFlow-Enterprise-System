import { FiPackage } from 'react-icons/fi';

export const EmptyState = ({ onRegister }) => (
  <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
    <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
      <FiPackage size={24} />
    </div>
    <h3 className="text-lg font-semibold text-slate-800">No assets found</h3>
    <p className="mt-2 max-w-md text-sm text-slate-600">Click Register Asset to create your first asset.</p>
    <button
      onClick={onRegister}
      className="mt-5 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
    >
      Register Asset
    </button>
  </div>
);
