import { FiCheckCircle, FiClock, FiTool, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

const statusConfig = {
  Available: {
    icon: FiCheckCircle,
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  Allocated: {
    icon: FiClock,
    className: 'bg-blue-50 text-blue-700 ring-blue-200',
  },
  Maintenance: {
    icon: FiTool,
    className: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  Retired: {
    icon: FiTrash2,
    className: 'bg-slate-100 text-slate-700 ring-slate-200',
  },
  Lost: {
    icon: FiAlertTriangle,
    className: 'bg-rose-50 text-rose-700 ring-rose-200',
  },
};

export const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.Available;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${config.className}`}>
      <Icon size={12} />
      {status}
    </span>
  );
};
