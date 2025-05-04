// src/api/hiring/routes/template.routes.ts
import { Router } from "express";
import * as controller from "../controllers/template.controller";
import { validateBody } from "../middlewares/validate";
import {
  CreateTemplateSchema,
  UpdateTemplateSchema,
} from "../validators/template.validator";

const router = Router();

router.post("/", validateBody(CreateTemplateSchema), controller.create);
router.get("/", controller.list);
router.get("/:id", controller.get); // ✅ should work
router.put("/:id", validateBody(UpdateTemplateSchema), controller.edit);
router.delete("/:id", controller.remove);

export default router;
