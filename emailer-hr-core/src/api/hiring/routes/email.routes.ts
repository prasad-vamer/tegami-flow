// src/api/hiring/routes/email.routes.ts
import { Router } from "express";
import * as controller from "hiring-api/controllers/email.controller";
import { validateBody } from "hiring-api/middlewares/validate";
import { SendEmailSchema } from "hiring-api/validators/email.validator";

const router = Router();

router.post("/send", validateBody(SendEmailSchema), controller.send);

export default router;
