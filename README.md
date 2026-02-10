# 🛡️ Guardian Agency OS

> AI-Powered Business Partner for Solopreneurs

**Live Demo**: Coming soon on Vercel!

---

## 🎯 What is Guardian OS?

Guardian Agency OS는 1인 기업가를 위한 완벽한 비즈니스 파트너입니다. 계약서 검토부터 클라이언트 포털, 자동 정산까지 - 모든 것을 하나의 플랫폼에서 해결하세요.

### ✨ Key Features

- **🛡️ 독소조항 탐지기**: AI가 계약서의 위험한 조항을 3초 만에 찾아냅니다
- **💬 비즈니스 외교관**: 거친 표현을 정중하고 프로페셔널하게 다듬어줍니다
- **📊 클라이언트 포털**: 나만의 브랜드로 고객과 소통하세요
- **💰 오토 인보이스**: 마일스톤에 맞춰 자동 청구서 발행 및 독촉
- **📱 모바일 최적화**: 모든 기기에서 완벽하게 작동합니다

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Authentication**: Supabase Auth (Email, Google, GitHub OAuth)
- **Payments**: Stripe (with Toss Payments ready)
- **UI/UX**: Framer Motion, Lucide Icons
- **Deployment**: Vercel

---

## 🏗️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (optional for testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/guardian-agency-os.git
   cd guardian-agency-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your credentials:
   - Supabase URL and Keys
   - Stripe Keys (optional)
   - App URL

4. **Set up Supabase**
   Follow the guide in `docs/SUPABASE_SETUP.md`

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 📚 Documentation

- [Supabase Setup Guide](./docs/SUPABASE_SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Documentation](./docs/API.md)

---

## 🎨 Design System

Guardian OS uses a **"Bright & Reliable"** light theme:
- Primary Color: Indigo
- Accent: Cyan
- Mobile-first responsive design
- Smooth animations with Framer Motion

---

## 📦 Project Structure

```
guardian-agent/
├── app/                    # Next.js app router
│   ├── page.tsx           # Landing page
│   ├── login/             # Authentication pages
│   ├── dashboard/         # Main app dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── dashboard/         # Dashboard modules
│   ├── Modal.tsx          # Reusable modal
│   └── Dropdown.tsx       # Reusable dropdown
├── lib/                   # Utilities
│   ├── supabase.ts       # Supabase client
│   ├── auth.ts           # Auth helpers
│   └── stripe.ts         # Payment helpers
└── docs/                  # Documentation
```

---

## 🔐 Security

- End-to-end encryption for sensitive data
- Row Level Security (RLS) with Supabase
- OAuth 2.0 authentication
- GDPR & 개인정보보호법 compliant

---

## 🛣️ Roadmap

- [x] Landing page & Dashboard
- [x] Authentication (Email, OAuth)
- [x] Payment integration (Stripe)
- [x] Mobile responsive UI
- [ ] Real-time contract scanning with AI
- [ ] Advanced analytics dashboard
- [ ] Team collaboration (Squad feature)
- [ ] API for third-party integrations

---

## 📄 License

MIT License - feel free to use this project for your own purposes!

---

## 👨‍💻 Author

Built with ❤️ by Minseok

---

## 🙏 Acknowledgments

- Designed with assistance from AI-powered development tools
- Inspired by the needs of solopreneurs worldwide

---

**⭐ Star this repo if you find it helpful!**
