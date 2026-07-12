import axios from 'axios';
import { INITIAL_ASSETS } from '../constants';

const assetApi = axios.create({
  baseURL: '/api/assets',
});

let assets = [...INITIAL_ASSETS];

export const assetService = {
  getAssets: async () => {
    try {
      const response = await assetApi.get('/');
      return response;
    } catch (error) {
      return { data: assets };
    }
  },

  createAsset: async (payload) => {
    try {
      const response = await assetApi.post('/', payload);
      return response;
    } catch (error) {
      const newAsset = {
        id: Date.now(),
        assetTag: payload.assetTag || `AF-${String(assets.length + 1).padStart(4, '0')}`,
        name: payload.name,
        category: payload.category,
        status: payload.status,
        location: payload.location,
        department: payload.department,
        serialNumber: payload.serialNumber,
        purchaseDate: payload.purchaseDate,
        purchaseCost: payload.purchaseCost,
        condition: payload.condition,
        description: payload.description,
        bookable: payload.bookable,
      };
      assets = [newAsset, ...assets];
      return { data: newAsset };
    }
  },

  updateAsset: async (id, payload) => {
    try {
      const response = await assetApi.put(`/${id}`, payload);
      return response;
    } catch (error) {
      assets = assets.map((asset) => (asset.id === id ? { ...asset, ...payload } : asset));
      return { data: assets.find((asset) => asset.id === id) };
    }
  },

  deleteAsset: async (id) => {
    try {
      const response = await assetApi.delete(`/${id}`);
      return response;
    } catch (error) {
      assets = assets.filter((asset) => asset.id !== id);
      return { data: { deleted: true } };
    }
  },
};
