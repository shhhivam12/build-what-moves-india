export type VoiceLanguage = { code: string; label: string; nativeLabel: string };

export const voiceLanguages: VoiceLanguage[] = [
  { code: "en-IN", label: "English", nativeLabel: "English" },
  { code: "hi-IN", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "bn-IN", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "mr-IN", label: "Marathi", nativeLabel: "मराठी" },
  { code: "ta-IN", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te-IN", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "gu-IN", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "kn-IN", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml-IN", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "pa-IN", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
  { code: "or-IN", label: "Odia", nativeLabel: "ଓଡ଼ିଆ" },
  { code: "as-IN", label: "Assamese", nativeLabel: "অসমীয়া" },
  { code: "ur-IN", label: "Urdu", nativeLabel: "اردو" },
];

export type DraftField = "date" | "location" | "resolution";

export type VoiceGrievanceDraft = {
  original: string;
  additions: string[];
  date?: string;
  location?: string;
  resolution?: string;
  service: string;
};

const datePattern = /\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December|जनवरी|फ़रवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्टूबर|नवंबर|दिसंबर)(?:\s+\d{4})?|(?:\b(?:on|since|from|after|before|last|today|yesterday)\b|कल|आज|दिनांक|तारीख|से|के बाद)\s+[^,.।]{2,40}|\b\d{1,2}[\/-]\d{1,2}(?:[\/-]\d{2,4})?\b/i;
const locationPattern = /(?:in|at|near|from|में|पर|पास|से)\s+([\p{L}][\p{L}\s-]{2,35})/iu;
const resolutionPattern = /(?:refund|reverse|activate|restore|repair|correct|resolve|replace|issue|release|provide|वापस|चालू|सुधार|समाधान|ठीक|जारी|दिलव)/i;

function serviceFor(text: string) {
  if (/mobile|sim|telecom|broadband|network|मोबाइल|सिम|नेटवर्क/i.test(text)) return "telecom service";
  if (/pension|पेंशन/i.test(text)) return "pension service";
  if (/bank|payment|upi|बैंक|भुगतान/i.test(text)) return "financial service";
  if (/post|parcel|डाक|पार्सल/i.test(text)) return "postal service";
  if (/hospital|health|अस्पताल|स्वास्थ्य/i.test(text)) return "public health service";
  if (/road|water|electric|बिजली|पानी|सड़क/i.test(text)) return "civic service";
  return "public service delivery";
}

export function analyseStatement(statement: string): VoiceGrievanceDraft {
  const clean = statement.replace(/\s+/g, " ").trim();
  const date = clean.match(datePattern)?.[0];
  const location = clean.match(locationPattern)?.[1]?.trim();
  const resolution = clean.split(/[.!?।]/).map((part) => part.trim()).filter(Boolean).filter((part) => resolutionPattern.test(part)).at(-1);
  return { original: clean, additions: [], date, location, resolution, service: serviceFor(clean) };
}

export function nextMissingField(draft: VoiceGrievanceDraft): DraftField | null {
  if (!draft.date) return "date";
  if (!draft.location && draft.service !== "telecom service" && draft.service !== "financial service") return "location";
  if (!draft.resolution) return "resolution";
  return null;
}

export function answerClarification(draft: VoiceGrievanceDraft, field: DraftField, answer: string): VoiceGrievanceDraft {
  const clean = answer.replace(/\s+/g, " ").trim();
  if (field === "date") return { ...draft, date: clean };
  if (field === "location") return { ...draft, location: clean };
  return { ...draft, resolution: clean };
}

export function addDraftDetail(draft: VoiceGrievanceDraft, detail: string): VoiceGrievanceDraft {
  return { ...draft, additions: [...draft.additions, detail.replace(/\s+/g, " ").trim()] };
}

export function composeProfessionalDraft(draft: VoiceGrievanceDraft) {
  const parts = [
    `I wish to lodge a grievance regarding ${draft.service}.`,
    `Citizen's original statement: “${draft.original}”`,
    draft.date ? `Relevant date or period: ${draft.date}.` : "",
    draft.location ? `Location: ${draft.location}.` : "",
    ...draft.additions.map((item) => `Additional detail: ${item}`),
    draft.resolution ? `Requested resolution: ${draft.resolution}.` : "",
    "I request the concerned organisation to examine the matter and provide a reasoned, time-bound resolution.",
  ];
  return parts.filter(Boolean).join("\n\n");
}
