export interface CreateCandidateInput {
    name: string;
    email: string;
    position: string;
    metadata?: Record<string, any>;
  }
  
  export interface UpdateCandidateInput {
    name?: string;
    email?: string;
    position?: string;
    metadata?: Record<string, any>;
  }
  