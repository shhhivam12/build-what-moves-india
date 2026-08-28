"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { ShellUser } from "@/src/design-system/components/civic-shell";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import { useSpeechInput } from "@/src/features/voice/use-speech-input";
import { addDraftDetail, analyseStatement, answerClarification, composeProfessionalDraft, nextMissingField, type DraftField, type VoiceGrievanceDraft, voiceLanguages } from "./voice-grievance-demo";
import styles from "./citizen-chatbot.module.css";

type ChatMode = "idle" | "grievance" | "clarifying" | "review" | "tracking";
type ChatMessage = { id: number; sender: "assistant" | "citizen"; text: string; action?: { label: string; href: string }; draft?: boolean };

const chatCopy = {
  en: {
    name: "Samadhan Sahayak", status: "Voice-first citizen assistant", open: "Open Samadhan Sahayak", close: "Close assistant", newChat: "Start a new conversation",
    greeting: "Namaste. Speak naturally in your language or type. I can understand the issue, ask only the missing questions, and prepare a formal grievance for your approval.", prompt: "Choose a service or begin speaking", placeholder: "Speak or type your issue…", send: "Send", privacy: "Your voice is transcribed in the browser. Never share Aadhaar, OTP or bank details.",
    actions: ["Lodge grievance", "Track status", "My dashboard", "File appeal", "Services", "Help"], grievanceAsk: "Tell me what happened in your own words. Include the service and what you want the department to do, if you know it.", grievanceShort: "Please add a little more detail so I can understand the issue.",
    trackingAsk: "Enter the complete grievance registration number.", trackingShort: "Enter a valid number such as CPG-DEMO-2026-001.", trackingReady: "The registration number is ready to check.", trackingAction: "View status", signedOut: "Please sign in first to continue securely.", signIn: "Sign in", generic: "I can lodge a grievance, track status, open appeals, show services or help with your account.",
    language: "Voice language", listening: "Listening… tap to stop", microphone: "Speak now", sample: "Try sample voice journey", draftTitle: "Citizen-approved formal draft", editHint: "Tell me another detail to update this draft, or continue to the form.", continue: "Continue grievance", agents: ["Understand", "Clarify", "Draft", "Route"], addDetail: "Add another detail",
  },
  hi: {
    name: "समाधान सहायक", status: "आवाज़-आधारित नागरिक सहायक", open: "समाधान सहायक खोलें", close: "सहायक बंद करें", newChat: "नई बातचीत शुरू करें",
    greeting: "नमस्ते। अपनी भाषा में सहज रूप से बोलें या लिखें। मैं समस्या समझकर केवल आवश्यक प्रश्न पूछूँगा और आपकी मंज़ूरी के लिए औपचारिक शिकायत तैयार करूँगा।", prompt: "सेवा चुनें या बोलना शुरू करें", placeholder: "समस्या बोलें या लिखें…", send: "भेजें", privacy: "आवाज़ ब्राउज़र में लिखित रूप में बदलती है। आधार, ओटीपी या बैंक विवरण न बताएँ।",
    actions: ["शिकायत दर्ज करें", "स्थिति देखें", "मेरा डैशबोर्ड", "अपील दर्ज करें", "सेवाएँ", "सहायता"], grievanceAsk: "अपने शब्दों में बताइए कि क्या हुआ। संभव हो तो सेवा और अपेक्षित समाधान भी बताएँ।", grievanceShort: "समस्या समझने के लिए थोड़ा और विवरण बताएँ।",
    trackingAsk: "पूरी शिकायत पंजीकरण संख्या दर्ज करें।", trackingShort: "CPG-DEMO-2026-001 जैसी मान्य संख्या दर्ज करें।", trackingReady: "पंजीकरण संख्या जाँच के लिए तैयार है।", trackingAction: "स्थिति देखें", signedOut: "सुरक्षित रूप से आगे बढ़ने के लिए साइन इन करें।", signIn: "साइन इन", generic: "मैं शिकायत दर्ज करने, स्थिति देखने, अपील, सेवाओं और खाते में सहायता कर सकता हूँ।",
    language: "आवाज़ की भाषा", listening: "सुन रहा हूँ… रोकने के लिए टैप करें", microphone: "बोलना शुरू करें", sample: "नमूना आवाज़ यात्रा देखें", draftTitle: "नागरिक द्वारा स्वीकृत औपचारिक मसौदा", editHint: "मसौदे में कोई और जानकारी जोड़ें या फॉर्म पर आगे बढ़ें।", continue: "शिकायत जारी रखें", agents: ["समझ", "सवाल", "मसौदा", "मार्ग"], addDetail: "एक और जानकारी जोड़ें",
  },
} as const;

