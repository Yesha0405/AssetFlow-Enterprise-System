import React, { useState, useEffect } from 'react';
import MaintenanceTable from './MaintenanceTable';
import { fetchMaintenanceRequests, updateRequestStatus } from '../api/reportApi';
import '../styles/auditStyles.css';

const AuditDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // Toast state
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 300); // match animation duration
        }, 3000);
    };

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

    // Handle status update with refined optimistic UI
    const handleStatusChange = async (requestId, newStatus) => {
        // Find the previous status to revert if needed
        const requestToUpdate = requests.find(req => req.request_id === requestId);
        if (!requestToUpdate) return;
        
        const previousStatus = requestToUpdate.status;

        try {
            // Optimistic UI update
            setRequests(prev => prev.map(req => 
                req.request_id === requestId ? { ...req, status: newStatus } : req
            ));
            
            // API call
            await updateRequestStatus(requestId, newStatus);
            showToast(`Status updated to ${newStatus}`);
        } catch (err) {
            console.error("Failed to update status", err);
            // Revert ONLY this specific row on error
            setRequests(prev => prev.map(req => 
                req.request_id === requestId ? { ...req, status: previousStatus } : req
            ));
            showToast("Failed to update status. Please try again.", "error");
        }
    };

    // Filter logic
    const filteredRequests = requests.filter(req => {
        const matchesSearch = (req.asset_id?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               req.issue_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               req.request_id?.toString().includes(searchQuery));
        const matchesPriority = filterPriority === 'All' || req.priority_level === filterPriority;
        const matchesStatus = filterStatus === 'All' || req.status === filterStatus;
        
        return matchesSearch && matchesPriority && matchesStatus;
    });

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
            
            {/* Filter Bar */}
            <div className="filter-bar">
                <div className="filter-group">
                    <span className="filter-label">Search:</span>
                    <input 
                        type="text" 
                        className="filter-input" 
                        placeholder="Search ID, Asset, Description..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <span className="filter-label">Priority:</span>
                    <select 
                        className="filter-select"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Status:</span>
                    <select 
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <MaintenanceTable 
                requests={filteredRequests} 
                isLoading={isLoading} 
                error={error}
                onStatusChange={handleStatusChange} 
            />

            {/* Toast Container */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div 
                        key={toast.id} 
                        className={`toast toast-${toast.type} ${toast.removing ? 'removing' : ''}`}
                    >
                        {toast.type === 'success' ? '✓' : '⚠'} {toast.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuditDashboard;
