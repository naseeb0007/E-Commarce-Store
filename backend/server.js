import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import path from "path"; // Required to resolve paths

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticstRoutes from "./routes/analytics.route.js";
import cartRoutes from "./routes/cart.route.js";
import { connectDB } from "./lib/db.js";

// Initialize environment variables
dotenv.config();

// Create an Express application instance
const app = express();

// Configure body-parser with a larger limit
app.use(bodyParser.json({ limit: '10mb' })); // Increase to desired size
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // For form data

// Middleware
app.use(express.json()); // this allows you to parse JSON bodies
app.use(cookieParser());

// Serve static files from the src directory
const __dirname = path.resolve(); // Resolve the current directory
app.use(express.static(path.join(__dirname, "src"))); // Make "src" folder public

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticstRoutes);

// Serve index.html when visiting the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
