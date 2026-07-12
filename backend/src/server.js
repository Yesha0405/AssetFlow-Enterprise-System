// Placeholder backend entry file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AssetFlow Backend Running 🚀"
    });
});

// YOUR MODULE
const allocationRoutes = require("./features/allocation-booking/routes/allocation.routes");
const bookingRoutes = require("./features/allocation-booking/routes/booking.routes");
const transferRoutes = require("./features/allocation-booking/routes/transfer.routes");
const returnRoutes = require("./features/allocation-booking/routes/return.routes");

// Register Routes
app.use("/api/allocations", allocationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/returns", returnRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});