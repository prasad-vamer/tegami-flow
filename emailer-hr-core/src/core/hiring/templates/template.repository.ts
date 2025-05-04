import { PrismaClient } from "@prisma/client";
import { CreateTemplateInput, UpdateTemplateInput } from "./template.types";

const prisma = new PrismaClient();

export const TemplateRepository = {
  create(data: CreateTemplateInput) {
    return prisma.template.create({ data });
  },

  findAll() {
    return prisma.template.findMany();
  },

  findById(id: string) {
    return prisma.template.findUnique({ where: { id } });
  },

  update(id: string, data: UpdateTemplateInput) {
    return prisma.template.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.template.delete({ where: { id } });
  },

  findPaginated(offset: number, limit: number, q: string | null, sort: string) {
    const [sortField, sortOrder] = sort.split(":") as [
      "name" | "createdAt",
      "asc" | "desc"
    ];

    return prisma.template.findMany({
      skip: offset,
      take: limit,
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { subject: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
      orderBy: {
        [sortField]: sortOrder,
      },
    });
  },

  count(q?: string | null) {
    return prisma.template.count({
      where: q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { subject: { contains: q, mode: "insensitive" } },
            ],
          }
        : undefined,
    });
  },
};
