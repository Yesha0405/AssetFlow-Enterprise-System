const db = require('../../../config/db');

class ReportRepository {
    async getAllRequests() {
        const query = `
            SELECT 
                request_id, asset_id, requested_by, issue_description, 
                priority_level, photo_url, status, created_at, updated_at
            FROM Maintenance_Requests
            ORDER BY created_at DESC;
        `;
        const [rows] = await db.execute(query);
        return rows;
    }

    async createRequest(requestData) {
        const { asset_id, requested_by, issue_description, priority_level, photo_url, status } = requestData;
        
        const query = `
            INSERT INTO Maintenance_Requests 
            (asset_id, requested_by, issue_description, priority_level, photo_url, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        // Provide default values where necessary, matching DB defaults
        const values = [
            asset_id,
            requested_by,
            issue_description,
            priority_level || 'Medium',
            photo_url || null,
            status || 'Pending'
        ];

        const [result] = await db.execute(query, values);
        return result.insertId;
    }
    async updateRequestStatus(requestId, status) {
        const query = `UPDATE Maintenance_Requests SET status = ? WHERE request_id = ?`;
        const [result] = await db.execute(query, [status, requestId]);
        return result.affectedRows;
    }
}

module.exports = new ReportRepository();
