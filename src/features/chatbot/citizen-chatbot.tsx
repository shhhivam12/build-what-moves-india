"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useCivicLanguage } from "@/src/i18n/civic-language-context";
import type { ShellUser } from "@/src/design-system/components/civic-shell";
import styles from "./citizen-chatbot.module.css";

type ChatMode = "idle" | "grievance" | "tracking";
type ChatMessage = { id: number; sender: "assistant" | "citizen"; text: string; action?: { label: string; href: string } };

const chatCopy = {
  en: {
    name: "Samadhan Sahayak", status: "Multilingual citizen assistant", open: "Open Samadhan Sahayak", close: "Close assistant", newChat: "Start a new conversation",
    greeting: "Namaste. I can help you lodge a grievance, track a registration number, review an appeal, open your dashboard or find the correct government service.",
    prompt: "How may I help you today?", placeholder: "Type in English or Hindi…", send: "Send", privacy: "Do not share Aadhaar, OTP, passwords or bank details.",
    actions: ["Lodge grievance", "Track status", "My dashboard", "File appeal", "Services", "Help"],
    grievanceAsk: "Please describe what happened, the public service involved and the action you want. I will carry the draft into the grievance form.",
    grievanceShort: "Please add a little more detail so the grievance can be understood clearly.",
    grievanceReady: "Your grievance draft is ready. Continue to confirm the concerned organisation and review it before submission.", grievanceAction: "Continue grievance",
    trackingAsk: "Enter the complete grievance registration number. I will open its latest available status.",
    trackingShort: "Please enter a valid registration number such as CPG-DEMO-2026-001.",
    trackingReady: "The registration number is ready to check.", trackingAction: "View status",
    signedOut: "Please sign in first so the service can securely use your fictional citizen account.", signIn: "Sign in",
    generic: "I can start a grievance, track status, open appeals, show services, help with your account, or switch between English and Hindi. Choose an action below or describe what you need.",
  },
  hi: {
    name: "समाधान सहायक", status: "बहुभाषी नागरिक सहायक", open: "समाधान सहायक खोलें", close: "सहायक बंद करें", newChat: "नई बातचीत शुरू करें",
    greeting: "नमस्ते। मैं शिकायत दर्ज करने, पंजीकरण संख्या की स्थिति देखने, अपील की समीक्षा, डैशबोर्ड खोलने या सही सरकारी सेवा खोजने में सहायता कर सकता हूँ।",
    prompt: "आज मैं आपकी कैसे सहायता करूँ?", placeholder: "हिन्दी या English में लिखें…", send: "भेजें", privacy: "आधार, ओटीपी, पासवर्ड या बैंक विवरण साझा न करें।",
    actions: ["शिकायत दर्ज करें", "स्थिति देखें", "मेरा डैशबोर्ड", "अपील दर्ज करें", "सेवाएँ", "सहायता"],
    grievanceAsk: "क्या हुआ, संबंधित सार्वजनिक सेवा और अपेक्षित कार्रवाई लिखें। मैं यह मसौदा शिकायत फॉर्म में ले जाऊँगा।",
    grievanceShort: "शिकायत को स्पष्ट रूप से समझने के लिए थोड़ा और विवरण जोड़ें।",
    grievanceReady: "आपकी शिकायत का मसौदा तैयार है। संबंधित संगठन की पुष्टि और जमा करने से पहले समीक्षा करें।", grievanceAction: "शिकायत जारी रखें",
    trackingAsk: "पूरी शिकायत पंजीकरण संख्या दर्ज करें। मैं उपलब्ध नवीनतम स्थिति खोल दूँगा।",
    trackingShort: "CPG-DEMO-2026-001 जैसी मान्य पंजीकरण संख्या दर्ज करें।",
    trackingReady: "पंजीकरण संख्या जाँच के लिए तैयार है।", trackingAction: "स्थिति देखें",
    signedOut: "काल्पनिक नागरिक खाते का सुरक्षित उपयोग करने के लिए पहले साइन इन करें।", signIn: "साइन इन",
    generic: "मैं शिकायत शुरू कर सकता हूँ, स्थिति देख सकता हूँ, अपील और सेवाएँ खोल सकता हूँ, खाते में सहायता कर सकता हूँ या English और हिन्दी बदल सकता हूँ। नीचे विकल्प चुनें या अपनी आवश्यकता लिखें।",
  },
} as const;

