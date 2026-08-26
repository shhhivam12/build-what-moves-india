import "server-only";

export const mockLatestCookie = "cpgrams-demo-latest";
export const mockAppealCookie = "cpgrams-demo-appeal";

type MockCaseInput = {
  reference: string;
  title: string;
  description: string;
  category: string;
  department: string;
  routeReason: string;
  desiredOutcomes: string[];
};

export function encodeMockCase(input: MockCaseInput) {
  const cookieSafeInput = {
    ...input,
    title: input.title.slice(0, 180),
    description: input.description.slice(0, 1_200),
    routeReason: input.routeReason.slice(0, 360),
    desiredOutcomes: input.desiredOutcomes.slice(0, 4).map((outcome) => outcome.slice(0, 180)),
  };
  return Buffer.from(JSON.stringify(cookieSafeInput), "utf8").toString("base64url");
}

export function decodeMockCase(value?: string): MockCaseInput | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as MockCaseInput;
    return parsed.reference && parsed.title ? parsed : null;
  } catch {
    return null;
  }
}

export function encodeMockAppeal(input: { caseReference: string; appealReference: string; disputedOutcome: string; reason: string }) {
  return Buffer.from(JSON.stringify(input), "utf8").toString("base64url");
}

export function decodeMockAppeal(value?: string) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as { caseReference: string; appealReference: string; disputedOutcome: string; reason: string };
    return parsed.caseReference && parsed.appealReference ? parsed : null;
  } catch {
    return null;
  }
}

export function createMockReference() {
  return `CPG-DEMO-${crypto.randomUUID().replace(/-/g, "").slice(0, 7).toUpperCase()}`;
}

export function getMockCases(latest?: MockCaseInput | null) {
  const now = new Date();
  const sample = {
    id: "demo-sample-grievance",
    userId: "demo-raghav-mehta",
    reference: "CPG-DEMO-2026-001",
    title: "Mobile service activation and ₹499 charge",
    description: "I paid ₹499 for mobile service activation but the service remained inactive after the promised date. Please activate it or reverse the charge.",
    category: "Telecommunications",
    department: "Department of Telecommunications",
    routeReason: "The grievance concerns mobile service activation and a related charge.",
    status: "partly-resolved",
    desiredOutcomes: ["Activate the mobile service", "Reverse the ₹499 charge"],
    isSample: true,
    sampleKey: "default",
    submittedAt: new Date(now.getTime() - 259_200_000),
    updatedAt: new Date(now.getTime() - 3_600_000),
  };
  if (!latest) return [sample];
  return [{ ...latest, id: `demo-${latest.reference}`, userId: "demo-raghav-mehta", status: "acknowledged", isSample: false, sampleKey: null, submittedAt: now, updatedAt: now }, sample];
}

export function getMockDetail(caseReference: string, latest?: MockCaseInput | null, appeal?: ReturnType<typeof decodeMockAppeal>) {
  const records = getMockCases(latest);
  const record = records.find((item) => item.reference === caseReference);
  if (!record) return null;
  const isSample = record.isSample;
  const now = new Date();
  const events = isSample ? [
    { id: "event-4", title: "Resolution report issued", detail: "Service activation is complete. Evidence for reversal of the ₹499 charge is pending.", actor: "Grievance Officer", state: "partly-resolved", occurredAt: new Date(now.getTime() - 3_600_000) },
    { id: "event-3", title: "Service activation completed", detail: "Activation confirmation was recorded.", actor: "Department of Telecommunications", state: "action-recorded", occurredAt: new Date(now.getTime() - 86_400_000) },
    { id: "event-2", title: "Forwarded to concerned organisation", detail: "The grievance was assigned to the telecommunications grievance office.", actor: "CPGRAMS", state: "routed", occurredAt: new Date(now.getTime() - 172_800_000) },
    { id: "event-1", title: "Grievance registered", detail: "The grievance and requested actions were recorded.", actor: "CPGRAMS", state: "acknowledged", occurredAt: new Date(now.getTime() - 259_200_000) },
  ] : [{ id: "event-latest", title: "Grievance registered", detail: "The grievance and requested actions were recorded.", actor: "CPGRAMS", state: "acknowledged", occurredAt: now }];
  const outcomes = isSample ? [
    { id: "outcome-1", requested: "Activate the mobile service", result: "resolved", actionTaken: "Activation instruction completed", evidence: "Activation confirmation", remainingGap: "No further action required", sortOrder: "1" },
    { id: "outcome-2", requested: "Reverse the ₹499 charge", result: "needs-action", actionTaken: "Charge reviewed but reversal not recorded", evidence: "Billing review note", remainingGap: "Refund decision and evidence are pending", sortOrder: "2" },
  ] : [];
  const appeals = appeal?.caseReference === caseReference ? [{ id: "demo-appeal", reference: appeal.appealReference, disputedOutcome: appeal.disputedOutcome, reason: appeal.reason, submittedAt: now }] : [];
  return { record: appeals.length ? { ...record, status: "appeal-received" } : record, events, outcomes, appeals };
}
