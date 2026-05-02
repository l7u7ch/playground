import {
	boolean,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", [
	"critical",
	"high",
	"medium",
	"low",
	"lowest",
]);

export const todos = pgTable("todos", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	completed: boolean("completed").notNull().default(false),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	deadline: timestamp("deadline"),
	priority: priorityEnum("priority").notNull().default("medium"),
});
