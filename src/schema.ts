import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["todo", "doing", "done"]);

export const priorityEnum = pgEnum("priority", [
	"critical",
	"high",
	"medium",
	"low",
	"lowest",
]);

export const estimateEnum = pgEnum("estimate", ["xs", "s", "m", "l", "xl"]);

export const todos = pgTable("todos", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	status: statusEnum("status").notNull().default("todo"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	deadline: timestamp("deadline"),
	priority: priorityEnum("priority").notNull().default("medium"),
	estimate: estimateEnum("estimate").notNull().default("m"),
});
