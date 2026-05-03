CREATE TYPE "public"."status" AS ENUM('todo', 'doing', 'done');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "status" "status" DEFAULT 'todo' NOT NULL;--> statement-breakpoint
UPDATE "todos" SET "status" = 'done' WHERE "completed" = true;--> statement-breakpoint
ALTER TABLE "todos" DROP COLUMN "completed";
