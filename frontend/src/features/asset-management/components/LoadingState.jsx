export const LoadingState = () => (
  <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50">
    <div className="text-center">
      <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      <p className="text-sm font-medium text-slate-600">Loading assets...</p>
    </div>
  </div>
);
