// src/api/hiring/controllers/template.controller.ts
import { Request, Response, NextFunction } from "express";
import { TemplateService } from "core/hiring/templates/template.service";
import {
  CreateTemplateDTO,
  UpdateTemplateDTO,
} from "api/hiring/validators/template.validator";

const service = new TemplateService();

export async function create(
  req: Request<{}, {}, CreateTemplateDTO>,
  res: Response,
  next: NextFunction
) {
  try {
    const template = await service.createTemplate(req.body);
    res.status(201).json(template);
  } catch (err) {
    next(err);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const q = (req.query.q as string)?.trim() || null;
    const sort = (req.query.sort as string)?.trim() || "createdAt:desc";

    const [templates, total] = await Promise.all([
      service.getPaginatedTemplates(offset, limit, q, sort),
      service.countTemplates(q),
    ]);

    res.json({
      data: templates,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function get(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const template = await service.getTemplateById(req.params.id);

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return; // ✅ ensure no fallthrough
    }

    res.status(200).json(template);
  } catch (err) {
    next(err);
  }
}

export async function edit(
  req: Request<{ id: string }, {}, UpdateTemplateDTO>,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await service.updateTemplate(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    await service.deleteTemplate(req.params.id);
    res.json({ message: "Template deleted successfully" });
  } catch (err) {
    next(err);
  }
}
