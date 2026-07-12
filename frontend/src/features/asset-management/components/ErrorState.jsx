export const ErrorState = ({ message }) => (
  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
    <p className="font-semibold">Unable to load assets</p>
    <p className="mt-1">{message}</p>
  </div>
);
