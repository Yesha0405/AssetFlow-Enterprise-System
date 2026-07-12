const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to reuse connections
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, // Adjust this based on expected traffic
    queueLimit: 0
});

// Test the connection immediately upon startup (optional but recommended)
pool.getConnection()
    .then(connection => {
        console.log(`Successfully connected to MySQL database: ${process.env.DB_NAME}`);
        connection.release(); // Return the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to MySQL database:', err.message);
    });

module.exports = pool;
