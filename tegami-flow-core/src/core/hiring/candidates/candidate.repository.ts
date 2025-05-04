import { PrismaClient } from "@prisma/client";
import { CreateCandidateInput, UpdateCandidateInput } from "./candidate.types";

const prisma = new PrismaClient();

export const CandidateRepository = {
  create(data: CreateCandidateInput) {
    return prisma.candidate.create({ data });
  },

  findAll() {
    return prisma.candidate.findMany();
  },

  findById(id: string) {
    return prisma.candidate.findUnique({ where: { id } });
  },

  update(id: string, data: UpdateCandidateInput) {
    return prisma.candidate.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.candidate.delete({ where: { id } });
  },

  findPaginated(offset: number, limit: number, q: string | null, sort: string) {
    const [sortField, sortOrder] = sort.split(":") as [
      "name" | "createdAt",
      "asc" | "desc"
    ];

    return prisma.candidate.findMany({
      skip: offset,
      take: limit,
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { position: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        [sortField]: sortOrder,
      },
    });
  },

  count(q?: string | null) {
    return prisma.candidate.count({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { position: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
    });
  },
};
