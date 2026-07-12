import { FiX } from 'react-icons/fi';
import { CATEGORY_OPTIONS, DEPARTMENT_OPTIONS, STATUS_OPTIONS } from '../constants';

export const RegisterAssetModal = ({ isOpen, onClose, onSubmit, initialValues = {}, isSubmitting = false }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString().trim(),
      assetTag: formData.get('assetTag')?.toString().trim(),
      category: formData.get('category')?.toString().trim(),
      department: formData.get('department')?.toString().trim(),
      serialNumber: formData.get('serialNumber')?.toString().trim(),
      purchaseDate: formData.get('purchaseDate')?.toString().trim(),
      purchaseCost: formData.get('purchaseCost')?.toString().trim(),
      condition: formData.get('condition')?.toString().trim(),
      location: formData.get('location')?.toString().trim(),
      description: formData.get('description')?.toString().trim(),
      bookable: formData.get('bookable') === 'on',
      status: formData.get('status')?.toString().trim() || 'Available',
    };

    const requiredFields = ['name', 'assetTag', 'category', 'department', 'serialNumber', 'purchaseDate', 'purchaseCost', 'condition', 'location'];
    const missingField = requiredFields.find((field) => !payload[field]);

    if (missingField) {
      alert('Please fill in all required fields.');
      return;
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Register Asset</h2>
            <p className="text-sm text-slate-500">Create a new asset entry for the team.</p>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <FiX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Asset Name</span>
              <input name="name" defaultValue={initialValues.name || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Asset Tag</span>
              <input name="assetTag" defaultValue={initialValues.assetTag || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Category</span>
              <select name="category" defaultValue={initialValues.category || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500">
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Department</span>
              <select name="department" defaultValue={initialValues.department || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500">
                <option value="">Select department</option>
                {DEPARTMENT_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Serial Number</span>
              <input name="serialNumber" defaultValue={initialValues.serialNumber || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Purchase Date</span>
              <input name="purchaseDate" type="date" defaultValue={initialValues.purchaseDate || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Purchase Cost</span>
              <input name="purchaseCost" type="number" defaultValue={initialValues.purchaseCost || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Condition</span>
              <select name="condition" defaultValue={initialValues.condition || 'Good'} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500">
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Location</span>
              <input name="location" defaultValue={initialValues.location || ''} required className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
              <span>Status</span>
              <select name="status" defaultValue={initialValues.status || 'Available'} className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500">
                {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-3 text-sm font-medium text-slate-600">
              <input name="bookable" type="checkbox" defaultChecked={initialValues.bookable || false} />
              <span>Bookable</span>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            <span>Description</span>
            <textarea name="description" defaultValue={initialValues.description || ''} rows="3" className="rounded-2xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500" />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
            <span>Asset Photo Upload</span>
            <input type="file" className="rounded-2xl border border-dashed border-slate-300 px-3 py-3 text-sm" />
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
              {isSubmitting ? 'Registering...' : 'Register Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
