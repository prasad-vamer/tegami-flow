import { Router } from "express";
import * as controller from "api/hiring/controllers/candidate.controller";
import { validateBody } from "api/hiring/middlewares/validate";
import {
  CreateCandidateSchema,
  UpdateCandidateSchema,
} from "api/hiring/validators/candidate.validator";

const router = Router();

router.post("/", validateBody(CreateCandidateSchema), controller.create);
router.get("/", controller.list);
router.get("/:id", controller.get);
router.put("/:id", validateBody(UpdateCandidateSchema), controller.edit);
router.delete("/:id", controller.remove);

export default router;
