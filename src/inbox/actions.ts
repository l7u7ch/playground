"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/inbox/db";
import { todos } from "@/schema";

export async function deleteTodo(id: number) {
	await getDb().delete(todos).where(eq(todos.id, id));
	revalidatePath("/");
}

type Priority = "critical" | "high" | "medium" | "low" | "lowest";
export type Status = "todo" | "doing" | "done";
export type Estimate = "xs" | "s" | "m" | "l" | "xl";

export async function updateTodo(id: number, formData: FormData) {
	const title = formData.get("title") as string;
	const deadlineRaw = formData.get("deadline") as string | null;
	const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
	const priority = (formData.get("priority") as Priority) ?? "medium";
	const status = (formData.get("status") as Status) ?? "todo";
	const estimateRaw = formData.get("estimate") as Estimate | null;
	const estimate = estimateRaw || "m";

	await getDb()
		.update(todos)
		.set({ title, deadline: deadline ?? undefined, priority, status, estimate })
		.where(eq(todos.id, id));

	revalidatePath("/");
}

export async function updateTodoEstimate(id: number, estimate: Estimate) {
	await getDb().update(todos).set({ estimate }).where(eq(todos.id, id));
	revalidatePath("/");
}

export async function updateTodoPriority(id: number, priority: Priority) {
	await getDb().update(todos).set({ priority }).where(eq(todos.id, id));
	revalidatePath("/");
}

export async function updateTodoStatus(id: number, status: Status) {
	await getDb().update(todos).set({ status }).where(eq(todos.id, id));
	revalidatePath("/");
}

export async function addTodo(formData: FormData) {
	const title = formData.get("title") as string;
	const deadlineRaw = formData.get("deadline") as string | null;
	const deadline = deadlineRaw ? new Date(deadlineRaw) : undefined;
	const priority =
		(formData.get("priority") as
			| "critical"
			| "high"
			| "medium"
			| "low"
			| "lowest"
			| null) ?? "medium";
	const estimateRaw = formData.get("estimate") as Estimate | null;
	const estimate = estimateRaw || "m";

	await getDb().insert(todos).values({ title, deadline, priority, estimate });

	revalidatePath("/");
}
