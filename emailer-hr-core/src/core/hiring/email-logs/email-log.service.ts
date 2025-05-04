import { EmailLogRepository } from "./email-log.repository";
import { CreateEmailLogInput } from "./email-log.types";
import { EmailLogNotFoundError } from "./email-log.errors";

export class EmailLogService {
  async createLog(data: CreateEmailLogInput) {
    return EmailLogRepository.create(data);
  }

  async getAllLogs() {
    return EmailLogRepository.findAll();
  }

  async getLogById(id: string) {
    const log = await EmailLogRepository.findById(id);
    if (!log) throw new EmailLogNotFoundError(id);
    return log;
  }

  async deleteLog(id: string) {
    const existing = await EmailLogRepository.findById(id);
    if (!existing) throw new EmailLogNotFoundError(id);

    return EmailLogRepository.delete(id);
  }

  async getPaginatedLogs(
    offset: number,
    limit: number,
    q: string | null,
    sort: string
  ) {
    return EmailLogRepository.findPaginated(offset, limit, q, sort);
  }

  async countLogs(q?: string | null) {
    return EmailLogRepository.count(q);
  }
}
