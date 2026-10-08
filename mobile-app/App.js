import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as Speech from 'expo-speech';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'اردو' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
  { code: 'as', label: 'অসমীয়া' },
];

const greetingMap = {
  en: 'Hello, I am Ultron. Your personal AI assistant is ready.',
  hi: 'नमस्ते, मैं उल्ट्रॉन हूँ। आपका व्यक्तिगत AI सहायक तैयार है।',
  te: 'హలో, నేను అల్ట్రాన్. మీ వ్యక్తిగత AI సహాయకుడు సిద్ధంగా ఉన్నాడు.',
  ta: 'வணக்கம், நான் உல்ட்ரான். உங்கள் தனிப்பட்ட AI உதவியாளர் தயார்.',
  kn: 'ಹಲೋ, ನಾನು ಅಲ್ಟ್ರಾನ್. ನಿಮ್ಮ ವೈಯಕ್ತಿಕ AI ಸಹಾಯಕ್ ಸಿದ್ಧವಾಗಿದೆ.',
  ml: 'ഹലോ, ഞാൻ അൾട്രോൺ ആണ്. നിങ്ങളുടെ സ്വകാര്യ AI സഹായകൻ തയ്യാറാണ്.',
  mr: 'नमस्कार, मी अल्ट्रॉन आहे. तुमचा वैयक्तिक AI सहाय्यक तयार आहे.',
  gu: 'હાલો, હું અલ્ટ્રોન છું. તમારો વ્યક્તિગત AI સહાયક તૈયાર છે.',
  bn: 'হ্যালো, আমি আলট্রন। আপনার ব্যক্তিগত AI সহকারী প্রস্তুত।',
  pa: 'ਹੈਲੋ, ਮੈਂ ਅਲਟ੍ਰਾਨ ਹਾਂ। ਤੁਹਾਡਾ ਨਿੱਜੀ AI ਸਹਾਇਕ ਤਿਆਰ ਹੈ।',
  ur: 'ہیلو، میں الوٹرون ہوں۔ آپ کا ذاتی AI معاون تیار ہے۔',
  or: 'ହାଲୋ, ମୁଁ ଅଲ୍ଟ୍ରନ। ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ AI ସହାୟକ ପ୍ରସ୍ତୁତ।',
  as: 'হ্যালো, মই আলট্ৰোন। তোমাৰ ব্যক্তিগত AI সহকাৰী প্রস্তুত।',
};

export default function App() {
  const [language, setLanguage] = useState('en');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const currentLanguageLabel = useMemo(
    () => languages.find((item) => item.code === language)?.label || 'English',
    [language]
  );

  const speak = (text) => {
    Speech.speak(text, {
      language,
      pitch: 1,
      rate: 0.9,
    });
  };

  const askUltron = async () => {
    const prompt = input.trim();
    if (!prompt) return;

    setLoading(true);
    setResponse('Processing...');

    try {
      const apiUrl = 'http://localhost:3000/api/chat';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const answer = data.reply || 'I could not answer right now.';
      setResponse(answer);
      speak(answer);
    } catch (error) {
      const fallback = 'Backend is offline. Please start the server on port 3000.';
      setResponse(fallback);
      speak(fallback);
    } finally {
      setLoading(false);
    }
  };

  const runQuickAction = (text) => {
    setInput(text);
    setResponse('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>ULTRON</Text>
          <Text style={styles.subtitle}>Personal AI Voice Assistant</Text>
        </View>

        <View style={styles.languageRow}>
          {languages.map((item) => (
            <TouchableOpacity
              key={item.code}
              style={[
                styles.languageChip,
                language === item.code && styles.languageChipActive,
              ]}
              onPress={() => setLanguage(item.code)}
            >
              <Text style={styles.languageChipText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Selected language</Text>
          <Text style={styles.langValue}>{currentLanguageLabel}</Text>

          <Text style={styles.label}>Prompt</Text>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything..."
            placeholderTextColor="#999"
            multiline
          />

          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} onPress={() => runQuickAction('What time is it?')}>
              <Text style={styles.quickBtnText}>Time</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={() => runQuickAction('Who are you?')}>
              <Text style={styles.quickBtnText}>Who are you</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} onPress={() => runQuickAction('Write a short poem in this language')}>
              <Text style={styles.quickBtnText}>Poem</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={askUltron} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Ask Ultron</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.responseCard}>
          <Text style={styles.responseTitle}>Response</Text>
          <Text style={styles.responseText}>{response || greetingMap[language]}</Text>
        </View>

        <TouchableOpacity
          style={styles.speakBtn}
          onPress={() => speak(response || greetingMap[language])}
        >
          <Text style={styles.speakBtnText}>Read aloud</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050508',
    padding: 16,
  },
  header: {
    marginTop: 20,
    marginBottom: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ff003c',
    letterSpacing: 2,
  },
  subtitle: {
    color: '#d4d4d8',
    fontSize: 14,
    marginTop: 6,
  },
  languageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  languageChip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#12131b',
    borderWidth: 1,
    borderColor: '#2b2f3a',
    marginBottom: 8,
  },
  languageChipActive: {
    backgroundColor: '#2a0412',
    borderColor: '#ff003c',
  },
  languageChipText: {
    color: '#e5e7eb',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#111318',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ff003c55',
    padding: 16,
    marginBottom: 18,
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 8,
  },
  langValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    minHeight: 80,
    backgroundColor: '#0b0d12',
    borderColor: '#2b2f3a',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  quickBtn: {
    backgroundColor: '#191d26',
    borderWidth: 1,
    borderColor: '#313847',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quickBtnText: {
    color: '#e4e4e7',
    fontSize: 12,
  },
  primaryBtn: {
    backgroundColor: '#ff003c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  responseCard: {
    backgroundColor: '#0f121a',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ff003c44',
    marginBottom: 16,
  },
  responseTitle: {
    color: '#ff6b8a',
    fontWeight: '700',
    marginBottom: 8,
  },
  responseText: {
    color: '#f5f5f5',
    fontSize: 16,
    lineHeight: 24,
  },
  speakBtn: {
    backgroundColor: '#1b2330',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2d3848',
    alignItems: 'center',
  },
  speakBtnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
