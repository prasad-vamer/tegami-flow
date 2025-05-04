import { CandidateService } from "../src/hiring/candidates/candidate.service";

const service = new CandidateService();

async function main() {
  // Create a new candidate
  const created = await service.createCandidate({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    position: "Frontend Developer",
    metadata: {
      experience: "3 years",
      location: "Remote",
    },
  });

  console.log("✅ Created Candidate:", created);

  // List all candidates
  const all = await service.getAllCandidates();
  console.log("📄 All Candidates:", all);

  // Fetch by ID
  const one = await service.getCandidateById(created.id);
  console.log("🔍 Fetched Candidate:", one);

  // Update
  const updated = await service.updateCandidate(created.id, {
    position: "Full Stack Developer",
  });
  console.log("✏️ Updated Candidate:", updated);

  // Delete
  const deleted = await service.deleteCandidate(created.id);
  console.log("❌ Deleted Candidate:", deleted);
}

main().catch((err) => {
  console.error("❗ Error:", err);
});

// npx ts-node scripts/test-candidate.ts
