import React from 'react';

const MaintenanceTable = ({ requests, isLoading, error, onStatusChange }) => {
    if (isLoading) return <div className="state-message">Loading maintenance requests...</div>;
    if (error) return <div className="state-message state-message-error">Error: {error}</div>;
    if (!requests || requests.length === 0) return <div className="state-message">No maintenance requests found.</div>;

    // Helper function for priority CSS class
    const getPriorityClass = (priority) => {
        switch(priority) {
            case 'Critical': return 'badge badge-priority-critical';
            case 'High': return 'badge badge-priority-high';
            case 'Medium': return 'badge badge-priority-medium';
            case 'Low': return 'badge badge-priority-low';
            default: return 'badge badge-priority-default';
        }
    };

    // Helper function for status CSS class
    const getStatusClass = (status) => {
        // Map database enums to CSS classes safely
        const formattedStatus = (status || '').toLowerCase().replace(' ', '-');
        
        switch(formattedStatus) {
            case 'pending': return 'badge badge-status-pending';
            case 'assigned': return 'badge badge-status-assigned';
            case 'in-progress': return 'badge badge-status-in-progress';
            case 'resolved': return 'badge badge-status-resolved';
            case 'approved': return 'badge badge-status-approved';
            case 'rejected': return 'badge badge-status-rejected';
            default: return 'badge badge-status-default';
        }
    };

    const statusOptions = ['Pending', 'Approved', 'Rejected', 'Assigned', 'In Progress', 'Resolved'];

    return (
        <div className="table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Asset ID</th>
                        <th>Requested By</th>
                        <th>Issue Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req.request_id}>
                            <td>#{req.request_id}</td>
                            <td>{req.asset_id}</td>
                            <td>{req.requested_by}</td>
                            <td className="truncate-text" title={req.issue_description}>
                                {req.issue_description}
                            </td>
                            <td>
                                <span className={getPriorityClass(req.priority_level)}>
                                    {req.priority_level}
                                </span>
                            </td>
                            <td>
                                <select 
                                    className={`status-select ${getStatusClass(req.status)}`}
                                    value={req.status}
                                    onChange={(e) => onStatusChange && onStatusChange(req.request_id, e.target.value)}
                                >
                                    {statusOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </td>
                            <td>{new Date(req.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MaintenanceTable;
