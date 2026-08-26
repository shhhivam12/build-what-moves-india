ALTER TABLE "grievance" ADD COLUMN "sample_key" text;--> statement-breakpoint
CREATE UNIQUE INDEX "grievance_user_sample_unique" ON "grievance" USING btree ("user_id","sample_key");