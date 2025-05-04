// src/api/hiring/routes/v1.routes.ts
import { Router } from "express";
import candidateRoutes from "./candidate.routes";
import templateRoutes from "./template.routes";
import emailLogRoutes from "./email-log.routes";
import emailRoutes from "./email.routes";

const v1Router = Router();

v1Router.use("/candidates", candidateRoutes); // /api/v1/candidates
v1Router.use("/templates", templateRoutes);
v1Router.use("/email-logs", emailLogRoutes);
v1Router.use("/emails", emailRoutes);

export default v1Router;
