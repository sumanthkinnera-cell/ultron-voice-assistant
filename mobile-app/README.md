# Ultron Mobile App

A React Native / Expo app for the Ultron personal AI assistant with multilingual support.

## Included languages
- English
- Hindi
- Telugu
- Tamil
- Kannada
- Malayalam
- Marathi
- Gujarati
- Bengali
- Punjabi
- Urdu
- Odia
- Assamese

## Features
- AI chat screen
- Multi-language selector
- Text-to-speech with selected language
- Quick action buttons
- Futuristic dark UI

## Setup

```bash
cd mobile-app
npm install
npx expo start
```

## Important note
This app expects the backend server to be running on:

```text
http://localhost:3000/api/chat
```

If you want real voice input, add a native speech recognition library like `@react-native-voice/voice`.
