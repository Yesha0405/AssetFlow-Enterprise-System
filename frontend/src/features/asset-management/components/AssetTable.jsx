import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { StatusBadge } from './StatusBadge';

export const AssetTable = ({ assets = [], onView, onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="sticky top-0 px-4 py-3 font-semibold">Asset Tag</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Asset Name</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Category</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Status</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Location</th>
            <th className="sticky top-0 px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-t border-slate-100 transition hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-slate-800">{asset.assetTag || asset.asset_tag}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-slate-800">{asset.name || asset.assetName}</div>
                <div className="text-xs text-slate-500">{asset.serialNumber || asset.serial_number}</div>
              </td>
              <td className="px-4 py-3 text-slate-600">{asset.category}</td>
              <td className="px-4 py-3">
                <StatusBadge status={asset.status} />
              </td>
              <td className="px-4 py-3 text-slate-600">
                <div>{asset.location}</div>
                <div className="text-xs text-slate-500">{asset.department}</div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button onClick={() => onView(asset)} className="rounded-full p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600" title="View">
                    <FiEye size={15} />
                  </button>
                  <button onClick={() => onEdit(asset)} className="rounded-full p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600" title="Edit">
                    <FiEdit2 size={15} />
                  </button>
                  <button onClick={() => onDelete(asset.id)} className="rounded-full p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" title="Delete">
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
