import { TemplateRepository } from "./template.repository";
import { CreateTemplateInput, UpdateTemplateInput } from "./template.types";

export class TemplateService {
  async createTemplate(data: CreateTemplateInput) {
    // Add validation/business rules here if needed
    return TemplateRepository.create(data);
  }

  async getAllTemplates() {
    return TemplateRepository.findAll();
  }

  async getTemplateById(id: string) {
    return TemplateRepository.findById(id);
  }

  async updateTemplate(id: string, data: UpdateTemplateInput) {
    return TemplateRepository.update(id, data);
  }

  async deleteTemplate(id: string) {
    return TemplateRepository.delete(id);
  }

  async getPaginatedTemplates(
    offset: number,
    limit: number,
    q: string | null,
    sort: string
  ) {
    return TemplateRepository.findPaginated(offset, limit, q, sort);
  }

  async countTemplates(q?: string | null) {
    return TemplateRepository.count(q);
  }
}
