CREATE TABLE "grievance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"reference" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"department" text NOT NULL,
	"route_reason" text NOT NULL,
	"status" text DEFAULT 'acknowledged' NOT NULL,
	"desired_outcomes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_sample" boolean DEFAULT false NOT NULL,
	"is_synthetic" boolean DEFAULT true NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grievance_appeal" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"grievance_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"reference" text NOT NULL,
	"disputed_outcome" text NOT NULL,
	"reason" text NOT NULL,
	"status" text DEFAULT 'received' NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grievance_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"grievance_id" uuid NOT NULL,
	"title" text NOT NULL,
	"detail" text NOT NULL,
	"actor" text NOT NULL,
	"state" text NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grievance_outcome" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"grievance_id" uuid NOT NULL,
	"requested" text NOT NULL,
	"result" text NOT NULL,
	"action_taken" text NOT NULL,
	"evidence" text NOT NULL,
	"remaining_gap" text NOT NULL,
	"sort_order" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "grievance" ADD CONSTRAINT "grievance_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grievance_appeal" ADD CONSTRAINT "grievance_appeal_grievance_id_grievance_id_fk" FOREIGN KEY ("grievance_id") REFERENCES "public"."grievance"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grievance_appeal" ADD CONSTRAINT "grievance_appeal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grievance_event" ADD CONSTRAINT "grievance_event_grievance_id_grievance_id_fk" FOREIGN KEY ("grievance_id") REFERENCES "public"."grievance"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grievance_outcome" ADD CONSTRAINT "grievance_outcome_grievance_id_grievance_id_fk" FOREIGN KEY ("grievance_id") REFERENCES "public"."grievance"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "grievance_reference_unique" ON "grievance" USING btree ("reference");--> statement-breakpoint
CREATE INDEX "grievance_user_id_idx" ON "grievance" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "grievance_status_idx" ON "grievance" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "grievance_appeal_reference_unique" ON "grievance_appeal" USING btree ("reference");--> statement-breakpoint
CREATE INDEX "grievance_appeal_case_idx" ON "grievance_appeal" USING btree ("grievance_id");--> statement-breakpoint
CREATE INDEX "grievance_event_case_idx" ON "grievance_event" USING btree ("grievance_id");--> statement-breakpoint
CREATE INDEX "grievance_outcome_case_idx" ON "grievance_outcome" USING btree ("grievance_id");