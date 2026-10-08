# ULTRON AI Voice Assistant

A personal AI voice assistant with a futuristic cybernetic interface built in Node.js + Express + OpenAI.

## Features
- Real AI chat via OpenAI API
- Browser microphone input
- Text-to-speech output
- Futuristic cyber UI inspired by sci-fi dashboards
- Quick command buttons and live status HUD

## Tech Stack
- Frontend: HTML + Tailwind CSS + JavaScript
- Backend: Node.js + Express
- AI: OpenAI GPT model
- Voice: Web Speech API

## Quick Start

1. Install dependencies
```bash
npm install
```

2. Create a `.env` file from the example
```bash
cp .env.example .env
```

3. Add your OpenAI API key in `.env`
```env
OPENAI_API_KEY=your_key_here
PORT=3000
```

4. Start the app
```bash
npm start
```

5. Open in your browser
```text
http://localhost:3000
```

## Notes
- Speech recognition works best in Chrome or Edge.
- If the browser blocks mic access, allow it in the page permissions.
- For best results, use a valid OpenAI API key with model access.
