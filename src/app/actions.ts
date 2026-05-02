"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { todos } from "@/schema";

type Priority = "critical" | "high" | "medium" | "low" | "lowest";

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
