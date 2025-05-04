// src/api/hiring/routes/email-log.routes.ts
import { Router } from "express";
import * as controller from "../controllers/email-log.controller";
import { validateParams } from "../middlewares/validate";
import { IdParamSchema } from "../validators/email-log.validator";

const router = Router();

router.get("/", controller.list);
router.get("/:id", validateParams(IdParamSchema), controller.get);
router.delete("/:id", validateParams(IdParamSchema), controller.remove);

export default router;
