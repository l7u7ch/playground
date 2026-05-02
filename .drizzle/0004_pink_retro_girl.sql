CREATE TYPE "public"."priority" AS ENUM('critical', 'high', 'medium', 'low', 'lowest');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "priority" "priority" DEFAULT 'medium' NOT NULL;