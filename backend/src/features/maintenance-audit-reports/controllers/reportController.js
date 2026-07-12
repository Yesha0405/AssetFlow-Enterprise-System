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
            const result = await reportService.updateRequestStatus(id, status);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error updating status:', error);
            res.status(error.message.includes('Invalid status') ? 400 : 500).json({ error: error.message });
        }
    }
}

module.exports = new ReportController();
