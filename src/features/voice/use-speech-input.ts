"use client";

import { useCallback, useRef, useState } from "react";

type RecognitionEvent = { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> };
type Recognition = {
  lang: string; interimResults: boolean; continuous: boolean;
  onstart: null | (() => void); onend: null | (() => void);
  onerror: null | ((event: { error: string }) => void); onresult: null | ((event: RecognitionEvent) => void);
  start(): void; stop(): void;
};
type RecognitionConstructor = new () => Recognition;

export function useSpeechInput({ locale, onTranscript, onError }: { locale: string; onTranscript: (text: string) => void; onError: (message: string) => void }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<Recognition | null>(null);

  const toggle = useCallback(() => {
    if (recognitionRef.current && listening) { recognitionRef.current.stop(); return; }
    const speechWindow = window as typeof window & { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
    const RecognitionApi = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!RecognitionApi) { onError("Live speech input is available in current Chrome and Edge browsers. You can use the sample voice journey on this device."); return; }
    const recognition = new RecognitionApi();
    recognitionRef.current = recognition;
    recognition.lang = locale;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => { setListening(false); recognitionRef.current = null; };
    recognition.onerror = (event) => onError(event.error === "not-allowed" ? "Microphone access was not granted. You can type or use the sample journey instead." : "I could not hear that clearly. Please try again or type your message.");
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = 0; index < event.results.length; index += 1) transcript += event.results[index]?.[0]?.transcript ?? "";
      onTranscript(transcript.trim());
    };
    recognition.start();
  }, [listening, locale, onError, onTranscript]);

  return { listening, toggle };
}
