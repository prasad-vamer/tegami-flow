import { TemplateService } from "../src/hiring/templates/template.service";

const service = new TemplateService();

async function main() {
  // Create a new template
  const created = await service.createTemplate({
    name: "InterviewInvite",
    subject: "Interview with {{company}}",
    body: "Hello {{name}},\nWe'd like to schedule an interview with you.",
  });

  console.log("✅ Created Template:", created);

  // List all templates
  const all = await service.getAllTemplates();
  console.log("📄 All Templates:", all);

  // Fetch by ID
  const one = await service.getTemplateById(created.id);
  console.log("🔍 Fetched Template:", one);

  // Update
  const updated = await service.updateTemplate(created.id, {
    subject: "Updated Subject",
  });
  console.log("✏️ Updated Template:", updated);

  // Delete
  const deleted = await service.deleteTemplate(created.id);
  console.log("❌ Deleted Template:", deleted);
}

main().catch((err) => {
  console.error("❗ Error:", err);
});
