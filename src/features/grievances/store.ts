import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { getDatabase } from "@/src/infrastructure/database/client";
import { grievance, grievanceAppeal, grievanceEvent, grievanceOutcome } from "@/src/infrastructure/database/schema";

function reference(prefix: string) {
  return `${prefix}-${new Date().getFullYear()}-${crypto.randomUUID().replace(/-/g, "").slice(0, 7).toUpperCase()}`;
}

export async function ensureSampleGrievance(userId: string) {
  const db = getDatabase();
  const existing = await db.select().from(grievance).where(and(eq(grievance.userId, userId), eq(grievance.isSample, true))).limit(1);
  if (existing[0]) return existing[0];
  const [created] = await db.insert(grievance).values({
    userId,
    reference: reference("CPG-TEL"),
    title: "Mobile service activation and ₹499 charge",
    description: "I paid ₹499 for mobile service activation, but the service remained inactive after the promised date. Please activate it or reverse the charge.",
    category: "Telecommunications",
    department: "Department of Telecommunications",
    routeReason: "Mobile service, activation and charge terms map this grievance to telecommunications.",
    status: "partly-resolved",
    desiredOutcomes: ["Activate the mobile service", "Reverse the ₹499 charge"],
    isSample: true,
    sampleKey: "default",
  }).onConflictDoNothing().returning();
  if (!created) {
    const [concurrent] = await db.select().from(grievance).where(and(eq(grievance.userId, userId), eq(grievance.sampleKey, "default"))).limit(1);
    if (concurrent) return concurrent;
    throw new Error("The sample grievance could not be created.");
  }
  await db.insert(grievanceEvent).values([
    { grievanceId: created.id, title: "Grievance received", detail: "Both requested outcomes were recorded and the reference was created.", actor: "CPGRAMS intake", state: "acknowledged", occurredAt: new Date(Date.now() - 86_400_000 * 3) },
    { grievanceId: created.id, title: "Route confirmed", detail: "The case was assigned to the telecommunications service route.", actor: "Routing assistance", state: "routed", occurredAt: new Date(Date.now() - 86_400_000 * 2.5) },
    { grievanceId: created.id, title: "Service activation completed", detail: "A demonstration activation confirmation was added to the case.", actor: "Service grievance officer", state: "action-recorded", occurredAt: new Date(Date.now() - 86_400_000) },
    { grievanceId: created.id, title: "Resolution Receipt issued", detail: "Activation is resolved; evidence for the ₹499 reversal is still missing.", actor: "Resolution assurance", state: "partly-resolved", occurredAt: new Date(Date.now() - 3_600_000) },
  ]);
  await db.insert(grievanceOutcome).values([
    { grievanceId: created.id, requested: "Activate the mobile service", result: "resolved", actionTaken: "Activation instruction completed", evidence: "Demonstration activation confirmation", remainingGap: "Nothing remains for this outcome", sortOrder: "1" },
    { grievanceId: created.id, requested: "Reverse the ₹499 charge", result: "needs-action", actionTaken: "Charge reviewed, but no reversal was recorded", evidence: "Demonstration billing review note", remainingGap: "Refund decision and supporting evidence are missing", sortOrder: "2" },
  ]);
  return created;
}

export async function listGrievancesForUser(userId: string) {
  const db = getDatabase();
  await ensureSampleGrievance(userId);
  return db.select().from(grievance).where(eq(grievance.userId, userId)).orderBy(desc(grievance.updatedAt));
}

export async function getGrievanceForUser(userId: string, caseReference: string) {
  const db = getDatabase();
  const [record] = await db.select().from(grievance).where(and(eq(grievance.userId, userId), eq(grievance.reference, caseReference))).limit(1);
  if (!record) return null;
  const [events, outcomes, appeals] = await Promise.all([
    db.select().from(grievanceEvent).where(eq(grievanceEvent.grievanceId, record.id)).orderBy(desc(grievanceEvent.occurredAt)),
    db.select().from(grievanceOutcome).where(eq(grievanceOutcome.grievanceId, record.id)).orderBy(asc(grievanceOutcome.sortOrder)),
    db.select().from(grievanceAppeal).where(eq(grievanceAppeal.grievanceId, record.id)).orderBy(desc(grievanceAppeal.submittedAt)),
  ]);
  return { record, events, outcomes, appeals };
}

export async function createGrievanceForUser(userId: string, input: { title: string; description: string; category: string; department: string; routeReason: string; desiredOutcomes: string[] }) {
  const db = getDatabase();
  const [created] = await db.insert(grievance).values({ ...input, userId, reference: reference("CPG"), status: "acknowledged" }).returning();
  if (!created) throw new Error("The grievance could not be created.");
  await db.insert(grievanceEvent).values({ grievanceId: created.id, title: "Grievance received", detail: "Your grievance and requested outcomes were recorded successfully.", actor: "CPGRAMS intake", state: "acknowledged" });
  return created;
}

export async function createAppealForUser(userId: string, caseReference: string, disputedOutcome: string, reason: string) {
  const db = getDatabase();
  const [record] = await db.select().from(grievance).where(and(eq(grievance.userId, userId), eq(grievance.reference, caseReference))).limit(1);
  if (!record) return null;
  const [appeal] = await db.insert(grievanceAppeal).values({ grievanceId: record.id, userId, reference: reference("APL"), disputedOutcome, reason }).returning();
  if (!appeal) throw new Error("The appeal could not be created.");
  await db.insert(grievanceEvent).values({ grievanceId: record.id, title: "Focused appeal received", detail: `The appeal carries forward the case history and disputes: ${disputedOutcome}.`, actor: "Appeal intake", state: "appeal-received" });
  await db.update(grievance).set({ status: "appeal-received", updatedAt: new Date() }).where(eq(grievance.id, record.id));
  return appeal;
}
