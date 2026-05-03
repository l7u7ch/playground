UPDATE "todos" SET "estimate" = 'm' WHERE "estimate" IS NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "estimate" SET DEFAULT 'm';--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "estimate" SET NOT NULL;