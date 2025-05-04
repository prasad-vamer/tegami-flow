import { EmailLogService } from "../src/hiring/email-logs/email-log.service";

const service = new EmailLogService();

async function main() {
  // Create log (use null template/candidate for now)
  const created = await service.createLog({
    toEmail: "user@example.com",
    subject: "Welcome!",
    body: "Hi there!",
    status: "SENT",
  });

  console.log("✅ Created Email Log:", created);

  // List logs
  const all = await service.getAllLogs();
  console.log("📄 All Email Logs:", all);

  // Get by ID
  const one = await service.getLogById(created.id);
  console.log("🔍 Fetched Email Log:", one);

  // Delete
  const deleted = await service.deleteLog(created.id);
  console.log("❌ Deleted Email Log:", deleted);
}

main().catch((err) => {
  console.error("❗ Error:", err);
});

// npx ts-node scripts/test-email-log.ts
