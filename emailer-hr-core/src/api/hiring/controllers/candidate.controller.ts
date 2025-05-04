// src/api/hiring/controllers/candidate.controller.ts
import { Request, Response, NextFunction } from "express";
import { CandidateService } from "core/hiring/candidates/candidate.service";
import {
  CreateCandidateDTO,
  UpdateCandidateDTO,
} from "api/hiring/validators/candidate.validator";

const service = new CandidateService();

export async function create(
  req: Request<{}, {}, CreateCandidateDTO>,
  res: Response,
  next: NextFunction
) {
  try {
    const candidate = await service.createCandidate(req.body);
    res.status(201).json(candidate);
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

    const [candidates, total] = await Promise.all([
      service.getPaginatedCandidates(offset, limit, q, sort),
      service.countCandidates(q),
    ]);

    res.json({
      data: candidates,
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
) {
  try {
    const candidate = await service.getCandidateById(req.params.id);
    res.json(candidate);
  } catch (err) {
    next(err);
  }
}

export async function edit(
  req: Request<{ id: string }, {}, UpdateCandidateDTO>,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await service.updateCandidate(req.params.id, req.body);
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
    await service.deleteCandidate(req.params.id);
    res.json({ message: "Candidate deleted successfully" });
  } catch (err) {
    next(err);
  }
}