export function CitizenChatbot({ user }: { user: ShellUser }) {
  const router = useRouter();
  const { contentLocale, setLocale } = useCivicLanguage();
  const copy = chatCopy[contentLocale];
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("idle");
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, sender: "assistant", text: copy.greeting }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageId = useRef(2);

  useEffect(() => {
    setMessages([{ id: messageId.current++, sender: "assistant", text: copy.greeting }]);
    setMode("idle");
  }, [contentLocale, copy.greeting]);

  useEffect(() => {
    if (open) window.requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const add = (sender: ChatMessage["sender"], text: string, action?: ChatMessage["action"]) => {
    setMessages((current) => [...current, { id: messageId.current++, sender, text, action }]);
  };

  const requireAccount = (href: string) => {
    if (user) router.push(href);
    else add("assistant", copy.signedOut, { label: copy.signIn, href: `/signin?returnTo=${encodeURIComponent(href)}` });
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

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = value.trim();
    if (!message) return;
    add("citizen", message);
    setValue("");

    if (mode === "grievance") {
      if (message.length < 20) { add("assistant", copy.grievanceShort); return; }
      window.sessionStorage.setItem("assured-chat-grievance-draft", message);
      setMode("idle");
      add("assistant", copy.grievanceReady, { label: copy.grievanceAction, href: user ? "/grievances/new?assistant=1" : "/signin?returnTo=/grievances/new?assistant=1" });
      return;
    }

    if (mode === "tracking") {
      if (message.length < 8 || !/[0-9]/.test(message)) { add("assistant", copy.trackingShort); return; }
      window.sessionStorage.setItem("assured-chat-track-reference", message);
      setMode("idle");
      add("assistant", copy.trackingReady, { label: copy.trackingAction, href: user ? "/track?assistant=1" : "/signin?returnTo=/track?assistant=1" });
      return;
    }

    const lower = message.toLocaleLowerCase();
    if (/hindi|हिन्दी|हिंदी/.test(lower)) { setLocale("hi"); return; }
    if (/english|अंग्रेज/.test(lower)) { setLocale("en"); return; }
    if (/शिकायत|grievance|complaint/.test(lower)) { setMode("grievance"); add("assistant", copy.grievanceAsk); return; }
    if (/स्थिति|status|track|reference|पंजीकरण/.test(lower)) { setMode("tracking"); add("assistant", copy.trackingAsk); return; }
    if (/अपील|appeal/.test(lower)) { requireAccount("/dashboard#appeals"); return; }
    if (/dashboard|डैशबोर्ड|account|खाता/.test(lower)) { requireAccount("/dashboard"); return; }
    if (/service|सेवा/.test(lower)) { router.push("/services"); return; }
    if (/help|सहायता/.test(lower)) { router.push("/help"); return; }
    add("assistant", copy.generic);
  };

  const followAction = (action: ChatMessage["action"]) => {
    if (!action) return;
    router.push(action.href);
  };

  return <>
    {open ? <aside aria-label={copy.name} aria-modal="false" className={styles.panel} role="dialog">
      <header><div className={styles.assistantPortrait}><Image alt="" height={120} src="/culture/namaste-citizen-guide.png" width={80} /></div><div><strong>{copy.name}</strong><span><i />{copy.status}</span></div><button aria-label={copy.newChat} onClick={() => { setMessages([{ id: messageId.current++, sender: "assistant", text: copy.greeting }]); setMode("idle"); }} type="button">↻</button><button aria-label={copy.close} onClick={() => setOpen(false)} type="button">×</button></header>
      <div aria-live="polite" className={styles.messages}>{messages.map((message) => <div className={message.sender === "assistant" ? styles.botMessage : styles.userMessage} key={message.id}><span>{message.text}</span>{message.action ? <button onClick={() => followAction(message.action)} type="button">{message.action.label} <b aria-hidden="true">→</b></button> : null}</div>)}</div>
      <section className={styles.quickActions} aria-label={copy.prompt}><p>{copy.prompt}</p><div>{copy.actions.map((label, index) => <button key={label} onClick={() => startAction(index)} type="button"><span aria-hidden="true">{["＋", "⌕", "⌂", "↗", "◫", "?"][index]}</span>{label}</button>)}</div></section>
      <form onSubmit={submit}><label><span className="srOnly">{copy.placeholder}</span><input autoComplete="off" onChange={(event) => setValue(event.target.value)} placeholder={copy.placeholder} ref={inputRef} value={value} /></label><button aria-label={copy.send} type="submit">↑</button></form>
      <footer><span aria-hidden="true">◇</span>{copy.privacy}</footer>
    </aside> : null}
    <button aria-expanded={open} aria-label={copy.open} className={styles.launcher} data-tour="assistant" onClick={() => setOpen((current) => !current)} type="button"><span className={styles.launcherPortrait}><Image alt="" height={120} priority src="/culture/namaste-citizen-guide.png" width={80} /></span><span><strong>{copy.name}</strong><small>{contentLocale === "hi" ? "पूछें या सेवा शुरू करें" : "Ask or start a service"}</small></span><b aria-hidden="true">{open ? "×" : "✦"}</b></button>
  </>;
}
