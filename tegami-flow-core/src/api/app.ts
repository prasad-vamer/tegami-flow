import express from "express";
import cors from "cors";
import { errorHandler } from "api/hiring/middlewares/errorHandler";
import v1Router from "api/hiring/routes/v1.routes";
import healthRoutes from "./hiring/routes/health.routes";

const app = express();

// Enable CORS for all origins (development default)
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Routes
app.use("/api", healthRoutes);
app.use("/api/v1", v1Router);
// app.use("/api/emails", emailRoutes);
// app.use("/api/templates", templateRoutes);

// Error handler
app.use(errorHandler);

export default app;
