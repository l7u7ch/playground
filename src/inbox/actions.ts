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

export async function updateTodo(id: number, formData: FormData) {
	const title = formData.get("title") as string;
	const deadlineRaw = formData.get("deadline") as string | null;
	const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
	const priority = (formData.get("priority") as Priority) ?? "medium";

	await getDb()
		.update(todos)
		.set({ title, deadline: deadline ?? undefined, priority })
		.where(eq(todos.id, id));

	revalidatePath("/");
}

export async function updateTodoPriority(id: number, priority: Priority) {
	await getDb().update(todos).set({ priority }).where(eq(todos.id, id));
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

	await getDb().insert(todos).values({ title, deadline, priority });

	revalidatePath("/");
}
