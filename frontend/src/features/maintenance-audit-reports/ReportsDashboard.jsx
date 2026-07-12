import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, Tooltip, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { fetchAnalytics } from '../api/reportApi';
import './ReportsDashboard.css';

export default function ReportsDashboard() {
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [atRiskAssets, setAtRiskAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Static mockup data for utilization (since we didn't build a backend route for this yet)
    const utilizationData = [
        { name: 'HR', value: 30 },
        { name: 'IT', value: 80 },
        { name: 'Ops', value: 50 },
        { name: 'Sales', value: 40 },
        { name: 'Exec', value: 70 },
    ];

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                const data = await fetchAnalytics();

                // Format the SQL date data for the Recharts line graph
                const formattedChartData = data.maintenanceFrequency.map(item => ({
                    month: item.month,
                    issues: item.count
                }));

                setMaintenanceData(formattedChartData);
                setAtRiskAssets(data.atRiskAssets);
            } catch (error) {
                console.error("Failed to load analytics", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAnalytics();
    }, []);

    if (isLoading) {
        return <div style={{ color: 'white', padding: '24px' }}>Loading live analytics...</div>;
    }

    return (
        <div className="reports-container">
            <h2>Reports & Analytics</h2>

            <div className="charts-grid">
                {/* Static Bar Chart */}
                <div className="chart-card">
                    <h3>Utilization by department</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={utilizationData}>
                                <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={true} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
                                <Bar dataKey="value" fill="#8B6508" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Live Line Chart */}
                <div className="chart-card">
                    <h3>Maintenance Frequency</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={maintenanceData}>
                                <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={true} />
                                <Tooltip />
                                <Line type="monotone" dataKey="issues" stroke="#E06666" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bottom-section">
                <h3>Assets due for maintenance / At Risk</h3>
                <ul>
                    {atRiskAssets.length > 0 ? (
                        atRiskAssets.map(asset => (
                            <li key={asset.request_id}>
                                Asset ID: {asset.asset_id} - {asset.issue_description} (Priority: {asset.priority_level})
                            </li>
                        ))
                    ) : (
                        <li>No critical assets at risk! All clear.</li>
                    )}
                </ul>

                <button className="export-btn">Export report</button>
            </div>
        </div>
    );
}