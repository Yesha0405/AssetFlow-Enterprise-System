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

    async updateAssetLifecycleStatus(requestId, lifecycleStatus) {
        const query = `
            UPDATE Assets 
            SET lifecycle_status = ? 
            WHERE asset_id = (SELECT asset_id FROM Maintenance_Requests WHERE request_id = ?)
        `;
        const [result] = await db.execute(query, [lifecycleStatus, requestId]);
        return result.affectedRows;
    }

    async getMaintenanceFrequency() {
        const query = `
            SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS count
            FROM Maintenance_Requests
            GROUP BY month
            ORDER BY month ASC
        `;
        const [rows] = await db.execute(query);
        return rows;
    }

    async getAtRiskAssets() {
        // Fetching assets flagged with 'Critical' maintenance status
        const query = `
            SELECT request_id, asset_id, issue_description, priority_level, status, created_at
            FROM Maintenance_Requests
            WHERE priority_level = 'Critical' AND status NOT IN ('Resolved', 'Rejected')
        `;
        const [rows] = await db.execute(query);
        return rows;
    }
}

module.exports = new ReportRepository();
