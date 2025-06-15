# 📧 PingStack

PingStack is a cold emailing platform built for job seekers and professionals. It enables users to send personalized emails directly from **their own email accounts** using **SMTP**, ensuring higher deliverability and a personal touch.

---

## 🚀 Features

- 🔒 Securely connect your own email via SMTP (Gmail, Outlook, etc.)
- 📬 Send personalized cold emails directly from your email address
- 🧠 Sequence emails with smart delays and tracking (coming soon)
- 📇 Manage leads with tags, notes, and status updates
- ✨ Future: AI-powered personalization using writing samples

---

## 🧱 Project Architecture (Next.js App Router + SMTP)

```
pingstack/
├── app/
│   ├── (auth)/                # Auth pages (login, signup)
│   ├── dashboard/
│   │   ├── page.tsx           # Dashboard overview
│   │   ├── leads/             # Lead management UI
│   │   ├── sequences/         # Email sequence setup (WIP)
│   │   └── settings/          # SMTP setup + preferences
│   └── api/
│       ├── smtp/test/route.ts # Validate SMTP credentials
│       ├── email/send/route.ts # Send email via SMTP
│       └── leads/route.ts     # CRUD for leads
├── components/                # UI components (buttons, forms)
├── lib/
│   ├── smtp.ts               # Nodemailer config using user credentials
│   ├── prisma.ts             # Prisma client
│   └── encryption.ts         # Optional: encrypt SMTP passwords
├── prisma/
│   └── schema.prisma         # Database schema
├── .env.local                # Environment variables
└── package.json
```

---

## 🛠 Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | Next.js (App Router), Tailwind CSS, shadcn/ui |
| Backend   | Next.js API Routes |
| Database  | PostgreSQL (via Supabase) |
| Auth      | NextAuth.js or Clerk (WIP) |
| Email     | SMTP via Nodemailer |
| ORM       | Prisma |
| AI (soon) | OpenAI / Cohere |

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/pingstack.git
cd pingstack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set environment variables

Create `.env.local` and fill in:

```env
DATABASE_URL=your_postgres_url
NEXTAUTH_SECRET=your_secret

# Optional defaults for testing
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=test@gmail.com
SMTP_PASS=your_app_password
```

### 4. Run the app

```bash
npm run dev
```

### 5. Push DB schema

```bash
npx prisma migrate dev --name init
```

---

## 🔐 SMTP Logic (Simplified Flow)

1. User adds SMTP credentials in settings
2. Credentials are validated via `/api/smtp/test`
3. If valid, saved to database (encrypted)
4. Emails are sent using Nodemailer via `/api/email/send`

---

## 📌 TODO

- [ ] Add lead tagging and filtering
- [ ] Add sequence scheduling with delays
- [ ] Integrate OpenAI/Cohere for personalization
- [ ] Warm-up domain integration

---

## 💬 License

MIT — feel free to use, modify, and ship.