// Placeholder backend entry file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

// Asset Management
const assetRoutes = require("./features/asset-management/routes");
// Allocation Booking
const allocationRoutes = require("./features/allocation-booking/routes/allocation.routes");
const bookingRoutes = require("./features/allocation-booking/routes/booking.routes");
const transferRoutes = require("./features/allocation-booking/routes/transfer.routes");
const returnRoutes = require("./features/allocation-booking/routes/return.routes");

// Future Modules
// const authRoutes = require("./features/auth-dashboard-org/routes");
// const maintenanceRoutes = require("./features/maintenance-audit-reports/routes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==========================
// Middleware
// ==========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================
// Health Check
// ==========================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 AssetFlow Backend Running Successfully"
    });
});

// ==========================
// API Routes
// ==========================

app.use("/api/assets", assetRoutes(db));
// Allocation Booking APIs
app.use("/api/allocations", allocationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/returns", returnRoutes);
// Future Routes

// app.use("/api/auth", authRoutes(db));
// app.use("/api/maintenance", maintenanceRoutes(db));

// ==========================
// 404 Handler
// ==========================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ==========================
// Global Error Handler
// ==========================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});

// ==========================
// Start Server
// ==========================

app.listen(PORT, () => {

    console.log("======================================");
    console.log(`🚀 AssetFlow Backend Started`);
    console.log(`🌍 Server : http://localhost:${PORT}`);
    console.log(`📦 Environment : ${process.env.NODE_ENV || "development"}`);
    console.log("======================================");

});
