CREATE TYPE "meeting_status" AS ENUM('upcoming', 'active', 'completed', 'progressing', 'cancelled');--> statement-breakpoint
CREATE TABLE "meetings" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"agent_id" text NOT NULL,
	"status" "meeting_status" DEFAULT 'upcoming'::"meeting_status" NOT NULL,
	"started_at" timestamp,
	"ended_at" timestamp,
	"transcript_url" text,
	"recording_url" text,
	"summary" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_agent_id_agents_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agents"("id") ON DELETE CASCADE;