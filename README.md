# PingStack

**PingStack** is a cold emailing platform for job seekers. It helps users manage recruiter/founder leads and sends personalized emails on their behalf using their own email accounts (SMTP).

## Features

- 🗂 Manage a list of leads (name, email, company)
- 📅 Set ideal send times for each day of the week
- 📬 Schedule and send personalized cold emails
- 🔐 Built with Supabase Auth for secure login

## Tech Stack

- Next.js / TypeScript (Frontend)
- PostgreSQL + Prisma (Database ORM)
- Supabase Auth (Authentication)
- SMTP (for sending emails)

## Getting Started

```bash
git clone https://github.com/your-username/pingstack.git
cd pingstack
npm install
cp .env.example .env  # Fill in your environment variables
npx prisma migrate dev
npm run dev
