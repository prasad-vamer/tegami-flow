import { PrismaClient } from "@prisma/client";
import { CreateEmailLogInput } from "./email-log.types";

const prisma = new PrismaClient();

export const EmailLogRepository = {
  create(data: CreateEmailLogInput) {
    return prisma.emailLog.create({ data });
  },

  findAll() {
    return prisma.emailLog.findMany({
      include: {
        template: true,
        candidate: true,
      },
    });
  },

  findById(id: string) {
    return prisma.emailLog.findUnique({
      where: { id },
      include: {
        template: true,
        candidate: true,
      },
    });
  },

  delete(id: string) {
    return prisma.emailLog.delete({ where: { id } });
  },

  findPaginated(offset: number, limit: number, q: string | null, sort: string) {
    const [sortField, sortOrder] = sort.split(":") as [
      "sentAt" | "toEmail" | "status",
      "asc" | "desc"
    ];

    return prisma.emailLog.findMany({
      skip: offset,
      take: limit,
      include: {
        candidate: true,
        template: true,
      },
      where: q
        ? {
            OR: [
              { toEmail: { contains: q, mode: "insensitive" } },
              { subject: { contains: q, mode: "insensitive" } },
              { status: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        [sortField]: sortOrder,
      },
    });
  },

  count(q?: string | null) {
    return prisma.emailLog.count({
      where: q
        ? {
            OR: [
              { toEmail: { contains: q, mode: "insensitive" } },
              { subject: { contains: q, mode: "insensitive" } },
              { status: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
    });
  },
};
