# 📧 EmailerHR: Email Automation Tool for HR

EmailerHR is an automation tool designed for HR professionals to streamline email communication with job candidates. It uses dynamic email templates and integrates with AWS SES for sending personalized emails. This tool allows the creation and management of email templates, storing candidate information, and logging email statuses.

---

## 📁 **Project Structure**

```
email-automation-tool/
├── prisma/                      # DB schema and migration config
├── src/
│   ├── hiring/                  # Core logic for handling candidates, emails, and templates
│   │   ├── candidates/          # Candidate management (CRUD operations)
│   │   │   ├── candidate.errors.ts
│   │   │   ├── candidate.repository.ts
│   │   │   ├── candidate.service.ts
│   │   │   └── candidate.types.ts
│   │   ├── email/               # Email sending logic using AWS SES
│   │   │   ├── email.errors.ts
│   │   │   ├── email.merger.ts
│   │   │   ├── email.sender.ts
│   │   │   └── email.types.ts
│   │   ├── email-logs/          # Email log management (tracking sent emails)
│   │   │   ├── email-log.errors.ts
│   │   │   ├── email-log.repository.ts
│   │   │   ├── email-log.service.ts
│   │   │   └── email-log.types.ts
│   │   ├── templates/           # Template management (CRUD operations)
│   │   │   ├── template.errors.ts
│   │   │   ├── template.repository.ts
│   │   │   ├── template.service.ts
│   │   │   └── template.types.ts
│   └── index.ts                 # App entry point
├── scripts/                     # Test and utility scripts
│   ├── send-test.ts
│   ├── test-candidate.ts
│   ├── test-email-log.ts
│   └── test-template.ts
└── .env                         # Environment variables for local development
```

---

## 🛠️ **Tech Stack**

- **Language**: TypeScript
- **Runtime**: Node.js
- **Email Service**: AWS SES (v3 SDK)
- **Templating**: Handlebars
- **CLI Interface**: Ink (for terminal-based UI)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Logging**: Database + File-based logging
- **Containerization**: Docker

---

## ⚙️ **Installation & Setup**

### 1. Clone the repository:

```bash
git clone <repository-url>
cd email-automation-tool
```

### 2. Create a `.env` file:

Copy the example from `.env.example` and update it with your local settings:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp_development
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-1
SENDER_EMAIL=no-reply@yourdomain.com
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Run the application (in development mode):

```bash
npm run dev
```

### 5. Docker Setup (Optional, if you're using Docker):

```bash
docker-compose up
```

This will start the application along with a PostgreSQL container.

---

## 🔧 **Configuration**

Update the `.env` file with your AWS SES credentials and database connection string. Example:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/myapp_development
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-1
SENDER_EMAIL=no-reply@yourdomain.com
RETRY_LIMIT=3
```

---

## 🐳 **Docker**

To run the project in Docker, you can use the following commands.

1. **Build and start the containers:**

```bash
docker-compose up --build
```

2. **Access the application in your browser** (if you have GUI later) or CLI.

---

## 💻 **Usage**

The application provides a Terminal UI (TUI) with the following menu options:

- **Manage Templates**: Create, view, edit, and delete email templates
- **Manage Candidates**: Add, view, edit, and remove candidate information
- **Send Emails**: Select a template and candidate to preview and send emails
- **View Logs**: Check the status of sent emails and error logs

---

## 🧩 **Key Features**

- **Template Management**: Create and manage reusable email templates with dynamic placeholders
- **Candidate Management**: Store candidate information in a structured database
- **Email Personalization**: Fill placeholders dynamically from candidate data
- **Email Preview**: Review emails before sending
- **Automatic Retry**: Configurable retry logic for failed sends (default: 3 attempts)
- **Logging**: Track email status, history, and errors

---

## 🚀 **Future Enhancements**

- Multi-user system with roles (HR/Admin)
- GUI frontend (React or Electron)
- Scheduling & batch email sending
- Email open tracking (via SES feedback loops)
- Export logs to CSV or PDF

<!-- Migration code sample -->

npx prisma migrate dev --name add-strict-to-template
npx prisma generate
