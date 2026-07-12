const reportService = require('../services/reportService');

class ReportController {
    async getAllRequests(req, res) {
        try {
            const requests = await reportService.getAllRequests();
            res.status(200).json(requests);
        } catch (error) {
            console.error('Error in getAllRequests:', error);
            res.status(500).json({ error: 'Failed to fetch maintenance requests' });
        }
    }

    async createRequest(req, res) {
        try {
            const result = await reportService.createRequest(req.body);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error in createRequest:', error);
            if (error.message.includes('Missing required fields')) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to create maintenance request' });
            }
        }
    }
    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // --- RBAC Implementation ---
            // Only 'Asset Manager' or 'Admin' can approve requests
            if (status === 'Approved') {
                const userRole = req.user?.role;
                if (userRole !== 'Asset Manager' && userRole !== 'Admin') {
                    return res.status(403).json({ error: 'Forbidden: Only Asset Managers or Admins can approve maintenance requests.' });
                }
            }

            const result = await reportService.updateRequestStatus(id, status);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(error.message.includes('Invalid status') ? 400 : 500).json({ error: error.message });
        }
    }

    async getAnalytics(req, res) {
        try {
            const analytics = await reportService.getAnalytics();
            res.status(200).json(analytics);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            res.status(500).json({ error: 'Failed to fetch analytics data' });
        }
    }
}

module.exports = new ReportController();
