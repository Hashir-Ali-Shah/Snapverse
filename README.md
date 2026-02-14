# 🎬 Snapverse

> **Turn YouTube Videos into Stunning Shorts with AI**

Snapverse is an AI-powered short-form video creation platform that lets you generate scripted conversations using LLMs, clone character voices, overlay character images on background videos, and produce ready-to-post shorts — all from a single interface.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi)
![LangChain](https://img.shields.io/badge/LangChain-0.3-1C3C3C?logo=langchain)

---

## ✨ Features

| Feature                   | Description                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🤖 **AI Story Generator** | Generate natural two-character conversations on any topic using Llama 3 70B via Groq                                                |
| 🎙️ **Voice Cloning**      | Clone real voices with [Chatterbox TTS](https://github.com/resemble-ai/chatterbox) — each character speaks in a unique cloned voice |
| 🎥 **YouTube Downloader** | Download videos, audio, or playlists from YouTube with automatic sub-clipping via yt-dlp                                            |
| 🖼️ **Character Overlays** | Select character images that are composited onto the final video                                                                    |
| 📝 **Auto Captions**      | AI-generated topic-based titles using few-shot prompting                                                                            |
| 🎞️ **Video Processor**    | Composites background video, cloned audio, subtitles, and character images into a final short                                       |
| 🌐 **Modern Web UI**      | Next.js 15 frontend with a panel-based editor for a streamlined creative workflow                                                   |

---

## 🏗️ Project Structure

```
Snapverse/
├── Backend/
│   ├── main.py                 # FastAPI server with REST endpoints
│   ├── storygenerator.py       # LLM conversation generator (LangChain + Groq)
│   ├── voicegenerator.py       # Chatterbox TTS voice cloning
│   ├── videogenerator.py       # MoviePy video compositor
│   ├── captionGenerator.py     # AI caption/topic generator
│   ├── youtube.py              # yt-dlp YouTube downloader with sub-clipping
│   └── removebg.py             # Background removal utility (rembg)
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── Home/           # Landing page (Hero, Features, Video Carousel)
│   │   │   ├── auth/           # Login & Signup pages
│   │   │   └── generator/      # Main editor workspace
│   │   │       ├── Sidebar.tsx
│   │   │       ├── ToolOverlay.tsx
│   │   │       └── panels/
│   │   │           ├── StoryPanel/       # AI chat interface for story generation
│   │   │           ├── VideoPanel/       # Background video selection
│   │   │           ├── VoicesPanel/      # Voice selection
│   │   │           ├── CharactersPanel/  # Character image picker
│   │   │           └── EditingPanel/     # Preview & render final video
│   │   └── components/         # Shared UI (Navbar, Footer, Button, InputField, SocialAuth)
│   └── public/
│       ├── characters/         # Character images (PNG)
│       ├── voices/             # Voice reference audio (WAV)
│       ├── videos/             # Background video clips
│       └── clips/              # Generated output videos
│
├── requirements.txt
└── .gitignore
```

---

## 🔧 Tech Stack

### Backend

- **[FastAPI](https://fastapi.tiangolo.com/)** — REST API server
- **[LangChain](https://www.langchain.com/) + [Groq](https://groq.com/)** — LLM orchestration with Llama 3 70B
- **[Chatterbox TTS](https://github.com/resemble-ai/chatterbox)** — Zero-shot voice cloning
- **[MoviePy](https://zulko.github.io/moviepy/)** — Video editing & compositing
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)** — YouTube downloading
- **[torchaudio](https://pytorch.org/audio/)** — Audio processing
- **[FFmpeg](https://ffmpeg.org/)** — Media processing backend

### Frontend

- **[Next.js 15](https://nextjs.org/)** — React framework (App Router)
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Heroicons](https://heroicons.com/) + [React Icons](https://react-icons.github.io/react-icons/)** — Icons

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** & **npm**
- **FFmpeg** installed and available in PATH
- **Groq API Key** — get one at [console.groq.com](https://console.groq.com/)
- **CUDA GPU** recommended for voice cloning (CPU fallback supported)

### 1. Clone the Repository

```bash
git clone https://github.com/Hashir-Ali-Shah/Snapverse.git
cd Snapverse
```

### 2. Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt
pip install fastapi uvicorn moviepy chatterbox-tts rembg pillow torchaudio torch
```

### 3. Set Environment Variable

Set your Groq API key as an environment variable:

**Windows (PowerShell):**

```powershell
$env:GROQ_API_KEY = "your_groq_api_key_here"
```

**Windows (CMD):**

```cmd
set GROQ_API_KEY=your_groq_api_key_here
```

**macOS/Linux:**

```bash
export GROQ_API_KEY="your_groq_api_key_here"
```

### 4. Frontend Setup

```bash
cd Frontend
npm install
```

### 5. Run the Application

**Start the Backend:**

```bash
cd Backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Start the Frontend** (in a separate terminal):

```bash
cd Frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📖 How It Works

```
1. Story    →  2. Video    →  3. Characters  →  4. Generate
(AI Chat)      (Select BG)    (Pick Two)        (Render MP4)
```

1. **Story Panel** — Chat with the AI to generate a two-character conversation on any topic
2. **Video Panel** — Pick a background video from the library
3. **Characters Panel** — Select two character images (voices are auto-mapped by character name)
4. **Editing Panel** — Preview everything, then hit **Generate Video** to:
   - Clone each character's voice with Chatterbox TTS
   - Generate an AI caption/title for the video
   - Composite video + audio + subtitles + character overlays
   - Output a final MP4

---

## 📡 API Endpoints

| Method | Endpoint                | Description                                                  |
| ------ | ----------------------- | ------------------------------------------------------------ |
| `POST` | `/generate`             | Generate a two-character conversation from a prompt          |
| `POST` | `/process-conversation` | Render a full video with voice cloning, subtitles & overlays |

### `POST /generate`

```json
// Request
{ "question": "Generate a conversation between Einstein and Newton about gravity" }

// Response
{ "answer": "I've been rethinking gravity...\nBut my laws work perfectly!..." }
```

### `POST /process-conversation`

```json
// Request
{
  "voiceA": "/voices/trump.wav",
  "voiceB": "/voices/obama.wav",
  "conversation": [
    { "id": 1, "speaker": "A", "text": "Hello there!" },
    { "id": 2, "speaker": "B", "text": "Good to see you." }
  ],
  "imageA": "/characters/trump.png",
  "imageB": "/characters/obama.png",
  "video": "/videos/subway_surf.mp4"
}

// Response
{ "message": "Conversation processed successfully", "video_path": "/clips/Topic_Name_uuid.mp4" }
```

---

## 🗂️ Adding Custom Assets

| Asset       | Format                           | Directory                     |
| ----------- | -------------------------------- | ----------------------------- |
| Characters  | PNG (transparent bg recommended) | `Frontend/public/characters/` |
| Voice refs  | WAV                              | `Frontend/public/voices/`     |
| Backgrounds | MP4                              | `Frontend/public/videos/`     |

> **Note:** Voice files must match their character filename (e.g., `trump.png` → `trump.wav`).

---

## 👥 Authors

- **Hashir Ali Shah** — [GitHub](https://github.com/Hashir-Ali-Shah)
