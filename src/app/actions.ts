"use server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { todos } from "@/schema";

export async function addTodo(formData: FormData) {
	const title = formData.get("title") as string;

	await getDb().insert(todos).values({ title });

	revalidatePath("/");
}
