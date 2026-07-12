import axios from 'axios';

// Base URL for the maintenance reports API
// Adjust this if your backend is hosted elsewhere or uses a different base path (e.g. /api/reports)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/reports';

export const fetchMaintenanceRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/maintenance-requests`);
        return response.data;
    } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        throw error;
    }
};

export const createMaintenanceRequest = async (requestData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/maintenance-requests`, requestData);
        return response.data;
    } catch (error) {
        console.error("Error creating maintenance request:", error);
        throw error;
    }
};

export const updateRequestStatus = async (id, status) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/maintenance-requests/${id}/status`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating status:", error);
        throw error;
    }
};

export const fetchAnalytics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/analytics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};