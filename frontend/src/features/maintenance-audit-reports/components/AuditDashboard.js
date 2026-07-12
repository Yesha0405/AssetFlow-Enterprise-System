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
            />
        </div>
    );
};

export default AuditDashboard;
