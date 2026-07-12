const reportRepository = require('../repositories/reportRepository');

class ReportService {
    async getAllRequests() {
        // Fetch all maintenance requests from the repository
        return await reportRepository.getAllRequests();
    }

    async createRequest(requestData) {
        // Validate required fields based on the database schema
        if (!requestData.asset_id || !requestData.requested_by || !requestData.issue_description) {
            throw new Error('Missing required fields: asset_id, requested_by, issue_description');
        }

        // --- HACKATHON WOW FACTOR: Smart Triage System ---
        // Automatically escalate priorities based on critical keywords in the description
        const criticalKeywords = ['fire', 'leak', 'hazard'];
        const highKeywords = ['broken', 'offline'];

        const descriptionLower = requestData.issue_description.toLowerCase();

        if (criticalKeywords.some(keyword => descriptionLower.includes(keyword))) {
            requestData.priority_level = 'Critical';
        } else if (highKeywords.some(keyword => descriptionLower.includes(keyword))) {
            requestData.priority_level = 'High';
        }
        // -------------------------------------------------

        // Pass data to repository for insertion
        const insertId = await reportRepository.createRequest(requestData);
        return {
            message: 'Maintenance request created successfully',
            request_id: insertId,
            auto_assigned_priority: requestData.priority_level
        };
    }


    async updateRequestStatus(requestId, status) {
        const allowedStatuses = ['Pending', 'Approved', 'Rejected', 'Assigned', 'In Progress', 'Resolved'];
        if (!allowedStatuses.includes(status)) {
            throw new Error(`Invalid status. Must be one of: ${allowedStatuses.join(', ')}`);
        }
        const affectedRows = await reportRepository.updateRequestStatus(requestId, status);
        if (affectedRows === 0) throw new Error('Maintenance request not found');

        // --- Cross-Module Integration ---
        // Update the core Assets table based on maintenance request status
        if (status === 'Approved') {
            await reportRepository.updateAssetLifecycleStatus(requestId, 'Under Maintenance');
        } else if (status === 'Resolved') {
            await reportRepository.updateAssetLifecycleStatus(requestId, 'Available');
        }

        return { message: 'Status updated successfully', request_id: requestId, new_status: status };
    }

    async getAnalytics() {
        const maintenanceFrequency = await reportRepository.getMaintenanceFrequency();
        const atRiskAssets = await reportRepository.getAtRiskAssets();
        
        return {
            maintenanceFrequency,
            atRiskAssets
        };
    }
}

module.exports = new ReportService();
