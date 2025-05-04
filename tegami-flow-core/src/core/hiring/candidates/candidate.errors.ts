export class CandidateNotFoundError extends Error {
    constructor(id: string) {
      super(`Candidate with ID "${id}" not found.`);
      this.name = 'CandidateNotFoundError';
    }
  }
  