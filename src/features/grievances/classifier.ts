export type Classification = {
  category: string;
  department: string;
  confidence: number;
  reason: string;
  alternatives: { category: string; department: string }[];
  desiredOutcomes: string[];
  needsHandoff?: { label: string; url: string; reason: string };
};

const routes = [
  { category: "Telecommunications", department: "Department of Telecommunications", keywords: ["mobile", "sim", "network", "telecom", "recharge", "broadband", "internet", "call", "activation"] },
  { category: "Financial services", department: "Department of Financial Services", keywords: ["bank", "loan", "upi", "account", "atm", "insurance", "payment", "transaction", "refund"] },
  { category: "Labour and employment", department: "Ministry of Labour and Employment", keywords: ["employer", "salary", "wage", "epfo", "provident", "labour", "job", "pension contribution"] },
  { category: "Posts", department: "Department of Posts", keywords: ["post office", "parcel", "speed post", "postal", "consignment", "delivery"] },
  { category: "Housing", department: "Ministry of Housing and Urban Affairs", keywords: ["housing", "pmay", "allotment", "municipal", "urban", "water supply", "sanitation"] },
  { category: "Health", department: "Ministry of Health and Family Welfare", keywords: ["hospital", "health", "medicine", "ayushman", "clinic", "treatment"] },
] as const;

export function classifyGrievance(input: string): Classification {
  const text = input.toLowerCase();
  if (/\brti\b|right to information/.test(text)) return { category: "RTI matter", department: "RTI Online", confidence: 99, reason: "RTI requests use a dedicated statutory channel and should not be lodged as a CPGRAMS grievance.", alternatives: [], desiredOutcomes: [], needsHandoff: { label: "Open RTI Online", url: "https://rtionline.gov.in/", reason: "This preserves the correct legal process." } };
  if (/pension/.test(text) && !/contribution/.test(text)) return { category: "Pension grievance", department: "CPENGRAMS", confidence: 97, reason: "Pension grievances use the dedicated pension grievance journey.", alternatives: [], desiredOutcomes: [], needsHandoff: { label: "Open pension grievance route", url: "https://pgportal.gov.in/Pension/", reason: "This routes the matter to the specialised pension workflow." } };

  const scored = routes.map((route) => ({ route, score: route.keywords.filter((keyword) => text.includes(keyword)).length })).sort((a, b) => b.score - a.score);
  const best = scored[0]!;
  const selected = best.score > 0 ? best.route : { category: "Other public service", department: "Routing assistance desk", keywords: [] };
  const confidence = best.score > 2 ? 94 : best.score === 2 ? 86 : best.score === 1 ? 74 : 48;
  const desiredOutcomes: string[] = [];
  if (/refund|reverse|money back|reimburse/.test(text)) desiredOutcomes.push("Refund or reverse the disputed charge");
  if (/activate|restore|resume|start|reconnect/.test(text)) desiredOutcomes.push("Restore or activate the service");
  if (/correct|update|fix|change/.test(text)) desiredOutcomes.push("Correct the affected record or service");
  if (/deliver|receive|pending/.test(text)) desiredOutcomes.push("Complete the delayed service delivery");
  if (desiredOutcomes.length === 0) desiredOutcomes.push("Resolve the service-delivery issue described above");

  return {
    category: selected.category,
    department: selected.department,
    confidence,
    reason: best.score > 0 ? `Matched service terms in your description and mapped them to ${selected.department}.` : "The description does not yet contain enough specific service terms, so a general routing desk is suggested for confirmation.",
    alternatives: scored.filter((item) => item.route.department !== selected.department && item.score > 0).slice(0, 2).map((item) => ({ category: item.route.category, department: item.route.department })),
    desiredOutcomes,
  };
}
