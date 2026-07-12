import React, { useState, useEffect } from 'react';
import MaintenanceTable from './MaintenanceTable';
import { fetchMaintenanceRequests } from '../api/reportApi';
import '../styles/auditStyles.css';

const AuditDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch maintenance requests when component mounts
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchMaintenanceRequests();
                setRequests(data);
                setError(null);
            } catch (err) {
                setError(err.response?.data?.error || err.message || 'Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Handle status update
    const handleStatusChange = async (requestId, newStatus) => {
        try {
            // Optimistic UI update
            setRequests(prev => prev.map(req => 
                req.request_id === requestId ? { ...req, status: newStatus } : req
            ));
            
            // API call
            // Using a dynamic import or assuming updateRequestStatus is imported
            const { updateRequestStatus } = await import('../api/reportApi');
            await updateRequestStatus(requestId, newStatus);
            // In a real app, you might show a toast success here
        } catch (err) {
            console.error("Failed to update status", err);
            // Revert state on error by refetching
            const data = await fetchMaintenanceRequests();
            setRequests(data);
            alert("Failed to update status. Please try again.");
        }
    };

    return (
        <div className="audit-dashboard">
            <div className="audit-dashboard-header">
                <div>
                    <h2 className="audit-dashboard-title">Maintenance Audit Reports</h2>
                    <span className="audit-dashboard-subtitle">Manage and track all asset maintenance requests.</span>
                </div>
                
                <button 
                    className="btn-new-request"
                    onClick={() => alert("Create request modal to be implemented")}
                >
                    + New Request
                </button>
            </div>
            
            <MaintenanceTable 
                requests={requests} 
                isLoading={isLoading} 
                error={error}
                onStatusChange={handleStatusChange} 
            />
        </div>
    );
};

export default AuditDashboard;
