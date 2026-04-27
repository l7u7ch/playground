"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";

export async function addTodo(text: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("todos").insert({ text });
	if (error) throw new Error(error.message);
	revalidatePath("/");
}

export async function toggleTodo(id: string, is_done: boolean) {
	const supabase = await createClient();
	const { error } = await supabase
		.from("todos")
		.update({ is_done })
		.eq("id", id);
	if (error) throw new Error(error.message);
	revalidatePath("/");
}

export async function deleteTodo(id: string) {
	const supabase = await createClient();
	const { error } = await supabase.from("todos").delete().eq("id", id);
	if (error) throw new Error(error.message);
	revalidatePath("/");
}
