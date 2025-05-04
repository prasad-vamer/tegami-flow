import { CandidateRepository } from "./candidate.repository";
import { CreateCandidateInput, UpdateCandidateInput } from "./candidate.types";
import { CandidateNotFoundError } from "./candidate.errors";

export class CandidateService {
  async createCandidate(data: CreateCandidateInput) {
    return CandidateRepository.create(data);
  }

  async getPaginatedCandidates(
    offset: number,
    limit: number,
    q: string | null,
    sort: string
  ) {
    return CandidateRepository.findPaginated(offset, limit, q, sort);
  }

  async countCandidates(q?: string | null) {
    return CandidateRepository.count(q);
  }

  async getAllCandidates() {
    return CandidateRepository.findAll();
  }

  async getCandidateById(id: string) {
    const candidate = await CandidateRepository.findById(id);
    if (!candidate) throw new CandidateNotFoundError(id);
    return candidate;
  }

  async updateCandidate(id: string, data: UpdateCandidateInput) {
    const existing = await CandidateRepository.findById(id);
    if (!existing) throw new CandidateNotFoundError(id);

    return CandidateRepository.update(id, data);
  }

  async deleteCandidate(id: string) {
    const existing = await CandidateRepository.findById(id);
    if (!existing) throw new CandidateNotFoundError(id);

    return CandidateRepository.delete(id);
  }
}
