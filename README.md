# 🤟 SignBridge AI — React + Node.js Full-Stack Assistive Translator

A real-time assistive Sign Language to Voice translator built with **React, TypeScript, Tailwind CSS, Node.js (Express), MediaPipe Hands, and Google Gemini AI**. Translates hand signs simultaneously into **English, Hindi (हिंदी), and Tamil (தமிழ்)** with authentic audio speech and hyphenated pronunciation guides.

---

## 🌟 Key Features

1. **In-Browser 3D Hand Tracking**:
   - MediaPipe Hands tracks 21 3D hand landmarks in real-time.
   - Scale-invariant 18-dimensional geometric feature extraction (immune to camera distance and hand size).
2. **Velocity Stability Gate & Hold-to-Lock**:
   - Motion velocity filter pauses lock-in while hand is moving to eliminate transition noise.
   - Hold steady for 0.65s to lock in a sign with circular progress feedback.
3. **Trilingual Real-Time Output**:
   - **English**: Polished sentence with phonetic breakdown.
   - **Hindi (हिंदी)**: Authentic Devanagari script and syllable guide.
   - **Tamil (தமிழ்)**: Authentic Tamil script and syllable guide.
4. **4-Tier Speech Synthesis**:
   - Tier 1: High-fidelity Gemini Neural TTS (`gemini-2.5-flash-preview-tts`) WAV streaming from Node backend.
   - Tier 2: Web Speech API fallback with `en-IN`, `hi-IN`, `ta-IN` voice selection.
   - Tier 3: Acoustic phonetic respelling for zero-silence guarantee.
5. **1,080+ Verified Sign Lexicon**:
   - Medical, Emergency, Travel, Dining, Family, Everyday Actions, and A–Z Fingerspelling.
   - Searchable dictionary modal with SVG hand posture illustrations.
6. **Secure Node.js Backend**:
   - Hides `GEMINI_API_KEY` from client-side bundle.
   - Endpoints for trilingual grammar refinement (`/api/translate`), Neural TTS synthesis (`/api/tts`), and vocabulary querying (`/api/lexicon`).

---

## 🏗️ Architecture

```
Cloud_Project_2/
├── package.json                 # Monorepo orchestration scripts
├── .env.example                 # Environment variables template
│
├── server/                      # Node.js + Express Backend
│   ├── src/
│   │   ├── index.ts             # Express server setup & middlewares
│   │   ├── config.ts            # Configuration & environment variables
│   │   ├── routes/
│   │   │   ├── translateRoute.ts# Gemini LLM trilingual grammar refinement
│   │   │   ├── ttsRoute.ts      # Neural TTS audio generation
│   │   │   └── lexiconRoute.ts  # 1,080+ Signs dictionary query & search
│   │   ├── services/
│   │   │   └── geminiService.ts # Gemini API client & PCM-to-WAV converter
│   │   └── data/
│   │       └── lexiconData.ts   # Full trilingual dictionary & categories
│
└── client/                      # React 18 + Vite + Tailwind CSS Frontend
    ├── src/
    │   ├── App.tsx              # Main dashboard view
    │   ├── components/
    │   │   ├── Header.tsx       # Navbar, camera controls, mode selector
    │   │   ├── VisionCanvas.tsx # Mirrored camera view & 3D skeleton HUD
    │   │   ├── SequenceBar.tsx  # Interactive sign sequence chips
    │   │   ├── TrilingualCards.tsx # English, Hindi, Tamil output cards
    │   │   ├── QuickStarters.tsx   # 1-tap emergency scenarios
    │   │   ├── LexiconDrawer.tsx   # Searchable 1,080+ sign dictionary
    │   │   └── HandIcon.tsx     # Dynamic SVG hand posture diagram
    │   ├── engine/
    │   │   ├── geometry18D.ts   # 18D scale-invariant geometric math
    │   │   ├── velocityGate.ts  # Motion velocity gate & EMA smoothing
    │   │   └── deterministicComposer.ts # 0ms offline rule composer
    │   ├── hooks/
    │   │   ├── useWebcam.ts     # Camera stream lifecycle
    │   │   ├── useHandTracker.ts# MediaPipe loop & skeleton rendering
    │   │   ├── useSignClassifier.ts # Voting buffer & hold timer
    │   │   └── useSpeech.ts     # Multi-tier voice synthesizer
    │   └── store/
    │       └── useSignStore.ts  # Zustand reactive global state
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

You can install all dependencies across the monorepo in one command:

```powershell
npm run install:all
```

Or install server and client individually:

```powershell
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory:

```powershell
cp server/.env.example server/.env
```

Edit `server/.env` and add your Google Gemini API key:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Get a free key from [Google AI Studio](https://aistudio.google.com/))*

### 3. Start Development Servers

Run both backend and frontend concurrently:

```powershell
npm run dev
```

* **Frontend (React)**: [http://localhost:3000](http://localhost:3000)
* **Backend (Node.js)**: [http://localhost:5000](http://localhost:5000)
* **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🎮 How to Use

1. Click **"Start Live Camera"** to initialize your webcam.
2. Hold your hand steady in front of the camera.
3. The 3D green skeleton traces your fingers, while the circular ring fills up (0.65s).
4. Once locked, the sign is appended to the **Active Sequence**.
5. **Instant Deterministic Translation (0ms)** creates the initial sentence, followed by **Gemini AI Grammar Refinement (300ms)**.
6. Click **"Speak Sentence"** or individual language speaker icons to listen in **Indian English, Hindi, or Tamil**!
7. Use **Quick Starters** to test common phrases (Need Water, Doctor, Food) with a single tap.
8. Click **"1,080+ Signs"** to browse and search the full dictionary.

