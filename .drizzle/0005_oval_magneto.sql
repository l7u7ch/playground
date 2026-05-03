CREATE TYPE "public"."estimate" AS ENUM('xs', 's', 'm', 'l', 'xl');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('todo', 'doing', 'done');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "status" "status" DEFAULT 'todo' NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "estimate" "estimate";--> statement-breakpoint
ALTER TABLE "todos" DROP COLUMN "completed";