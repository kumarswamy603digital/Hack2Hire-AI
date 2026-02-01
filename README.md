# InterviewAI - AI-Powered Interview Practice Platform

<div align="center">

![InterviewAI](https://img.shields.io/badge/InterviewAI-Smart%20Hiring-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)

**An intelligent interview preparation platform with AI-powered voice interviews, resume analysis, and real-time feedback.**

[Live Demo](#) · [Features](#-features) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

</div>

---

## 📋 Overview

InterviewAI is a comprehensive AI-powered interview practice platform designed to help candidates prepare for job interviews and enable recruiters to assess talent efficiently. The platform leverages cutting-edge AI technology including voice recognition, natural language processing, and real-time proctoring to deliver a realistic interview experience.

## ✨ Features

### 🎙️ AI Voice Interview
- **Real-time voice interaction** - Practice with realistic AI-powered voice interviews
- **Speech-to-Text** - Powered by ElevenLabs for accurate transcription
- **Text-to-Speech** - Natural AI voice responses for immersive experience
- **Adaptive questioning** - AI generates follow-up questions based on your answers

### 📸 Smart Proctoring
- **Webcam monitoring** - Eye contact and posture analysis
- **Tab switch detection** - Monitors focus during assessments
- **Copy-paste prevention** - Ensures authentic responses
- **Real-time alerts** - Instant feedback on interview conduct

### 📄 Resume & JD Analysis
- **PDF Resume Parser** - Upload and extract skills from PDF resumes
- **Job Description Analysis** - Parse and analyze job requirements
- **Skill Matching** - AI-powered matching between candidates and roles
- **Gap Analysis** - Identify skill gaps and improvement areas

### 💻 Coding Challenges
- **Interactive Code Editor** - Monaco-powered coding environment
- **Multiple Languages** - Support for JavaScript, Python, and more
- **AI Evaluation** - Automated code review and scoring
- **Real-time Feedback** - Instant hints and suggestions

### 📊 Analytics & Progress Tracking
- **Performance History** - Track progress across sessions
- **Industry Benchmarks** - Compare against role/industry averages
- **Percentile Rankings** - See where you stand among peers
- **Skill Radar Charts** - Visual skill distribution analysis

### 📥 PDF Export
- **Professional Reports** - Download assessment summaries
- **Detailed Breakdowns** - Scores, recommendations, and insights
- **Shareable Format** - Easy to share with recruiters

### 🎯 Practice Mode
- **Topic Selection** - Choose specific skill areas to practice
- **Difficulty Levels** - Easy, Medium, Hard questions
- **Coaching Mode** - Optional hints during preparation
- **Unlimited Practice** - No limits on practice sessions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Beautiful component library
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching & caching
- **Recharts** - Data visualization
- **Monaco Editor** - Code editing
- **Framer Motion** - Animations (via Tailwind)

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Edge Functions (Deno)
  - Authentication
  - Real-time subscriptions

### AI & APIs
- **ElevenLabs** - Voice synthesis (TTS) & transcription (STT)
- **OpenAI/Gemini** - AI question generation & evaluation
- **PDF.js** - PDF parsing and extraction

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun package manager
- ElevenLabs API key (for voice features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   The project uses Lovable Cloud (Supabase) for backend services. The following variables are auto-configured:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

4. **Configure API Keys**
   
   For voice interview features, add your ElevenLabs API key via the Lovable secrets manager:
   - `ELEVENLABS_API_KEY` - Required for TTS and STT

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # Shadcn UI components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Landing page hero
│   │   ├── Features.tsx     # Feature showcase
│   │   ├── PracticeSession.tsx
│   │   ├── VoiceInterviewControls.tsx
│   │   ├── ProctoringOverlay.tsx
│   │   └── ...
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts       # Authentication hook
│   │   ├── useVoiceInterview.ts
│   │   ├── useProctoring.ts
│   │   ├── usePractice.ts
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Landing page
│   │   ├── Practice.tsx     # Practice mode
│   │   ├── VoiceInterview.tsx
│   │   ├── Coding.tsx       # Coding challenges
│   │   ├── History.tsx      # Progress tracking
│   │   └── ...
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   │   └── pdfExport.ts     # PDF generation
│   ├── integrations/        # External integrations
│   │   └── supabase/        # Supabase client & types
│   └── lib/                 # Library utilities
├── supabase/
│   ├── functions/           # Edge Functions
│   │   ├── voice-tts/       # Text-to-Speech
│   │   ├── voice-stt/       # Speech-to-Text
│   │   ├── analyze-resume/  # Resume analysis
│   │   ├── analyze-jd/      # JD analysis
│   │   ├── generate-question/
│   │   ├── evaluate-answer/
│   │   ├── evaluate-code/
│   │   └── ...
│   └── config.toml          # Supabase configuration
├── public/                  # Static assets
└── package.json
```

## 🔐 Authentication

The platform supports:
- **Email/Password** - Traditional signup and login
- **Role-based Access** - Admin, Recruiter, Candidate roles
- **Protected Routes** - Secure access to features

## 📊 Database Schema

Key tables:
- `profiles` - User profile information
- `user_roles` - Role assignments
- `assessment_history` - Session tracking
- `candidate_assessments` - Assessment results
- `industry_benchmarks` - Benchmark data

## 🎨 Customization

### Theming

The app uses CSS custom properties for theming. Edit `src/index.css` to customize:
- Primary colors
- Background colors
- Border radius
- Fonts

### Adding New Features

1. Create components in `src/components/`
2. Add pages in `src/pages/`
3. Register routes in `src/App.tsx`
4. Create hooks in `src/hooks/` for business logic
5. Add Edge Functions in `supabase/functions/`

## 📝 API Endpoints

### Edge Functions

| Function | Description |
|----------|-------------|
| `voice-tts` | Text-to-Speech conversion |
| `voice-stt` | Speech-to-Text transcription |
| `analyze-resume` | Resume parsing & analysis |
| `analyze-jd` | Job description analysis |
| `generate-question` | AI question generation |
| `evaluate-answer` | Answer evaluation |
| `evaluate-code` | Code submission evaluation |
| `skill-plan` | Skill improvement plan |
| `practice-evaluate` | Practice session evaluation |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Lovable](https://lovable.dev) - AI-powered development platform
- [Shadcn/UI](https://ui.shadcn.com) - Beautiful component library
- [ElevenLabs](https://elevenlabs.io) - Voice AI technology
- [Supabase](https://supabase.com) - Backend infrastructure

---

<div align="center">

**Built with ❤️ using [Lovable](https://lovable.dev)**

</div>
