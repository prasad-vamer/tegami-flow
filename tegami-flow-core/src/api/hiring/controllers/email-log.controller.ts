// src/api/hiring/controllers/email-log.controller.ts
import { Request, Response, NextFunction } from "express";
import { EmailLogService } from "core/hiring/email-logs/email-log.service";

const service = new EmailLogService();

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const q = (req.query.q as string)?.trim() || null;
    const sort = (req.query.sort as string)?.trim() || "sentAt:desc";

    const [logs, total] = await Promise.all([
      service.getPaginatedLogs(offset, limit, q, sort),
      service.countLogs(q),
    ]);

    res.json({
      data: logs,
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
    const log = await service.getLogById(req.params.id);
    res.json(log);
  } catch (err) {
    next(err);
  }
}

export async function remove(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await service.deleteLog(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
