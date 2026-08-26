import { boolean, index, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

const auditTimestamps = {
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
};

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    ...auditTimestamps,
  },
  (table) => [uniqueIndex("user_email_unique").on(table.email)],
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
    token: text("token").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    ...auditTimestamps,
  },
  (table) => [uniqueIndex("session_token_unique").on(table.token), index("session_user_id_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    issuer: text("issuer").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: "date", withTimezone: true }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: "date", withTimezone: true }),
    scope: text("scope"),
    password: text("password"),
    ...auditTimestamps,
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
    uniqueIndex("account_provider_account_unique").on(table.providerId, table.accountId),
    uniqueIndex("account_issuer_account_unique").on(table.issuer, table.accountId),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
    ...auditTimestamps,
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const citizenProfile = pgTable(
  "citizen_profile",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    displayReference: text("display_reference").notNull(),
    preferredLocale: text("preferred_locale").default("en").notNull(),
    isSynthetic: boolean("is_synthetic").default(true).notNull(),
    ...auditTimestamps,
  },
  (table) => [uniqueIndex("citizen_profile_user_unique").on(table.userId)],
);

export const grievance = pgTable(
  "grievance",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reference: text("reference").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull(),
    department: text("department").notNull(),
    routeReason: text("route_reason").notNull(),
    status: text("status").default("acknowledged").notNull(),
    desiredOutcomes: jsonb("desired_outcomes").$type<string[]>().default([]).notNull(),
    isSample: boolean("is_sample").default(false).notNull(),
    sampleKey: text("sample_key"),
    isSynthetic: boolean("is_synthetic").default(true).notNull(),
    submittedAt: timestamp("submitted_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
    ...auditTimestamps,
  },
  (table) => [
    uniqueIndex("grievance_reference_unique").on(table.reference),
    uniqueIndex("grievance_user_sample_unique").on(table.userId, table.sampleKey),
    index("grievance_user_id_idx").on(table.userId),
    index("grievance_status_idx").on(table.status),
  ],
);

export const grievanceEvent = pgTable(
  "grievance_event",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    grievanceId: uuid("grievance_id")
      .notNull()
      .references(() => grievance.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    detail: text("detail").notNull(),
    actor: text("actor").notNull(),
    state: text("state").notNull(),
    occurredAt: timestamp("occurred_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("grievance_event_case_idx").on(table.grievanceId)],
);

export const grievanceOutcome = pgTable(
  "grievance_outcome",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    grievanceId: uuid("grievance_id")
      .notNull()
      .references(() => grievance.id, { onDelete: "cascade" }),
    requested: text("requested").notNull(),
    result: text("result").notNull(),
    actionTaken: text("action_taken").notNull(),
    evidence: text("evidence").notNull(),
    remainingGap: text("remaining_gap").notNull(),
    sortOrder: text("sort_order").notNull(),
  },
  (table) => [index("grievance_outcome_case_idx").on(table.grievanceId)],
);

export const grievanceAppeal = pgTable(
  "grievance_appeal",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    grievanceId: uuid("grievance_id")
      .notNull()
      .references(() => grievance.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    reference: text("reference").notNull(),
    disputedOutcome: text("disputed_outcome").notNull(),
    reason: text("reason").notNull(),
    status: text("status").default("received").notNull(),
    submittedAt: timestamp("submitted_at", { mode: "date", withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("grievance_appeal_reference_unique").on(table.reference), index("grievance_appeal_case_idx").on(table.grievanceId)],
);

export const schema = { account, citizenProfile, grievance, grievanceAppeal, grievanceEvent, grievanceOutcome, session, user, verification };