const clarification = {
  en: { date: "When did this happen? An approximate date or period is enough.", location: "Where did this happen? Please name the city, district or service office.", resolution: "What action would you like the department to take?" },
  hi: { date: "यह कब हुआ? अनुमानित तारीख या समय अवधि भी पर्याप्त है।", location: "यह कहाँ हुआ? शहर, जिला या सेवा कार्यालय बताएँ।", resolution: "आप विभाग से क्या कार्रवाई चाहते हैं?" },
} as const;

export function CitizenChatbot({ user }: { user: ShellUser }) {
  const router = useRouter();
  const { contentLocale, setLocale } = useCivicLanguage();
  const copy = chatCopy[contentLocale];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("idle");
  const [value, setValue] = useState("");
  const [voiceLocale, setVoiceLocale] = useState(contentLocale === "hi" ? "hi-IN" : "en-IN");
  const [draft, setDraft] = useState<VoiceGrievanceDraft | null>(null);
  const [missing, setMissing] = useState<DraftField | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, sender: "assistant", text: copy.greeting }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(2);

  const add = useCallback((sender: ChatMessage["sender"], text: string, action?: ChatMessage["action"], isDraft = false) => {
    setMessages((current) => [...current, { id: messageId.current++, sender, text, action, draft: isDraft }]);
  }, []);
  const onSpeechError = useCallback((message: string) => add("assistant", message), [add]);
  const onTranscript = useCallback((text: string) => setValue(text), []);
  const speech = useSpeechInput({ locale: voiceLocale, onTranscript, onError: onSpeechError });
  const reset = useCallback(() => { setMessages([{ id: messageId.current++, sender: "assistant", text: copy.greeting }]); setMode("idle"); setDraft(null); setMissing(null); }, [copy.greeting]);

  useEffect(() => { if (open) window.requestAnimationFrame(() => inputRef.current?.focus()); }, [open]);

  const requireAccount = (href: string) => user ? router.push(href) : add("assistant", copy.signedOut, { label: copy.signIn, href: `/signin?returnTo=${encodeURIComponent(href)}` });
  const showDraft = (nextDraft: VoiceGrievanceDraft) => {
    const professional = composeProfessionalDraft(nextDraft);
    window.sessionStorage.setItem("assured-chat-grievance-draft", professional);
    setDraft(nextDraft); setMissing(null); setMode("review");
    add("assistant", professional, { label: copy.continue, href: user ? "/grievances/new?assistant=1" : "/signin?returnTo=/grievances/new?assistant=1" }, true);
    add("assistant", copy.editHint);
  };
  const processStatement = (message: string) => {
    const nextDraft = analyseStatement(message); const field = nextMissingField(nextDraft); setDraft(nextDraft);
    if (field) { setMissing(field); setMode("clarifying"); add("assistant", clarification[contentLocale][field]); } else showDraft(nextDraft);
  };
  const startAction = (index: number) => {
    add("citizen", copy.actions[index] ?? copy.actions[0]);
    if (index === 0) { setMode("grievance"); add("assistant", copy.grievanceAsk); return; }
    if (index === 1) { setMode("tracking"); add("assistant", copy.trackingAsk); return; }
    if (index === 2) { requireAccount("/dashboard"); return; }
    if (index === 3) { requireAccount("/dashboard#appeals"); return; }
    if (index === 4) router.push("/services");
    if (index === 5) router.push("/help");
  };
  const runSample = () => {
    const sample = voiceLocale.startsWith("hi") ? "मैंने 18 अगस्त को मोबाइल सेवा चालू करने के लिए 499 रुपये दिए थे, लेकिन सेवा अभी भी बंद है। कृपया सेवा चालू करें या पैसे वापस करें।" : "I paid 499 rupees on 18 August for mobile activation, but the service is still inactive. Please activate it or refund the payment.";
    add("citizen", sample); processStatement(sample);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault(); const message = value.trim(); if (!message) return; add("citizen", message); setValue("");
    if (mode === "grievance") { if (message.length < 20) add("assistant", copy.grievanceShort); else processStatement(message); return; }
    if (mode === "clarifying" && draft && missing) { const updated = answerClarification(draft, missing, message); const next = nextMissingField(updated); setDraft(updated); if (next) { setMissing(next); add("assistant", clarification[contentLocale][next]); } else showDraft(updated); return; }
    if (mode === "review" && draft) { const updated = addDraftDetail(draft, message); setMessages((current) => current.filter((item) => !item.draft && item.text !== copy.editHint)); showDraft(updated); return; }
    if (mode === "tracking") { if (message.length < 8 || !/[0-9]/.test(message)) add("assistant", copy.trackingShort); else { window.sessionStorage.setItem("assured-chat-track-reference", message); setMode("idle"); add("assistant", copy.trackingReady, { label: copy.trackingAction, href: user ? "/track?assistant=1" : "/signin?returnTo=/track?assistant=1" }); } return; }
    const lower = message.toLocaleLowerCase();
    if (/hindi|हिन्दी|हिंदी/.test(lower)) { setVoiceLocale("hi-IN"); setLocale("hi"); return; }
    if (/english|अंग्रेज/.test(lower)) { setVoiceLocale("en-IN"); setLocale("en"); return; }
    if (/शिकायत|grievance|complaint/.test(lower)) { setMode("grievance"); add("assistant", copy.grievanceAsk); return; }
    if (/स्थिति|status|track|reference|पंजीकरण/.test(lower)) { setMode("tracking"); add("assistant", copy.trackingAsk); return; }
    add("assistant", copy.generic);
  };

  return <>
    {open ? <aside aria-label={copy.name} aria-modal="false" className={styles.panel} role="dialog">
      <header><div className={styles.assistantPortrait}><Image alt="" height={120} src="/culture/namaste-citizen-guide.png" width={80} /></div><div><strong>{copy.name}</strong><span><i />{copy.status}</span></div><button aria-label={copy.newChat} onClick={reset} type="button">↻</button><button aria-label={copy.close} onClick={() => setOpen(false)} type="button">×</button></header>
      <div aria-live="polite" className={styles.messages}>{messages.map((message) => <div className={`${message.sender === "assistant" ? styles.botMessage : styles.userMessage} ${message.draft ? styles.draftMessage : ""}`} key={message.id}>{message.draft ? <small>{copy.draftTitle}</small> : null}<span>{message.text}</span>{message.action ? <button onClick={() => router.push(message.action!.href)} type="button">{message.action.label} <b aria-hidden="true">→</b></button> : null}</div>)}</div>
      {(mode === "grievance" || mode === "clarifying" || mode === "review") ? <section className={styles.voiceWorkbench}>
        <div className={styles.agentRail}>{copy.agents.map((agent, index) => <span className={(mode === "review" ? 3 : mode === "clarifying" ? 1 : 0) >= index ? styles.activeAgent : ""} key={agent}><i>{index + 1}</i>{agent}</span>)}</div>
        <div className={styles.voiceControls}><label>{copy.language}<select aria-label={copy.language} onChange={(event) => setVoiceLocale(event.target.value)} value={voiceLocale}>{voiceLanguages.map((language) => <option key={language.code} value={language.code}>{language.nativeLabel} · {language.label}</option>)}</select></label><button aria-pressed={speech.listening} className={speech.listening ? styles.listening : ""} onClick={speech.toggle} type="button"><span aria-hidden="true">●</span>{speech.listening ? copy.listening : copy.microphone}</button></div>
        {mode === "grievance" ? <button className={styles.sampleJourney} onClick={runSample} type="button">▶ {copy.sample}</button> : null}
      </section> : <section className={styles.quickActions} aria-label={copy.prompt}><p>{copy.prompt}</p><div>{copy.actions.map((label, index) => <button key={label} onClick={() => startAction(index)} type="button"><span aria-hidden="true">{["＋", "⌕", "⌂", "↗", "◫", "?"][index]}</span>{label}</button>)}</div></section>}
      <form onSubmit={submit}><label><span className="srOnly">{copy.placeholder}</span><input autoComplete="off" onChange={(event) => setValue(event.target.value)} placeholder={mode === "review" ? copy.addDetail : copy.placeholder} ref={inputRef} value={value} /></label><button aria-label={copy.send} type="submit">↑</button></form>
      <footer><span aria-hidden="true">◇</span>{copy.privacy}</footer>
    </aside> : null}
    <button aria-expanded={open} aria-label={copy.open} className={styles.launcher} data-tour="assistant" onClick={() => setOpen((current) => !current)} type="button"><span className={styles.launcherPortrait}><Image alt="" height={120} priority src="/culture/namaste-citizen-guide.png" width={80} /></span><span><strong>{copy.name}</strong><small>{contentLocale === "hi" ? "बोलें, पूछें या सेवा शुरू करें" : "Speak, ask or start a service"}</small></span><b aria-hidden="true">{open ? "×" : "✦"}</b></button>
  </>;
}
