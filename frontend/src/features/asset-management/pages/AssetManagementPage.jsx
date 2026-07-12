import { useEffect, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { AssetFilters } from '../components/AssetFilters';
import { AssetTable } from '../components/AssetTable';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { RegisterAssetModal } from '../components/RegisterAssetModal';
import { SearchBar } from '../components/SearchBar';
import { CATEGORY_OPTIONS, DEPARTMENT_OPTIONS, STATUS_OPTIONS } from '../constants';
import { assetService } from '../services/assetService';

export const AssetManagementPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', status: '', department: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await assetService.getAssets();
      const payload = response?.data;
      setAssets(
        Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.assets)
          ? payload.assets
          : []
      );
    } catch (err) {
      setError(err.message || 'Unable to fetch assets.');
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    const assetsList = Array.isArray(assets) ? assets : [];
    const query = search.trim().toLowerCase();
    return assetsList.filter((asset) => {
      const haystack = [asset.assetTag, asset.name, asset.serialNumber, asset.category, asset.location, asset.department]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || haystack.includes(query);
      const matchesCategory = !filters.category || asset.category === filters.category;
      const matchesStatus = !filters.status || asset.status === filters.status;
      const matchesDepartment = !filters.department || asset.department === filters.department;

      return matchesSearch && matchesCategory && matchesStatus && matchesDepartment;
    });
  }, [assets, filters, search]);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    try {
      if (selectedAsset) {
        await assetService.updateAsset(selectedAsset.id, payload);
      } else {
        await assetService.createAsset(payload);
      }
      setIsModalOpen(false);
      setSelectedAsset(null);
      await loadAssets();
    } catch (err) {
      setError(err.message || 'Unable to save asset.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this asset?');
    if (!confirmed) return;

    try {
      await assetService.deleteAsset(id);
      await loadAssets();
    } catch (err) {
      setError(err.message || 'Unable to delete asset.');
    }
  };

  const openCreateModal = () => {
    setSelectedAsset(null);
    setIsModalOpen(true);
  };

  const openEditModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_60px_-20px_rgba(15,23,42,0.2)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">Asset Management</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Asset Register & Inventory</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">Track assets, manage availability, and keep your inventory organized from one streamlined workspace.</p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <FiPlus size={16} />
              Register Asset
            </button>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <SearchBar
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by tag, serial, or QR code..."
            />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">{filteredAssets.length} assets</div>
              <div>Tracked and managed across teams</div>
            </div>
          </div>

          <div className="mt-6">
            <AssetFilters
              filters={filters}
              onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
              options={{ categories: CATEGORY_OPTIONS, statuses: STATUS_OPTIONS, departments: DEPARTMENT_OPTIONS }}
            />
          </div>
        </div>

        {error ? <ErrorState message={error} /> : null}

        {loading ? (
          <LoadingState />
        ) : filteredAssets.length === 0 ? (
          <EmptyState onRegister={openCreateModal} />
        ) : (
          <AssetTable assets={filteredAssets} onView={() => {}} onEdit={openEditModal} onDelete={handleDelete} />
        )}
      </div>

      <RegisterAssetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAsset(null);
        }}
        onSubmit={handleSubmit}
        initialValues={selectedAsset || {}}
        isSubmitting={submitting}
      />
    </div>
  );
};
